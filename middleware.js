// ============================================================================
//  GEOINT — Gate di accesso (Vercel Edge Middleware)
// ----------------------------------------------------------------------------
//  Blocca OGNI richiesta al sito e alle API finche' l'utente non fa login.
//  Le credenziali NON stanno in questo file: si configurano su Vercel come
//  variabili d'ambiente (vedi LOGIN_SETUP.md).
//
//    AUTH_USERS      -> "mario:passwordMario,anna:passwordAnna"
//    SESSION_SECRET  -> stringa casuale lunga (firma il cookie di sessione)
//    SESSION_HOURS   -> (opzionale) durata sessione in ore, default 12
// ============================================================================

export const config = {
  matcher: '/((?!_vercel|favicon\\.ico|robots\\.txt).*)',
};

const COOKIE_NAME = 'geoint_session';

// ---------------------------------------------------------------- utilities

const enc = new TextEncoder();

function b64url(bytes) {
  let s = '';
  const arr = new Uint8Array(bytes);
  for (let i = 0; i < arr.length; i++) s += String.fromCharCode(arr[i]);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function hmac(secret, message) {
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return b64url(sig);
}

// confronto a tempo costante (evita di far trapelare la password un carattere
// alla volta misurando i tempi di risposta)
function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function parseUsers(raw) {
  const users = new Map();
  if (!raw) return users;
  for (const entry of raw.split(',')) {
    const line = entry.trim();
    if (!line) continue;
    const i = line.indexOf(':');
    if (i <= 0) continue;
    users.set(line.slice(0, i).trim().toLowerCase(), line.slice(i + 1));
  }
  return users;
}

function readCookie(request, name) {
  const header = request.headers.get('cookie') || '';
  for (const part of header.split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === name) return decodeURIComponent(v.join('='));
  }
  return null;
}

// ------------------------------------------------------------------ session

async function makeSession(user, secret, hours) {
  const exp = Date.now() + hours * 3600 * 1000;
  const payload = `${b64url(enc.encode(user))}.${exp}`;
  return `${payload}.${await hmac(secret, payload)}`;
}

async function readSession(token, secret) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [u, exp, sig] = parts;
  const expected = await hmac(secret, `${u}.${exp}`);
  if (!safeEqual(sig, expected)) return null;
  if (!Number(exp) || Date.now() > Number(exp)) return null;
  return { exp: Number(exp) };
}

// -------------------------------------------------------------- login page

// -------------------------------------------------------------- login page
//
// Lo sfondo e' una vera mappa topografica generata al volo su <canvas>:
// rumore di Perlin (fBm + componente "ridged" per le catene montuose) ->
// campo di quote -> ombreggiatura collinare + curve di livello con marching
// squares, curve indice ogni 5 livelli, linea di costa, quote puntuali.
// Nessuna immagine da scaricare: e' tutto matematica, ~6 KB.

