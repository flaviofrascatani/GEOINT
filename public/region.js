// ============================================================================
// GEOINT — Region DEM
// ----------------------------------------------------------------------------
// Selezione di un'area del mondo, download del rilievo da Open-Meteo e
// sovrapposizione dei punti strategici gia' presenti nel progetto:
//
//   COUNTRY_DB[*].bases[]       basi militari      (n, lat, lng, t, f)
//   COUNTRY_DB[*].extraction[]  siti estrattivi    (n, lat, lng, r)
//   TRADE_ROUTES[*].points[]    porti e stretti    (lat, lng, label)
//
// MODULO AUTONOMO: non dipende da topo.js ne' dal globo. Si aggancia da solo
// alla barra in basso. In index.html basta una riga:
//
//     <script src="region.js"></script>
//
// LIMITE DI BANDA
// Open-Meteo conta le richieste per indirizzo IP. Qui si scarica su richiesta
// dell'utente, quindi si usa lo stesso schema del resto del progetto: raffiche
// di 3 richieste e poi una pausa, con la pausa che raddoppia a ogni 429. Una
// regione costa al massimo 12 richieste, cioe' meno di due minuti.
// ============================================================================
(function(){
'use strict';

// --- Parametri --------------------------------------------------------------
const MAX_SPAN_LNG = 30;      // ampiezza massima dell'area, in gradi
const MAX_SPAN_LAT = 25;
const MIN_SPAN     = 0.4;
const MAX_POINTS   = 1200;    // 12 richieste da 100 coordinate
const CHUNK        = 100;
const BURST        = 3;
const PAUSE_MS     = 20000;   // pausa fra raffiche
const SPACING_MS   = 1200;
const MAX_PENALTY  = 8;
const CACHE_KEY    = 'gx_region_v1_';
const COOLDOWN_KEY = 'gx_topo_cooldown';   // condiviso con topo.js
const PENALTY_KEY  = 'gx_topo_penalty';

const sleep = ms => new Promise(r => setTimeout(r, ms));
const clamp = (v,a,b) => Math.max(a, Math.min(b, v));

// ============================================================================
//  Limitatore a raffiche (stesso comportamento di topo.js)
// ============================================================================
const Q = {queue:[], running:false, inBurst:0, last:0, total:0};

function penalty(){
  try{const v=parseFloat(localStorage.getItem(PENALTY_KEY)||'1');
    return (isFinite(v)&&v>=1)?Math.min(v,MAX_PENALTY):1}catch(e){return 1}
}
function setPenalty(v){
  try{localStorage.setItem(PENALTY_KEY,String(clamp(v,1,MAX_PENALTY)))}catch(e){}
}
function cooldownLeft(){
  try{const t=parseInt(localStorage.getItem(COOLDOWN_KEY)||'0',10);
    return isFinite(t)?Math.max(0,t-Date.now()):0}catch(e){return 0}
}
function setCooldown(ms){
  try{localStorage.setItem(COOLDOWN_KEY,String(Date.now()+ms))}catch(e){}
}

let waitCb=null;
function queuedFetch(url){
  return new Promise((res,rej)=>{Q.queue.push({url,res,rej});pump()});
}
async function pump(){
  if(Q.running)return;
  Q.running=true;
  while(Q.queue.length){
    const job=Q.queue.shift();
    const cd=cooldownLeft();
    if(cd>0){if(waitCb)waitCb('cooldown',cd);await sleep(cd)}
    if(Q.inBurst>=BURST){
      const p=PAUSE_MS*penalty();
      if(waitCb)waitCb('burst',p);
      await sleep(p);
      Q.inBurst=0;
    }else{
      const gap=Q.last+SPACING_MS-Date.now();
      if(gap>0)await sleep(gap);
    }
    let tries=0,done=false;
    while(tries<=2&&!done){
      Q.last=Date.now();
      try{
        const r=await fetch(job.url);
        if(r.status===429){
          const p=Math.min(penalty()*2,MAX_PENALTY);
          setPenalty(p);
          const w=PAUSE_MS*p;
          setCooldown(w);
          Q.inBurst=0;
          if(waitCb)waitCb('429',w);
          await sleep(w);
          tries++;continue;
        }
        if(!r.ok)throw new Error('HTTP '+r.status);
        const j=await r.json();
        Q.inBurst++;Q.total++;Q.last=Date.now();
        setPenalty(penalty()*0.85);
        job.res(j);done=true;
      }catch(e){
        tries++;
        if(tries>2){job.rej(e);done=true;break}
        await sleep(1500*tries);
      }
    }
  }
  Q.running=false;
}

// ============================================================================
//  Punti strategici gia' presenti nel progetto
// ============================================================================
function collectPoints(){
  const out=[];
  const db=window.COUNTRY_DB;
  if(db){
    Object.keys(db).forEach(cid=>{
      const c=db[cid];if(!c)return;
      (c.bases||[]).forEach(b=>{
        if(typeof b.lat!=='number'||typeof b.lng!=='number')return;
        out.push({lat:b.lat,lng:b.lng,name:b.n,kind:'mil',
                  note:b.t||'Base militare',foreign:!!b.f,country:cid});
      });
      (c.extraction||[]).forEach(e=>{
        if(typeof e.lat!=='number'||typeof e.lng!=='number')return;
        out.push({lat:e.lat,lng:e.lng,name:e.n,kind:'eco',
                  note:e.r||'Sito estrattivo',country:cid});
      });
    });
  }
  const tr=window.TRADE_ROUTES;
  if(Array.isArray(tr)){
    tr.forEach(route=>{
      const scan=(pts)=>{
        (pts||[]).forEach(p=>{
          if(!p.label||typeof p.lat!=='number')return;
          out.push({lat:p.lat,lng:p.lng,name:p.label,kind:'sea',
                    note:route.name||'Rotta commerciale'});
        });
      };
      scan(route.points);
      (route.branches||[]).forEach(b=>scan(b.points||b));
    });
  }
  // stessa localita' ripetuta su piu' rotte: si tiene una sola volta
  const seen={},uniq=[];
  out.forEach(p=>{
    const k=p.kind+'|'+p.name+'|'+p.lat.toFixed(2)+'|'+p.lng.toFixed(2);
    if(seen[k])return;
    seen[k]=1;uniq.push(p);
  });
  return uniq;
}

function pointsIn(bbox,pts){
  const [w,e,s,n]=bbox;
  return pts.filter(p=>{
    let lng=p.lng;
    while(lng<w-180)lng+=360;
    while(lng>e+180)lng-=360;
    return lng>=w&&lng<=e&&p.lat>=s&&p.lat<=n;
  });
}

// ============================================================================
//  Download del rilievo
// ============================================================================
function gridFor(bbox){
  const dLng=bbox[1]-bbox[0], dLat=bbox[3]-bbox[2];
  const midLat=((bbox[2]+bbox[3])/2)*Math.PI/180;
  const aspect=(dLng*Math.max(0.15,Math.cos(midLat)))/dLat;
  // celle quadrate a terra, entro il tetto di punti
  let h=Math.round(Math.sqrt(MAX_POINTS/Math.max(aspect,0.05)));
  let w=Math.round(h*aspect);
  w=clamp(w,8,80); h=clamp(h,8,80);
  while(w*h>MAX_POINTS){ if(w>h)w--; else h--; }
  return {w:w,h:h};
}

function coordsFor(bbox,g){
  const lats=[],lngs=[];
  for(let j=0;j<g.h;j++){
    const lat=bbox[2]+(bbox[3]-bbox[2])*(j/(g.h-1));
    for(let i=0;i<g.w;i++){
      const lng=bbox[0]+(bbox[1]-bbox[0])*(i/(g.w-1));
      lats.push(clamp(lat,-90,90).toFixed(4));
      lngs.push(((lng+540)%360-180).toFixed(4));
    }
  }
  return {lats,lngs};
}

function cacheKey(bbox,g){
  return CACHE_KEY+bbox.map(v=>v.toFixed(3)).join('_')+'_'+g.w+'x'+g.h;
}
function loadCache(k){
  try{const d=JSON.parse(localStorage.getItem(k)||'null');
    return (d&&Array.isArray(d.elev))?d:null}catch(e){return null}
}
function saveCache(k,d){
  try{localStorage.setItem(k,JSON.stringify(d))}catch(e){}
}

async function fetchRegion(bbox,g,onProgress){
  const key=cacheKey(bbox,g);
  const cached=loadCache(key);
  const N=g.w*g.h;
  const chunks=Math.ceil(N/CHUNK);
  const elev=cached?cached.elev.slice():new Array(N).fill(null);
  const have=cached?cached.have.slice():new Array(chunks).fill(0);
  if(have.every(Boolean))return {elev,have,cached:true};

  const c=coordsFor(bbox,g);
  waitCb=(reason,ms)=>onProgress({phase:'wait',reason,ms,
                                  have:have.filter(Boolean).length,total:chunks});
  for(let k=0;k<chunks;k++){
    if(have[k])continue;
    const s=k*CHUNK,e=Math.min(s+CHUNK,N);
    onProgress({phase:'fetch',have:have.filter(Boolean).length,total:chunks});
    const url='https://api.open-meteo.com/v1/elevation'
      +'?latitude='+c.lats.slice(s,e).join(',')
      +'&longitude='+c.lngs.slice(s,e).join(',');
    let j;
    try{ j=await queuedFetch(url); }
    catch(err){ waitCb=null; return {elev,have,error:err}; }
    if(!j||!Array.isArray(j.elevation)||j.elevation.length<(e-s)){
      waitCb=null; return {elev,have,error:new Error('risposta incompleta')};
    }
    for(let i=0;i<e-s;i++){
      const v=j.elevation[i];
      elev[s+i]=(typeof v==='number')?Math.round(v):0;
    }
    have[k]=1;
    saveCache(key,{elev,have,bbox,g});   // salvataggio a ogni settore
    onProgress({phase:'fetch',have:have.filter(Boolean).length,total:chunks});
  }
  waitCb=null;
  return {elev,have};
}

// ============================================================================
//  Isoipse (marching squares + interpolazione)
// ============================================================================
function catmull(p0,p1,p2,p3,t){
  return p1+0.5*t*(p2-p0+t*(2*p0-5*p1+4*p2-p3+t*(3*(p1-p2)+p3-p0)));
}
function upsample(grid,W,H,f){
  if(f<2)return {g:grid,W:W,H:H};
  const NW=(W-1)*f+1,NH=(H-1)*f+1;
  const at=(x,y)=>grid[clamp(y,0,H-1)*W+clamp(x,0,W-1)];
  const out=new Array(NW*NH),col=[0,0,0,0];
  for(let j=0;j<NH;j++){
    const gy=j/f,y0=Math.floor(gy),ty=gy-y0;
    for(let i=0;i<NW;i++){
      const gx=i/f,x0=Math.floor(gx),tx=gx-x0;
      for(let m=-1;m<=2;m++)
        col[m+1]=catmull(at(x0-1,y0+m),at(x0,y0+m),at(x0+1,y0+m),at(x0+2,y0+m),tx);
      out[j*NW+i]=catmull(col[0],col[1],col[2],col[3],ty);
    }
  }
  return {g:out,W:NW,H:NH};
}
function marching(grid,W,H,level){
  const segs=[];
  const ip=(a,b)=>(b===a)?0.5:(level-a)/(b-a);
  for(let y=0;y<H-1;y++)for(let x=0;x<W-1;x++){
    const tl=grid[y*W+x],tr=grid[y*W+x+1],br=grid[(y+1)*W+x+1],bl=grid[(y+1)*W+x];
    let c=0;
    if(tl>level)c|=8; if(tr>level)c|=4; if(br>level)c|=2; if(bl>level)c|=1;
    if(c===0||c===15)continue;
    const T=[x+ip(tl,tr),y],R=[x+1,y+ip(tr,br)],
          B=[x+ip(bl,br),y+1],L=[x,y+ip(tl,bl)];
    const push=(p,q)=>segs.push([p[0],p[1],q[0],q[1]]);
    if(c===1||c===14)push(L,B);
    else if(c===2||c===13)push(B,R);
    else if(c===3||c===12)push(L,R);
    else if(c===4||c===11)push(T,R);
    else if(c===6||c===9)push(T,B);
    else if(c===7||c===8)push(L,T);
    else if(c===5){push(L,T);push(B,R)}
    else if(c===10){push(T,R);push(L,B)}
  }
  return segs;
}
function join(segs){
  const key=(x,y)=>x.toFixed(3)+'_'+y.toFixed(3);
  const adj=new Map();
  segs.forEach((s,i)=>{
    const a=key(s[0],s[1]),b=key(s[2],s[3]);
    if(!adj.has(a))adj.set(a,[]);
    if(!adj.has(b))adj.set(b,[]);
    adj.get(a).push({i,o:[s[2],s[3]]});
    adj.get(b).push({i,o:[s[0],s[1]]});
  });
  const used=new Array(segs.length).fill(false),lines=[];
  for(let i=0;i<segs.length;i++){
    if(used[i])continue;
    used[i]=true;
    const s=segs[i],line=[[s[0],s[1]],[s[2],s[3]]];
    for(const end of [1,0]){
      while(true){
        const cur=end?line[line.length-1]:line[0];
        const opts=adj.get(key(cur[0],cur[1]))||[];
        let nx=null;
        for(const o of opts)if(!used[o.i]){nx=o;break}
        if(!nx)break;
        used[nx.i]=true;
        if(end)line.push(nx.o); else line.unshift(nx.o);
      }
    }
    if(line.length>=3)lines.push(line);
  }
  return lines;
}
function levelsOf(values,n){
  const v=values.filter(x=>x!=null&&isFinite(x)).sort((a,b)=>a-b);
  if(!v.length)return [];
  const lo=v[Math.floor(v.length*0.04)],hi=v[Math.min(Math.floor(v.length*0.96),v.length-1)];
  if(hi-lo<5)return [];
  const out=[];
  for(let i=1;i<=n;i++)out.push(lo+(hi-lo)*(i/(n+1)));
  return out;
}

// ============================================================================
//  Disegno della mappa regionale
// ============================================================================
function drawRegion(canvas,bbox,g,elev,pts,opts){
  const dpr=Math.min(window.devicePixelRatio||1,2);
  const W=canvas.clientWidth||760, H=canvas.clientHeight||520;
  canvas.width=Math.round(W*dpr); canvas.height=Math.round(H*dpr);
  const ctx=canvas.getContext('2d');
  ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.clearRect(0,0,W,H);

  // area di disegno a proporzioni geografiche
  const dLng=bbox[1]-bbox[0], dLat=bbox[3]-bbox[2];
  const midLat=((bbox[2]+bbox[3])/2)*Math.PI/180;
  const aspect=(dLng*Math.max(0.15,Math.cos(midLat)))/dLat;
  let aw=W, ah=W/aspect;
  if(ah>H){ah=H;aw=H*aspect}
  const ax=(W-aw)/2, ay=(H-ah)/2;

  const grad=ctx.createLinearGradient(0,ay,0,ay+ah);
  grad.addColorStop(0,'#0a1813'); grad.addColorStop(1,'#050b09');
  ctx.fillStyle=grad; ctx.fillRect(ax,ay,aw,ah);

  const sx=lng=>ax+((lng-bbox[0])/dLng)*aw;
  const sy=lat=>ay+ah-((lat-bbox[2])/dLat)*ah;

  // tutto il disegno resta dentro la cornice
  ctx.save();
  ctx.beginPath(); ctx.rect(ax,ay,aw,ah); ctx.clip();

  // --- isoipse ---
  const land=elev.filter(v=>v!=null&&v>0);
  const src=(land.length>=g.w*g.h*0.12)?land:elev;
  const levels=levelsOf(src,opts&&opts.lines||14);
  const F=(g.w*g.h<=700)?3:2;
  const up=upsample(elev.map(v=>v==null?0:v),g.w,g.h,F);
  const stepX=aw/(g.w-1)/F, stepY=ah/(g.h-1)/F;
  ctx.lineCap='round'; ctx.lineJoin='round';
  levels.forEach((lv,li)=>{
    const t=li/Math.max(levels.length-1,1);
    ctx.strokeStyle='rgba(213,232,210,'+(0.20+0.45*t).toFixed(2)+')';
    ctx.lineWidth=0.5+0.7*t;
    ctx.beginPath();
    join(marching(up.g,up.W,up.H,lv)).forEach(line=>{
      if(line.length<3)return;
      let last=null;
      line.forEach((p,i)=>{
        const X=ax+p[0]*stepX, Y=ay+ah-p[1]*stepY;
        if(last&&Math.abs(X-last[0])<0.5&&Math.abs(Y-last[1])<0.5&&i<line.length-1)return;
        if(i===0)ctx.moveTo(X,Y); else ctx.lineTo(X,Y);
        last=[X,Y];
      });
    });
    ctx.stroke();
  });

  // --- confini dei paesi, se disponibili ---
  const cp=window.countryPolys;
  if(cp&&(!opts||opts.borders!==false)){
    ctx.strokeStyle='rgba(138,173,132,.28)'; ctx.lineWidth=0.8;
    ctx.beginPath();
    Object.keys(cp).forEach(id=>{
      cp[id].forEach(poly=>{
        const ring=poly&&poly[0];
        if(!ring||ring.length<4)return;
        let prev=null,started=false,drew=0;
        for(let i=0;i<ring.length;i+=1){
          let lng=ring[i][0],lat=ring[i][1];
          if(prev!==null){
            while(lng-prev>180)lng-=360;
            while(lng-prev<-180)lng+=360;
          }
          prev=lng;
          let L=lng;
          while(L<bbox[0]-180)L+=360;
          while(L>bbox[1]+180)L-=360;
          if(L<bbox[0]-dLng||L>bbox[1]+dLng||lat<bbox[2]-dLat||lat>bbox[3]+dLat){
            started=false;continue;
          }
          const X=sx(L),Y=sy(lat);
          if(!started){ctx.moveTo(X,Y);started=true}else{ctx.lineTo(X,Y);drew++}
          if(drew>4000)break;
        }
      });
    });
    ctx.stroke();
  }

  // --- punti strategici ---
  const style={
    mil:{c:'#c9a24a',label:'Militare'},
    eco:{c:'#7fb37a',label:'Economico'},
    sea:{c:'#79a8b8',label:'Marittimo'}
  };
  const placed=[];
  ctx.font='10px ui-monospace, monospace';
  pts.forEach(p=>{
    let L=p.lng;
    while(L<bbox[0]-180)L+=360;
    while(L>bbox[1]+180)L-=360;
    const X=sx(L),Y=sy(p.lat);
    if(X<ax-4||X>ax+aw+4||Y<ay-4||Y>ay+ah+4)return;
    const st=style[p.kind]||style.eco;
    ctx.fillStyle=st.c; ctx.strokeStyle='rgba(5,11,9,.85)'; ctx.lineWidth=2;
    ctx.beginPath();
    if(p.kind==='mil'){                       // triangolo
      ctx.moveTo(X,Y-5);ctx.lineTo(X+4.5,Y+3.5);ctx.lineTo(X-4.5,Y+3.5);ctx.closePath();
    }else if(p.kind==='sea'){                 // cerchio
      ctx.arc(X,Y,3.6,0,Math.PI*2);
    }else{                                    // rombo
      ctx.moveTo(X,Y-4.5);ctx.lineTo(X+4.5,Y);ctx.lineTo(X,Y+4.5);ctx.lineTo(X-4.5,Y);ctx.closePath();
    }
    ctx.stroke(); ctx.fill();
    p._x=X; p._y=Y;
    // etichetta solo se non si accavalla
    const tw=ctx.measureText(p.name).width;
    let lx=X+8, ly=Y+3.5;
    const box=[lx,ly-9,tw,12];
    const hit=placed.some(b=>!(box[0]>b[0]+b[2]+3||box[0]+box[2]+3<b[0]||
                               box[1]>b[1]+b[3]+2||box[1]+box[3]+2<b[1]));
    if(!hit&&lx+tw<ax+aw){
      placed.push(box);
      ctx.fillStyle='rgba(5,11,9,.72)';
      ctx.fillRect(lx-2,ly-9,tw+4,12);
      ctx.fillStyle=st.c;
      ctx.fillText(p.name,lx,ly);
    }
  });

  ctx.restore();

  // cornice + coordinate
  ctx.strokeStyle='rgba(138,173,132,.35)'; ctx.lineWidth=1;
  ctx.strokeRect(ax+.5,ay+.5,aw-1,ah-1);
  ctx.fillStyle='rgba(122,145,120,.75)';
  ctx.font='9px ui-monospace, monospace';
  const f=(v,a,b)=>Math.abs(v).toFixed(2)+'°'+(v>=0?a:b);
  ctx.fillText(f(bbox[2],'N','S')+'  '+f(bbox[0],'E','W'),ax+4,ay+ah-5);
  const t2=f(bbox[3],'N','S')+'  '+f(bbox[1],'E','W');
  ctx.fillText(t2,ax+aw-ctx.measureText(t2).width-4,ay+11);
  return {ax,ay,aw,ah};
}

// ============================================================================
//  Mappa del mondo per la selezione
// ============================================================================
let worldCache=null;
function drawWorld(cv,sel){
  const dpr=Math.min(window.devicePixelRatio||1,2);
  const W=cv.clientWidth||760,H=Math.round((cv.clientWidth||760)/2);
  cv.height=Math.round(H*dpr); cv.width=Math.round(W*dpr);
  cv.style.height=H+'px';
  const ctx=cv.getContext('2d');
  ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.fillStyle='#070f0c'; ctx.fillRect(0,0,W,H);
  const X=lng=>((lng+180)/360)*W, Y=lat=>((90-lat)/180)*H;

  // reticolato
  ctx.strokeStyle='rgba(138,173,132,.10)'; ctx.lineWidth=1;
  ctx.beginPath();
  for(let l=-150;l<180;l+=30){ctx.moveTo(X(l),0);ctx.lineTo(X(l),H)}
  for(let l=-60;l<90;l+=30){ctx.moveTo(0,Y(l));ctx.lineTo(W,Y(l))}
  ctx.stroke();

  const cp=window.countryPolys;
  if(cp){
    if(!worldCache){
      worldCache=[];
      Object.keys(cp).forEach(id=>{
        cp[id].forEach(poly=>{
          const ring=poly&&poly[0];
          if(!ring||ring.length<4)return;
          const out=[];let last=null;
          for(let i=0;i<ring.length;i++){
            const p=ring[i];
            if(last&&Math.abs(p[0]-last[0])<0.55&&Math.abs(p[1]-last[1])<0.55)continue;
            out.push(p);last=p;
          }
          if(out.length>=3)worldCache.push(out);
        });
      });
    }
    ctx.strokeStyle='rgba(150,186,146,.55)'; ctx.lineWidth=0.7;
    ctx.beginPath();
    worldCache.forEach(r=>{
      for(let i=0;i<r.length;i++){
        const x=X(r[i][0]),y=Y(r[i][1]);
        if(i===0)ctx.moveTo(x,y); else ctx.lineTo(x,y);
      }
    });
    ctx.stroke();
  }

  if(sel){
    const x1=X(Math.min(sel[0],sel[1])),x2=X(Math.max(sel[0],sel[1]));
    const y1=Y(Math.max(sel[2],sel[3])),y2=Y(Math.min(sel[2],sel[3]));
    ctx.fillStyle='rgba(138,173,132,.16)';
    ctx.fillRect(x1,y1,x2-x1,y2-y1);
    ctx.strokeStyle='#8aad84'; ctx.lineWidth=1.4;
    ctx.strokeRect(x1,y1,x2-x1,y2-y1);
  }
  return {W,H};
}

// ============================================================================
//  Interfaccia
// ============================================================================
const CSS=`
#rg-ov{position:fixed;inset:0;z-index:4000;background:rgba(4,8,7,.86);
  backdrop-filter:blur(6px);display:none;align-items:center;justify-content:center;padding:18px}
#rg-ov.on{display:flex}
#rg-win{width:min(1080px,96vw);max-height:94vh;background:var(--surface,rgba(17,27,22,.96));
  border:1px solid var(--border,rgba(190,207,184,.14));border-radius:8px;
  display:flex;flex-direction:column;overflow:hidden;
  box-shadow:0 30px 90px rgba(0,0,0,.6)}
#rg-hd{display:flex;align-items:center;justify-content:space-between;gap:10px;
  padding:11px 15px;border-bottom:1px solid var(--border,rgba(190,207,184,.14))}
#rg-hd h3{margin:0;font-family:var(--sans,serif);font-size:14px;font-weight:600;
  letter-spacing:.6px;color:var(--accent,#8aad84)}
#rg-hd .sub{font-family:var(--mono,monospace);font-size:9px;letter-spacing:1px;
  color:var(--text-dim,#5a6d5e);text-transform:uppercase}
#rg-x{background:none;border:1px solid var(--border,rgba(190,207,184,.14));
  color:var(--text-dim,#5a6d5e);border-radius:4px;cursor:pointer;padding:3px 9px;font-size:13px}
#rg-x:hover{color:#e8ebe5;border-color:var(--accent,#8aad84)}
#rg-bd{padding:14px 15px;overflow-y:auto}
#rg-world{width:100%;display:block;border:1px solid var(--border,rgba(190,207,184,.14));
  border-radius:5px;cursor:crosshair;background:#070f0c}
#rg-map{width:100%;height:min(56vh,520px);display:block;border:1px solid var(--border,rgba(190,207,184,.14));
  border-radius:5px;background:#050b09}
.rg-row{display:flex;align-items:center;gap:9px;flex-wrap:wrap;margin-top:11px}
.rg-info{font-family:var(--mono,monospace);font-size:10px;letter-spacing:.4px;
  color:var(--text-dim,#5a6d5e);flex:1;min-width:200px;line-height:1.6}
.rg-btn{padding:8px 15px;background:rgba(138,173,132,.14);
  border:1px solid rgba(138,173,132,.42);border-radius:5px;color:var(--accent,#8aad84);
  font-family:var(--sans,serif);font-size:12.5px;font-weight:600;cursor:pointer}
.rg-btn:hover{background:rgba(138,173,132,.26);color:#e8ebe5}
.rg-btn[disabled]{opacity:.45;cursor:not-allowed}
.rg-btn.ghost{background:none;color:var(--text-dim,#5a6d5e)}
#rg-bar{height:3px;background:rgba(138,173,132,.14);border-radius:2px;overflow:hidden;
  margin-top:10px;display:none}
#rg-bar.on{display:block}
#rg-bar i{display:block;height:100%;width:0;background:var(--accent,#8aad84);
  transition:width .35s}
#rg-legend{display:flex;gap:14px;flex-wrap:wrap;margin-top:10px;
  font-family:var(--mono,monospace);font-size:9px;letter-spacing:.8px;color:var(--text-dim,#5a6d5e)}
#rg-legend b{font-weight:400}
#rg-list{margin-top:11px;max-height:190px;overflow-y:auto;
  border-top:1px solid var(--border,rgba(190,207,184,.14));padding-top:9px}
.rg-item{display:flex;gap:9px;align-items:baseline;padding:3px 0;
  font-family:var(--mono,monospace);font-size:10px;color:#9aaa97}
.rg-item .t{width:9px;flex:none}
.rg-item .n{color:#e8ebe5}
.rg-item .d{color:var(--text-dim,#5a6d5e);font-size:9px}
`;

function el(tag,attrs,html){
  const e=document.createElement(tag);
  if(attrs)Object.keys(attrs).forEach(k=>e.setAttribute(k,attrs[k]));
  if(html!=null)e.innerHTML=html;
  return e;
}

let ui=null, sel=null, lastResult=null;

function build(){
  if(ui)return ui;
  document.head.appendChild(el('style',null,CSS));
  const ov=el('div',{id:'rg-ov'});
  ov.innerHTML=
   '<div id="rg-win">'+
    '<div id="rg-hd"><div><h3>RILIEVO REGIONALE</h3>'+
      '<div class="sub">Seleziona un\'area · DEM da Open-Meteo · punti strategici</div></div>'+
      '<button id="rg-x">✕</button></div>'+
    '<div id="rg-bd">'+
      '<div id="rg-stage1">'+
        '<canvas id="rg-world"></canvas>'+
        '<div class="rg-row"><div class="rg-info" id="rg-sel">'+
          'Trascina sul planisfero per delimitare l\'area. Massimo '+MAX_SPAN_LNG+'° × '+MAX_SPAN_LAT+'°.'+
        '</div>'+
        '<button class="rg-btn ghost" id="rg-clear">Azzera</button>'+
        '<button class="rg-btn" id="rg-go" disabled>Scarica il rilievo</button></div>'+
        '<div id="rg-bar"><i></i></div>'+
      '</div>'+
      '<div id="rg-stage2" style="display:none">'+
        '<canvas id="rg-map"></canvas>'+
        '<div id="rg-legend">'+
          '<b style="color:#c9a24a">▲ Militare</b>'+
          '<b style="color:#7fb37a">◆ Economico</b>'+
          '<b style="color:#79a8b8">● Marittimo</b>'+
          '<b id="rg-stat"></b></div>'+
        '<div class="rg-row">'+
          '<div class="rg-info" id="rg-info2"></div>'+
          '<button class="rg-btn ghost" id="rg-back">Nuova area</button>'+
          '<button class="rg-btn" id="rg-png">Salva PNG</button></div>'+
        '<div id="rg-list"></div>'+
      '</div>'+
    '</div>'+
   '</div>';
  document.body.appendChild(ov);

  const world=ov.querySelector('#rg-world');
  const info=ov.querySelector('#rg-sel');
  const go=ov.querySelector('#rg-go');

  let drag=null;
  const toGeo=(ev)=>{
    const r=world.getBoundingClientRect();
    const x=clamp(ev.clientX-r.left,0,r.width), y=clamp(ev.clientY-r.top,0,r.height);
    return [ (x/r.width)*360-180, 90-(y/r.height)*180 ];
  };
  const update=()=>{
    drawWorld(world,sel);
    if(!sel){info.textContent='Trascina sul planisfero per delimitare l\'area. Massimo '
      +MAX_SPAN_LNG+'° × '+MAX_SPAN_LAT+'°.';go.disabled=true;return}
    const dLng=Math.abs(sel[1]-sel[0]),dLat=Math.abs(sel[3]-sel[2]);
    const bbox=normSel();
    if(dLng>MAX_SPAN_LNG||dLat>MAX_SPAN_LAT){
      info.innerHTML='<span style="color:#c27066">Area troppo grande: '+dLng.toFixed(1)+'° × '
        +dLat.toFixed(1)+'°. Il massimo e\' '+MAX_SPAN_LNG+'° × '+MAX_SPAN_LAT+'°, '+
        'oltre il quale la griglia diventerebbe troppo rada per un rilievo utile.</span>';
      go.disabled=true;return;
    }
    if(dLng<MIN_SPAN||dLat<MIN_SPAN){
      info.textContent='Area troppo piccola.';go.disabled=true;return;
    }
    const g=gridFor(bbox);
    const ch=Math.ceil(g.w*g.h/CHUNK);
    const secs=Math.round((Math.ceil(ch/BURST)-1)*PAUSE_MS/1000+ch*1.4);
    const np=pointsIn(bbox,collectPoints()).length;
    info.innerHTML='Area '+dLng.toFixed(1)+'° × '+dLat.toFixed(1)+'° · griglia '+g.w+'×'+g.h+
      ' ('+(g.w*g.h)+' punti, '+ch+' richieste)<br>Tempo stimato circa '+
      (secs<60?secs+' secondi':Math.round(secs/60)+' minuti')+
      ' · '+np+' punti strategici in quest\'area';
    go.disabled=false;
  };
  const normSel=()=>[Math.min(sel[0],sel[1]),Math.max(sel[0],sel[1]),
                     Math.min(sel[2],sel[3]),Math.max(sel[2],sel[3])];

  world.addEventListener('pointerdown',ev=>{
    const g=toGeo(ev);drag=g;sel=[g[0],g[0],g[1],g[1]];
    world.setPointerCapture(ev.pointerId);update();
  });
  world.addEventListener('pointermove',ev=>{
    if(!drag)return;
    const g=toGeo(ev);sel=[drag[0],g[0],drag[1],g[1]];update();
  });
  world.addEventListener('pointerup',()=>{drag=null;update()});
  ov.querySelector('#rg-clear').addEventListener('click',()=>{sel=null;update()});
  ov.querySelector('#rg-x').addEventListener('click',close);
  ov.addEventListener('click',e=>{if(e.target===ov)close()});
  ov.querySelector('#rg-back').addEventListener('click',()=>{
    ov.querySelector('#rg-stage2').style.display='none';
    ov.querySelector('#rg-stage1').style.display='';
    setTimeout(update,0);
  });
  ov.querySelector('#rg-png').addEventListener('click',()=>{
    const c=ov.querySelector('#rg-map');
    const a=document.createElement('a');
    a.download='geoint-region.png';
    a.href=c.toDataURL('image/png');
    a.click();
  });

  go.addEventListener('click',async()=>{
    const bbox=normSel(), g=gridFor(bbox);
    const bar=ov.querySelector('#rg-bar'), fill=bar.querySelector('i');
    bar.classList.add('on'); go.disabled=true;
    const t0=Date.now();
    const res=await fetchRegion(bbox,g,(p)=>{
      const pct=Math.round((p.have/p.total)*100);
      fill.style.width=pct+'%';
      if(p.phase==='wait'){
        const until=Date.now()+p.ms;
        const tick=()=>{
          const s=Math.max(0,Math.round((until-Date.now())/1000));
          info.innerHTML='<span style="color:#b89a4a">'+
            (p.reason==='429'?'Limite di Open-Meteo raggiunto':'Pausa fra le raffiche')+
            ' · ripresa fra '+s+'s</span> — '+p.have+'/'+p.total+' settori';
          if(s>0&&ov.classList.contains('on'))setTimeout(tick,1000);
        };
        tick();
      }else{
        info.textContent='Scaricamento… '+p.have+'/'+p.total+' settori';
      }
    });
    bar.classList.remove('on'); go.disabled=false;
    if(res.error&&!res.have.every(Boolean)){
      info.innerHTML='<span style="color:#c27066">Interrotto: '+
        (res.error.message||'errore')+'. I settori gia\' scaricati restano '+
        'in memoria, ripremi il pulsante per continuare.</span>';
      return;
    }
    const pts=pointsIn(bbox,collectPoints());
    lastResult={bbox,g,elev:res.elev,pts};
    ov.querySelector('#rg-stage1').style.display='none';
    ov.querySelector('#rg-stage2').style.display='';
    setTimeout(()=>{
      drawRegion(ov.querySelector('#rg-map'),bbox,g,res.elev,pts);
      const valid=res.elev.filter(v=>v!=null);
      const mx=Math.max.apply(null,valid),mn=Math.min.apply(null,valid);
      ov.querySelector('#rg-stat').textContent=
        'quote '+mn+'–'+mx+' m · griglia '+g.w+'×'+g.h;
      ov.querySelector('#rg-info2').textContent=
        (res.cached?'Dalla cache locale':'Scaricato in '+Math.round((Date.now()-t0)/1000)+'s')+
        ' · '+pts.length+' punti strategici';
      const list=ov.querySelector('#rg-list');
      const sym={mil:['▲','#c9a24a'],eco:['◆','#7fb37a'],sea:['●','#79a8b8']};
      list.innerHTML=pts.length?pts.map(p=>{
        const s=sym[p.kind]||sym.eco;
        return '<div class="rg-item"><span class="t" style="color:'+s[1]+'">'+s[0]+'</span>'+
          '<span class="n">'+p.name+'</span><span class="d">'+p.note+
          (p.foreign?' · dispiegamento estero':'')+'</span></div>';
      }).join(''):'<div class="rg-item"><span class="d">Nessun punto strategico censito in quest\'area.</span></div>';
    },30);
  });

  ui={ov,update};
  return ui;
}

function open(){
  const u=build();
  u.ov.classList.add('on');
  setTimeout(u.update,20);
}
function close(){ if(ui)ui.ov.classList.remove('on'); }

// ============================================================================
//  Aggancio alla barra in basso
// ============================================================================
function mount(){
  if(document.getElementById('btn-region'))return;
  const b=el('button',{id:'btn-region',class:'fs-btn',title:'Rilievo di una regione'},
             '◱ Region DEM');
  b.addEventListener('click',open);
  // accanto ai pulsanti gia' presenti; in mancanza, in fondo alla barra
  const host=document.querySelector('#bot .left')||document.querySelector('#bot')||document.body;
  const near=document.getElementById('btn-satellites')||
             document.getElementById('btn-sat')||
             document.getElementById('btn-sources');
  if(near&&near.parentNode===host)host.insertBefore(b,near.nextSibling);
  else host.appendChild(b);
  if(host===document.body){
    b.style.cssText='position:fixed;left:12px;bottom:52px;z-index:300;'+
      'padding:6px 13px;background:rgba(17,27,22,.9);border:1px solid rgba(190,207,184,.2);'+
      'border-radius:4px;color:#8aad84;font-size:11.5px;cursor:pointer';
  }
}

if(document.readyState==='loading')
  document.addEventListener('DOMContentLoaded',mount);
else mount();

window.GEOINT_REGION={
  open:open, close:close, mount:mount,
  points:collectPoints,
  last:()=>lastResult,
  // agganci di servizio, utili per verifiche dalla console
  _internal:{draw:drawRegion,grid:gridFor,inBox:pointsIn,coords:coordsFor},
  clearCache:function(){
    try{Object.keys(localStorage).filter(k=>k.indexOf(CACHE_KEY)===0)
      .forEach(k=>localStorage.removeItem(k))}catch(e){}
  }
};
})();
