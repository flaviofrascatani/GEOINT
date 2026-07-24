# GEOINT v9 — Agente automatico per eventi geopolitici

Questa versione aggiunge un **agente autonomo** che ogni 30 min / 1 h / 2 h
(a tua scelta) analizza notizie da feed RSS gratuiti, ne estrae quelle
strategicamente rilevanti, le classifica per gravità su scala 1-5 e le
inserisce **direttamente in `public/events.json`**. Il front-end le scarica
automaticamente. Nessuna API a pagamento richiesta.

## Architettura

```
RSS gratuiti  →  Python agent  →  LLM Groq (free)  →  events.json
                       ↑                                    │
                GitHub Actions cron                         │
                                                            ▼
                                  public/events.json (commit & push)
                                                            │
                                                            ▼
                                  Vercel ri-deploy automatico
                                                            │
                                                            ▼
                                  Front-end: fetch ogni 5 min
```

I dati non finiscono nella cache di un singolo dispositivo: vengono
committati in `public/events.json` e serviti da Vercel a chiunque visiti
il sito.

## Scala di gravità (colori dei marker)

| # | Colore  | Significato                                                                |
|---|---------|----------------------------------------------------------------------------|
| 1 | Verde   | Distensione diplomatica, accordi di pace                                   |
| 2 | Giallo  | Trattati economici o militari, patti di difesa, accordi commerciali        |
| 3 | Arancio | Inasprimenti diplomatici, piccole schermaglie, sanzioni                    |
| 4 | Rosso   | Situazioni militari/economiche degeneranti, missili, crisi finanziaria     |
| 5 | Viola   | Scoppio di guerra a tutto campo o guerra civile, collasso economico totale |

## Setup (15 minuti)

### 1. Crea un repository su GitHub

Push del contenuto di questa cartella su un nuovo repo GitHub.

```bash
cd geoint-v8
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin git@github.com:TUO_USER/TUO_REPO.git
git push -u origin main
```

### 2. Ottieni una chiave Groq gratis

1. Vai su https://console.groq.com (login con Google o GitHub).
2. Apri **API Keys → Create API Key**.
3. Copia la chiave (inizia con `gsk_…`).

Groq offre un tier gratuito permanente con limiti molto generosi
(~30 req/min, 14 400 req/giorno) — più che sufficienti anche con cron
ogni 30 minuti.

### 3. Aggiungi la chiave come secret GitHub

Nel tuo repo: **Settings → Secrets and variables → Actions →
New repository secret**.

| Name           | Value                |
|----------------|----------------------|
| `GROQ_API_KEY` | la chiave appena creata |

(Opzionale: aggiungi `ANTHROPIC_API_KEY` per usare Claude come fallback.)

### 4. Scegli la frequenza

Apri `.github/workflows/geoint-agent.yml` e modifica la riga `cron:`:

```yaml
schedule:
  - cron: '*/30 * * * *'   # ogni 30 minuti (default)
  # - cron: '0 * * * *'    # ogni ora
  # - cron: '0 */2 * * *'  # ogni 2 ore
```

Commit + push della modifica.

### 5. Prima esecuzione manuale (per testare)

GitHub → tab **Actions** → workflow **GEOINT news agent** → **Run workflow**.

Aspetta ~30 s. Se tutto va bene, vedrai un commit automatico
`chore(agent): refresh events.json [skip ci]`.

### 6. Deploy su Vercel

1. https://vercel.com → **Add New Project** → importa il repo GitHub.
2. Vercel rileva automaticamente `vercel.json`. Click **Deploy**.

Ogni volta che l'agente committa `events.json`, Vercel ri-deploya
automaticamente e gli utenti vedranno gli eventi aggiornati.

## Usare la mappa

- **Filtri temporali** (in alto al pannello Events a destra): 6h, 24h, 7d, All.
- **Sync manuale**: pulsante `↻ Sync feed now` in basso al pannello Add Event.
- **Sync automatico**: avviene all'apertura del sito e ogni 5 minuti.
- **Eventi manuali**: continui a poterli aggiungere tu — sono preservati
  e non vengono sovrascritti dall'agente (l'agente identifica i suoi eventi
  tramite il campo `id`).

## Variabili d'ambiente avanzate

| Nome                   | Default | Effetto                                                  |
|------------------------|---------|----------------------------------------------------------|
| `GROQ_API_KEY`         | —       | obbligatoria                                             |
| `ANTHROPIC_API_KEY`    | —       | opzionale (fallback a Claude)                            |
| `GROQ_MODEL`           | `llama-3.3-70b-versatile` | modello Groq                           |
| `ANTHROPIC_MODEL`      | `claude-3-5-haiku-latest` | modello Anthropic                       |
| `GEOINT_MAX_EVENTS`    | `200`   | quanti eventi tenere nel file                            |
| `GEOINT_MAX_AGE_H`     | `168`   | scarta eventi più vecchi di N ore                        |
| `GEOINT_FEED_LIMIT`    | `25`    | max headline lette per ogni feed RSS                     |
| `GEOINT_KEEP_PER_RUN`  | `8`     | max eventi selezionati dall'LLM per ogni run             |

Tutte impostabili dal workflow YAML.

## Esecuzione locale (test)

```bash
pip install -r agent/requirements.txt  # nessuna dep esterna, solo stdlib
export GROQ_API_KEY="gsk_..."
python agent/geoint_agent.py
```

Genererà / aggiornerà `public/events.json` in locale.

## Aggiungere o togliere feed RSS

Modifica `RSS_FEEDS` in `agent/geoint_agent.py`. Funzionano tutti i feed
RSS 2.0 o Atom, no API key necessaria.

## Sicurezza

- La chiave Groq vive solo in GitHub Secrets — mai esposta al browser.
- Il front-end usa solo `fetch('events.json')` same-origin: nessuna API
  key viaggia client-side.
- L'agente ha permesso `contents: write` solo sul proprio repo.

## Troubleshooting

**Il workflow non si avvia**: GitHub disabilita gli scheduled workflow
nei repo senza attività per 60 giorni. Basta un push qualsiasi per
riattivarlo.

**0 eventi dopo la prima run**: controlla i log del workflow. Probabilmente
un feed RSS è offline o l'LLM non ha trovato news abbastanza significative.
Riprova dopo qualche ora.

**`events.json` non si aggiorna sul sito**: forza un redeploy su Vercel
(Project → Deployments → Redeploy ultimo).