function loginPage({ error = '', next = '/', notice = '' } = {}) {
  const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/';
  return `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark">
<title>GEOINT // Accesso riservato</title>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@300;400;500&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#0a120e;--surface:rgba(15,25,20,.89);--border:rgba(190,207,184,.14);
  --accent:#8aad84;--green:#6b9e6f;--red:#c27066;--amber:#b89a4a;
  --text:#9aaa97;--dim:#5a6d5e;--bright:#e8ebe5;
  --mono:'IBM Plex Mono',ui-monospace,SFMono-Regular,monospace;
  --sans:'EB Garamond','Cormorant Garamond',Garamond,Georgia,serif;
  --display:'Cormorant Garamond','EB Garamond',Garamond,Georgia,serif;
}
html,body{height:100%}
body{background:var(--bg);color:var(--text);font-family:var(--sans);
  display:flex;align-items:center;justify-content:center;padding:24px;
  overflow:hidden;position:relative}

/* --- sfondo: rilievo + veli --- */
#relief{position:fixed;top:-4vh;left:-4vw;z-index:0;pointer-events:none;
  will-change:transform;transition:opacity 1.1s ease;opacity:0}
#relief.on{opacity:1}
.veil{position:fixed;inset:0;z-index:1;pointer-events:none}
.veil.grid{background-image:
  linear-gradient(rgba(190,207,184,.028) 1px,transparent 1px),
  linear-gradient(90deg,rgba(190,207,184,.028) 1px,transparent 1px);
  background-size:44px 44px}
.veil.vign{background:
  radial-gradient(ellipse 78% 68% at 50% 45%,transparent 0%,rgba(6,11,9,.34) 68%,rgba(5,9,7,.74) 100%)}

/* --- scheda --- */
.card{position:relative;z-index:3;width:100%;max-width:340px;
  background:var(--surface);border:1px solid var(--border);border-radius:8px;
  backdrop-filter:blur(22px) saturate(1.15);-webkit-backdrop-filter:blur(22px) saturate(1.15);
  box-shadow:0 30px 90px rgba(0,0,0,.62),0 0 0 1px rgba(0,0,0,.35),
    inset 0 1px 0 rgba(232,235,229,.05);
  animation:rise .7s cubic-bezier(.2,.7,.3,1) both}
@keyframes rise{from{opacity:0;transform:translateY(14px) scale(.985)}to{opacity:1;transform:none}}
.card.shake{animation:shake .5s}
@keyframes shake{10%,90%{transform:translateX(-2px)}20%,80%{transform:translateX(4px)}
  30%,50%,70%{transform:translateX(-6px)}40%,60%{transform:translateX(6px)}}
/* crocini d'angolo, come i reperi di stampa di una carta */
.card::before,.card::after{content:'';position:absolute;width:13px;height:13px;
  border:1px solid rgba(138,173,132,.42);pointer-events:none}
.card::before{top:-1px;left:-1px;border-right:0;border-bottom:0;border-radius:9px 0 0 0}
.card::after{bottom:-1px;right:-1px;border-left:0;border-top:0;border-radius:0 0 9px 0}

.head{padding:17px 24px 14px;border-bottom:1px solid var(--border);position:relative}
.head::after{content:'';position:absolute;left:24px;right:24px;bottom:-1px;height:1px;
  background:linear-gradient(90deg,rgba(138,173,132,.5),transparent 65%)}
.logo{display:block;font-family:var(--display);
  font-size:19px;font-weight:600;letter-spacing:3.4px;line-height:1;
  color:var(--accent);text-transform:uppercase;
  font-feature-settings:'liga' 1,'kern' 1}
form{padding:18px 24px 21px}
label{display:flex;justify-content:space-between;align-items:baseline;
  font-family:var(--sans);font-size:10.5px;font-weight:500;letter-spacing:1.5px;
  text-transform:uppercase;color:var(--dim);margin-bottom:5px}
.field{position:relative;margin-bottom:13px}
input{width:100%;padding:10px 12px;background:rgba(0,0,0,.22);
  border:1px solid var(--border);border-radius:5px;color:var(--bright);
  font-family:var(--mono);font-weight:400;font-size:12px;letter-spacing:.3px;outline:none;
  transition:border-color .18s,background .18s,box-shadow .18s}
input::placeholder{color:rgba(90,109,94,.55)}
input:focus{border-color:rgba(138,173,132,.65);background:rgba(138,173,132,.06);
  box-shadow:0 0 0 3px rgba(138,173,132,.09)}
.caps{font-family:var(--mono);font-size:7.5px;font-weight:400;letter-spacing:.7px;color:var(--amber);
  opacity:0;transition:opacity .2s}
.caps.on{opacity:1}
button{width:100%;padding:11px;margin-top:4px;background:rgba(138,173,132,.14);
  border:1px solid rgba(138,173,132,.42);border-radius:5px;color:var(--accent);
  font-family:var(--display);font-size:15px;font-weight:600;letter-spacing:2.6px;
  text-transform:uppercase;cursor:pointer;
  transition:background .18s,color .18s,border-color .18s}
button:hover{background:rgba(138,173,132,.26);color:var(--bright);
  border-color:rgba(138,173,132,.65)}
button:active{transform:translateY(1px)}
button[disabled]{opacity:.6;cursor:progress}
.msg{padding:10px 12px;margin-bottom:15px;border-radius:5px;font-family:var(--sans);
  font-size:12px;line-height:1.5;letter-spacing:.2px}
.err{background:rgba(194,112,102,.1);border:1px solid rgba(194,112,102,.35);color:var(--red)}
.note{background:rgba(184,154,74,.09);border:1px solid rgba(184,154,74,.32);color:var(--amber)}
@media(prefers-reduced-motion:reduce){
  *{animation:none!important;transition:none!important}
}
</style>
</head>
<body>
<canvas id="relief"></canvas>
<div class="veil grid"></div>
<div class="veil vign"></div>

<div class="card" id="card">
  <div class="head">
    <div class="logo">GEOINT</div>
  </div>
  <form method="POST" action="/login" autocomplete="on" id="f">
    <input type="hidden" name="next" value="${safeNext.replace(/"/g, '&quot;')}">
    ${notice ? `<div class="msg note">${notice}</div>` : ''}
    ${error ? `<div class="msg err">${error}</div>` : ''}
    <div class="field">
      <label for="u">Nome utente</label>
      <input id="u" name="username" type="text" autocomplete="username" autofocus required spellcheck="false">
    </div>
    <div class="field">
      <label for="p">Password <span class="caps" id="caps">BLOC MAIUSC ATTIVO</span></label>
      <input id="p" name="password" type="password" autocomplete="current-password" required>
    </div>
    <button type="submit" id="go">Accedi</button>
  </form>
</div>

<script>
(function(){
  'use strict';
  var cv=document.getElementById('relief');
  if(!cv||!cv.getContext)return;
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- rumore di Perlin 2D (gradienti, tabella di permutazione) -----
  function rnd(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;
    var t=Math.imul(seed^seed>>>15,1|seed);
    t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
  var R=rnd(Date.now()&0xffff), perm=new Uint8Array(512);
  (function(){var p=[],i;for(i=0;i<256;i++)p[i]=i;
    for(i=255;i>0;i--){var j=(R()*(i+1))|0,t=p[i];p[i]=p[j];p[j]=t}
    for(i=0;i<512;i++)perm[i]=p[i&255]})();
  var GX=[1,-1,1,-1,1,-1,0,0], GY=[1,1,-1,-1,0,0,1,-1];
  function fade(t){return t*t*t*(t*(t*6-15)+10)}
  function perlin(x,y){
    var X=Math.floor(x)&255, Y=Math.floor(y)&255;
    x-=Math.floor(x); y-=Math.floor(y);
    var u=fade(x), v=fade(y);
    function g(ix,iy,dx,dy){var h=perm[perm[ix]+iy]&7;return GX[h]*dx+GY[h]*dy}
    var n00=g(X,Y,x,y), n10=g(X+1,Y,x-1,y),
        n01=g(X,Y+1,x,y-1), n11=g(X+1,Y+1,x-1,y-1);
    return (n00+u*(n10-n00))+v*((n01+u*(n11-n01))-(n00+u*(n10-n00)));
  }
  // fBm + componente "ridged": le creste danno catene montuose credibili
  function terrain(x,y){
    var s=0,a=1,f=1,i,tot=0;
    for(i=0;i<5;i++){s+=perlin(x*f,y*f)*a;tot+=a;a*=0.5;f*=2.05}
    var base=s/tot;
    var r=0;a=1;f=1.6;tot=0;
    for(i=0;i<4;i++){r+=(1-Math.abs(perlin(x*f+40,y*f-17)))*a;tot+=a;a*=0.5;f*=2.1}
    var ridge=r/tot;
    // continenti larghi + creste concentrate dove il terreno e' gia' alto
    return base*0.72+(ridge-0.55)*Math.max(0,base+0.35)*1.05;
  }

  var C={contours:[],GW:0,GH:0,cw:0,ch:0};

  function draw(){
    var W=Math.round(window.innerWidth*1.08), H=Math.round(window.innerHeight*1.08);
    var dpr=Math.min(window.devicePixelRatio||1,2);
    cv.style.width=W+'px'; cv.style.height=H+'px';
    cv.width=Math.round(W*dpr); cv.height=Math.round(H*dpr);
    var ctx=cv.getContext('2d');
    ctx.setTransform(dpr,0,0,dpr,0,0);

    // --- campo di quote su griglia grossolana (una cella ~ 5 px) ---
    var STEP=5;
    var GW=Math.ceil(W/STEP)+1, GH=Math.ceil(H/STEP)+1;
    var hgt=new Float32Array(GW*GH);
    var sc=0.0031, ox=R()*120, oy=R()*120;
    var min=1e9,max=-1e9,i,j;
    for(j=0;j<GH;j++)for(i=0;i<GW;i++){
      var v=terrain(i*STEP*sc+ox,j*STEP*sc+oy);
      hgt[j*GW+i]=v; if(v<min)min=v; if(v>max)max=v;
    }
    // normalizza in metri: da -600 (fondale) a 3000 (vetta)
    var span=(max-min)||1;
    for(i=0;i<hgt.length;i++)hgt[i]=((hgt[i]-min)/span)*3600-600;

    // --- ombreggiatura collinare su canvas ausiliario, poi scalata ---
    var off=document.createElement('canvas'); off.width=GW; off.height=GH;
    var octx=off.getContext('2d'), img=octx.createImageData(GW,GH), d=img.data;
    var LX=-0.62, LY=-0.66, LZ=0.42;  // luce da nord-ovest, radente
    for(j=0;j<GH;j++)for(i=0;i<GW;i++){
      var k=j*GW+i, h=hgt[k];
      var hl=hgt[j*GW+(i>0?i-1:i)], hr=hgt[j*GW+(i<GW-1?i+1:i)];
      var hu=hgt[(j>0?j-1:j)*GW+i], hd=hgt[(j<GH-1?j+1:j)*GW+i];
      var nx=(hl-hr)/120, ny=(hu-hd)/120, nz=1;
      var len=Math.sqrt(nx*nx+ny*ny+1);
      var sh=(nx*LX+ny*LY+nz*LZ)/len;
      sh=0.44+0.80*Math.max(0,Math.min(1,sh*0.5+0.5));
      var r,g,b;
      if(h<0){                       // acqua: piu' fredda e piu' scura col fondale
        var t=Math.max(0,Math.min(1,(h+600)/600));
        r=5+5*t; g=12+9*t; b=13+10*t; sh=0.86+0.14*t;
      } else {                       // terra: verde che schiarisce con la quota
        var e=Math.max(0,Math.min(1,h/3000));
        r=10+26*e; g=19+40*e; b=15+27*e;
      }
      var o=k*4;
      d[o]=Math.min(255,r*sh); d[o+1]=Math.min(255,g*sh);
      d[o+2]=Math.min(255,b*sh); d[o+3]=255;
    }
    octx.putImageData(img,0,0);
    ctx.clearRect(0,0,W,H);
    ctx.imageSmoothingEnabled=true;
    ctx.imageSmoothingQuality='high';
    ctx.drawImage(off,0,0,GW,GH,0,0,W,H);

    // --- curve di livello (marching squares sullo stesso campo) ---
    var INTERVAL=40, levels=[], L;
    for(L=-560;L<3000;L+=INTERVAL)levels.push(L);
    var cw=W/(GW-1), ch=H/(GH-1);
    ctx.lineCap='round'; ctx.lineJoin='round';
    for(var li=0;li<levels.length;li++){
      var lv=levels[li];
      var isSea=(lv>=-INTERVAL/2&&lv<INTERVAL/2);
      var isIndex=(Math.round(lv/INTERVAL)%5===0);
      if(isSea){ctx.strokeStyle='rgba(150,196,186,.42)';ctx.lineWidth=1.15}
      else if(lv<0){ctx.strokeStyle='rgba(120,170,168,.13)';ctx.lineWidth=.6}
      else if(isIndex){ctx.strokeStyle='rgba(206,228,200,.30)';ctx.lineWidth=1.05}
      else{ctx.strokeStyle='rgba(206,228,200,.145)';ctx.lineWidth=.62}
      ctx.beginPath();
      for(j=0;j<GH-1;j++)for(i=0;i<GW-1;i++){
        var tl=hgt[j*GW+i], tr=hgt[j*GW+i+1],
            br=hgt[(j+1)*GW+i+1], bl=hgt[(j+1)*GW+i];
        var code=(tl>lv?8:0)|(tr>lv?4:0)|(br>lv?2:0)|(bl>lv?1:0);
        if(code===0||code===15)continue;
        var ip=function(a,b){return b===a?.5:(lv-a)/(b-a)};
        var T=[(i+ip(tl,tr))*cw,j*ch], Rr=[(i+1)*cw,(j+ip(tr,br))*ch],
            B=[(i+ip(bl,br))*cw,(j+1)*ch], Lf=[i*cw,(j+ip(tl,bl))*ch];
        var seg=null;
        if(code===1||code===14)seg=[Lf,B];
        else if(code===2||code===13)seg=[B,Rr];
        else if(code===3||code===12)seg=[Lf,Rr];
        else if(code===4||code===11)seg=[T,Rr];
        else if(code===6||code===9)seg=[T,B];
        else if(code===7||code===8)seg=[Lf,T];
        else if(code===5){ctx.moveTo(Lf[0],Lf[1]);ctx.lineTo(T[0],T[1]);
          ctx.moveTo(B[0],B[1]);ctx.lineTo(Rr[0],Rr[1])}
        else if(code===10){ctx.moveTo(T[0],T[1]);ctx.lineTo(Rr[0],Rr[1]);
          ctx.moveTo(Lf[0],Lf[1]);ctx.lineTo(B[0],B[1])}
        if(seg){ctx.moveTo(seg[0][0],seg[0][1]);ctx.lineTo(seg[1][0],seg[1][1])}
      }
      ctx.stroke();
    }

    cv.classList.add('on');
  }

  // deriva lentissima: il canvas e' piu' grande della finestra, quindi si
  // sposta senza scoprire i bordi e senza ricalcolare il rilievo
  function drift(){
    if(reduce)return;
    var t0=Date.now();
    (function loop(){
      var t=(Date.now()-t0)/1000;
      cv.style.transform='translate3d('+(Math.sin(t/41)*17).toFixed(2)+'px,'+
        (Math.cos(t/57)*13).toFixed(2)+'px,0) scale(1.015)';
      requestAnimationFrame(loop);
    })();
  }

  try{draw();drift()}catch(e){cv.style.display='none'}
  var rt;
  window.addEventListener('resize',function(){
    clearTimeout(rt);
    rt=setTimeout(function(){try{draw()}catch(e){}},260);
  });

  // --- rifiniture del modulo ---
  var pw=document.getElementById('p'), caps=document.getElementById('caps');
  function capsCheck(e){
    if(!caps||!e.getModifierState)return;
    caps.className='caps'+(e.getModifierState('CapsLock')?' on':'');
  }
  if(pw){pw.addEventListener('keyup',capsCheck);pw.addEventListener('keydown',capsCheck)}
  var f=document.getElementById('f'), go=document.getElementById('go');
  if(f&&go)f.addEventListener('submit',function(){
    go.disabled=true;go.textContent='Verifica in corso…';
  });
  var card=document.getElementById('card');
  if(card&&document.querySelector('.err')){
    card.classList.add('shake');
    setTimeout(function(){card.classList.remove('shake')},600);
  }
})();
</script>
</body>
</html>`;
}

