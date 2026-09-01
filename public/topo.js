// ============================================================================
// GEOINT v12 — Topographic Map Engine
// ----------------------------------------------------------------------------
// ORDINE DELLE FONTI (dalla piu' economica alla piu' costosa):
//
//   0. public/topo/topo-bundle.json   archivio unico di TUTTI i paesi
//   1. public/topo/<id>.svg           mappa gia' renderizzata
//   2. public/topo/dem/<id>.json      griglia DEM del repo (anche parziale)
//   3. localStorage                   settori scaricati da questo browser
//   4. api.open-meteo.com             SOLO cio' che nessuna delle altre ha
//
// RATE LIMITING — raffiche da 3
// Open-Meteo limita per indirizzo IP. Si fanno BURST (3) richieste ravvicinate,
// poi si aspetta BURST_PAUSE_MS. Ogni 429 raddoppia la pausa e la scrive in
// localStorage, cosi' il limite sopravvive anche a un refresh della pagina.
//
// RIPRESA — non si chiede due volte lo stesso dato
// Ogni settore viene salvato appena arriva. Se Open-Meteo blocca a meta', al
// ricaricamento si riparte dal primo settore mancante.
//
// RIQUADRI — perche' NON si confrontano
// Il browser legge countries-10m.json, gli script Python leggono
// countries-50m.json: due risoluzioni dello stesso atlante, con contorni
// semplificati diversamente. I riquadri calcolati dalle due parti non
// coincidono mai esattamente, quindi confrontarli scarterebbe l'intero
// archivio. Ogni sorgente porta con se' il riquadro su cui e' stata
// campionata e quello si usa; sorgenti con riquadri diversi non vengono
// mescolate, perche' le celle non corrisponderebbero.
// ============================================================================
(function(){
'use strict';

// --- Geometria: DEVE combaciare con tools/build_topo_bundle.py -------------
const GRID_W=30, GRID_H=20;
const CHUNK=100;
const N_POINTS=GRID_W*GRID_H;             // 600
const N_CHUNKS=Math.ceil(N_POINTS/CHUNK); // 6
const TARGET_LINES=12;
const LAT_LIMIT=89.99;                    // oltre +-90 Open-Meteo risponde 400

// --- Rate limiting ----------------------------------------------------------
const BURST=3;                     // richieste per raffica
const BURST_PAUSE_MS=90*1000;      // pausa fra raffiche
const SPACING_MS=1200;             // spazio minimo dentro la raffica
const MAX_PENALTY=8;
const MAX_RETRIES=2;

// --- Storage ----------------------------------------------------------------
const CACHE_PREFIX='gx_dem_';
const CACHE_VERSION='v5';
const COOLDOWN_KEY='gx_topo_cooldown';
const PENALTY_KEY='gx_topo_penalty';

const sleep=ms=>new Promise(r=>setTimeout(r,ms));

// ============================================================================
//  Coda globale a raffiche
// ============================================================================
const Q={queue:[],running:false,inBurst:0,last:0,total:0};

function penalty(){
  try{
    const v=parseFloat(localStorage.getItem(PENALTY_KEY)||'1');
    return (isFinite(v)&&v>=1)?Math.min(v,MAX_PENALTY):1;
  }catch(e){return 1}
}
function setPenalty(v){
  try{localStorage.setItem(PENALTY_KEY,String(Math.min(Math.max(v,1),MAX_PENALTY)))}catch(e){}
}
function cooldownLeft(){
  try{
    const t=parseInt(localStorage.getItem(COOLDOWN_KEY)||'0',10);
    return isFinite(t)?Math.max(0,t-Date.now()):0;
  }catch(e){return 0}
}
function setCooldown(ms){
  try{localStorage.setItem(COOLDOWN_KEY,String(Date.now()+ms))}catch(e){}
}

let _waitNotify=null;
function onWait(fn){_waitNotify=fn}

function queuedFetch(url){
  return new Promise((resolve,reject)=>{
    Q.queue.push({url,resolve,reject});
    pump();
  });
}

async function pump(){
  if(Q.running)return;
  Q.running=true;
  while(Q.queue.length){
    const job=Q.queue.shift();

    // cooldown ereditato da un 429 precedente, anche di un'altra sessione
    const cd=cooldownLeft();
    if(cd>0){
      if(_waitNotify)_waitNotify({reason:'cooldown',ms:cd});
      await sleep(cd);
    }

    // ritmo a raffiche: 3 richieste, poi pausa
    if(Q.inBurst>=BURST){
      const pause=BURST_PAUSE_MS*penalty();
      if(_waitNotify)_waitNotify({reason:'burst',ms:pause});
      await sleep(pause);
      Q.inBurst=0;
    } else {
      const gap=Q.last+SPACING_MS-Date.now();
      if(gap>0)await sleep(gap);
    }

    let attempt=0,settled=false;
    while(attempt<=MAX_RETRIES&&!settled){
      Q.last=Date.now();
      try{
        const r=await fetch(job.url);
        if(r.status===429){
          const p=Math.min(penalty()*2,MAX_PENALTY);
          setPenalty(p);
          const wait=BURST_PAUSE_MS*p;
          setCooldown(wait);
          Q.inBurst=0;
          if(_waitNotify)_waitNotify({reason:'429',ms:wait});
          await sleep(wait);
          attempt++;
          continue;
        }
        if(!r.ok)throw new Error('HTTP '+r.status);
        const j=await r.json();
        Q.inBurst++;Q.total++;Q.last=Date.now();
        setPenalty(penalty()*0.85);
        job.resolve(j);
        settled=true;
      }catch(e){
        attempt++;
        if(attempt>MAX_RETRIES){job.reject(e);settled=true;break}
        await sleep(2000*attempt);
      }
    }
  }
  Q.running=false;
}

// ============================================================================
//  Archivio unico: public/topo/topo-bundle.json
// ============================================================================
let _bundle=null,_bundleP=null;
function bundle(){
  if(_bundle!==null)return Promise.resolve(_bundle);
  if(_bundleP)return _bundleP;
  _bundleP=fetch('topo/topo-bundle.json')
    .then(r=>r.ok?r.json():null)
    .catch(()=>null)
    .then(b=>{
      _bundle=(b&&b.countries&&b.gridW===GRID_W&&b.gridH===GRID_H)?b:false;
      return _bundle;
    });
  return _bundleP;
}

/** base64 -> quote in metri (interi a 16 bit little endian, come li scrive Python). */
function decodeElev(b64){
  const bin=atob(b64);
  const buf=new ArrayBuffer(bin.length);
  const bytes=new Uint8Array(buf);
  for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);
  const view=new DataView(buf);
  const out=new Array(bin.length>>1);
  for(let i=0;i<out.length;i++)out[i]=view.getInt16(i*2,true);
  return out;
}

/** Estrae dal bundle il DEM di un paese, con il riquadro su cui e' stato
 *  campionato. Nessun confronto con il riquadro calcolato qui: vedi la nota
 *  in testa al file. */
async function bundleDem(id,fallbackBbox){
  const b=await bundle();
  if(!b)return null;
  const e=b.countries[String(id)];
  if(!e||!e.e)return null;
  let elev;
  try{elev=decodeElev(e.e)}catch(err){return null}
  if(elev.length!==N_POINTS)return null;
  const have=Array.isArray(e.h)?e.h.slice(0,N_CHUNKS):new Array(N_CHUNKS).fill(1);
  while(have.length<N_CHUNKS)have.push(0);
  const bbox=(Array.isArray(e.b)&&e.b.length===4)?e.b:fallbackBbox;
  if(!bbox)return null;
  return {v:1,id:String(id),gridW:GRID_W,gridH:GRID_H,chunk:CHUNK,
          bbox:bbox,have:have,elev:elev,complete:have.every(Boolean)};
}

// ============================================================================
//  Manifest del repo (una sola lettura per sessione)
// ============================================================================
let _manifest=null,_manifestP=null;
function manifest(){
  if(_manifest)return Promise.resolve(_manifest);
  if(_manifestP)return _manifestP;
  _manifestP=fetch('topo/index.json')
    .then(r=>r.ok?r.json():null)
    .catch(()=>null)
    .then(m=>{_manifest=m||{ready:[],partial:{}};return _manifest});
  return _manifestP;
}

// ============================================================================
//  Riquadro del paese
//  Questa funzione deve restare allineata a bbox_of() in
//  tools/build_topo_bundle.py, anche se i due atlanti hanno risoluzioni
//  diverse e quindi i numeri non coincideranno mai esattamente.
// ============================================================================
function bboxOfCountry(id){
  const cp=window.countryPolys;
  if(!cp||!cp[id])return null;

  const unwrap=(ring)=>{
    let prev=null;const out=[];
    ring.forEach(p=>{
      let lng=p[0];
      if(prev!==null){
        while(lng-prev>180)lng-=360;
        while(lng-prev<-180)lng+=360;
      }
      out.push([lng,p[1]]);prev=lng;
    });
    return out;
  };

  let minLng=Infinity,maxLng=-Infinity,minLat=Infinity,maxLat=-Infinity,ref=null;
  cp[id].forEach(poly=>{
    const ring=poly[0];
    if(!ring||!ring.length)return;
    let un=unwrap(ring);
    // Ogni anello viene srotolato per conto suo: senza riallinearlo al primo,
    // le isole finiscono in un giro di longitudine diverso dalla terraferma e
    // il riquadro diventa piu' largo del pianeta (era il caso di Figi,
    // Nuova Zelanda, Kiribati, Russia, Stati Uniti).
    let mid=0;un.forEach(p=>{mid+=p[0]});mid/=un.length;
    if(ref===null){ref=mid}
    else{
      const k=Math.round((ref-mid)/360);
      if(k)un=un.map(q=>[q[0]+k*360,q[1]]);
    }
    un.forEach(q=>{
      if(q[0]<minLng)minLng=q[0];
      if(q[0]>maxLng)maxLng=q[0];
      if(q[1]<minLat)minLat=q[1];
      if(q[1]>maxLat)maxLat=q[1];
    });
  });
  if(!isFinite(minLng))return null;

  const padLng=(maxLng-minLng)*0.04, padLat=(maxLat-minLat)*0.04;
  let lo=minLng-padLng, hi=maxLng+padLng;
  let south=minLat-padLat, north=maxLat+padLat;
  // Microstati (Vaticano, Monaco): a bassa risoluzione il contorno puo'
  // ridursi a una linea. Senza una dimensione minima la griglia sarebbe
  // degenere e campionerebbe 600 volte lo stesso punto.
  const MIN_SPAN=0.05;
  if(hi-lo<MIN_SPAN){const c=(hi+lo)/2;lo=c-MIN_SPAN/2;hi=c+MIN_SPAN/2}
  if(north-south<MIN_SPAN){const c=(north+south)/2;south=c-MIN_SPAN/2;north=c+MIN_SPAN/2}
  // Un contorno che circonda un polo (Antartide) copre tutte le longitudini.
  if(hi-lo>=360){lo=-180;hi=180}
  south=Math.max(-LAT_LIMIT,south); north=Math.min(LAT_LIMIT,north);
  return [+lo.toFixed(6),+hi.toFixed(6),+south.toFixed(6),+north.toFixed(6)];
}

// ============================================================================
//  DEM: struttura, validita', unione, persistenza locale
// ============================================================================
function emptyDem(id,bbox){
  return {v:1,id:id,gridW:GRID_W,gridH:GRID_H,chunk:CHUNK,bbox:bbox,
          have:new Array(N_CHUNKS).fill(0),
          elev:new Array(N_POINTS).fill(null),complete:false};
}

/** Solo controlli di forma: il riquadro NON si confronta. */
function validDem(d){
  if(!d||d.gridW!==GRID_W||d.gridH!==GRID_H)return false;
  if(!Array.isArray(d.elev)||d.elev.length!==N_POINTS)return false;
  if(!Array.isArray(d.have)||d.have.length!==N_CHUNKS)return false;
  if(!Array.isArray(d.bbox)||d.bbox.length!==4)return false;
  return true;
}

function localKey(id){return CACHE_PREFIX+CACHE_VERSION+'_'+id}
function loadLocal(id){
  try{
    const d=JSON.parse(localStorage.getItem(localKey(id))||'null');
    return validDem(d)?d:null;
  }catch(e){return null}
}
function saveLocal(id,dem){
  try{localStorage.setItem(localKey(id),JSON.stringify(dem))}
  catch(e){/* quota piena: si perde solo la cache locale */}
}

/** Unisce due DEM tenendo, settore per settore, quello che esiste.
 *  Sorgenti campionate su riquadri diversi NON si mescolano. */
function mergeDem(a,b){
  if(!a)return b;
  if(!b)return a;
  if(Array.isArray(a.bbox)&&Array.isArray(b.bbox)){
    for(let i=0;i<4;i++){
      if(Math.abs(a.bbox[i]-b.bbox[i])>1e-4)return a;   // vince la fonte piu' attendibile
    }
  }
  const out=emptyDem(a.id||b.id,a.bbox||b.bbox);
  for(let c=0;c<N_CHUNKS;c++){
    const src=a.have[c]?a:(b.have[c]?b:null);
    if(!src)continue;
    out.have[c]=1;
    const s=c*CHUNK,e=Math.min(s+CHUNK,N_POINTS);
    for(let i=s;i<e;i++)out.elev[i]=src.elev[i];
  }
  out.complete=out.have.every(Boolean);
  return out;
}

function missingChunks(dem){
  const m=[];
  for(let c=0;c<N_CHUNKS;c++)if(!dem.have[c])m.push(c);
  return m;
}

/** DEM archiviato nel repo dal workflow di GitHub (puo' essere parziale). */
async function repoDem(id){
  try{
    const r=await fetch('topo/dem/'+id+'.json');
    if(!r.ok)return null;
    const d=await r.json();
    return validDem(d)?d:null;
  }catch(e){return null}
}

// ============================================================================
//  Scarico dei soli settori mancanti
// ============================================================================
function gridCoords(bbox){
  const minLng=bbox[0],maxLng=bbox[1],minLat=bbox[2],maxLat=bbox[3];
  const lats=[],lngs=[];
  for(let j=0;j<GRID_H;j++){
    const lat=minLat+(maxLat-minLat)*(j/(GRID_H-1));
    for(let i=0;i<GRID_W;i++){
      const lng=minLng+(maxLng-minLng)*(i/(GRID_W-1));
      lats.push(Math.max(-90,Math.min(90,lat)).toFixed(4));
      lngs.push(((lng+540)%360-180).toFixed(4));
    }
  }
  return {lats,lngs};
}

async function fetchMissing(id,dem,onChunk){
  const c=gridCoords(dem.bbox);
  const lats=c.lats,lngs=c.lngs;
  const missing=missingChunks(dem);
  for(let n=0;n<missing.length;n++){
    const idx=missing[n];
    const s=idx*CHUNK,e=Math.min(s+CHUNK,N_POINTS);
    const url='https://api.open-meteo.com/v1/elevation'
      +'?latitude='+lats.slice(s,e).join(',')
      +'&longitude='+lngs.slice(s,e).join(',');
    let j;
    try{
      j=await queuedFetch(url);
    }catch(err){
      return {dem:dem,stopped:true,error:err};   // si esce lasciando intatto il salvato
    }
    if(!j||!Array.isArray(j.elevation)||j.elevation.length<(e-s))
      return {dem:dem,stopped:true,error:new Error('risposta incompleta')};
    for(let k=0;k<e-s;k++){
      const v=j.elevation[k];
      dem.elev[s+k]=(typeof v==='number')?Math.round(v):0;
    }
    dem.have[idx]=1;
    dem.complete=dem.have.every(Boolean);
    saveLocal(id,dem);                            // persistenza immediata
    if(onChunk)onChunk(dem);
  }
  return {dem:dem,stopped:false};
}

// ============================================================================
//  Marching squares -> polilinee -> path SVG
// ============================================================================
function marchingSquares(grid,W,H,level){
  const segs=[];
  const interp=(a,b)=>(b===a)?0.5:(level-a)/(b-a);
  for(let y=0;y<H-1;y++){
    for(let x=0;x<W-1;x++){
      const tl=grid[y*W+x],tr=grid[y*W+x+1],br=grid[(y+1)*W+x+1],bl=grid[(y+1)*W+x];
      let code=0;
      if(tl>level)code|=8;
      if(tr>level)code|=4;
      if(br>level)code|=2;
      if(bl>level)code|=1;
      if(code===0||code===15)continue;
      const t=()=>[x+interp(tl,tr),y];
      const r=()=>[x+1,y+interp(tr,br)];
      const b=()=>[x+interp(bl,br),y+1];
      const l=()=>[x,y+interp(tl,bl)];
      const push=(p,q)=>segs.push([p[0],p[1],q[0],q[1]]);
      switch(code){
        case 1:case 14:push(l(),b());break;
        case 2:case 13:push(b(),r());break;
        case 3:case 12:push(l(),r());break;
        case 4:case 11:push(t(),r());break;
        case 5:push(l(),t());push(b(),r());break;
        case 6:case 9:push(t(),b());break;
        case 7:case 8:push(l(),t());break;
        case 10:push(t(),r());push(l(),b());break;
      }
    }
  }
  return segs;
}

function segsToPolylines(segs){
  const key=(x,y)=>x.toFixed(3)+'_'+y.toFixed(3);
  const adj=new Map();
  segs.forEach((s,i)=>{
    const k1=key(s[0],s[1]),k2=key(s[2],s[3]);
    if(!adj.has(k1))adj.set(k1,[]);
    if(!adj.has(k2))adj.set(k2,[]);
    adj.get(k1).push({i:i,other:[s[2],s[3]]});
    adj.get(k2).push({i:i,other:[s[0],s[1]]});
  });
  const used=new Array(segs.length).fill(false);
  const polylines=[];
  for(let i=0;i<segs.length;i++){
    if(used[i])continue;
    used[i]=true;
    const s=segs[i];
    const line=[[s[0],s[1]],[s[2],s[3]]];
    let cur=line[line.length-1];
    while(true){
      const opts=adj.get(key(cur[0],cur[1]))||[];
      let next=null;
      for(let q=0;q<opts.length;q++){if(!used[opts[q].i]){next=opts[q];break}}
      if(!next)break;
      used[next.i]=true;line.push(next.other);cur=next.other;
    }
    cur=line[0];
    while(true){
      const opts=adj.get(key(cur[0],cur[1]))||[];
      let next=null;
      for(let q=0;q<opts.length;q++){if(!used[opts[q].i]){next=opts[q];break}}
      if(!next)break;
      used[next.i]=true;line.unshift(next.other);cur=next.other;
    }
    if(line.length>=3)polylines.push(line);
  }
  return polylines;
}

function smoothPath(points,tension){
  if(points.length<2)return '';
  if(points.length===2)
    return 'M'+points[0][0].toFixed(1)+' '+points[0][1].toFixed(1)+
           ' L'+points[1][0].toFixed(1)+' '+points[1][1].toFixed(1);
  let d='M'+points[0][0].toFixed(1)+' '+points[0][1].toFixed(1);
  const t=tension||0.5;
  for(let i=0;i<points.length-1;i++){
    const p0=points[i-1]||points[i],p1=points[i],p2=points[i+1],p3=points[i+2]||p2;
    const c1x=p1[0]+(p2[0]-p0[0])/6*t, c1y=p1[1]+(p2[1]-p0[1])/6*t;
    const c2x=p2[0]-(p3[0]-p1[0])/6*t, c2y=p2[1]-(p3[1]-p1[1])/6*t;
    d+=' C'+c1x.toFixed(1)+' '+c1y.toFixed(1)+', '+c2x.toFixed(1)+' '+c2y.toFixed(1)+
       ', '+p2[0].toFixed(1)+' '+p2[1].toFixed(1);
  }
  return d;
}

function pickLevels(values,n){
  const valid=values.filter(v=>v!=null&&isFinite(v));
  if(!valid.length)return [];
  const sorted=valid.slice().sort((a,b)=>a-b);
  const lo=sorted[Math.floor(sorted.length*0.05)];
  const hi=sorted[Math.min(Math.floor(sorted.length*0.95),sorted.length-1)];
  if(hi-lo<5)return [];
  const levels=[];
  for(let i=1;i<=n;i++)levels.push(lo+(hi-lo)*(i/(n+1)));
  return levels;
}

/** Righe complete contigue partendo da sud (riga 0 = bordo inferiore). */
function completeRows(dem){
  let firstMissing=N_POINTS;
  for(let c=0;c<N_CHUNKS;c++){
    if(!dem.have[c]){firstMissing=c*CHUNK;break}
  }
  return Math.floor(firstMissing/GRID_W);
}

// ============================================================================
//  Rendering SVG (supporta il DEM parziale)
// ============================================================================
function renderSVG(id,dem,viewW,viewH){
  const rows=dem.complete?GRID_H:completeRows(dem);
  const cellW=viewW/(GRID_W-1), cellH=viewH/(GRID_H-1);
  const got=dem.have.filter(Boolean).length;
  const bg='<defs>'+
    '<linearGradient id="topobg-'+id+'" x1="0" x2="0" y1="0" y2="1">'+
    '<stop offset="0%" stop-color="#0a1813"/><stop offset="100%" stop-color="#050b09"/>'+
    '</linearGradient>'+
    '<pattern id="topohatch-'+id+'" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">'+
    '<line x1="0" y1="0" x2="0" y2="7" stroke="rgba(138,173,132,.13)" stroke-width="1"/>'+
    '</pattern></defs>'+
    '<rect width="'+viewW+'" height="'+viewH+'" fill="url(#topobg-'+id+')"/>';

  if(rows<2){
    return '<svg viewBox="0 0 '+viewW+' '+viewH+'" xmlns="http://www.w3.org/2000/svg" style="display:block">'+
      bg+'<rect width="'+viewW+'" height="'+viewH+'" fill="url(#topohatch-'+id+')"/>'+
      '<text x="'+(viewW/2)+'" y="'+(viewH/2)+'" fill="#5a6d5e" font-family="monospace" font-size="10" '+
      'letter-spacing="1.5" text-anchor="middle">ACQUISIZIONE DEM · '+got+'/'+N_CHUNKS+'</text></svg>';
  }

  const sub=dem.elev.slice(0,rows*GRID_W);
  const levels=pickLevels(sub,TARGET_LINES);
  if(!levels.length){
    return '<svg viewBox="0 0 '+viewW+' '+viewH+'" xmlns="http://www.w3.org/2000/svg" style="display:block">'+
      bg+'<text x="'+(viewW/2)+'" y="'+(viewH/2)+'" fill="#5a6d5e" font-family="monospace" font-size="11" '+
      'text-anchor="middle">FLAT TERRAIN — NO CONTOUR DATA</text></svg>';
  }

  let paths='';
  levels.forEach((lvl,li)=>{
    const segs=marchingSquares(sub,GRID_W,rows,lvl);
    const opacity=0.35+0.55*(li/levels.length);
    const stroke=0.5+0.7*(li/levels.length);
    segsToPolylines(segs).forEach(line=>{
      if(line.length<3)return;
      const pts=line.map(p=>[p[0]*cellW,viewH-p[1]*cellH]);
      paths+='<path d="'+smoothPath(pts,0.5)+'" fill="none" stroke="rgba(213,232,210,'+
        opacity.toFixed(2)+')" stroke-width="'+stroke.toFixed(2)+
        '" stroke-linecap="round" stroke-linejoin="round"/>';
    });
  });

  // banda "non ancora acquisita" (a nord, perche' la griglia parte da sud)
  let overlay='';
  if(rows<GRID_H){
    const bandH=viewH-(rows-1)*cellH;
    overlay='<rect x="0" y="0" width="'+viewW+'" height="'+bandH.toFixed(1)+
      '" fill="url(#topohatch-'+id+')"/>'+
      '<line x1="0" y1="'+bandH.toFixed(1)+'" x2="'+viewW+'" y2="'+bandH.toFixed(1)+
      '" stroke="rgba(138,173,132,.35)" stroke-width="1" stroke-dasharray="4 3"/>'+
      '<text x="'+(viewW-8)+'" y="'+Math.max(14,bandH-7).toFixed(1)+
      '" fill="#6f8a70" font-family="monospace" font-size="8" letter-spacing="1.2" '+
      'text-anchor="end">SETTORE NORD IN ACQUISIZIONE · '+got+'/'+N_CHUNKS+'</text>';
  }

  return '<svg viewBox="0 0 '+viewW+' '+viewH+'" xmlns="http://www.w3.org/2000/svg" style="display:block">'+
    bg+paths+overlay+'</svg>';
}

// ============================================================================
//  API principale
// ============================================================================
const _inflight=new Map();   // evita le richieste duplicate

/**
 * generate(id, viewW, viewH, onProgress)
 * onProgress({phase, source, svg, have, total, waitMs})
 *   phase: 'static' | 'repo' | 'local' | 'fetching' | 'waiting' | 'done' | 'stalled'
 */
function generateTopoSVG(id,viewW,viewH,onProgress){
  const k=id+'|'+viewW+'x'+viewH;
  if(_inflight.has(k))return _inflight.get(k);
  const p=_generate(id,viewW,viewH,onProgress);
  _inflight.set(k,p);
  p.then(()=>_inflight.delete(k),()=>_inflight.delete(k));
  return p;
}

async function _generate(id,viewW,viewH,onProgress){
  const emit=(o)=>{try{if(onProgress)onProgress(o)}catch(e){}};
  const bboxCalc=bboxOfCountry(id);

  // --- 0) archivio unico: se c'e' ed e' completo, si finisce qui -----------
  let fromBundle=null;
  try{fromBundle=await bundleDem(id,bboxCalc)}catch(e){fromBundle=null}
  if(fromBundle&&fromBundle.complete){
    const svgB=renderSVG(id,fromBundle,viewW,viewH);
    saveLocal(id,fromBundle);
    emit({phase:'done',source:'bundle',have:N_CHUNKS,total:N_CHUNKS,svg:svgB});
    return svgB;
  }

  const man=await manifest();
  const known=!!(man&&man.v);
  const isReady=known&&Array.isArray(man.ready)&&man.ready.indexOf(String(id))>-1;

  // --- 1) SVG gia' renderizzato nel repo -----------------------------------
  if(!known||isReady){
    try{
      const r=await fetch('topo/'+id+'.svg');
      if(r.ok){
        const txt=await r.text();
        if(txt.indexOf('<svg')>-1){
          emit({phase:'static',source:'repo-svg',have:N_CHUNKS,total:N_CHUNKS,svg:txt});
          return txt;
        }
      }
    }catch(e){}
  }

  // --- 2) DEM del repo + 3) cache locale, uniti ----------------------------
  const hasRepoDem=!known||isReady||!!(man.partial&&man.partial[String(id)]);
  const fromRepo=hasRepoDem?await repoDem(id):null;
  const fromLocal=loadLocal(id);
  let dem=mergeDem(mergeDem(fromBundle,fromRepo),fromLocal);

  if(!dem){
    if(!bboxCalc)return null;
    dem=emptyDem(id,bboxCalc);
  }
  dem.id=id;
  // il riquadro arriva sempre dalla sorgente dei dati, non si sovrascrive
  if(!Array.isArray(dem.bbox)||dem.bbox.length!==4){
    if(!bboxCalc)return null;
    dem.bbox=bboxCalc;
  }
  dem.complete=dem.have.every(Boolean);

  let svg=renderSVG(id,dem,viewW,viewH);
  const haveNow=dem.have.filter(Boolean).length;
  if(haveNow){
    emit({phase:(fromBundle||fromRepo)?'repo':'local',
          source:fromBundle?'bundle':(fromRepo?'repo-dem':'cache'),
          have:haveNow,total:N_CHUNKS,svg:svg});
  }

  if(dem.complete){
    saveLocal(id,dem);
    emit({phase:'done',source:fromBundle?'bundle':'repo',
          have:N_CHUNKS,total:N_CHUNKS,svg:svg});
    return svg;
  }

  // --- 4) solo i settori che ancora mancano --------------------------------
  emit({phase:'fetching',have:haveNow,total:N_CHUNKS,svg:svg,
        missing:missingChunks(dem).length});
  onWait(w=>emit({phase:'waiting',reason:w.reason,waitMs:w.ms,
                  have:dem.have.filter(Boolean).length,total:N_CHUNKS}));

  const res=await fetchMissing(id,dem,(d)=>{
    svg=renderSVG(id,d,viewW,viewH);
    emit({phase:'fetching',have:d.have.filter(Boolean).length,
          total:N_CHUNKS,svg:svg});
  });
  onWait(null);

  svg=renderSVG(id,res.dem,viewW,viewH);
  emit({phase:res.stopped?'stalled':'done',
        have:res.dem.have.filter(Boolean).length,total:N_CHUNKS,svg:svg,
        error:res.error?(res.error.message||'errore'):null});
  return svg;
}

// ============================================================================
//  Esportazione
// ============================================================================
window.GEOINT_TOPO={
  generate:generateTopoSVG,
  bbox:bboxOfCountry,
  manifest:manifest,
  bundle:bundle,
  grid:{w:GRID_W,h:GRID_H,chunk:CHUNK,chunks:N_CHUNKS},

  /** Diagnostica: da dove arriverebbero i dati di questo paese. */
  probe:async function(id){
    const b=await bundle();
    const e=b?b.countries[String(id)]:null;
    return {
      id:String(id),
      bundleCaricato:!!b,
      paesiNelBundle:b?Object.keys(b.countries).length:0,
      nelBundle:!!e,
      completoNelBundle:e?!e.h:false,
      riquadroBundle:e?e.b:null,
      riquadroCalcolato:bboxOfCountry(id),
      cacheLocale:!!loadLocal(id),
      richiesteOpenMeteo:Q.total,
      cooldownMs:cooldownLeft()
    };
  },

  /** DEM locale nel formato dei file del repo. */
  exportDem:function(id){
    const d=loadLocal(id);
    return d?JSON.stringify(d):null;
  },

  status:function(){
    return {requests:Q.total,penalty:penalty(),cooldownMs:cooldownLeft(),
            queued:Q.queue.length};
  },

  clearCache:function(){
    try{
      Object.keys(localStorage)
        .filter(k=>k.indexOf(CACHE_PREFIX)===0||k===COOLDOWN_KEY||k===PENALTY_KEY)
        .forEach(k=>localStorage.removeItem(k));
    }catch(e){}
    _bundle=null;_bundleP=null;_manifest=null;_manifestP=null;
  }
};
})();
