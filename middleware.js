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

function loginPage({ error = '', next = '/', notice = '' } = {}) {
  const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/';
  return `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>GEOINT // Accesso riservato</title>
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#131a17;--surface:rgba(20,30,26,.93);--border:rgba(190,207,184,.12);--accent:#8aad84;--green:#6b9e6f;--red:#c27066;--text:#9aaa97;--dim:#5a6d5e;--bright:#e8ebe5;--mono:'JetBrains Mono',ui-monospace,monospace;--sans:'EB Garamond',Garamond,Georgia,serif}
html,body{height:100%}
body{background:var(--bg);color:var(--text);font-family:var(--sans);display:flex;align-items:center;justify-content:center;padding:24px;
background-image:radial-gradient(circle at 50% 0%,rgba(138,173,132,.07),transparent 60%),
linear-gradient(rgba(190,207,184,.03) 1px,transparent 1px),
linear-gradient(90deg,rgba(190,207,184,.03) 1px,transparent 1px);
background-size:auto,42px 42px,42px 42px}
.card{width:100%;max-width:380px;background:var(--surface);border:1px solid var(--border);border-radius:8px;backdrop-filter:blur(14px);overflow:hidden;box-shadow:0 24px 70px rgba(0,0,0,.55)}
.head{padding:22px 26px 18px;border-bottom:1px solid var(--border)}
.logo{display:flex;align-items:center;gap:9px;font-size:14px;font-weight:600;letter-spacing:1.6px;color:var(--accent)}
.dot{width:6px;height:6px;border-radius:50%;background:var(--green);box-shadow:0 0 7px var(--green);animation:blink 2.5s infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}
.sub{margin-top:7px;font-family:var(--mono);font-size:9px;letter-spacing:1.3px;text-transform:uppercase;color:var(--dim)}
form{padding:22px 26px 26px}
label{display:block;font-family:var(--mono);font-size:9px;letter-spacing:1.1px;text-transform:uppercase;color:var(--dim);margin-bottom:6px}
input{width:100%;padding:10px 12px;margin-bottom:16px;background:rgba(255,255,255,.02);border:1px solid var(--border);border-radius:4px;color:var(--bright);font-family:var(--mono);font-size:13px;outline:none;transition:border-color .2s,background .2s}
input:focus{border-color:var(--accent);background:rgba(138,173,132,.07)}
button{width:100%;padding:11px;background:rgba(138,173,132,.13);border:1px solid rgba(138,173,132,.4);border-radius:4px;color:var(--accent);font-family:var(--sans);font-size:13px;font-weight:600;letter-spacing:.6px;cursor:pointer;transition:background .2s,color .2s}
button:hover{background:rgba(138,173,132,.24);color:var(--bright)}
.msg{padding:9px 11px;margin-bottom:16px;border-radius:4px;font-family:var(--mono);font-size:10px;line-height:1.6;letter-spacing:.3px}
.err{background:rgba(194,112,102,.1);border:1px solid rgba(194,112,102,.35);color:var(--red)}
.note{background:rgba(184,154,74,.09);border:1px solid rgba(184,154,74,.32);color:#b89a4a}
.foot{padding:0 26px 22px;font-family:var(--mono);font-size:8px;letter-spacing:.9px;color:var(--dim);text-align:center;text-transform:uppercase}
</style>
</head>
<body>
<div class="card">
  <div class="head">
    <div class="logo"><span class="dot"></span>GEOINT</div>
    <div class="sub">Accesso riservato · autenticazione richiesta</div>
  </div>
  <form method="POST" action="/login" autocomplete="on">
    <input type="hidden" name="next" value="${safeNext.replace(/"/g, '&quot;')}">
    ${notice ? `<div class="msg note">${notice}</div>` : ''}
    ${error ? `<div class="msg err">${error}</div>` : ''}
    <label for="u">Nome utente</label>
    <input id="u" name="username" type="text" autocomplete="username" autofocus required>
    <label for="p">Password</label>
    <input id="p" name="password" type="password" autocomplete="current-password" required>
    <button type="submit">Accedi</button>
  </form>
  <div class="foot">Strategic Globe · sessione protetta</div>
</div>
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