const html = (body, status = 200, headers = {}) =>
  new Response(body, {
    status,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store, no-cache, must-revalidate',
      ...headers,
    },
  });

// --------------------------------------------------------------- middleware

export default async function middleware(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  const secret = process.env.SESSION_SECRET;
  const users = parseUsers(process.env.AUTH_USERS);
  const hours = Number(process.env.SESSION_HOURS) > 0 ? Number(process.env.SESSION_HOURS) : 12;

  // Configurazione mancante: meglio bloccare tutto che aprire il sito a tutti.
  if (!secret || users.size === 0) {
    return html(
      loginPage({
        notice:
          'Login non configurato. Imposta le variabili AUTH_USERS e SESSION_SECRET nelle impostazioni del progetto su Vercel, poi rilancia il deploy.',
      }),
      503
    );
  }

  // --- logout ---
  if (path === '/logout') {
    return new Response(null, {
      status: 302,
      headers: {
        location: '/login',
        'set-cookie': `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`,
      },
    });
  }

  // --- invio del form di login ---
  if (path === '/login' && request.method === 'POST') {
    let form;
    try {
      form = await request.formData();
    } catch {
      return html(loginPage({ error: 'Richiesta non valida.' }), 400);
    }
    const username = String(form.get('username') || '').trim().toLowerCase();
    const password = String(form.get('password') || '');
    const next = String(form.get('next') || '/');

    const expected = users.get(username);
    if (!expected || !safeEqual(password, expected)) {
      // piccola pausa: rende scomodi i tentativi automatici a raffica
      await new Promise((r) => setTimeout(r, 400));
      return html(
        loginPage({ error: 'Nome utente o password non corretti.', next }),
        401
      );
    }

    const token = await makeSession(username, secret, hours);
    const dest = next.startsWith('/') && !next.startsWith('//') ? next : '/';
    return new Response(null, {
      status: 303,
      headers: {
        location: dest,
        'set-cookie': `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${hours * 3600}`,
      },
    });
  }

  const session = await readSession(readCookie(request, COOKIE_NAME), secret);

  // --- pagina di login ---
  if (path === '/login') {
    if (session) return Response.redirect(new URL('/', request.url), 302);
    return html(loginPage({ next: url.searchParams.get('next') || '/' }));
  }

  // --- tutto il resto: serve una sessione valida ---
  if (!session) {
    // le chiamate API rispondono in JSON, non con una pagina HTML
    if (path.startsWith('/api/')) {
      return new Response(JSON.stringify({ error: 'unauthorized' }), {
        status: 401,
        headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
      });
    }
    const redirect = new URL('/login', request.url);
    redirect.searchParams.set('next', path + url.search);
    return Response.redirect(redirect, 302);
  }

  // sessione valida -> la richiesta prosegue normalmente
  return;
}
