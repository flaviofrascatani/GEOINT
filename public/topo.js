// ============================================================================
// GEOINT v7 — Topographic Map Generator
// Fetches DEM data from Open-Meteo Elevation API for a country's bounding box,
// runs marching squares to extract contour lines at adaptive elevation levels,
// renders as an SVG in the Geography panel.
// ============================================================================
(function(){
const TOPO_GRID_W=56;   // grid columns
const TOPO_GRID_H=40;   // grid rows
const TARGET_LINES=14;  // adaptive: aim for ~14 contour levels per country
const CACHE_PREFIX='gx_topo_';
const CACHE_VERSION='v2';

// ---- Bounding box from country polygons ----
function bboxOfCountry(id){
  const cp=window.countryPolys;
  if(!cp||!cp[id])return null;
  let minLng=Infinity,maxLng=-Infinity,minLat=Infinity,maxLat=-Infinity;
  cp[id].forEach(poly=>{
    const ring=poly[0];if(!ring)return;
    // Unwrap ring to detect antimeridian crossings
    let prev=null;let unwrapped=[];
    ring.forEach(p=>{
      let lng=p[0];
      if(prev!==null){
        while(lng-prev>180)lng-=360;
        while(lng-prev<-180)lng+=360;
      }
      unwrapped.push([lng,p[1]]);
      prev=lng;
    });
    unwrapped.forEach(([lng,lat])=>{
      if(lng<minLng)minLng=lng;
      if(lng>maxLng)maxLng=lng;
      if(lat<minLat)minLat=lat;
      if(lat>maxLat)maxLat=lat;
    });
  });
  if(!isFinite(minLng))return null;
  // Tiny padding so coastline isn't on the edge
  const padLng=(maxLng-minLng)*0.04;
  const padLat=(maxLat-minLat)*0.04;
  return {minLng:minLng-padLng,maxLng:maxLng+padLng,minLat:minLat-padLat,maxLat:maxLat+padLat};
}

// ---- Fetch elevation grid from Open-Meteo ----
async function fetchElevationGrid(bbox){
  const lats=[],lngs=[];
  for(let j=0;j<TOPO_GRID_H;j++){
    const lat=bbox.minLat+(bbox.maxLat-bbox.minLat)*(j/(TOPO_GRID_H-1));
    for(let i=0;i<TOPO_GRID_W;i++){
      const lng=bbox.minLng+(bbox.maxLng-bbox.minLng)*(i/(TOPO_GRID_W-1));
      lats.push(lat.toFixed(4));
      lngs.push(((lng+540)%360-180).toFixed(4));
    }
  }
  // Open-Meteo allows up to ~100 coords per request via query string; split if needed.
  const CHUNK=100;
  const elevations=new Array(lats.length);
  for(let s=0;s<lats.length;s+=CHUNK){
    const part_lat=lats.slice(s,s+CHUNK).join(',');
    const part_lng=lngs.slice(s,s+CHUNK).join(',');
    const url=`https://api.open-meteo.com/v1/elevation?latitude=${part_lat}&longitude=${part_lng}`;
    const resp=await fetch(url);
    if(!resp.ok)throw new Error('Open-Meteo HTTP '+resp.status);
    const j=await resp.json();
    if(!j.elevation)throw new Error('No elevation in response');
    j.elevation.forEach((e,i)=>{elevations[s+i]=(typeof e==='number')?e:0});
  }
  return elevations;
}

// ---- Marching squares: extract contour line segments at a given level ----
// Grid is W×H of values; returns array of segments [[x1,y1,x2,y2], ...] in grid coords.
function marchingSquares(grid,W,H,level){
  const segs=[];
  const interp=(a,b)=>(level-a)/(b-a);
  for(let y=0;y<H-1;y++){
    for(let x=0;x<W-1;x++){
      const tl=grid[y*W+x], tr=grid[y*W+x+1], br=grid[(y+1)*W+x+1], bl=grid[(y+1)*W+x];
      let code=0;
      if(tl>level)code|=8;
      if(tr>level)code|=4;
      if(br>level)code|=2;
      if(bl>level)code|=1;
      if(code===0||code===15)continue;
      // Edge intersection points (top, right, bottom, left of cell)
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

// ---- Connect segments into polylines (greedy point-matching with epsilon) ----
function segsToPolylines(segs){
  const eps=0.001;
  const key=(x,y)=>x.toFixed(3)+'_'+y.toFixed(3);
  const heads=new Map(); // key -> {seg, end:'a'|'b', used:false}
  segs.forEach((s,i)=>{
    heads.set(key(s[0],s[1])+'#'+i,{seg:s,which:0,used:false,idx:i});
    heads.set(key(s[2],s[3])+'#'+i,{seg:s,which:1,used:false,idx:i});
  });
  // Build adjacency by point key (without #i suffix)
  const adj=new Map();
  segs.forEach((s,i)=>{
    const k1=key(s[0],s[1]),k2=key(s[2],s[3]);
    if(!adj.has(k1))adj.set(k1,[]);
    if(!adj.has(k2))adj.set(k2,[]);
    adj.get(k1).push({i,end:0,other:[s[2],s[3]]});
    adj.get(k2).push({i,end:1,other:[s[0],s[1]]});
  });
  const used=new Array(segs.length).fill(false);
  const polylines=[];
  for(let i=0;i<segs.length;i++){
    if(used[i])continue;
    used[i]=true;
    const s=segs[i];
    const line=[[s[0],s[1]],[s[2],s[3]]];
    // Extend forward
    let cur=line[line.length-1];
    while(true){
      const k=key(cur[0],cur[1]);
      const opts=adj.get(k)||[];
      let next=null;
      for(const o of opts){if(!used[o.i]){next=o;break}}
      if(!next)break;
      used[next.i]=true;
      line.push(next.other);
      cur=next.other;
    }
    // Extend backward
    cur=line[0];
    while(true){
      const k=key(cur[0],cur[1]);
      const opts=adj.get(k)||[];
      let next=null;
      for(const o of opts){if(!used[o.i]){next=o;break}}
      if(!next)break;
      used[next.i]=true;
      line.unshift(next.other);
      cur=next.other;
    }
    if(line.length>=3)polylines.push(line);
  }
  return polylines;
}

// ---- Catmull-Rom smoothing → SVG path string ----
function smoothPath(points,tension){
  if(points.length<2)return '';
  if(points.length===2)return `M${points[0][0]} ${points[0][1]} L${points[1][0]} ${points[1][1]}`;
  let d=`M${points[0][0]} ${points[0][1]}`;
  const t=tension||0.5;
  for(let i=0;i<points.length-1;i++){
    const p0=points[i-1]||points[i];
    const p1=points[i];
    const p2=points[i+1];
    const p3=points[i+2]||p2;
    const c1x=p1[0]+(p2[0]-p0[0])/6*t;
    const c1y=p1[1]+(p2[1]-p0[1])/6*t;
    const c2x=p2[0]-(p3[0]-p1[0])/6*t;
    const c2y=p2[1]-(p3[1]-p1[1])/6*t;
    d+=` C${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2[0]} ${p2[1]}`;
  }
  return d;
}

// ---- Adaptive level selection ----
function pickLevels(grid,n){
  const valid=grid.filter(v=>v!=null&&isFinite(v));
  if(!valid.length)return [];
  const sorted=valid.slice().sort((a,b)=>a-b);
  const lo=sorted[Math.floor(sorted.length*0.05)];
  const hi=sorted[Math.floor(sorted.length*0.95)];
  if(hi-lo<5)return []; // flat country, no contours
  const levels=[];
  for(let i=1;i<=n;i++)levels.push(lo+(hi-lo)*(i/(n+1)));
  return levels;
}

// ---- Main: generate SVG for a country ----
async function generateTopoSVG(id,viewW,viewH){
  // Cache check
  const cacheKey=CACHE_PREFIX+CACHE_VERSION+'_'+id;
  let cached=null;
  try{cached=JSON.parse(localStorage.getItem(cacheKey)||'null')}catch(e){}
  let grid,bbox;
  if(cached&&cached.grid&&cached.bbox){
    grid=cached.grid;bbox=cached.bbox;
  } else {
    bbox=bboxOfCountry(id);
    if(!bbox)return null;
    try{
      grid=await fetchElevationGrid(bbox);
      try{localStorage.setItem(cacheKey,JSON.stringify({grid,bbox}))}catch(e){/* quota */}
    }catch(e){
      console.warn('[topo] fetch failed for',id,e.message);
      return null;
    }
  }
  const levels=pickLevels(grid,TARGET_LINES);
  if(!levels.length){
    return `<svg viewBox="0 0 ${viewW} ${viewH}" xmlns="http://www.w3.org/2000/svg" style="display:block"><rect width="${viewW}" height="${viewH}" fill="#0b1410"/><text x="${viewW/2}" y="${viewH/2}" fill="#5a6d5e" font-family="IBM Plex Mono" font-size="11" text-anchor="middle">FLAT TERRAIN — NO CONTOUR DATA</text></svg>`;
  }
  // Build SVG
  const cellW=viewW/(TOPO_GRID_W-1), cellH=viewH/(TOPO_GRID_H-1);
  let paths='';
  levels.forEach((lvl,li)=>{
    const segs=marchingSquares(grid,TOPO_GRID_W,TOPO_GRID_H,lvl);
    const polylines=segsToPolylines(segs);
    // Map grid coords → svg coords (flip Y because grid lat increases from south to north)
    const opacity=0.35+0.55*(li/levels.length);
    const stroke=0.5+0.7*(li/levels.length);
    polylines.forEach(line=>{
      if(line.length<3)return;
      const pts=line.map(([gx,gy])=>[gx*cellW,viewH-gy*cellH]);
      paths+=`<path d="${smoothPath(pts,0.5)}" fill="none" stroke="rgba(213,232,210,${opacity.toFixed(2)})" stroke-width="${stroke.toFixed(2)}" stroke-linecap="round" stroke-linejoin="round"/>`;
    });
  });
  return `<svg viewBox="0 0 ${viewW} ${viewH}" xmlns="http://www.w3.org/2000/svg" style="display:block">
    <defs><linearGradient id="topobg-${id}" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="#0a1813"/>
      <stop offset="100%" stop-color="#050b09"/>
    </linearGradient></defs>
    <rect width="${viewW}" height="${viewH}" fill="url(#topobg-${id})"/>
    ${paths}
  </svg>`;
}

// ---- Public API ----
window.GEOINT_TOPO={
  generate:generateTopoSVG,
  bbox:bboxOfCountry,
  clearCache:function(){
    Object.keys(localStorage).filter(k=>k.startsWith(CACHE_PREFIX)).forEach(k=>localStorage.removeItem(k));
  }
};
})();
