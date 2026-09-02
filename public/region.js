// ============================================================================
// GEOINT — Region DEM
// ----------------------------------------------------------------------------
// Si sceglie una dimensione (10, 50 o 200 km di lato), si clicca un punto sul
// globo e si scarica il rilievo di quel quadrato da Open-Meteo. Il risultato
// e' una carta a curve di livello nello stesso stile di quella sotto Geography,
// con i punti strategici gia' presenti nel progetto sovrapposti:
//
//   COUNTRY_DB[*].bases[]       basi militari    (n, lat, lng, t, f)
//   COUNTRY_DB[*].extraction[]  siti estrattivi  (n, lat, lng, r)
//   TRADE_ROUTES[*].points[]    porti e stretti  (lat, lng, label)
//
// BANDA
// Sempre 6 richieste da 100 coordinate (griglia 25x24 = 600 punti), a raffiche
// di 3 con 30 secondi di pausa in mezzo: una sola pausa per area, circa 40
// secondi in tutto. Ogni settore viene salvato appena arriva, quindi una
// interruzione non fa perdere nulla e la stessa area richiesta due volte esce
// dalla cache all'istante.
//
// INSTALLAZIONE: una riga in index.html, dopo topo.js
//     <script src="region.js"></script>
// Il pulsante si inserisce da solo accanto a "Satellites".
// ============================================================================
(function(){
'use strict';

// --- Griglia: 25 x 24 = 600 punti = esattamente 6 richieste da 100 ---------
const GW=25, GH=24;
const N_POINTS=GW*GH;
const CHUNK=100;
const N_CHUNKS=Math.ceil(N_POINTS/CHUNK);      // 6

// --- Ritmo delle richieste --------------------------------------------------
const BURST=3;                 // richieste per raffica
const PAUSE_MS=30000;          // pausa dopo ogni raffica
const SPACING_MS=1200;
const MAX_PENALTY=8;
const COOLDOWN_KEY='gx_topo_cooldown';   // condivisi con topo.js: i due
const PENALTY_KEY='gx_topo_penalty';     // meccanismi si rispettano a vicenda
const CACHE_KEY='gx_region_v2_';

// --- Dimensioni selezionabili ----------------------------------------------
const SIZES=[
  {km:10,  label:'10 km',  desc:'dettaglio locale · celle da ~400 m'},
  {km:50,  label:'50 km',  desc:'area operativa · celle da ~2 km'},
  {km:200, label:'200 km', desc:'scala regionale · celle da ~8 km'}
];
const KM_PER_DEG=111.32;
const TARGET_LINES=14;
const UPSCALE=3;

const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

// ============================================================================
//  Coda a raffiche
// ============================================================================
const Q={queue:[],running:false,inBurst:0,last:0,total:0};

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
          setCooldown(w);Q.inBurst=0;
          if(waitCb)waitCb('429',w);
          await sleep(w);tries++;continue;
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
//  Geometria del quadrato
// ============================================================================
function squareBox(lat,lng,km){
  const half=km/2;
  const dLat=half/KM_PER_DEG;
  const dLng=half/(KM_PER_DEG*Math.max(0.02,Math.cos(lat*Math.PI/180)));
  return [lng-dLng, lng+dLng, clamp(lat-dLat,-89.9,89.9), clamp(lat+dLat,-89.9,89.9)];
}
function coordsFor(bbox){
  const lats=[],lngs=[];
  for(let j=0;j<GH;j++){
    const lat=bbox[2]+(bbox[3]-bbox[2])*(j/(GH-1));
    for(let i=0;i<GW;i++){
      const lng=bbox[0]+(bbox[1]-bbox[0])*(i/(GW-1));
      lats.push(clamp(lat,-90,90).toFixed(4));
      lngs.push(((lng+540)%360-180).toFixed(4));
    }
  }
  return {lats,lngs};
}
function cacheKey(bbox,km){
  return CACHE_KEY+km+'_'+bbox.map(v=>v.toFixed(4)).join('_');
}

async function fetchSquare(bbox,km,onProgress){
  const key=cacheKey(bbox,km);
  let elev=new Array(N_POINTS).fill(null), have=new Array(N_CHUNKS).fill(0);
  try{
    const c=JSON.parse(localStorage.getItem(key)||'null');
    if(c&&Array.isArray(c.elev)&&c.elev.length===N_POINTS){elev=c.elev;have=c.have}
  }catch(e){}
  if(have.every(Boolean))return {elev,have,cached:true};

  const c=coordsFor(bbox);
  waitCb=(reason,ms)=>onProgress({phase:'wait',reason,ms,
    have:have.filter(Boolean).length,total:N_CHUNKS});
  for(let k=0;k<N_CHUNKS;k++){
    if(have[k])continue;
    const s=k*CHUNK,e=Math.min(s+CHUNK,N_POINTS);
    onProgress({phase:'fetch',have:have.filter(Boolean).length,total:N_CHUNKS});
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
    try{localStorage.setItem(key,JSON.stringify({elev,have,bbox,km}))}catch(e){}
    onProgress({phase:'fetch',have:have.filter(Boolean).length,total:N_CHUNKS});
  }
  waitCb=null;
  return {elev,have};
}

// ============================================================================
//  Punti strategici gia' presenti nel progetto
// ============================================================================
function collectPoints(){
  const out=[];
  const db=window.COUNTRY_DB;
  if(db)Object.keys(db).forEach(cid=>{
    const c=db[cid];if(!c)return;
    (c.bases||[]).forEach(b=>{
      if(typeof b.lat==='number'&&typeof b.lng==='number')
        out.push({lat:b.lat,lng:b.lng,name:b.n,kind:'mil',
                  note:b.t||'Base militare',foreign:!!b.f,country:cid});
    });
    (c.extraction||[]).forEach(e=>{
      if(typeof e.lat==='number'&&typeof e.lng==='number')
        out.push({lat:e.lat,lng:e.lng,name:e.n,kind:'eco',
                  note:e.r||'Sito estrattivo',country:cid});
    });
  });
  const tr=window.TRADE_ROUTES;
  if(Array.isArray(tr))tr.forEach(r=>{
    const scan=pts=>(pts||[]).forEach(p=>{
      if(p&&p.label&&typeof p.lat==='number')
        out.push({lat:p.lat,lng:p.lng,name:p.label,kind:'sea',note:r.name||'Rotta commerciale'});
    });
    scan(r.points);
    (r.branches||[]).forEach(b=>scan(b.points||b));
  });
  const seen={},uniq=[];
  out.forEach(p=>{
    const k=p.kind+'|'+p.name+'|'+p.lat.toFixed(2)+'|'+p.lng.toFixed(2);
    if(!seen[k]){seen[k]=1;uniq.push(p)}
  });
  return uniq;
}
const KIND_LABEL={mil:'Base militare',eco:'Sito estrattivo',sea:'Nodo marittimo'};

/** Coordinate in gradi, primi e secondi: come si citano in ambito operativo. */
function dms(v,a,b){
  const h=v>=0?a:b, x=Math.abs(v);
  let d=Math.floor(x);
  let m=Math.floor((x-d)*60);
  let sec=Math.round((((x-d)*60-m)*60)*10)/10;
  // il riporto va fatto a mano: senza, 69.55 diventa 69° 32' 60.0"
  if(sec>=60){sec=0;m++}
  if(m>=60){m=0;d++}
  return d+'° '+String(m).padStart(2,'0')+"' "+sec.toFixed(1)+'" '+h;
}

/** Scheda di un sito: che cos'e', dove si trova, in che paese. */
function describe(p){
  const parts=[];
  parts.push(KIND_LABEL[p.kind]||'Sito');
  if(p.note)parts.push(p.note);
  if(p.foreign)parts.push('dispiegamento fuori dai confini nazionali');
  let country='';
  const db=window.COUNTRY_DB;
  if(p.country&&db&&db[p.country]){
    const c=db[p.country];
    country=((c.flag?c.flag+' ':'')+(c.name||''))||'';
  }
  return {kind:KIND_LABEL[p.kind]||'Sito', text:parts.slice(1).join(' · '),
          country:country,
          dec:p.lat.toFixed(5)+', '+p.lng.toFixed(5),
          dms:dms(p.lat,'N','S')+'  '+dms(p.lng,'E','W')};
}

function pointsIn(bbox,pts){
  return pts.filter(p=>{
    let lng=p.lng;
    while(lng<bbox[0]-180)lng+=360;
    while(lng>bbox[1]+180)lng-=360;
    return lng>=bbox[0]&&lng<=bbox[1]&&p.lat>=bbox[2]&&p.lat<=bbox[3];
  });
}

// ============================================================================
//  Isoipse
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
function pickLevels(values,n){
  const v=values.filter(x=>x!=null&&isFinite(x)).slice().sort((a,b)=>a-b);
  if(!v.length)return [];
  const lo=v[Math.floor(v.length*0.04)];
  const hi=v[Math.min(Math.floor(v.length*0.96),v.length-1)];
  if(hi-lo<2)return [];
  const out=[];
  for(let i=1;i<=n;i++)out.push(lo+(hi-lo)*(i/(n+1)));
  return out;
}
function polyPath(pts,tol){
  if(pts.length<2)return '';
  const t=tol||0.4;
  let d='M'+pts[0][0].toFixed(1)+' '+pts[0][1].toFixed(1),last=pts[0];
  for(let i=1;i<pts.length-1;i++){
    const p=pts[i];
    if(Math.abs(p[0]-last[0])<t&&Math.abs(p[1]-last[1])<t)continue;
    d+='L'+p[0].toFixed(1)+' '+p[1].toFixed(1);last=p;
  }
  const e=pts[pts.length-1];
  return d+'L'+e[0].toFixed(1)+' '+e[1].toFixed(1);
}

// ============================================================================
//  Carta SVG — stessa impaginazione della mappa sotto Geography.
//  Il quadrato e' quadrato anche a video, quindi viewBox quadrato: in
//  pieno schermo l'SVG scala senza deformarsi.
// ============================================================================
const VIEW=520;
const MARK={mil:{c:'#c9a24a',l:'Militare'},eco:{c:'#7fb37a',l:'Economico'},
            sea:{c:'#79a8b8',l:'Marittimo'}};

function buildSVG(bbox,km,elev,pts,centre){
  const V=VIEW;

  // I livelli si calcolano sulla TERRA: includendo il mare (quota 0) tutte le
  // isoipse si accalcherebbero sulla costa e l'interno resterebbe vuoto.
  const land=elev.filter(v=>v!=null&&v>0);
  const levels=pickLevels(land.length>=N_POINTS*0.12?land:elev,TARGET_LINES);
  const interval=levels.length>1?(levels[1]-levels[0]):0;
  const hasSea=elev.some(v=>v!=null&&v<=0)&&land.length>0;

  const up=upsample(elev.map(v=>v==null?0:v),GW,GH,UPSCALE);
  const stepX=V/(GW-1)/UPSCALE, stepY=V/(GH-1)/UPSCALE;
  const px=gx=>gx*stepX, py=gy=>V-gy*stepY;

  let out='<svg viewBox="0 0 '+V+' '+V+'" xmlns="http://www.w3.org/2000/svg" '+
    'preserveAspectRatio="xMidYMid meet" style="display:block;width:100%;height:100%">'+
    '<defs><linearGradient id="rgbg" x1="0" x2="0" y1="0" y2="1">'+
    '<stop offset="0%" stop-color="#0a1813"/><stop offset="100%" stop-color="#050b09"/>'+
    '</linearGradient></defs>'+
    '<rect width="'+V+'" height="'+V+'" fill="url(#rgbg)"/>';

  // --- specchio d'acqua: fasce orizzontali dove la quota non supera lo zero -
  if(hasSea){
    let d='';
    for(let j=0;j<up.H;j++){
      let st=-1;
      for(let i=0;i<=up.W;i++){
        const wet=(i<up.W)&&(up.g[j*up.W+i]<=0);
        if(wet&&st<0)st=i;
        if(!wet&&st>=0){
          const x=px(st), w=px(i)-px(st), y=py(j+0.5);
          d+='M'+x.toFixed(1)+' '+y.toFixed(1)+'h'+w.toFixed(1)+
             'v'+stepY.toFixed(1)+'h'+(-w).toFixed(1)+'Z';
          st=-1;
        }
      }
    }
    if(d)out+='<path d="'+d+'" fill="rgba(84,146,168,.11)"/>';
  }

  // --- reticolo di riferimento, un quarto di lato ---------------------------
  for(let i=1;i<4;i++){
    const q=(V*i/4).toFixed(1);
    out+='<line x1="'+q+'" y1="0" x2="'+q+'" y2="'+V+'" stroke="rgba(138,173,132,.06)" stroke-width="1"/>'+
      '<line x1="0" y1="'+q+'" x2="'+V+'" y2="'+q+'" stroke="rgba(138,173,132,.06)" stroke-width="1"/>';
  }

  // --- isoipse -------------------------------------------------------------
  if(levels.length){
    levels.forEach((lv,li)=>{
      const t=li/Math.max(levels.length-1,1);
      const idx=(li%5===4);                       // curva indice ogni cinque
      const op=(idx?0.52:0.24)+0.34*t;
      const w=(idx?1.15:0.6)+0.4*t;
      let d='';
      join(marching(up.g,up.W,up.H,lv)).forEach(line=>{
        if(line.length<3)return;
        d+=polyPath(line.map(pt=>[px(pt[0]),py(pt[1])]),0.4);
      });
      if(d)out+='<path d="'+d+'" fill="none" stroke="rgba(213,232,210,'+op.toFixed(2)+')" '+
        'stroke-width="'+w.toFixed(2)+'" stroke-linecap="round" stroke-linejoin="round"/>';
    });
  }else{
    out+='<text x="'+(V/2)+'" y="'+(V/2)+'" fill="#5a6d5e" font-family="monospace" '+
      'font-size="12" letter-spacing="1.4" text-anchor="middle">'+
      'RILIEVO ASSENTE · TERRENO PIANEGGIANTE</text>';
  }

  // --- linea di costa: la quota zero, in tono freddo e piu' marcata --------
  if(hasSea){
    let d='';
    join(marching(up.g,up.W,up.H,0.5)).forEach(line=>{
      if(line.length<3)return;
      d+=polyPath(line.map(pt=>[px(pt[0]),py(pt[1])]),0.35);
    });
    if(d)out+='<path d="'+d+'" fill="none" stroke="rgba(148,206,219,.92)" '+
      'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>';
  }

  // Il cartiglio va sotto i simboli: se andasse sopra, un sito che cade
  // nell'angolo verrebbe coperto e non si potrebbe nemmeno cliccare.
  const zones=[];
  out+=furniture(V,km,interval,centre,hasSea,zones);

  // --- punti strategici ----------------------------------------------------
  const sx=lng=>((lng-bbox[0])/(bbox[1]-bbox[0]))*V;
  const sy=lat=>V-((lat-bbox[2])/(bbox[3]-bbox[2]))*V;
  const placed=[];
  let labels=0;
  pts.forEach((p,i)=>{
    let L=p.lng;
    while(L<bbox[0]-180)L+=360;
    while(L>bbox[1]+180)L-=360;
    const X=sx(L),Y=sy(p.lat);
    if(X<-8||X>V+8||Y<-8||Y>V+8)return;
    p._x=X;p._y=Y;
    const st=MARK[p.kind]||MARK.eco;
    let shape;
    if(p.kind==='mil')
      shape='<path d="M'+X.toFixed(1)+' '+(Y-6).toFixed(1)+'L'+(X+5.5).toFixed(1)+' '+
        (Y+4).toFixed(1)+'L'+(X-5.5).toFixed(1)+' '+(Y+4).toFixed(1)+'Z"';
    else if(p.kind==='sea')
      shape='<circle cx="'+X.toFixed(1)+'" cy="'+Y.toFixed(1)+'" r="4.3"';
    else
      shape='<path d="M'+X.toFixed(1)+' '+(Y-5.4).toFixed(1)+'L'+(X+5.4).toFixed(1)+' '+
        Y.toFixed(1)+'L'+X.toFixed(1)+' '+(Y+5.4).toFixed(1)+'L'+(X-5.4).toFixed(1)+' '+Y.toFixed(1)+'Z"';
    // area di aggancio piu' larga del simbolo, per non dover mirare al pixel
    out+='<g class="rg-mk" data-rg="'+i+'" style="cursor:pointer">'+
      '<circle cx="'+X.toFixed(1)+'" cy="'+Y.toFixed(1)+'" r="11" fill="transparent"/>'+
      shape+' fill="'+st.c+'" stroke="rgba(5,11,9,.9)" stroke-width="1.8"/></g>';

    // etichette solo per i primi otto che non si accavallano: il resto lo
    // racconta la scheda al passaggio del cursore
    if(labels>=8)return;
    const tw=p.name.length*5.2+8;
    const lx=X+10, ly=Y+3.6;
    const clash=placed.some(b=>Math.abs(b[0]-lx)<tw&&Math.abs(b[1]-ly)<13);
    const onPlate=zones.some(z=>lx<z[0]+z[2]&&lx+tw>z[0]&&ly-10<z[1]+z[3]&&ly>z[1]);
    if(clash||onPlate||lx+tw>V-6)return;
    placed.push([lx,ly]);labels++;
    out+='<g class="rg-mk" data-rg="'+i+'" style="cursor:pointer">'+
      '<rect x="'+(lx-3).toFixed(1)+'" y="'+(ly-9).toFixed(1)+'" width="'+tw.toFixed(1)+
      '" height="12.5" rx="2" fill="rgba(5,11,9,.7)"/>'+
      '<text x="'+lx.toFixed(1)+'" y="'+ly.toFixed(1)+'" fill="'+st.c+
      '" font-family="ui-monospace,monospace" font-size="9.5">'+esc(p.name)+'</text></g>';
  });

  // --- crocino del punto cliccato -----------------------------------------
  const c=V/2;
  out+='<g stroke="rgba(232,235,229,.45)" stroke-width="1">'+
    '<line x1="'+(c-9)+'" y1="'+c+'" x2="'+(c-3)+'" y2="'+c+'"/>'+
    '<line x1="'+(c+3)+'" y1="'+c+'" x2="'+(c+9)+'" y2="'+c+'"/>'+
    '<line x1="'+c+'" y1="'+(c-9)+'" x2="'+c+'" y2="'+(c-3)+'"/>'+
    '<line x1="'+c+'" y1="'+(c+3)+'" x2="'+c+'" y2="'+(c+9)+'"/></g>';

  return out+'</svg>';
}

// ============================================================================
//  Cartiglio: scala, coordinate, nord, equidistanza.
//  Sta su una targa opaca perche' sopra le isoipse una riga sottile sparisce,
//  ed e' in tono ambrato per non confondersi con le curve, che sono bianche.
// ============================================================================
function furniture(V,km,interval,centre,hasSea,zones){
  zones=zones||[];
  const INK='#d8c48a', DIM='rgba(216,196,138,.65)';

  // La barra deve rappresentare una distanza TONDA, non una frazione
  // arbitraria del lato: si sceglie il valore piu' grande che stia entro un
  // terzo della carta, e la lunghezza in pixel discende da quello.
  const NICE=[0.1,0.25,0.5,1,2,2.5,5,10,20,25,50,100,200];
  let d=NICE[0];
  for(let i=0;i<NICE.length;i++)if(NICE[i]<=km*0.34)d=NICE[i];
  const barW=(d/km)*V;
  const seg=barW/4, x0=16, y0=V-18;
  const fmt=v=>v>=1?(Math.round(v*10)/10)+' km':Math.round(v*1000)+' m';

  zones.push([x0-9,y0-30,barW+92,40]);
  let g='<g font-family="ui-monospace,monospace">'+
    '<rect x="'+(x0-9)+'" y="'+(y0-30)+'" width="'+(barW+92).toFixed(1)+'" height="40" rx="3" '+
    'fill="rgba(6,12,10,.82)" stroke="rgba(216,196,138,.28)" stroke-width="1"/>';
  for(let i=0;i<4;i++){
    g+='<rect x="'+(x0+i*seg).toFixed(1)+'" y="'+(y0-9)+'" width="'+seg.toFixed(1)+
      '" height="5" fill="'+(i%2?'rgba(6,12,10,.9)':INK)+'" '+
      'stroke="'+INK+'" stroke-width="0.8"/>';
  }
  g+='<text x="'+x0+'" y="'+(y0-14)+'" fill="'+DIM+'" font-size="8">0</text>'+
     '<text x="'+(x0+barW/2).toFixed(1)+'" y="'+(y0-14)+'" fill="'+DIM+
       '" font-size="8" text-anchor="middle">'+fmt(d/2)+'</text>'+
     '<text x="'+(x0+barW).toFixed(1)+'" y="'+(y0-14)+'" fill="'+DIM+
       '" font-size="8" text-anchor="middle">'+fmt(d)+'</text>'+
     '<text x="'+(x0+barW+10).toFixed(1)+'" y="'+(y0-1)+'" fill="'+INK+'" font-size="8.5">'+
       (interval>0?'equid. '+Math.round(interval)+' m':'—')+'</text></g>';

  // rosa dei venti
  const nx=V-30, ny=V-30;
  zones.push([nx-16,ny-16,32,32]);
  g+='<g><circle cx="'+nx+'" cy="'+ny+'" r="15" fill="rgba(6,12,10,.82)" '+
    'stroke="rgba(216,196,138,.28)" stroke-width="1"/>'+
    '<path d="M'+nx+' '+(ny-10)+'L'+(nx+4.5)+' '+(ny+5)+'L'+nx+' '+(ny+1.5)+
    'L'+(nx-4.5)+' '+(ny+5)+'Z" fill="'+INK+'"/>'+
    '<text x="'+nx+'" y="'+(ny+13)+'" fill="'+DIM+
    '" font-family="ui-monospace,monospace" font-size="7.5" text-anchor="middle">N</text></g>';

  // coordinate del centro e lato del quadrato
  const cc=fmtLL(centre.lat,'N','S')+'   '+fmtLL(centre.lng,'E','W');
  zones.push([8,8,cc.length*5.3+14,17]);
  zones.push([V-96,8,88,hasSea?38:17]);
  g+='<g font-family="ui-monospace,monospace" font-size="8.5">'+
    '<rect x="8" y="8" width="'+(cc.length*5.3+14)+'" height="17" rx="3" '+
      'fill="rgba(6,12,10,.82)" stroke="rgba(216,196,138,.22)" stroke-width="1"/>'+
    '<text x="15" y="20" fill="'+INK+'">'+esc(cc)+'</text>'+
    '<rect x="'+(V-96)+'" y="8" width="88" height="17" rx="3" '+
      'fill="rgba(6,12,10,.82)" stroke="rgba(216,196,138,.22)" stroke-width="1"/>'+
    '<text x="'+(V-12)+'" y="20" fill="'+INK+'" text-anchor="end">'+km+' × '+km+' km</text>';
  if(hasSea){
    g+='<rect x="'+(V-96)+'" y="29" width="88" height="17" rx="3" '+
      'fill="rgba(6,12,10,.82)" stroke="rgba(148,206,219,.3)" stroke-width="1"/>'+
      '<line x1="'+(V-88)+'" y1="37.5" x2="'+(V-72)+'" y2="37.5" '+
      'stroke="rgba(148,206,219,.92)" stroke-width="1.7"/>'+
      '<text x="'+(V-12)+'" y="41" fill="rgba(148,206,219,.85)" text-anchor="end">costa</text>';
  }
  g+='</g>';
  return g;
}

function esc(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function fmtLL(v,a,b){
  return Math.abs(v).toFixed(4)+'°'+(v>=0?a:b);
}

// ============================================================================
//  Interfaccia
// ============================================================================
const CSS=`
body.rg-pick #gl{cursor:crosshair!important}
#rg-hint{position:fixed;left:50%;top:56px;transform:translateX(-50%);z-index:2500;
  padding:7px 15px;background:rgba(17,27,22,.94);border:1px solid rgba(138,173,132,.45);
  border-radius:5px;color:var(--accent,#8aad84);font-family:var(--sans,serif);
  font-size:12.5px;letter-spacing:.3px;display:none;pointer-events:none;
  box-shadow:0 8px 30px rgba(0,0,0,.5)}
#rg-hint.on{display:block}
#rg-hint b{color:#e8ebe5;font-weight:600}
#rg-panel{position:fixed;bottom:44px;left:10px;width:340px;
  max-height:calc(100vh - 120px);z-index:120;
  background:var(--surface,rgba(17,27,22,.92));border:1px solid var(--border,rgba(190,207,184,.14));
  border-radius:6px;backdrop-filter:blur(14px);display:none;flex-direction:column;overflow:hidden}
#rg-panel.on{display:flex}
#rg-panel.big{width:min(860px,94vw)}
#rg-panel:fullscreen{width:100vw;max-height:100vh;height:100vh;bottom:0;left:0;
  border-radius:0;background:#070f0c}
#rg-panel:fullscreen #rg-svg{max-height:none}
#rg-hd{display:flex;align-items:center;justify-content:space-between;gap:8px;
  padding:9px 12px;border-bottom:1px solid var(--border,rgba(190,207,184,.14));flex:none}
#rg-hd .ttl{font-family:var(--sans,serif);font-size:12.5px;font-weight:600;
  letter-spacing:.5px;color:var(--accent,#8aad84)}
#rg-hd .sub{font-family:var(--mono,monospace);font-size:8px;letter-spacing:1px;
  color:var(--text-dim,#5a6d5e);text-transform:uppercase;margin-top:2px}
.rg-ic{background:none;border:1px solid var(--border,rgba(190,207,184,.14));
  color:var(--text-dim,#5a6d5e);border-radius:4px;cursor:pointer;padding:3px 8px;
  font-size:12px;line-height:1.2}
.rg-ic:hover{color:#e8ebe5;border-color:var(--accent,#8aad84)}
#rg-bd{padding:11px 12px;overflow-y:auto;flex:1;min-height:0}
.rg-sizes{display:flex;gap:6px}
.rg-size{flex:1;padding:7px 4px;background:rgba(0,0,0,.2);
  border:1px solid var(--border,rgba(190,207,184,.14));border-radius:5px;
  color:var(--text,#9aaa97);font-family:var(--sans,serif);font-size:12.5px;
  font-weight:600;cursor:pointer;text-align:center}
.rg-size:hover{border-color:rgba(138,173,132,.5);color:#e8ebe5}
.rg-size.on{background:rgba(138,173,132,.18);border-color:rgba(138,173,132,.6);color:#e8ebe5}
.rg-note{font-family:var(--mono,monospace);font-size:9px;letter-spacing:.4px;
  color:var(--text-dim,#5a6d5e);line-height:1.65;margin-top:8px}
.rg-note b{color:var(--accent,#8aad84);font-weight:400}
#rg-svg{margin-top:10px;border:1px solid var(--border,rgba(190,207,184,.14));
  border-radius:5px;overflow:hidden;background:#0a1813;display:none;position:relative}
#rg-svg.on{display:block}
#rg-card{position:absolute;z-index:5;min-width:190px;max-width:280px;padding:8px 10px;
  background:rgba(8,15,12,.96);border:1px solid rgba(190,207,184,.28);border-radius:5px;
  box-shadow:0 10px 30px rgba(0,0,0,.55);pointer-events:none;display:none;
  font-family:var(--mono,monospace);font-size:9.5px;line-height:1.6;color:#9aaa97}
#rg-card.on{display:block}
#rg-card .h{display:flex;align-items:baseline;gap:6px;margin-bottom:3px}
#rg-card .nm{color:#e8ebe5;font-size:11px;font-weight:600;letter-spacing:.2px}
#rg-card .kd{font-size:8px;letter-spacing:1px;text-transform:uppercase}
#rg-card .co{color:#8aad84;font-size:9px;margin-bottom:4px}
#rg-card .tx{color:#9aaa97;margin-bottom:5px}
#rg-card .ll{color:#7f9480;font-size:9px;border-top:1px solid rgba(190,207,184,.14);
  padding-top:4px;margin-top:2px}
#rg-card .ll b{color:#cfe0cb;font-weight:400}
#rg-card .hint{color:#5a6d5e;font-size:8px;margin-top:3px}
.rg-mk:hover{filter:brightness(1.35)}
#rg-bar{height:3px;background:rgba(138,173,132,.14);border-radius:2px;
  overflow:hidden;margin-top:9px;display:none}
#rg-bar.on{display:block}
#rg-bar i{display:block;height:100%;width:0;background:var(--accent,#8aad84);transition:width .3s}
#rg-legend{display:none;gap:12px;flex-wrap:wrap;margin-top:8px;
  font-family:var(--mono,monospace);font-size:8.5px;letter-spacing:.8px;
  color:var(--text-dim,#5a6d5e)}
#rg-legend.on{display:flex}
#rg-list{margin-top:8px}
.rg-item{display:flex;gap:8px;align-items:baseline;padding:2px 0;
  font-family:var(--mono,monospace);font-size:9.5px;color:#9aaa97}
.rg-item .n{color:#e8ebe5}
.rg-item .d{color:var(--text-dim,#5a6d5e);font-size:8.5px}
@media(max-width:760px){
  #rg-panel{width:calc(100vw - 20px);bottom:48px}
  #rg-panel.big{width:calc(100vw - 20px)}
}
`;

let panel=null, hint=null, armed=null, lastRun=null, busy=false;

function el(tag,attrs,html){
  const e=document.createElement(tag);
  if(attrs)Object.keys(attrs).forEach(k=>e.setAttribute(k,attrs[k]));
  if(html!=null)e.innerHTML=html;
  return e;
}

function build(){
  if(panel)return;
  document.head.appendChild(el('style',null,CSS));

  hint=el('div',{id:'rg-hint'});
  document.body.appendChild(hint);

  panel=el('div',{id:'rg-panel'});
  panel.innerHTML=
   '<div id="rg-hd">'+
     '<div><div class="ttl">RILIEVO REGIONALE</div>'+
     '<div class="sub">DEM Open-Meteo · curve di livello</div></div>'+
     '<div style="display:flex;gap:5px">'+
       '<button class="rg-ic" id="rg-full" title="Schermo intero">⛶</button>'+
       '<button class="rg-ic" id="rg-save" title="Salva SVG">⤓</button>'+
       '<button class="rg-ic" id="rg-close" title="Chiudi">✕</button>'+
     '</div></div>'+
   '<div id="rg-bd">'+
     '<div class="rg-sizes">'+
       SIZES.map((s,i)=>'<button class="rg-size" data-i="'+i+'">'+s.label+'</button>').join('')+
     '</div>'+
     '<div class="rg-note" id="rg-note">Scegli il lato del quadrato, poi clicca un punto sul globo.</div>'+
     '<div id="rg-bar"><i></i></div>'+
     '<div id="rg-svg"></div>'+
     '<div id="rg-legend"></div>'+
     '<div id="rg-list"></div>'+
   '</div>';
  document.body.appendChild(panel);

  panel.querySelectorAll('.rg-size').forEach(b=>{
    b.addEventListener('click',()=>arm(+b.dataset.i));
  });
  panel.querySelector('#rg-close').addEventListener('click',closePanel);
  panel.querySelector('#rg-full').addEventListener('click',toggleFull);
  panel.querySelector('#rg-save').addEventListener('click',saveSVG);

  // Intercetta il clic PRIMA del gestore che seleziona il paese.
  // Nota: un listener in cattura sullo STESSO elemento non precederebbe quello
  // gia' registrato sul canvas (nella fase "at target" conta solo l'ordine di
  // registrazione). Si cattura quindi su document, che nella fase di discesa
  // viene percorso prima di arrivare al canvas.
  document.addEventListener('pointerdown',e=>{
    _down={x:e.clientX,y:e.clientY};
  },true);
  document.addEventListener('click',onGlobeClick,true);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')disarm()});
}

let _down={x:0,y:0};

function arm(i){
  build();
  if(typeof window.screenToLatLng!=='function'){
    // Il codice del globo gira dentro (async()=>{...})(), quindi le sue
    // funzioni non finiscono su window da sole: serve la riga di export in
    // index.html. Meglio dirlo che restare muti.
    panel.querySelector('#rg-note').innerHTML=
      '<b style="color:#c27066">Manca l\'aggancio al globo.</b><br>'+
      'In index.html, subito dopo la funzione screenToLatLng, aggiungi:<br>'+
      '<span style="color:#e8ebe5">window.screenToLatLng=screenToLatLng;</span><br>'+
      'Nel frattempo puoi usare la console: '+
      '<span style="color:#e8ebe5">GEOINT_REGION.at(lat, lng, 50)</span>';
    return;
  }
  armed=SIZES[i];
  document.body.classList.add('rg-pick');
  panel.querySelectorAll('.rg-size').forEach(b=>
    b.classList.toggle('on',+b.dataset.i===i));
  panel.querySelector('#rg-note').innerHTML=
    'Quadrato di <b>'+armed.km+' × '+armed.km+' km</b> — '+armed.desc+'.<br>'+
    'Clicca il centro sul globo. Esc per annullare.';
  hint.innerHTML='Clicca un punto sul globo — quadrato di <b>'+armed.km+' × '+armed.km+' km</b>';
  hint.classList.add('on');
}
function disarm(){
  armed=null;
  document.body.classList.remove('rg-pick');
  if(hint)hint.classList.remove('on');
  if(panel)panel.querySelectorAll('.rg-size').forEach(b=>b.classList.remove('on'));
}

function onGlobeClick(e){
  if(!armed||busy)return;
  const cv=document.getElementById('gl');
  if(!cv||e.target!==cv)return;          // solo i clic sul globo
  // se stavi ruotando il globo non e' una selezione
  if(Math.abs(e.clientX-_down.x)>5||Math.abs(e.clientY-_down.y)>5)return;
  const ll=window.screenToLatLng(e.clientX,e.clientY);
  if(!ll){
    hint.innerHTML='Fuori dal globo — clicca sulla superficie';
    return;
  }
  e.stopPropagation();      // niente selezione del paese sotto il cursore
  e.preventDefault();
  const km=armed.km;
  disarm();
  run(ll.lat,ll.lng,km);
}

async function run(lat,lng,km){
  build();
  panel.classList.add('on');
  busy=true;
  const bbox=squareBox(lat,lng,km);
  const note=panel.querySelector('#rg-note');
  const bar=panel.querySelector('#rg-bar'), fill=bar.querySelector('i');
  const host=panel.querySelector('#rg-svg');
  bar.classList.add('on');
  note.innerHTML='Quadrato di <b>'+km+' × '+km+' km</b> centrato su '+
    fmtLL(lat,'N','S')+' '+fmtLL(lng,'E','W')+'<br>6 richieste, raffiche di 3 con 30 s di pausa.';

  let timer=null;
  const res=await fetchSquare(bbox,km,(p)=>{
    fill.style.width=Math.round((p.have/p.total)*100)+'%';
    if(timer){clearInterval(timer);timer=null}
    if(p.phase==='wait'){
      const until=Date.now()+p.ms;
      const tick=()=>{
        const s=Math.max(0,Math.round((until-Date.now())/1000));
        note.innerHTML='<b style="color:#b89a4a">'+
          (p.reason==='429'?'Limite di Open-Meteo':'Pausa fra le raffiche')+
          ' · ripresa fra '+s+' s</b><br>'+p.have+'/'+p.total+' settori acquisiti.';
        if(s<=0&&timer){clearInterval(timer);timer=null}
      };
      tick(); timer=setInterval(tick,1000);
    }else{
      note.innerHTML='Acquisizione… <b>'+p.have+'/'+p.total+'</b> settori.';
    }
  });
  if(timer)clearInterval(timer);
  bar.classList.remove('on');
  busy=false;

  if(!res.have.every(Boolean)){
    note.innerHTML='<b style="color:#c27066">Interrotto a '+res.have.filter(Boolean).length+
      '/'+N_CHUNKS+' settori.</b><br>I dati scaricati restano salvati: riseleziona '+
      'lo stesso punto per riprendere da dove si era fermato.';
    return;
  }

  const pts=pointsIn(bbox,collectPoints());
  const svg=buildSVG(bbox,km,res.elev,pts,{lat,lng});
  host.innerHTML=svg+'<div id="rg-card"></div>';
  host.classList.add('on');
  panel.classList.add('big');
  lastRun={bbox,km,elev:res.elev,pts,svg,centre:{lat,lng}};
  attachCards(host,pts);

  const valid=res.elev.filter(v=>v!=null);
  const mn=Math.min.apply(null,valid), mx=Math.max.apply(null,valid);
  note.innerHTML='Quadrato di <b>'+km+' × '+km+' km</b> · centro '+
    fmtLL(lat,'N','S')+' '+fmtLL(lng,'E','W')+'<br>'+
    'quote da <b>'+mn+' m</b> a <b>'+mx+' m</b> · griglia '+GW+'×'+GH+
    ' · '+(res.cached?'dalla cache':'6 richieste');

  // legenda con i conteggi reali: le voci a zero non compaiono
  const cnt={mil:0,eco:0,sea:0};
  pts.forEach(p=>{cnt[p.kind]=(cnt[p.kind]||0)+1});
  const sym={mil:'▲',eco:'◆',sea:'●'};
  const leg=panel.querySelector('#rg-legend');
  const items=Object.keys(cnt).filter(k=>cnt[k]>0).map(k=>
    '<span style="color:'+MARK[k].c+'">'+sym[k]+' '+MARK[k].l+' <b style="color:#e8ebe5;font-weight:400">'+
    cnt[k]+'</b></span>');
  if(hasSeaIn(res.elev))
    items.push('<span style="color:rgba(148,206,219,.9)">— Linea di costa</span>');
  leg.innerHTML=items.length?items.join(''):
    '<span>Nessun sito censito in quest\'area</span>';
  leg.classList.add('on');

  panel.querySelector('#rg-list').innerHTML=pts.length?
    '<div class="rg-item" style="color:#5a6d5e;font-size:8.5px;letter-spacing:1px;'+
    'text-transform:uppercase;padding-bottom:3px">Siti nell\'area — passa sopra i simboli</div>'+
    pts.map((p,i)=>{
      const d=describe(p);
      return '<div class="rg-item" data-rgl="'+i+'" style="cursor:default">'+
        '<span style="color:'+MARK[p.kind].c+'">'+sym[p.kind]+'</span>'+
        '<span class="n">'+esc(p.name)+'</span>'+
        '<span class="d">'+esc(d.dec)+(d.text?' · '+esc(d.text):'')+'</span></div>';
    }).join(''):'';
}

function hasSeaIn(elev){
  let sea=false,land=false;
  for(let i=0;i<elev.length;i++){
    if(elev[i]==null)continue;
    if(elev[i]<=0)sea=true; else land=true;
    if(sea&&land)return true;
  }
  return false;
}

// ============================================================================
//  Schede al passaggio del cursore
//  I dati ci sono gia' tutti nel progetto: qui si tratta solo di mostrarli
//  bene. Nessuna chiamata esterna, nessuna attesa.
// ============================================================================
function attachCards(host,pts){
  const card=host.querySelector('#rg-card');
  if(!card)return;
  const show=(i,ev)=>{
    const p=pts[i];
    if(!p)return;
    const d=describe(p);
    card.innerHTML=
      '<div class="h"><span class="nm">'+esc(p.name)+'</span>'+
      '<span class="kd" style="color:'+MARK[p.kind].c+'">'+esc(d.kind)+'</span></div>'+
      (d.country?'<div class="co">'+d.country+'</div>':'')+
      (d.text?'<div class="tx">'+esc(d.text)+'</div>':'')+
      '<div class="ll"><b>'+esc(d.dms)+'</b><br>'+esc(d.dec)+'</div>'+
      '<div class="hint">clic per copiare le coordinate</div>';
    card.classList.add('on');
    place(ev);
  };
  const place=(ev)=>{
    const r=host.getBoundingClientRect();
    let x=ev.clientX-r.left+14, y=ev.clientY-r.top+12;
    const cw=card.offsetWidth||210, ch=card.offsetHeight||96;
    if(x+cw>r.width-6)x=ev.clientX-r.left-cw-14;
    if(y+ch>r.height-6)y=ev.clientY-r.top-ch-12;
    card.style.left=Math.max(4,x)+'px';
    card.style.top=Math.max(4,y)+'px';
  };
  const hit=(e)=>{
    const g=e.target.closest?e.target.closest('[data-rg]'):null;
    return g?+g.getAttribute('data-rg'):-1;
  };
  host.addEventListener('mousemove',e=>{
    const i=hit(e);
    if(i<0){card.classList.remove('on');return}
    if(card.dataset.i!==String(i)){card.dataset.i=String(i);show(i,e)}
    else place(e);
  });
  host.addEventListener('mouseleave',()=>{card.classList.remove('on');card.dataset.i=''});
  host.addEventListener('click',e=>{
    const i=hit(e);
    if(i<0)return;
    const p=pts[i];
    const txt=p.lat.toFixed(5)+', '+p.lng.toFixed(5);
    if(navigator.clipboard)navigator.clipboard.writeText(txt).then(()=>{
      const h=card.querySelector('.hint');
      if(h){h.textContent='coordinate copiate';h.style.color='#8aad84'}
    },()=>{});
  });
  // evidenzia il simbolo passando sulla riga dell'elenco
  const list=panel.querySelector('#rg-list');
  if(list)list.addEventListener('mousemove',e=>{
    const row=e.target.closest?e.target.closest('[data-rgl]'):null;
    host.querySelectorAll('.rg-mk').forEach(g=>g.style.filter='');
    if(!row)return;
    const i=row.getAttribute('data-rgl');
    host.querySelectorAll('[data-rg="'+i+'"]').forEach(g=>
      g.style.filter='brightness(1.6) drop-shadow(0 0 4px currentColor)');
  });
}

function toggleFull(){
  if(!panel)return;
  if(document.fullscreenElement===panel){
    if(document.exitFullscreen)document.exitFullscreen();
  }else if(panel.requestFullscreen){
    panel.requestFullscreen().catch(()=>panel.classList.toggle('big'));
  }else{
    panel.classList.toggle('big');
  }
}
function saveSVG(){
  if(!lastRun)return;
  const blob=new Blob([lastRun.svg],{type:'image/svg+xml'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='geoint-'+lastRun.km+'km-'+lastRun.centre.lat.toFixed(3)+'_'+
             lastRun.centre.lng.toFixed(3)+'.svg';
  a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),4000);
}
function closePanel(){
  disarm();
  if(panel)panel.classList.remove('on');
}
function openPanel(){
  build();
  panel.classList.add('on');
  if(!lastRun)arm(1);           // predefinito: 50 km
}

// ============================================================================
//  Pulsante nella barra in basso, accanto a Satellites
// ============================================================================
function mount(){
  if(document.getElementById('btn-region'))return;
  const b=el('button',{id:'btn-region',class:'fs-btn',
    title:'Rilievo di un quadrato scelto sul globo'},'◱ Region DEM');
  b.addEventListener('click',()=>{
    if(panel&&panel.classList.contains('on'))closePanel(); else openPanel();
  });
  const near=document.getElementById('btn-satellites');
  const host=document.querySelector('#bot .left')||document.querySelector('#bot');
  if(near&&near.parentNode)near.parentNode.insertBefore(b,near.nextSibling);
  else if(host)host.appendChild(b);
  else{
    document.body.appendChild(b);
    b.style.cssText='position:fixed;left:12px;bottom:52px;z-index:300;padding:6px 13px;'+
      'background:rgba(17,27,22,.9);border:1px solid rgba(190,207,184,.2);'+
      'border-radius:4px;color:#8aad84;font-size:11.5px;cursor:pointer';
  }
}

if(document.readyState==='loading')
  document.addEventListener('DOMContentLoaded',mount);
else mount();

window.GEOINT_REGION={
  open:openPanel, close:closePanel, pick:arm,
  at:function(lat,lng,km){run(lat,lng,km||50)},
  last:()=>lastRun,
  points:collectPoints,
  status:()=>({requests:Q.total,penalty:penalty(),cooldownMs:cooldownLeft()}),
  clearCache:function(){
    try{Object.keys(localStorage).filter(k=>k.indexOf(CACHE_KEY)===0)
      .forEach(k=>localStorage.removeItem(k))}catch(e){}
  },
  _internal:{box:squareBox,coords:coordsFor,svg:buildSVG,inBox:pointsIn,
             describe:describe,dms:dms}
};
})();
