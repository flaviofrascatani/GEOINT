#2F4F4F// ============================================================================
// GEOINT — Region DEM
// ----------------------------------------------------------------------------
// Si sceglie un lato (10, 20 o 50 km) e una definizione, si indica un punto —
// cliccandolo sul globo oppure digitando le coordinate — e si scarica il
// rilievo di quel quadrato da Open-Meteo. Il risultato e' una carta a curve di
// livello con i punti strategici gia' presenti nel progetto:
//
//   COUNTRY_DB[*].bases[]       basi militari    (n, lat, lng, t, f)
//   COUNTRY_DB[*].extraction[]  siti estrattivi  (n, lat, lng, r)
//   TRADE_ROUTES[*].points[]    porti e stretti  (lat, lng, label)
//
// DEFINIZIONE
//   Standard  25 x 24 =  600 punti =  6 richieste =  2 raffiche = ~40 secondi
//   Alta      69 x 69 = 4761 punti = 48 richieste = 16 raffiche = ~8 minuti
//
// La carta si costruisce a settori: appena una raffica e' completa, la parte
// gia' acquisita compare, il resto arriva dopo.
//
// ARCHIVIO
// Ogni carta scaricata resta in localStorage di QUESTO dispositivo. Non viene
// caricata da nessuna parte. Il pulsante ☰ elenca quelle salvate e le riapre
// senza consumare richieste.
//
// INSTALLAZIONE: una riga in index.html, dopo topo.js
//     <script src="region.js"></script>
// Il pulsante si inserisce da solo accanto a "Satellites".
// ============================================================================
(function(){
'use strict';

// --- Lato del quadrato ------------------------------------------------------
const SIZES=[
  {km:10, label:'10 km', desc:'dettaglio locale'},
  {km:20, label:'20 km', desc:'area operativa'},
  {km:50, label:'50 km', desc:'scala regionale'}
];

// --- Definizione ------------------------------------------------------------
// up = infittimento prima del calcolo delle isoipse. Alla griglia fitta non
// serve: i punti ci sono gia' e interpolare costerebbe soltanto tempo.
const QUAL=[
  {id:'std', label:'Standard', w:25, h:24, up:3},
  {id:'hi',  label:'Alta',     w:69, h:69, up:1}
];

const CHUNK=100;
const BURST=3;                 // richieste per raffica
const PAUSE_MS=30000;          // pausa dopo ogni raffica
const SPACING_MS=1200;
const MAX_PENALTY=8;
const COOLDOWN_KEY='gx_topo_cooldown';   // condivisi con topo.js: i due
const PENALTY_KEY='gx_topo_penalty';     // meccanismi si rispettano a vicenda
const CACHE_KEY='gx_region_v3_';
const INDEX_KEY='gx_region_index_v3';

const KM_PER_DEG=111.32;
const TARGET_LINES=14;
const VIEW=520;
// Palette GEOINT (dalle variabili CSS del sito)
const GEO={accent:'#8aad84', green:'#6b9e6f', gold:'#b89a4a', red:'#c27066',
           white:'#d5d8d2', bright:'#e8ebe5', dim:'#5a6d5e',
           // Colore del confine terra-mare. Cambia solo questo per ritoccarlo.
           coast:'#2F4F4F'};
const FONT="'EB Garamond',Garamond,Georgia,serif";
const MARK={mil:{c:'#b89a4a',l:'Military'},eco:{c:'#7fb37a',l:'Economic'},
            sea:{c:'#6f9fbf',l:'Maritime'},evt:{c:'#c27066',l:'Events'}};
const KIND_LABEL={mil:'Military base',eco:'Extraction site',
                  sea:'Maritime node',evt:'Reported event'};

const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const chunksOf=q=>Math.ceil(q.w*q.h/CHUNK);

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
function coordsFor(bbox,q){
  const lats=[],lngs=[];
  for(let j=0;j<q.h;j++){
    const lat=bbox[2]+(bbox[3]-bbox[2])*(j/(q.h-1));
    for(let i=0;i<q.w;i++){
      const lng=bbox[0]+(bbox[1]-bbox[0])*(i/(q.w-1));
      lats.push(clamp(lat,-90,90).toFixed(4));
      lngs.push(((lng+540)%360-180).toFixed(4));
    }
  }
  return {lats,lngs};
}
function cacheKey(bbox,km,q){
  return CACHE_KEY+km+'_'+q.id+'_'+bbox.map(v=>v.toFixed(4)).join('_');
}

/** Righe complete contigue partendo da sud (riga 0 = bordo inferiore). */
function readyRows(have,q){
  let first=q.w*q.h;
  for(let c=0;c<have.length;c++)if(!have[c]){first=c*CHUNK;break}
  return Math.floor(first/q.w);
}

async function fetchSquare(bbox,km,q,onProgress){
  const key=cacheKey(bbox,km,q);
  const N=q.w*q.h, NC=chunksOf(q);
  let elev=new Array(N).fill(null), have=new Array(NC).fill(0);
  try{
    const c=JSON.parse(localStorage.getItem(key)||'null');
    if(c&&Array.isArray(c.elev)&&c.elev.length===N&&Array.isArray(c.have)&&c.have.length===NC){
      elev=c.elev;have=c.have;
    }
  }catch(e){}
  if(have.every(Boolean))return {elev,have,cached:true};

  const c=coordsFor(bbox,q);
  waitCb=(reason,ms)=>onProgress({phase:'wait',reason,ms,
    have:have.filter(Boolean).length,total:NC,elev,haveArr:have});
  for(let k=0;k<NC;k++){
    if(have[k])continue;
    const s=k*CHUNK,e=Math.min(s+CHUNK,N);
    onProgress({phase:'fetch',have:have.filter(Boolean).length,total:NC,
                elev,haveArr:have});
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
    try{localStorage.setItem(key,JSON.stringify({elev,have,bbox,km,q:q.id}))}catch(e){}
    // A raffica completata la parte acquisita viene disegnata subito: non ha
    // senso far aspettare otto minuti davanti a un riquadro vuoto.
    const burstDone=((k+1)%BURST===0)||k===NC-1;
    onProgress({phase:burstDone?'sector':'fetch',have:have.filter(Boolean).length,
                total:NC,elev,haveArr:have});
  }
  waitCb=null;
  return {elev,have};
}

// ============================================================================
//  Archivio locale
// ============================================================================
function readIndex(){
  try{const a=JSON.parse(localStorage.getItem(INDEX_KEY)||'[]');
    return Array.isArray(a)?a:[]}catch(e){return []}
}
function writeIndex(a){
  try{localStorage.setItem(INDEX_KEY,JSON.stringify(a))}catch(e){}
}
function labelFor(lat,lng,pts){
  let best=null,bd=1e9;
  (pts||[]).forEach(p=>{
    const d=Math.hypot(p.lat-lat,(p.lng-lng)*Math.cos(lat*Math.PI/180));
    if(d<bd){bd=d;best=p}
  });
  return best?best.name:(fmtLL(lat,'N','S')+' '+fmtLL(lng,'E','W'));
}
function recordRun(e){
  const a=readIndex().filter(x=>x.k!==e.k);
  a.unshift(e);
  writeIndex(a.slice(0,60));
}
function forgetRun(k){
  writeIndex(readIndex().filter(e=>e.k!==k));
  try{localStorage.removeItem(k)}catch(e){}
}
function archiveBytes(){
  let n=0;
  try{Object.keys(localStorage).forEach(k=>{
    if(k.indexOf(CACHE_KEY)===0||k===INDEX_KEY)n+=(localStorage.getItem(k)||'').length;
  })}catch(e){}
  return n;
}
function whenTxt(ts){
  const d=Math.floor((Date.now()-ts)/86400000);
  if(d===0)return 'today';
  if(d===1)return 'yesterday';
  if(d<30)return d+' days ago';
  return new Date(ts).toLocaleDateString();
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
        out.push({lat:p.lat,lng:p.lng,name:p.label,kind:'sea',
                  note:r.name||'Rotta commerciale'});
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
// ----------------------------------------------------------------------------
//  Eventi geolocalizzati: 200 voci in events.json, con titolo, descrizione,
//  gravita' e fonte. Il file e' gia' nel sito, si legge una volta per sessione.
// ----------------------------------------------------------------------------
let _evP=null;
function loadEvents(){
  if(_evP)return _evP;
  const inline=window.events;
  if(Array.isArray(inline)&&inline.length){
    _evP=Promise.resolve(inline);
  }else{
    _evP=fetch('events.json').then(r=>r.ok?r.json():null).catch(()=>null)
      .then(d=>(d&&Array.isArray(d.events))?d.events:(Array.isArray(d)?d:[]));
  }
  return _evP;
}
function eventPoints(list){
  return (list||[]).filter(e=>e&&typeof e.lat==='number'&&typeof e.lng==='number')
    .map(e=>({lat:e.lat,lng:e.lng,name:e.title||e.location||'Event',kind:'evt',
              note:e.location||'',desc:e.description||'',
              severity:e.severity,src:e.source,url:e.url,ts:e.ts}));
}
/** Tutti i punti: siti fissi del progetto piu' gli eventi. */
function allPoints(){
  const fixed=collectPoints();
  return loadEvents().then(ev=>fixed.concat(eventPoints(ev)),()=>fixed);
}

function pointsIn(bbox,pts){
  return pts.filter(p=>{
    let lng=p.lng;
    while(lng<bbox[0]-180)lng+=360;
    while(lng>bbox[1]+180)lng-=360;
    return lng>=bbox[0]&&lng<=bbox[1]&&p.lat>=bbox[2]&&p.lat<=bbox[3];
  });
}
function dms(v,a,b){
  const h=v>=0?a:b, x=Math.abs(v);
  let d=Math.floor(x), m=Math.floor((x-d)*60);
  let sec=Math.round((((x-d)*60-m)*60)*10)/10;
  if(sec>=60){sec=0;m++}
  if(m>=60){m=0;d++}
  return d+'° '+String(m).padStart(2,'0')+"' "+sec.toFixed(1)+'" '+h;
}
function describe(p){
  const parts=[];
  if(p.note)parts.push(p.note);
  if(p.foreign)parts.push('deployed outside national borders');
  if(p.kind==='evt'){
    if(p.severity)parts.push('severity '+p.severity+'/5');
    if(p.src)parts.push(p.src);
  }
  let country='';
  const db=window.COUNTRY_DB;
  if(p.country&&db&&db[p.country]){
    const c=db[p.country];
    country=((c.flag?c.flag+' ':'')+(c.name||''))||'';
  }
  return {kind:KIND_LABEL[p.kind]||'Site', text:parts.join(' · '), country:country,
          detail:p.desc||'',
          dec:p.lat.toFixed(5)+', '+p.lng.toFixed(5),
          dms:dms(p.lat,'N','S')+'  '+dms(p.lng,'E','W')};
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
//  Linea di costa dai contorni veri
//  Il DEM a 50 km ha celle da 2 km: ricavarne la costa produce poligoni
//  squadrati. I contorni che il sito ha gia' in memoria sono molto piu' fini
//  e non costano nulla. Si tracciano soltanto: il mare NON viene campito,
//  perche' una campitura su geometrie semplificate lascia riquadri storti.
// ============================================================================
// Il livello `land` dell'atlante e' il vero confine terra-mare. I contorni in
// window.countryPolys comprendono anche i confini terrestri: usandoli, il
// bordo fra Svizzera e Italia verrebbe tracciato come se fosse una costa.
// Il file e' lo stesso che index.html ha gia' scaricato dal CDN, quindi la
// richiesta esce dalla cache del browser.
let _landP=null;
function loadLandRings(){
  if(_landP)return _landP;
  const A='https://cdn.jsdelivr.net/npm/world-atlas@2/countries-10m.json';
  const B='https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';
  _landP=fetch(A).then(r=>r.ok?r.json():Promise.reject(new Error('x')))
    .catch(()=>fetch(B).then(r=>r.json()))
    .then(decodeLand).catch(()=>null);
  return _landP;
}
function decodeLand(tp){
  const o=tp&&tp.objects&&tp.objects.land;
  if(!o||!tp.transform)return null;
  const sc=tp.transform.scale, tr=tp.transform.translate;
  const arcs=tp.arcs.map(a=>{
    let x=0,y=0;
    return a.map(pt=>{x+=pt[0];y+=pt[1];return [x*sc[0]+tr[0], y*sc[1]+tr[1]]});
  });
  const rv=i=>i<0?arcs[~i].slice().reverse():arcs[i];
  const rn=ids=>{
    let c=[];
    ids.forEach(i=>{let a=rv(i); if(c.length)a=a.slice(1); c=c.concat(a)});
    return c;
  };
  const geoms=(o.type==='GeometryCollection')?o.geometries:[o];
  const rings=[];
  geoms.forEach(g=>{
    if(g.type==='Polygon')g.arcs.forEach(r=>rings.push(rn(r)));
    else if(g.type==='MultiPolygon')g.arcs.forEach(pl=>pl.forEach(r=>rings.push(rn(r))));
  });
  return rings.length?rings:null;
}

let _landRings=null;      // riempito da loadLandRings prima del disegno

function landPaths(bbox,V){
  // se il livello land non e' disponibile si ripiega sui contorni dei paesi
  const src=(_landRings&&_landRings.length)?_landRings:null;
  const cp=src?null:window.countryPolys;
  if(!src&&!cp)return null;
  const dLng=bbox[1]-bbox[0], dLat=bbox[3]-bbox[2];
  if(!(dLng>0)||!(dLat>0))return null;
  const sx=lng=>((lng-bbox[0])/dLng)*V, sy=lat=>V-((lat-bbox[2])/dLat)*V;
  const tolX=dLng/V*0.7, tolY=dLat/V*0.7;
  const minX=dLng/V*3, minY=dLat/V*3;      // isolotti sotto i 3 px: si saltano
  const padL=dLng*0.6, padA=dLat*0.6;
  const out=[];
  const rings=src||[];
  if(!src){for(const id in cp){const polys=cp[id];if(!polys)continue;
    for(let q=0;q<polys.length;q++)if(polys[q]&&polys[q][0])rings.push(polys[q][0])}}
  {
    for(let q=0;q<rings.length;q++){
      const ring=rings[q];
      if(!ring||ring.length<4)continue;
      let prev=null,mnx=Infinity,mxx=-Infinity,mny=Infinity,mxy=-Infinity;
      const un=new Array(ring.length);
      for(let i=0;i<ring.length;i++){
        let lng=ring[i][0];
        if(prev!==null){
          while(lng-prev>180)lng-=360;
          while(lng-prev<-180)lng+=360;
        }
        prev=lng;
        const la=ring[i][1];
        un[i]=[lng,la];
        if(lng<mnx)mnx=lng; if(lng>mxx)mxx=lng;
        if(la<mny)mny=la;   if(la>mxy)mxy=la;
      }
      const mid=(mnx+mxx)/2;
      const k=Math.round((((bbox[0]+bbox[1])/2)-mid)/360);
      if(k){for(let i=0;i<un.length;i++)un[i][0]+=k*360; mnx+=k*360; mxx+=k*360}
      if(mxx<bbox[0]-padL||mnx>bbox[1]+padL||mxy<bbox[2]-padA||mny>bbox[3]+padA)continue;
      // un'isola piu' piccola di pochi pixel, dopo la semplificazione,
      // diventerebbe un quadratino: meglio non disegnarla affatto
      if((mxx-mnx)<minX&&(mxy-mny)<minY)continue;
      let d='',last=null,n=0;
      for(let i=0;i<un.length;i++){
        const pt=un[i];
        if(last&&Math.abs(pt[0]-last[0])<tolX&&Math.abs(pt[1]-last[1])<tolY&&i<un.length-1)continue;
        d+=(n?'L':'M')+sx(pt[0]).toFixed(1)+' '+sy(pt[1]).toFixed(1);
        last=pt;n++;
      }
      if(n>=4)out.push(d+'Z');
    }
  }
  return out.length?out:null;
}

// ============================================================================
//  Carta SVG
// ============================================================================
function buildSVG(bbox,km,elev,pts,centre,q,rows,lps){
  const V=VIEW;
  rows=(rows==null)?q.h:rows;
  const full=rows>=q.h;

  const seen=elev.slice(0,rows*q.w);
  const land=seen.filter(v=>v!=null&&v>0);
  // Bastano una quindicina di punti di terra: con una soglia percentuale, in
  // uno stretto la terra restava sotto e i livelli finivano calcolati su una
  // griglia di zeri, da cui il falso "rilievo assente".
  const levels=pickLevels(land.length>=15?land:seen,TARGET_LINES);
  const hasSea=seen.some(v=>v!=null&&v<=0)&&land.length>0;

  let out='<svg viewBox="0 0 '+V+' '+V+'" xmlns="http://www.w3.org/2000/svg" '+
    'preserveAspectRatio="xMidYMid meet" style="display:block;width:100%;height:100%">'+
    '<defs><linearGradient id="rgbg" x1="0" x2="0" y1="0" y2="1">'+
    '<stop offset="0%" stop-color="#0a1813"/><stop offset="100%" stop-color="#050b09"/>'+
    '</linearGradient>'+
    '<linearGradient id="rgTop" x1="0" x2="0" y1="0" y2="1">'+
    '<stop offset="0%" stop-color="rgba(5,10,8,.78)"/>'+
    '<stop offset="100%" stop-color="rgba(5,10,8,0)"/></linearGradient>'+
    '<linearGradient id="rgBot" x1="0" x2="0" y1="0" y2="1">'+
    '<stop offset="0%" stop-color="rgba(5,10,8,0)"/>'+
    '<stop offset="100%" stop-color="rgba(5,10,8,.82)"/></linearGradient>'+
    '<pattern id="rghatch" width="7" height="7" patternTransform="rotate(45)" '+
    'patternUnits="userSpaceOnUse">'+
    '<line x1="0" y1="0" x2="0" y2="7" stroke="rgba(138,173,132,.11)" stroke-width="1"/>'+
    '</pattern>'+
    (lps?'<clipPath id="rgland">'+lps.map(d=>'<path d="'+d+'"/>').join('')+'</clipPath>':'')+
    '</defs>'+
    '<rect width="'+V+'" height="'+V+'" fill="url(#rgbg)"/>';

  for(let i=1;i<4;i++){
    const g=(V*i/4).toFixed(1);
    out+='<line x1="'+g+'" y1="0" x2="'+g+'" y2="'+V+'" stroke="rgba(138,173,132,.06)" stroke-width="1"/>'+
      '<line x1="0" y1="'+g+'" x2="'+V+'" y2="'+g+'" stroke="rgba(138,173,132,.06)" stroke-width="1"/>';
  }

  const stepX=V/(q.w-1)/q.up, stepY=V/(q.h-1)/q.up;
  const px=gx=>gx*stepX, py=gy=>V-gy*stepY;

  if(levels.length&&rows>=2){
    const up=upsample(seen.map(v=>v==null?0:v),q.w,rows,q.up);
    if(lps)out+='<g clip-path="url(#rgland)">';
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
    if(lps)out+='</g>';
  }else if(full){
    const msg=(land.length===0)?'OPEN WATER · NO LAND IN FRAME'
                               :'NO RELIEF · FLAT TERRAIN';
    out+='<text x="'+(V/2)+'" y="'+(V/2)+'" fill="#5a6d5e" font-family="'+FONT+'" '+
      'font-size="14" letter-spacing="1.6" text-anchor="middle">'+msg+'</text>';
  }

  // linea di costa: solo tracciata, nessuna campitura
  if(lps)lps.forEach(d=>{
    out+='<path d="'+d+'" fill="none" stroke="'+GEO.coast+'" '+
      'stroke-width="1.35" stroke-linejoin="round" opacity=".92"/>';
  });

  // settori non ancora acquisiti (la griglia parte da sud)
  if(!full){
    const covered=rows>0?((rows-1)/(q.h-1))*V:0;
    const bandH=V-covered;
    out+='<rect x="0" y="0" width="'+V+'" height="'+bandH.toFixed(1)+'" fill="url(#rghatch)"/>'+
      '<line x1="0" y1="'+bandH.toFixed(1)+'" x2="'+V+'" y2="'+bandH.toFixed(1)+
      '" stroke="rgba(138,173,132,.4)" stroke-width="1" stroke-dasharray="5 4"/>';
  }

  const zones=[];
  out+=furniture(V,km,centre,hasSea,zones);

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
    const st=MARK[p.kind]||MARK.eco;
    let shape;
    if(p.kind==='mil')
      shape='<path d="M'+X.toFixed(1)+' '+(Y-6).toFixed(1)+'L'+(X+5.5).toFixed(1)+' '+
        (Y+4).toFixed(1)+'L'+(X-5.5).toFixed(1)+' '+(Y+4).toFixed(1)+'Z"';
    else if(p.kind==='sea')
      shape='<circle cx="'+X.toFixed(1)+'" cy="'+Y.toFixed(1)+'" r="4.3"';
    else if(p.kind==='evt')
      shape='<rect x="'+(X-4.4).toFixed(1)+'" y="'+(Y-4.4).toFixed(1)+'" width="8.8" height="8.8" rx="1"';
    else
      shape='<path d="M'+X.toFixed(1)+' '+(Y-5.4).toFixed(1)+'L'+(X+5.4).toFixed(1)+' '+
        Y.toFixed(1)+'L'+X.toFixed(1)+' '+(Y+5.4).toFixed(1)+'L'+(X-5.4).toFixed(1)+' '+Y.toFixed(1)+'Z"';
    out+='<g class="rg-mk" data-rg="'+i+'" style="cursor:pointer">'+
      '<circle cx="'+X.toFixed(1)+'" cy="'+Y.toFixed(1)+'" r="11" fill="transparent"/>'+
      shape+' fill="'+st.c+'" stroke="rgba(5,11,9,.9)" stroke-width="1.8"/></g>';
    if(labels>=8)return;
    const tw=p.name.length*5.6+10;
    const lx=X+10, ly=Y+3.6;
    const clash=placed.some(b=>Math.abs(b[0]-lx)<tw&&Math.abs(b[1]-ly)<13);
    const onPlate=zones.some(z=>lx<z[0]+z[2]&&lx+tw>z[0]&&ly-10<z[1]+z[3]&&ly>z[1]);
    if(clash||onPlate||lx+tw>V-6)return;
    placed.push([lx,ly]);labels++;
    out+='<g class="rg-mk" data-rg="'+i+'" style="cursor:pointer">'+
      '<rect x="'+(lx-4).toFixed(1)+'" y="'+(ly-10).toFixed(1)+'" width="'+tw.toFixed(1)+
      '" height="14" rx="3" fill="rgba(5,10,8,.55)"/>'+
      '<text x="'+lx.toFixed(1)+'" y="'+ly.toFixed(1)+'" fill="'+st.c+
      '" font-family="'+FONT+'" font-size="11">'+esc(p.name)+'</text></g>';
  });

  const c=V/2;
  out+='<g stroke="rgba(232,235,229,.45)" stroke-width="1">'+
    '<line x1="'+(c-9)+'" y1="'+c+'" x2="'+(c-3)+'" y2="'+c+'"/>'+
    '<line x1="'+(c+3)+'" y1="'+c+'" x2="'+(c+9)+'" y2="'+c+'"/>'+
    '<line x1="'+c+'" y1="'+(c-9)+'" x2="'+c+'" y2="'+(c-3)+'"/>'+
    '<line x1="'+c+'" y1="'+(c+3)+'" x2="'+c+'" y2="'+(c+9)+'"/></g>';

  return out+'</svg>';
}

// ============================================================================
//  Cartiglio: coordinate a sinistra, lato a destra, legenda sotto, scala in
//  basso, rosa dei venti in basso a destra.
// ============================================================================
function furniture(V,km,centre,hasSea,zones){
  zones=zones||[];
  const INK=GEO.accent, DIM='rgba(138,173,132,.55)';

  // Niente targhe squadrate: due velature morbide, in alto e in basso,
  // tengono leggibile il testo sopra le isoipse senza tagliare la carta.
  let g='<rect x="0" y="0" width="'+V+'" height="54" fill="url(#rgTop)"/>'+
        '<rect x="0" y="'+(V-72)+'" width="'+V+'" height="72" fill="url(#rgBot)"/>';

  // filetto interno e reperi d'angolo, come sui fogli di carta stampata
  const m=11, t=13;
  g+='<rect x="'+m+'" y="'+m+'" width="'+(V-2*m)+'" height="'+(V-2*m)+
     '" fill="none" stroke="rgba(138,173,132,.16)" stroke-width="1"/>';
  [[m,m,1,1],[V-m,m,-1,1],[m,V-m,1,-1],[V-m,V-m,-1,-1]].forEach(c=>{
    g+='<path d="M'+(c[0]+c[2]*t)+' '+c[1]+'L'+c[0]+' '+c[1]+'L'+c[0]+' '+(c[1]+c[3]*t)+
       '" fill="none" stroke="rgba(138,173,132,.5)" stroke-width="1.4"/>';
  });

  // coordinate in alto a sinistra, lato in alto a destra
  const cc=fmtLL(centre.lat,'N','S')+'   '+fmtLL(centre.lng,'E','W');
  zones.push([m,m,cc.length*6.4+14,26]);
  zones.push([V-150,m,150-m,hasSea?42:26]);
  g+='<g font-family="'+FONT+'">'+
    '<text x="'+(m+9)+'" y="'+(m+19)+'" fill="'+INK+'" font-size="12.5" '+
      'letter-spacing=".4">'+esc(cc)+'</text>'+
    '<text x="'+(V-m-9)+'" y="'+(m+19)+'" fill="'+INK+'" font-size="12.5" '+
      'letter-spacing="1.1" text-anchor="end">'+km+' × '+km+' KM</text>';
  if(hasSea){
    const lw=54;                       // spazio riservato alla parola
    g+='<line x1="'+(V-m-9-lw-26)+'" y1="'+(m+34)+'" x2="'+(V-m-9-lw-6)+'" y2="'+(m+34)+
       '" stroke="'+GEO.coast+'" stroke-width="1.7"/>'+
       '<text x="'+(V-m-9)+'" y="'+(m+38)+'" fill="'+DIM+'" font-size="11" '+
       'letter-spacing=".5" text-anchor="end">coastline</text>';
  }

  // scala: una linea con i suoi riferimenti, senza segmenti alternati
  const NICE=[0.1,0.25,0.5,1,2,2.5,5,10,20,25,50,100,200];
  let d=NICE[0];
  for(let i=0;i<NICE.length;i++)if(NICE[i]<=km*0.30)d=NICE[i];
  const barW=(d/km)*V, x0=m+10, y=V-m-16;
  const fmt=v=>v>=1?(Math.round(v*10)/10)+' km':Math.round(v*1000)+' m';
  zones.push([m,V-m-40,barW+40,40]);
  g+='<line x1="'+x0+'" y1="'+y+'" x2="'+(x0+barW).toFixed(1)+'" y2="'+y+
     '" stroke="'+INK+'" stroke-width="1.3"/>';
  [0,0.5,1].forEach(f=>{
    const x=x0+barW*f;
    g+='<line x1="'+x.toFixed(1)+'" y1="'+(y-4)+'" x2="'+x.toFixed(1)+'" y2="'+(y+4)+
       '" stroke="'+INK+'" stroke-width="1.3"/>';
  });
  g+='<text x="'+x0+'" y="'+(y-9)+'" fill="'+DIM+'" font-size="10.5">0</text>'+
     '<text x="'+(x0+barW).toFixed(1)+'" y="'+(y-9)+'" fill="'+DIM+
       '" font-size="10.5" text-anchor="middle">'+fmt(d)+'</text>';

  // nord: solo l'ago, senza cerchio
  const nx=V-m-20, ny=V-m-16;
  zones.push([nx-16,ny-38,32,42]);
  g+='<path d="M'+nx+' '+(ny-26)+'L'+(nx+5)+' '+(ny-9)+'L'+nx+' '+(ny-13)+
     'L'+(nx-5)+' '+(ny-9)+'Z" fill="'+INK+'"/>'+
     '<line x1="'+nx+'" y1="'+(ny-9)+'" x2="'+nx+'" y2="'+(ny-2)+
     '" stroke="'+INK+'" stroke-width="1.1"/>'+
     '<text x="'+nx+'" y="'+(ny+8)+'" fill="'+DIM+'" font-size="10.5" '+
     'text-anchor="middle">N</text></g>';
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
  font-size:12.5px;display:none;pointer-events:none;box-shadow:0 8px 30px rgba(0,0,0,.5)}
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
#rg-hd{display:flex;align-items:center;justify-content:space-between;gap:8px;
  padding:9px 12px;border-bottom:1px solid var(--border,rgba(190,207,184,.14));flex:none}
#rg-hd .ttl{font-family:var(--sans,serif);font-size:12.5px;font-weight:600;
  letter-spacing:.5px;color:var(--accent,#8aad84)}
#rg-hd .sub{font-family:var(--mono,monospace);font-size:8px;letter-spacing:1px;
  color:var(--text-dim,#5a6d5e);text-transform:uppercase;margin-top:2px}
.rg-ic{background:none;border:1px solid var(--border,rgba(190,207,184,.14));
  color:var(--text-dim,#5a6d5e);border-radius:4px;cursor:pointer;padding:3px 8px;font-size:12px}
.rg-ic:hover{color:#e8ebe5;border-color:var(--accent,#8aad84)}
#rg-bd{padding:11px 12px;overflow-y:auto;flex:1;min-height:0}
.rg-lbl{font-family:var(--mono,monospace);font-size:8px;letter-spacing:1px;
  text-transform:uppercase;color:var(--text-dim,#5a6d5e);margin:0 0 5px}
.rg-row{display:flex;gap:6px}
.rg-row+.rg-lbl{margin-top:11px}
.rg-opt{flex:1;padding:7px 4px;background:rgba(0,0,0,.2);
  border:1px solid var(--border,rgba(190,207,184,.14));border-radius:5px;
  color:var(--text,#9aaa97);font-family:var(--sans,serif);font-size:12.5px;
  font-weight:600;cursor:pointer;text-align:center}
.rg-opt:hover{border-color:rgba(138,173,132,.5);color:#e8ebe5}
.rg-opt.on{background:rgba(138,173,132,.18);border-color:rgba(138,173,132,.6);color:#e8ebe5}
.rg-ll{display:flex;gap:6px;margin-top:5px}
.rg-ll input{flex:1;min-width:0;padding:6px 8px;background:rgba(0,0,0,.25);
  border:1px solid var(--border,rgba(190,207,184,.14));border-radius:4px;
  color:#e8ebe5;font-family:var(--mono,monospace);font-size:11px;outline:none}
.rg-ll input:focus{border-color:rgba(138,173,132,.6)}
.rg-ll button{flex:none;padding:6px 12px;background:rgba(138,173,132,.14);
  border:1px solid rgba(138,173,132,.42);border-radius:4px;color:var(--accent,#8aad84);
  font-family:var(--sans,serif);font-size:12px;font-weight:600;cursor:pointer}
.rg-ll button:hover{background:rgba(138,173,132,.26);color:#e8ebe5}
.rg-note{font-family:var(--mono,monospace);font-size:9px;color:var(--text-dim,#5a6d5e);
  line-height:1.65;margin-top:9px}
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
#rg-card .nm{color:#e8ebe5;font-size:11px;font-weight:600}
#rg-card .kd{font-size:8px;letter-spacing:1px;text-transform:uppercase}
#rg-card .co{color:#8aad84;font-size:9px;margin-bottom:4px}
#rg-card .dt{color:#9aaa97;margin-top:4px;font-size:9.5px;line-height:1.55;
  max-height:74px;overflow:hidden}
#rg-card .ll{color:#7f9480;font-size:9px;border-top:1px solid rgba(190,207,184,.14);
  padding-top:4px;margin-top:3px}
#rg-card .ll b{color:#cfe0cb;font-weight:400}
#rg-card .hint{color:#5a6d5e;font-size:8px;margin-top:3px}
.rg-mk:hover{filter:brightness(1.35)}
#rg-bar{height:3px;background:rgba(138,173,132,.14);border-radius:2px;
  overflow:hidden;margin-top:9px;display:none}
#rg-bar.on{display:block}
#rg-bar i{display:block;height:100%;width:0;background:var(--accent,#8aad84);transition:width .3s}
#rg-legend{display:none;gap:12px;flex-wrap:wrap;margin-top:8px;
  font-family:var(--mono,monospace);font-size:8.5px;letter-spacing:.8px;color:var(--text-dim,#5a6d5e)}
#rg-legend.on{display:flex}
#rg-list{margin-top:8px}
.rg-item{display:flex;gap:8px;align-items:baseline;padding:2px 0;
  font-family:var(--mono,monospace);font-size:9.5px;color:#9aaa97}
.rg-item .n{color:#e8ebe5}
.rg-item .d{color:var(--text-dim,#5a6d5e);font-size:8.5px}
#rg-arch{padding:11px 12px;overflow-y:auto;flex:1;min-height:0}
.rg-arch-hd{display:flex;justify-content:space-between;align-items:center;
  font-family:var(--mono,monospace);font-size:8.5px;letter-spacing:1px;
  text-transform:uppercase;color:var(--text-dim,#5a6d5e);margin-bottom:8px}
.rg-arch-hd .rg-ic{font-size:8.5px;padding:2px 7px}
.rg-sv{display:flex;align-items:center;gap:8px;padding:6px 7px;margin-bottom:4px;
  background:rgba(0,0,0,.18);border:1px solid var(--border,rgba(190,207,184,.12));
  border-radius:4px;cursor:pointer}
.rg-sv:hover{border-color:rgba(138,173,132,.5);background:rgba(138,173,132,.08)}
.rg-sv .b{flex:1;min-width:0}
.rg-sv .t{color:#e8ebe5;font-family:var(--sans,serif);font-size:12px;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rg-sv .s{font-family:var(--mono,monospace);font-size:8.5px;
  color:var(--text-dim,#5a6d5e);margin-top:1px}
.rg-sv .km{font-family:var(--mono,monospace);font-size:9px;color:var(--accent,#8aad84);
  border:1px solid rgba(138,173,132,.3);border-radius:3px;padding:1px 5px;flex:none}
.rg-sv .x{color:#5a6d5e;font-size:11px;padding:0 3px;flex:none}
.rg-sv .x:hover{color:#c27066}
.rg-arch-ft{font-family:var(--mono,monospace);font-size:8.5px;
  color:var(--text-dim,#5a6d5e);line-height:1.6;
  border-top:1px solid var(--border,rgba(190,207,184,.12));padding-top:7px;margin-top:6px}
@media(max-width:760px){
  #rg-panel{width:calc(100vw - 20px);bottom:48px}
  #rg-panel.big{width:calc(100vw - 20px)}
}
`;

let panel=null, hint=null, armed=null, lastRun=null, busy=false;
let curSize=1, curQual=0;      // 20 km, definizione standard
let _down={x:0,y:0};

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
     '<div><div class="ttl">REGIONAL RELIEF</div>'+
     '<div class="sub">Open-Meteo DEM · contour lines</div></div>'+
     '<div style="display:flex;gap:5px">'+
       '<button class="rg-ic" id="rg-saved" title="Saved on this device">☰</button>'+
       '<button class="rg-ic" id="rg-full" title="Full screen">⛶</button>'+
       '<button class="rg-ic" id="rg-save" title="Download SVG">⤓</button>'+
       '<button class="rg-ic" id="rg-close" title="Close">✕</button>'+
     '</div></div>'+
   '<div id="rg-bd">'+
     '<div class="rg-lbl">Square side</div>'+
     '<div class="rg-row">'+SIZES.map((s,i)=>
        '<button class="rg-opt" data-size="'+i+'">'+s.label+'</button>').join('')+'</div>'+
     '<div class="rg-lbl">Resolution</div>'+
     '<div class="rg-row">'+QUAL.map((q,i)=>
        '<button class="rg-opt" data-qual="'+i+'">'+q.label+'</button>').join('')+'</div>'+
     '<div class="rg-lbl">Centre point</div>'+
     '<div class="rg-row"><button class="rg-opt" id="rg-pick">Pick on globe</button></div>'+
     '<div class="rg-ll">'+
       '<input id="rg-lat" type="text" inputmode="decimal" placeholder="latitude" autocomplete="off">'+
       '<input id="rg-lng" type="text" inputmode="decimal" placeholder="longitude" autocomplete="off">'+
       '<button id="rg-go">Go</button></div>'+
     '<div class="rg-note" id="rg-note"></div>'+
     '<div id="rg-bar"><i></i></div>'+
     '<div id="rg-svg"></div>'+
     '<div id="rg-legend"></div>'+
     '<div id="rg-list"></div>'+
   '</div>'+
   '<div id="rg-arch" style="display:none">'+
     '<div class="rg-arch-hd"><span>Saved on this device</span>'+
       '<button class="rg-ic" id="rg-wipe">clear all</button></div>'+
     '<div id="rg-arch-list"></div>'+
     '<div class="rg-arch-ft" id="rg-arch-ft"></div>'+
   '</div>';
  document.body.appendChild(panel);

  panel.querySelectorAll('[data-size]').forEach(b=>
    b.addEventListener('click',()=>{curSize=+b.dataset.size;syncOpts();if(armed)arm()}));
  panel.querySelectorAll('[data-qual]').forEach(b=>
    b.addEventListener('click',()=>{curQual=+b.dataset.qual;syncOpts();if(armed)arm()}));
  panel.querySelector('#rg-pick').addEventListener('click',()=>armed?disarm():arm());
  panel.querySelector('#rg-go').addEventListener('click',goManual);
  ['rg-lat','rg-lng'].forEach(id=>
    panel.querySelector('#'+id).addEventListener('keydown',e=>{
      if(e.key==='Enter')goManual();
    }));
  panel.querySelector('#rg-close').addEventListener('click',closePanel);
  panel.querySelector('#rg-full').addEventListener('click',toggleFull);
  panel.querySelector('#rg-save').addEventListener('click',saveSVG);
  panel.querySelector('#rg-saved').addEventListener('click',()=>toggleSaved());
  panel.querySelector('#rg-wipe').addEventListener('click',()=>{
    readIndex().forEach(e=>{try{localStorage.removeItem(e.k)}catch(x){}});
    writeIndex([]);refreshSaved();
  });
  panel.querySelector('#rg-arch-list').addEventListener('click',e=>{
    const del=e.target.closest?e.target.closest('[data-del]'):null;
    if(del){forgetRun(del.getAttribute('data-del'));refreshSaved();return}
    const row=e.target.closest?e.target.closest('[data-open]'):null;
    if(!row)return;
    const en=readIndex().find(x=>x.k===row.getAttribute('data-open'));
    if(!en)return;
    curSize=Math.max(0,SIZES.findIndex(s=>s.km===en.km));
    curQual=Math.max(0,QUAL.findIndex(q=>q.id===en.q));
    syncOpts();toggleSaved(false);run(en.lat,en.lng);
  });

  // Cattura su document: un listener sul canvas non precederebbe quello gia'
  // registrato, perche' nella fase "at target" conta l'ordine di iscrizione.
  document.addEventListener('pointerdown',e=>{_down={x:e.clientX,y:e.clientY}},true);
  document.addEventListener('click',onGlobeClick,true);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')disarm()});

  syncOpts();refreshSaved();
}

function syncOpts(){
  if(!panel)return;
  panel.querySelectorAll('[data-size]').forEach(b=>
    b.classList.toggle('on',+b.dataset.size===curSize));
  panel.querySelectorAll('[data-qual]').forEach(b=>
    b.classList.toggle('on',+b.dataset.qual===curQual));
  const km=SIZES[curSize].km, q=QUAL[curQual];
  const ch=chunksOf(q), bursts=Math.ceil(ch/BURST);
  const secs=(bursts-1)*PAUSE_MS/1000+ch*1.2;
  const cell=Math.round(km*1000/q.h);
  const note=panel.querySelector('#rg-note');
  if(note)note.innerHTML='Grid <b>'+q.w+'×'+q.h+'</b> · <b>'+cell+' m</b> cells<br>'+
    ch+' requests in <b>'+bursts+' bursts</b> of '+BURST+', '+(PAUSE_MS/1000)+' s pause · '+
    'about <b>'+(secs<90?Math.round(secs)+' s':Math.round(secs/60)+' min')+'</b>'+
    (bursts>2?'<br>The map fills in sector by sector as data arrives.':'');
}

function goManual(){
  build();
  const la=parseFloat(String(panel.querySelector('#rg-lat').value).replace(',','.'));
  const ln=parseFloat(String(panel.querySelector('#rg-lng').value).replace(',','.'));
  const note=panel.querySelector('#rg-note');
  if(!isFinite(la)||!isFinite(ln)||la<-90||la>90||ln<-180||ln>180){
    note.innerHTML='<b style="color:'+GEO.red+'">Invalid coordinates.</b><br>'+
      'Latitude between −90 and 90, longitude between −180 and 180. '+
      'For example 41.9028 and 12.4964.';
    return;
  }
  disarm();
  run(la,ln);
}

function arm(){
  build();
  if(typeof window.screenToLatLng!=='function'){
    panel.querySelector('#rg-note').innerHTML=
      '<b style="color:'+GEO.red+'">Globe hook missing.</b><br>'+
      'In index.html, after the screenToLatLng function, add:<br>'+
      '<span style="color:#e8ebe5">window.screenToLatLng=screenToLatLng;</span><br>'+
      'Meanwhile you can type the coordinates above.';
    return;
  }
  armed=SIZES[curSize];
  document.body.classList.add('rg-pick');
  panel.querySelector('#rg-pick').classList.add('on');
  hint.innerHTML='Click a point on the globe — <b>'+armed.km+' × '+armed.km+
    ' km</b> square, '+QUAL[curQual].label.toLowerCase()+' resolution';
  hint.classList.add('on');
}
function disarm(){
  armed=null;
  document.body.classList.remove('rg-pick');
  if(hint)hint.classList.remove('on');
  if(panel)panel.querySelector('#rg-pick').classList.remove('on');
}

function onGlobeClick(e){
  if(!armed||busy)return;
  const cv=document.getElementById('gl');
  if(!cv||e.target!==cv)return;
  if(Math.abs(e.clientX-_down.x)>5||Math.abs(e.clientY-_down.y)>5)return;
  if(typeof window.screenToLatLng!=='function')return;
  const ll=window.screenToLatLng(e.clientX,e.clientY);
  if(!ll){hint.innerHTML='Outside the globe — click on the surface';return}
  e.stopPropagation();e.preventDefault();
  disarm();
  run(ll.lat,ll.lng);
}

async function run(lat,lng){
  build();
  panel.classList.add('on');
  toggleSaved(false);
  busy=true;
  const km=SIZES[curSize].km, q=QUAL[curQual];
  const bbox=squareBox(lat,lng,km);
  const note=panel.querySelector('#rg-note');
  const bar=panel.querySelector('#rg-bar'), fill=bar.querySelector('i');
  const host=panel.querySelector('#rg-svg');
  const NC=chunksOf(q);
  bar.classList.add('on');
  panel.querySelector('#rg-lat').value=lat.toFixed(4);
  panel.querySelector('#rg-lng').value=lng.toFixed(4);

  if(_landRings===null){
    try{_landRings=await loadLandRings()}catch(e){_landRings=false}
  }
  const allPts=await allPoints();      // siti fissi + eventi geolocalizzati
  const pts=pointsIn(bbox,allPts);
  const lps=landPaths(bbox,VIEW);        // calcolata una volta sola
  let timer=null;

  const paint=(elev,have)=>{
    const rows=readyRows(have,q);
    if(rows<2)return;
    host.innerHTML=buildSVG(bbox,km,elev,pts,{lat,lng},q,rows,lps)+
      '<div id="rg-card"></div>';
    host.classList.add('on');
    panel.classList.add('big');
    attachCards(host,pts);
  };

  const res=await fetchSquare(bbox,km,q,(p)=>{
    fill.style.width=Math.round((p.have/p.total)*100)+'%';
    if(timer){clearInterval(timer);timer=null}
    if(p.phase==='sector')paint(p.elev,p.haveArr);
    if(p.phase==='wait'){
      const until=Date.now()+p.ms;
      const tick=()=>{
        const s=Math.max(0,Math.round((until-Date.now())/1000));
        note.innerHTML='<b style="color:#b89a4a">'+
          (p.reason==='429'?'Open-Meteo limit reached':'Burst pause')+
          ' · resuming in '+s+' s</b><br>'+p.have+'/'+p.total+' sectors acquired.';
        if(s<=0&&timer){clearInterval(timer);timer=null}
      };
      tick();timer=setInterval(tick,1000);
    }else if(p.phase!=='sector'){
      note.innerHTML='Acquiring… <b>'+p.have+'/'+p.total+'</b> sectors.';
    }
  });
  if(timer)clearInterval(timer);
  bar.classList.remove('on');
  busy=false;

  const got=res.have.filter(Boolean).length;
  paint(res.elev,res.have);

  if(got<NC){
    note.innerHTML='<b style="color:'+GEO.red+'">Stopped at '+got+'/'+NC+' sectors.</b><br>'+
      'What was downloaded is saved. Press Go again to resume from here.';
    return;
  }

  lastRun={bbox,km,q:q.id,elev:res.elev,pts,centre:{lat,lng},
           svg:buildSVG(bbox,km,res.elev,pts,{lat,lng},q,q.h,lps)};

  const valid=res.elev.filter(v=>v!=null);
  const mn=Math.min.apply(null,valid), mx=Math.max.apply(null,valid);
  note.innerHTML='<b>'+km+' × '+km+' km</b> square · '+q.label.toLowerCase()+
    ' ('+q.w+'×'+q.h+')<br>elevation <b>'+mn+' m</b> to <b>'+mx+' m</b> · '+
    (res.cached?'from local cache':NC+' requests');

  recordRun({k:cacheKey(bbox,km,q),lat,lng,km,q:q.id,ts:Date.now(),
             mn,mx,np:pts.length,label:labelFor(lat,lng,pts)});
  refreshSaved();

  const cnt={mil:0,eco:0,sea:0,evt:0};
  pts.forEach(p=>{cnt[p.kind]=(cnt[p.kind]||0)+1});
  const sym={mil:'▲',eco:'◆',sea:'●',evt:'■'};
  const leg=panel.querySelector('#rg-legend');
  const items=Object.keys(cnt).filter(k=>cnt[k]>0).map(k=>
    '<span style="color:'+MARK[k].c+'">'+sym[k]+' '+MARK[k].l+
    ' <b style="color:#e8ebe5;font-weight:400">'+cnt[k]+'</b></span>');
  leg.innerHTML=items.length?items.join(''):'<span>No sites recorded in this area</span>';
  leg.classList.add('on');

  panel.querySelector('#rg-list').innerHTML=pts.length?
    '<div class="rg-item" style="color:#5a6d5e;font-size:8.5px;letter-spacing:1px;'+
    'text-transform:uppercase;padding-bottom:3px">Sites in frame — hover the symbols</div>'+
    pts.map((p,i)=>{
      const d=describe(p);
      return '<div class="rg-item" data-rgl="'+i+'"><span style="color:'+MARK[p.kind].c+'">'+
        (sym[p.kind]||'◆')+'</span><span class="n">'+esc(p.name)+'</span>'+
        '<span class="d">'+esc(d.dec)+(d.text?' · '+esc(d.text):'')+'</span></div>';
    }).join(''):'';
}

// ============================================================================
//  Schede al passaggio del cursore
// ============================================================================
function attachCards(host,pts){
  const card=host.querySelector('#rg-card');
  if(!card)return;
  const place=(ev)=>{
    const r=host.getBoundingClientRect();
    let x=ev.clientX-r.left+14, y=ev.clientY-r.top+12;
    const cw=card.offsetWidth||210, ch=card.offsetHeight||96;
    if(x+cw>r.width-6)x=ev.clientX-r.left-cw-14;
    if(y+ch>r.height-6)y=ev.clientY-r.top-ch-12;
    card.style.left=Math.max(4,x)+'px';
    card.style.top=Math.max(4,y)+'px';
  };
  const show=(i,ev)=>{
    const p=pts[i];if(!p)return;
    const d=describe(p);
    card.innerHTML='<div class="h"><span class="nm">'+esc(p.name)+'</span>'+
      '<span class="kd" style="color:'+MARK[p.kind].c+'">'+esc(d.kind)+'</span></div>'+
      (d.country?'<div class="co">'+d.country+'</div>':'')+
      (d.text?'<div>'+esc(d.text)+'</div>':'')+
      (d.detail?'<div class="dt">'+esc(d.detail)+'</div>':'')+
      '<div class="ll"><b>'+esc(d.dms)+'</b><br>'+esc(d.dec)+'</div>'+
      '<div class="hint">click to copy coordinates</div>';
    card.classList.add('on');place(ev);
  };
  const hit=e=>{
    const g=e.target.closest?e.target.closest('[data-rg]'):null;
    return g?+g.getAttribute('data-rg'):-1;
  };
  host.addEventListener('mousemove',e=>{
    const i=hit(e);
    if(i<0){card.classList.remove('on');card.dataset.i='';return}
    if(card.dataset.i!==String(i)){card.dataset.i=String(i);show(i,e)}else place(e);
  });
  host.addEventListener('mouseleave',()=>{card.classList.remove('on');card.dataset.i=''});
  host.addEventListener('click',e=>{
    const i=hit(e);if(i<0)return;
    const p=pts[i];
    if(navigator.clipboard)navigator.clipboard.writeText(
      p.lat.toFixed(5)+', '+p.lng.toFixed(5)).then(()=>{
        const h=card.querySelector('.hint');
        if(h){h.textContent='coordinates copied';h.style.color=GEO.accent}
      },()=>{});
  });
  const list=panel.querySelector('#rg-list');
  if(list&&!list._rgBound){
    list._rgBound=true;
    list.addEventListener('mousemove',e=>{
      const row=e.target.closest?e.target.closest('[data-rgl]'):null;
      const h=panel.querySelector('#rg-svg');
      h.querySelectorAll('.rg-mk').forEach(g=>g.style.filter='');
      if(!row)return;
      h.querySelectorAll('[data-rg="'+row.getAttribute('data-rgl')+'"]')
       .forEach(g=>g.style.filter='brightness(1.6) drop-shadow(0 0 4px currentColor)');
    });
  }
}

// ============================================================================
//  Archivio: vista e comandi
// ============================================================================
function toggleSaved(force){
  if(!panel)return;
  const arch=panel.querySelector('#rg-arch'), bd=panel.querySelector('#rg-bd');
  const on=(force===undefined)?(arch.style.display==='none'):!!force;
  arch.style.display=on?'block':'none';
  bd.style.display=on?'none':'block';
  panel.querySelector('#rg-saved').style.color=on?'#e8ebe5':'';
  if(on)refreshSaved();
}
function refreshSaved(){
  if(!panel)return;
  const list=panel.querySelector('#rg-arch-list');
  const ft=panel.querySelector('#rg-arch-ft');
  const btn=panel.querySelector('#rg-saved');
  const idx=readIndex();
  if(btn)btn.textContent=idx.length?('☰ '+idx.length):'☰';
  if(!list)return;
  list.innerHTML=idx.length?idx.map(e=>{
    const q=QUAL.find(x=>x.id===e.q);
    return '<div class="rg-sv" data-open="'+e.k+'">'+
      '<span class="km">'+e.km+' km</span>'+
      '<span class="b"><span class="t">'+esc(e.label||'')+'</span>'+
      '<span class="s">'+fmtLL(e.lat,'N','S')+' '+fmtLL(e.lng,'E','W')+
      ' · '+e.mn+'–'+e.mx+' m'+(q?' · '+q.label.toLowerCase():'')+
      (e.np?' · '+e.np+' siti':'')+' · '+whenTxt(e.ts)+'</span></span>'+
      '<span class="x" data-del="'+e.k+'" title="Delete">✕</span></div>';
  }).join(''):
    '<div class="rg-arch-ft" style="border:0;margin:0;padding:0">'+
    'No saved maps yet. Anything you download shows up here.</div>';
  if(ft)ft.innerHTML='Everything stays on this device, in the browser\'s local storage: '+
    'nothing is uploaded and no one else can see it.<br>Using '+
    '<b style="color:'+GEO.accent+';font-weight:400">'+Math.round(archiveBytes()/1024)+' KB</b>'+
    (idx.length?' · reopening a saved map costs no requests':'');
}

function toggleFull(){
  if(!panel)return;
  if(document.fullscreenElement===panel){
    if(document.exitFullscreen)document.exitFullscreen();
  }else if(panel.requestFullscreen){
    panel.requestFullscreen().catch(()=>panel.classList.toggle('big'));
  }else panel.classList.toggle('big');
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
  toggleSaved(false);
  refreshSaved();
}

// ============================================================================
//  Pulsante nella barra in basso, accanto a Satellites
// ============================================================================
function mount(){
  if(document.getElementById('btn-region'))return;
  const b=el('button',{id:'btn-region',class:'fs-btn',
    title:'Relief of a square picked on the globe'},'◱ Region DEM');
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
  at:function(lat,lng,km,qual){
    if(km!=null){const i=SIZES.findIndex(s=>s.km===km); if(i>=0)curSize=i}
    if(qual!=null){const i=QUAL.findIndex(q=>q.id===qual); if(i>=0)curQual=i}
    build();syncOpts();run(lat,lng);
  },
  last:()=>lastRun,
  saved:readIndex,
  points:collectPoints,
  status:()=>({requests:Q.total,penalty:penalty(),cooldownMs:cooldownLeft()}),
  clearCache:function(){
    try{Object.keys(localStorage).filter(k=>k.indexOf(CACHE_KEY)===0||k===INDEX_KEY)
      .forEach(k=>localStorage.removeItem(k))}catch(e){}
    if(panel)refreshSaved();
  },
  _internal:{box:squareBox,coords:coordsFor,svg:buildSVG,inBox:pointsIn,
             describe:describe,dms:dms,land:landPaths,rows:readyRows,QUAL:QUAL,
             loadLand:loadLandRings,useLand:function(r){_landRings=r}}
};
})();
