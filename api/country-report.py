"""On-demand country intelligence report — Vercel Python function.

POST /api/country-report
Body: { "code": "iso3", "name": "Country Name", "hours": 168, "keep": 10 }

Returns: { "country": "...", "events": [ {title, description, severity,
coverage, source, url, image, ts, location}, ... ] }

Uses the same Groq LLM as agent/geoint_agent.py plus a country-specific
local RSS layer defined in agent/country_feeds.py.
"""
import json
import os
import sys
import time
import re
import concurrent.futures as _cf
from http.server import BaseHTTPRequestHandler

# Vercel deploys /agent/*.py alongside this file; add it to sys.path so we
# can reuse the existing helpers.
_HERE = os.path.dirname(os.path.abspath(__file__))
_ROOT = os.path.dirname(_HERE)
for p in (os.path.join(_ROOT, "agent"), _ROOT):
    if p not in sys.path:
        sys.path.insert(0, p)

from geoint_agent import (  # noqa: E402
    RSS_FEEDS,
    SEVERITY_GUIDE,
    HYPOTHETICAL_RE,
    USER_AGENT,
    fetch_url,
    parse_rss,
    strip_html,
    call_llm,
    compute_coverage,
    sample_for_llm,
    _is_hypothetical,
    _looks_like_threat_only,
    _coords_plausible,
)
from country_feeds import COUNTRY_FEEDS  # noqa: E402


# --------------------------------------------------------------------------

def _fetch_one_feed(entry, limit, cutoff_ms):
    src_name, url, bias = entry
    try:
        raw = fetch_url(url, timeout=8)
    except Exception:
        return []
    items = parse_rss(raw)[:limit]
    out = []
    for it in items:
        pub = it.get("pub_ms") or 0
        if cutoff_ms and pub and pub < cutoff_ms:
            continue
        out.append({
            "source": src_name,
            "bias": bias,
            "title": it["title"],
            "description": strip_html(it.get("desc", ""))[:400],
            "url": it.get("link", ""),
            "image": it.get("image") or "",
            "pub_ms": pub,
        })
    return out


def collect_headlines_for_country(country_name, code, hours, limit_per_feed=None,
                                   max_global=None):
    """Fetch a mix of country-mention-filtered global headlines plus 1-2 local
    outlets in parallel. Uses aggressive parallelism to fit inside Vercel's
    25 s hobby-plan duration while pulling a broad pool.

    Scales per-feed depth with the requested window: a 30-day report needs to
    reach further into every RSS feed than a 24-hour one, so we pull more items
    per source and let the pubDate cutoff do the filtering."""
    if limit_per_feed is None:
        # Deeper crawl for longer windows so we don't starve the LLM
        if hours <= 24:
            limit_per_feed = 30
        elif hours <= 72:
            limit_per_feed = 45
        elif hours <= 168:
            limit_per_feed = 60
        elif hours <= 336:
            limit_per_feed = 80
        else:
            limit_per_feed = 100
    if max_global is None:
        # Use ALL global feeds - the more angles the better
        max_global = len(RSS_FEEDS)
    cutoff_ms = int((time.time() - hours * 3600) * 1000)
    local_entries = COUNTRY_FEEDS.get((code or "").lower(), [])
    global_entries = list(RSS_FEEDS)[:max_global]
    entries = list(local_entries) + global_entries
    all_items = []
    # Bump worker count so all feeds fetch in parallel; 10s per-future cap
    # keeps total wall-clock inside Vercel's 25 s hobby-plan duration.
    with _cf.ThreadPoolExecutor(max_workers=32) as ex:
        futures = [ex.submit(_fetch_one_feed, e, limit_per_feed, cutoff_ms) for e in entries]
        for f in futures:
            try:
                all_items.extend(f.result(timeout=10))
            except Exception:
                pass
    # Dedup by title
    seen, unique = set(), []
    for h in all_items:
        k = h["title"].strip().lower()[:120]
        if not k or k in seen:
            continue
        seen.add(k)
        unique.append(h)
    # Filter hypothetical
    unique = [h for h in unique if not _is_hypothetical(h.get("title", "") + " " + h.get("description", ""))]
    # Country-scope filter for global-feed items. Rules (loosened so long-window
    # reports don't starve — the LLM has its own peripheral-mention filter):
    #   - Local outlet items always kept.
    #   - Any title mention → keep.
    #   - Description mention with NO rival country in title → keep (1+ hit).
    #   - Description mention with rival country in title → keep only if
    #     the target country has strictly more description hits than the rival
    #     has title hits (i.e. the story is really about our country).
    local_srcs = {e[0] for e in local_entries}
    own_patterns = _country_patterns(country_name, code)
    own_matcher = re.compile(r"\b(" + "|".join(own_patterns) + r")s?\b", re.IGNORECASE) if own_patterns else None
    rival_matcher = _build_rival_matcher(code)
    filtered = []
    for h in unique:
        if h["source"] in local_srcs:
            filtered.append(h)
            continue
        title = h["title"] or ""
        desc = h["description"] or ""
        if not own_matcher:
            continue
        title_hits = len(own_matcher.findall(title))
        desc_hits = len(own_matcher.findall(desc))
        if title_hits == 0 and desc_hits == 0:
            continue
        # Title-anchored → always accept (the story is about our country)
        if title_hits >= 1:
            filtered.append(h)
            continue
        # No title mention but description mentions us.
        rival_title_hits = rival_matcher.findall(title) if rival_matcher else []
        rival_title_hits = [r for r in rival_title_hits if not (own_matcher.match(r or ""))]
        if len(rival_title_hits) == 0:
            # No rival dominance — 1+ description mention is enough
            filtered.append(h)
        elif desc_hits >= 2:
            # Rival in title, but our country is heavily referenced in body
            filtered.append(h)
    # Prefer more recent stories when we sort/cap
    filtered.sort(key=lambda h: h.get("pub_ms") or 0, reverse=True)
    return filtered


def _build_rival_matcher(own_code):
    """Compile a matcher for OTHER major countries so we can detect when a
    headline title is anchored on a different country than the requested one."""
    own = (own_code or "").lower()
    parts = []
    for c, matchers in _COUNTRY_MATCHERS.items():
        if c == own:
            continue
        for m in matchers:
            # Only take the strongest signals to avoid over-firing on words
            # that appear in many countries (e.g. "senate", "supreme court").
            if len(m) < 4:
                continue
            if m in ("congress", "senate", "capitol hill", "supreme court", "white house",
                     "state department", "downing street", "westminster", "whitehall",
                     "élysée", "elysee", "kremlin", "bundestag", "quirinale",
                     "palazzo chigi", "moncloa", "diet"):
                continue
            parts.append(re.escape(m))
    if not parts:
        return None
    return re.compile(r"\b(" + "|".join(parts) + r")\b", re.IGNORECASE)


# Rich matcher table: for each ISO-3 code we list additional strings that
# indicate the country is being discussed — demonyms, capitals, headline
# short forms, ISO codes, major cities. Case-insensitive, whole-word.
_COUNTRY_MATCHERS = {
    "usa": ["us", "u.s.", "u.s.a.", "america", "american", "united states", "washington", "biden", "trump", "pentagon", "white house", "state department", "congress", "senate", "capitol hill", "supreme court"],
    "gbr": ["uk", "u.k.", "britain", "british", "england", "english", "london", "downing street", "westminster", "whitehall"],
    "irl": ["ireland", "irish", "dublin"],
    "fra": ["france", "french", "paris", "élysée", "elysee", "macron"],
    "deu": ["germany", "german", "berlin", "bundestag", "merz", "scholz"],
    "esp": ["spain", "spanish", "madrid", "moncloa", "sánchez", "sanchez"],
    "ita": ["italy", "italian", "rome", "roma", "quirinale", "meloni", "palazzo chigi"],
    "prt": ["portugal", "portuguese", "lisbon"],
    "nld": ["netherlands", "dutch", "amsterdam", "the hague", "hague"],
    "bel": ["belgium", "belgian", "brussels"],
    "che": ["switzerland", "swiss", "bern", "geneva"],
    "aut": ["austria", "austrian", "vienna"],
    "hun": ["hungary", "hungarian", "budapest", "orbán", "orban"],
    "cze": ["czech", "czechia", "czech republic", "prague"],
    "svk": ["slovakia", "slovak", "bratislava", "fico"],
    "pol": ["poland", "polish", "warsaw", "tusk"],
    "rou": ["romania", "romanian", "bucharest"],
    "bgr": ["bulgaria", "bulgarian", "sofia"],
    "grc": ["greece", "greek", "athens"],
    "srb": ["serbia", "serbian", "belgrade", "vučić", "vucic"],
    "hrv": ["croatia", "croatian", "zagreb"],
    "svn": ["slovenia", "slovenian", "ljubljana"],
    "bih": ["bosnia", "bosnian", "herzegovina", "sarajevo"],
    "mne": ["montenegro", "montenegrin", "podgorica"],
    "alb": ["albania", "albanian", "tirana"],
    "mkd": ["macedonia", "macedonian", "skopje"],
    "swe": ["sweden", "swedish", "stockholm"],
    "nor": ["norway", "norwegian", "oslo"],
    "dnk": ["denmark", "danish", "copenhagen"],
    "fin": ["finland", "finnish", "helsinki"],
    "isl": ["iceland", "icelandic", "reykjavík", "reykjavik"],
    "est": ["estonia", "estonian", "tallinn"],
    "lva": ["latvia", "latvian", "riga"],
    "ltu": ["lithuania", "lithuanian", "vilnius"],
    "ukr": ["ukraine", "ukrainian", "kyiv", "kiev", "zelensky", "zelenskyy", "kharkiv", "odesa", "odessa", "lviv", "donbas", "donetsk", "luhansk"],
    "rus": ["russia", "russian", "moscow", "kremlin", "putin", "st petersburg", "vladivostok"],
    "blr": ["belarus", "belarusian", "minsk", "lukashenko"],
    "mda": ["moldova", "moldovan", "chișinău", "chisinau"],
    "tur": ["turkey", "turkish", "ankara", "istanbul", "erdoğan", "erdogan", "türkiye", "turkiye"],
    "isr": ["israel", "israeli", "jerusalem", "tel aviv", "netanyahu", "idf", "gaza", "west bank"],
    "pse": ["palestine", "palestinian", "gaza", "west bank", "ramallah", "hamas"],
    "lbn": ["lebanon", "lebanese", "beirut", "hezbollah"],
    "syr": ["syria", "syrian", "damascus", "aleppo", "assad"],
    "jor": ["jordan", "jordanian", "amman"],
    "irq": ["iraq", "iraqi", "baghdad", "mosul", "erbil"],
    "irn": ["iran", "iranian", "tehran", "persia", "khamenei", "raisi", "pezeshkian", "irgc", "isfahan"],
    "sau": ["saudi arabia", "saudi", "riyadh", "mbs", "bin salman", "mecca"],
    "are": ["uae", "u.a.e.", "emirates", "emirati", "abu dhabi", "dubai"],
    "qat": ["qatar", "qatari", "doha"],
    "kwt": ["kuwait", "kuwaiti"],
    "omn": ["oman", "omani", "muscat"],
    "bhr": ["bahrain", "bahraini", "manama"],
    "yem": ["yemen", "yemeni", "sanaa", "houthi", "houthis", "aden"],
    "egy": ["egypt", "egyptian", "cairo", "el-sisi", "sisi", "suez"],
    "lby": ["libya", "libyan", "tripoli", "benghazi"],
    "dza": ["algeria", "algerian", "algiers"],
    "mar": ["morocco", "moroccan", "rabat", "casablanca"],
    "tun": ["tunisia", "tunisian", "tunis"],
    "sdn": ["sudan", "sudanese", "khartoum"],
    "ssd": ["south sudan", "juba"],
    "eth": ["ethiopia", "ethiopian", "addis ababa", "tigray", "amhara"],
    "ken": ["kenya", "kenyan", "nairobi", "ruto"],
    "nga": ["nigeria", "nigerian", "abuja", "lagos", "tinubu"],
    "zaf": ["south africa", "south african", "pretoria", "johannesburg", "cape town", "ramaphosa"],
    "gha": ["ghana", "ghanaian", "accra"],
    "civ": ["ivory coast", "cote d'ivoire", "côte d'ivoire", "ivorian", "abidjan", "yamoussoukro"],
    "sen": ["senegal", "senegalese", "dakar"],
    "mli": ["mali", "malian", "bamako"],
    "ner": ["niger", "nigerien", "niamey"],
    "cmr": ["cameroon", "cameroonian", "yaoundé", "yaounde"],
    "cod": ["dr congo", "drc", "d.r. congo", "democratic republic of congo", "congolese", "kinshasa"],
    "cog": ["republic of congo", "brazzaville"],
    "uga": ["uganda", "ugandan", "kampala", "museveni"],
    "tza": ["tanzania", "tanzanian", "dodoma", "dar es salaam"],
    "rwa": ["rwanda", "rwandan", "kigali", "kagame"],
    "moz": ["mozambique", "mozambican", "maputo"],
    "ago": ["angola", "angolan", "luanda"],
    "zwe": ["zimbabwe", "zimbabwean", "harare", "mnangagwa"],
    "som": ["somalia", "somali", "mogadishu", "al-shabaab", "al shabaab"],
    "chn": ["china", "chinese", "beijing", "shanghai", "shenzhen", "xi jinping", "ccp", "prc", "hong kong", "taiwan strait"],
    "twn": ["taiwan", "taiwanese", "taipei", "lai", "ching-te", "roc"],
    "hkg": ["hong kong", "hker"],
    "jpn": ["japan", "japanese", "tokyo", "ishiba", "kishida", "diet"],
    "kor": ["south korea", "south korean", "seoul", "yoon", "roh"],
    "prk": ["north korea", "north korean", "dprk", "pyongyang", "kim jong un", "kim jong-un"],
    "mng": ["mongolia", "mongolian", "ulaanbaatar", "ulan bator"],
    "vnm": ["vietnam", "vietnamese", "hanoi", "ho chi minh"],
    "tha": ["thailand", "thai", "bangkok"],
    "khm": ["cambodia", "cambodian", "phnom penh"],
    "lao": ["laos", "laotian", "vientiane"],
    "mmr": ["myanmar", "burmese", "burma", "yangon", "naypyidaw", "junta"],
    "mys": ["malaysia", "malaysian", "kuala lumpur", "anwar"],
    "sgp": ["singapore", "singaporean"],
    "idn": ["indonesia", "indonesian", "jakarta", "prabowo", "widodo", "jokowi"],
    "phl": ["philippines", "philippine", "filipino", "manila", "marcos"],
    "brn": ["brunei", "bruneian"],
    "ind": ["india", "indian", "new delhi", "delhi", "mumbai", "modi", "bjp", "bharatiya"],
    "pak": ["pakistan", "pakistani", "islamabad", "karachi", "lahore", "sharif"],
    "bgd": ["bangladesh", "bangladeshi", "dhaka", "hasina", "yunus"],
    "lka": ["sri lanka", "sri lankan", "colombo"],
    "npl": ["nepal", "nepali", "nepalese", "kathmandu"],
    "afg": ["afghanistan", "afghan", "kabul", "taliban"],
    "kaz": ["kazakhstan", "kazakh", "astana", "almaty", "tokayev"],
    "uzb": ["uzbekistan", "uzbek", "tashkent"],
    "kgz": ["kyrgyzstan", "kyrgyz", "bishkek"],
    "tjk": ["tajikistan", "tajik", "dushanbe"],
    "tkm": ["turkmenistan", "turkmen", "ashgabat"],
    "aze": ["azerbaijan", "azerbaijani", "baku", "aliyev", "nagorno-karabakh"],
    "arm": ["armenia", "armenian", "yerevan", "pashinyan"],
    "geo": ["georgia", "georgian", "tbilisi", "abkhazia", "south ossetia"],
    "can": ["canada", "canadian", "ottawa", "toronto", "trudeau", "carney"],
    "mex": ["mexico", "mexican", "mexico city", "sheinbaum", "amlo", "obrador"],
    "gtm": ["guatemala", "guatemalan", "guatemala city"],
    "hnd": ["honduras", "honduran", "tegucigalpa"],
    "slv": ["el salvador", "salvadoran", "san salvador", "bukele"],
    "nic": ["nicaragua", "nicaraguan", "managua", "ortega"],
    "cri": ["costa rica", "costa rican", "san josé", "san jose"],
    "pan": ["panama", "panamanian", "panama city"],
    "cub": ["cuba", "cuban", "havana"],
    "dom": ["dominican republic", "santo domingo"],
    "hti": ["haiti", "haitian", "port-au-prince"],
    "bra": ["brazil", "brazilian", "brasília", "brasilia", "são paulo", "rio de janeiro", "lula", "bolsonaro"],
    "arg": ["argentina", "argentine", "buenos aires", "milei"],
    "chl": ["chile", "chilean", "santiago", "boric"],
    "col": ["colombia", "colombian", "bogotá", "bogota", "petro"],
    "ven": ["venezuela", "venezuelan", "caracas", "maduro"],
    "per": ["peru", "peruvian", "lima", "boluarte"],
    "ecu": ["ecuador", "ecuadorian", "quito", "noboa"],
    "bol": ["bolivia", "bolivian", "la paz", "sucre"],
    "ury": ["uruguay", "uruguayan", "montevideo"],
    "pry": ["paraguay", "paraguayan", "asunción", "asuncion"],
    "aus": ["australia", "australian", "canberra", "sydney", "melbourne", "albanese"],
    "nzl": ["new zealand", "kiwi", "wellington", "auckland"],
    "fji": ["fiji", "fijian", "suva"],
    "png": ["papua new guinea", "png", "port moresby"],
    "cyp": ["cyprus", "cypriot", "nicosia"],
    "mlt": ["malta", "maltese", "valletta"],
    "lux": ["luxembourg"],
}

def _country_patterns(name, code):
    """Return the list of case-insensitive regex-escaped whole-word matchers
    for a country. Combines the canonical name, ISO code (uppercase in the
    text) and the rich matcher table."""
    c = (code or "").lower()
    n = (name or "").strip()
    out = set()
    if n:
        out.add(re.escape(n))
        # add the version without leading "the "
        low = n.lower()
        if low.startswith("the "):
            out.add(re.escape(n[4:]))
    if c:
        out.add(re.escape(c.upper()))  # matches "USA", "GBR", etc.
    for extra in _COUNTRY_MATCHERS.get(c, []):
        if extra:
            out.add(re.escape(extra))
    # Drop empties
    return [p for p in out if p]


# --------------------------------------------------------------------------

SYSTEM_PROMPT_COUNTRY = (
    "You are a geopolitical and economic intelligence analyst producing an "
    "on-demand country brief. You receive a batch of headlines that are "
    "already scoped to ONE country. From this batch, select every meaningful "
    "item up to the requested limit. Cover the FULL "
    "spectrum: politics, government decisions, elections, security incidents, "
    "military operations, terror attacks, diplomacy, trade, sanctions, "
    "economy, energy, finance, technology deals, court rulings, corruption, "
    "protests and civil unrest, humanitarian developments, natural disasters "
    "with policy implications, notable cultural/scientific milestones with a "
    "public-affairs angle. IGNORE only pure sports, celebrity gossip, "
    "weather forecasts, ordinary domestic crime, lifestyle features.\n\n"
    "CRITICAL - NEVER FABRICATE OR PAD:\n"
    "  - Every returned item must correspond to a real, distinct headline present in the input.\n"
    "  - If the batch only supports 3 real events, return 3. If it supports 15, return 15.\n"
    "  - Never generate placeholder titles like 'No Additional Information Available',\n"
    "    'Update on Situation', 'Recent Developments', or generic filler.\n"
    "  - Never generate descriptions that describe the absence of information (e.g.\n"
    "    'no additional headlines available', 'no further details').\n"
    "  - Never duplicate the same story with different phrasing to reach a target count.\n"
    "  - Return an empty events array if truly nothing qualifies.\n\n"
    "PACKING GUIDANCE:\n"
    "  - Group multi-source coverage of the same story into a single item — "
    "  keep the most complete version and drop the rest.\n"
    "  - A local outlet's front-page story is usually worth including "
    "  if it fits any category above.\n"
    "  - Prefer diverse topics: a good brief mixes political, security, "
    "  economic and social items rather than being all one kind.\n\n"
    "EDITORIAL DISCIPLINE - reject the following outright:\n"
    "  - Speculative/hypothetical stories ('may', 'might', 'could', 'would', "
    "'possibly', 'expected to', 'likely to', 'planning to', 'considering', "
    "'appears to', 'rumoured'). Report events that HAPPENED, not what MIGHT.\n"
    "  - Opinion pieces, analysis columns, 'here's why', explainers, "
    "listicles ('5 things you missed', 'top 10').\n"
    "  - PERIPHERAL-MENTION items: the target country must be the SUBJECT of "
    "the story, not just mentioned in passing. Example: for a Russia brief, "
    "reject 'China Slaps Export Controls on EU Entities' even if the "
    "description mentions Russia — the story is about China acting against "
    "the EU. Accept the item only when the target country is the actor, the "
    "target, or the venue of the reported event.\n"
    "  - Duplicate coverage of a story already picked - keep the single most "
    "complete/factual version, drop the rest.\n\n"
    + SEVERITY_GUIDE +
    "\nGEOCODING RULES:\n"
    "- Pin each event to the MOST SPECIFIC location (city / district / border / "
    "port / summit venue) inside or directly involving the target country.\n"
    "- Never pick a location outside the country unless the event is a foreign "
    "attack on this country, a diplomatic meeting abroad involving this country, "
    "or a bilateral event where the OTHER party is clearly the venue.\n"
    "- Lat/lng must be decimal degrees (2+ decimals of precision), lat in [-90,90], lng in [-180,180]."
)

USER_TEMPLATE_COUNTRY = """You are writing an intelligence report on: {country}. Time window: last {hours} hours.

Return a JSON object with a single top-level array called `events`, where each entry has:
  title, description (1-2 sentences), lat, lng, severity (1-5), location (City, Country), source_idx.

Rules:
- TARGET SIZE: up to {max_keep} distinct real events. Return FEWER if the batch does not contain that many —
  QUALITY MATTERS FAR MORE THAN QUANTITY.
- ABSOLUTELY FORBIDDEN — do NOT invent, pad, or duplicate to reach the target:
  • Never emit placeholder titles like "No Additional Information Available", "No Further Details",
    "Update on Situation", "Recent Developments", "Ongoing Events", "Miscellaneous News", or any
    generic filler.
  • Never emit descriptions that say things like "no additional headlines available", "no further
    details", "no more information", "unable to provide additional context", or that describe the
    ABSENCE of information rather than a real event.
  • Never repeat the same story with different phrasing to fill slots.
  • If only 2 real events exist in the batch, RETURN 2. If only 1, return 1. Empty array is acceptable
    if truly nothing qualifies.
- Every entry MUST correspond to a real headline in the numbered list below and MUST cite it via source_idx.
- Group duplicate coverage of the same event into ONE item and keep only the most complete version.
- Aim for a MIX of severities and topics when the batch supports it — politics, security, economy,
  diplomacy, court cases, protests, tech/energy, corruption.
- `source_idx` is the 0-based index of the picked headline in the numbered list below.
- Description in the same language as the source headline.

There are {n_headlines} headlines about {country} in the last {hours} hours. Skim them all before picking, then produce the report.

Headlines:
{headlines}
"""


# --------------------------------------------------------------------------
# LLM call with 429 handling.
#
# Groq's free tier enforces per-model tokens-per-minute quotas. When the daily
# GitHub-Actions agent runs it drains the llama-3.3-70b bucket, so the browser
# on-demand report frequently lands on a 429 if it uses the same model.
#
# Strategy: cascade through a chain of models. Each model has its own separate
# TPM bucket on Groq, so if 70b is exhausted 8b-instant is almost always free.
# The chain is ordered by quality — we only fall back on 429/5xx. On the last
# model, if still failing, raise a friendly error the frontend can display.

_RETRY_STATUS = (429, 500, 502, 503, 504)

# Model fallback chain — each has an INDEPENDENT free-tier TPM bucket on Groq,
# so we can usually get through even when one is drained. Override with the
# COUNTRY_REPORT_MODELS env var (comma-separated).
_DEFAULT_MODEL_CHAIN = [
    "llama-3.1-8b-instant",       # ~30k TPM free — primary for on-demand
    "llama-3.3-70b-versatile",    # higher quality, ~12k TPM
    "gemma2-9b-it",               # ~15k TPM
]


def _model_chain():
    override = os.environ.get("COUNTRY_REPORT_MODELS", "").strip()
    if override:
        return [m.strip() for m in override.split(",") if m.strip()]
    return list(_DEFAULT_MODEL_CHAIN)


def _call_groq_model(prompt: str, system: str, model: str) -> str:
    """Same as agent.call_groq but with an explicit model override so we can
    cascade through the fallback chain."""
    import urllib.request as _ur
    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        raise RuntimeError("GROQ_API_KEY not set")
    body = json.dumps({
        "model": model,
        "temperature": 0.1,
        "response_format": {"type": "json_object"},
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": prompt},
        ],
    }).encode("utf-8")
    req = _ur.Request(
        "https://api.groq.com/openai/v1/chat/completions",
        data=body,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "User-Agent": USER_AGENT,
            "Accept": "application/json",
        },
    )
    with _ur.urlopen(req, timeout=45) as r:
        data = json.loads(r.read())
    return data["choices"][0]["message"]["content"]


def _call_llm_with_backoff(prompt, system):
    """Try each model in the chain. On 429, respect Retry-After up to 6 s once,
    then move to the next model rather than waiting the full 60 s TPM reset."""
    import urllib.error
    if not os.environ.get("GROQ_API_KEY"):
        # No Groq → fall back to Anthropic if available (single-shot, no chain)
        return call_llm(prompt, system)

    chain = _model_chain()
    last_exc = None
    tried = []
    for model_idx, model in enumerate(chain):
        tried.append(model)
        for attempt in range(2):
            try:
                out = _call_groq_model(prompt, system, model)
                print(f"[llm] success via {model} (attempt {attempt+1})", file=sys.stderr)
                return out
            except urllib.error.HTTPError as exc:
                last_exc = exc
                if exc.code == 429:
                    ra = None
                    try:
                        ra = exc.headers.get("Retry-After") if hasattr(exc, "headers") else None
                    except Exception:
                        ra = None
                    try:
                        wait = min(6.0, float(ra)) if ra else 4.0
                    except (TypeError, ValueError):
                        wait = 4.0
                    print(f"[llm] 429 on {model}, sleep {wait}s then "
                          f"{'retry' if attempt == 0 else 'next model'}",
                          file=sys.stderr)
                    if attempt == 0:
                        time.sleep(wait)
                        continue
                    break  # move to next model
                if exc.code in _RETRY_STATUS and attempt == 0:
                    time.sleep(2.0)
                    continue
                # Non-recoverable HTTP error — propagate
                raise
            except Exception as exc:  # noqa: BLE001
                last_exc = exc
                if attempt == 0:
                    time.sleep(1.5)
                    continue
                # Move on to next model in the chain
                break
    # All models exhausted
    print(f"[llm] all models exhausted: {tried}", file=sys.stderr)
    if isinstance(last_exc, urllib.error.HTTPError) and last_exc.code == 429:
        raise RuntimeError(
            "Groq's free-tier LLMs are all rate-limited right now (every model in "
            "the fallback chain hit a per-minute cap). Wait ~60 s and press "
            "Re-run report again, or pick a shorter time window (24 h / 3 d) "
            "to keep the prompt smaller."
        ) from last_exc
    if last_exc:
        raise last_exc
    raise RuntimeError("LLM call failed for unknown reason")


# Titles and descriptions the model sometimes fabricates when told to "hit a target".
# Anything matching these is treated as a hallucinated filler row and dropped.
_FILLER_TITLE_RE = re.compile(
    r"^(?:\s*)("
    r"no\s+additional\s+information|"
    r"no\s+further\s+(?:information|details|updates?)|"
    r"no\s+(?:more|new|other)\s+(?:information|details|news|updates?)|"
    r"additional\s+information\s+unavailable|"
    r"information\s+unavailable|"
    r"details?\s+unavailable|"
    r"placeholder|"
    r"update\s+on\s+(?:the\s+)?situation|"
    r"recent\s+developments?|"
    r"ongoing\s+events?|"
    r"miscellaneous\s+news|"
    r"unspecified|"
    r"n\s*/\s*a|"
    r"none"
    r")\b",
    re.IGNORECASE,
)
_FILLER_DESC_RE = re.compile(
    r"(?:no\s+(?:additional|further|more|other)\s+(?:headlines?|information|details?|news|updates?)\s+"
    r"(?:are\s+|were\s+)?available|"
    r"unable\s+to\s+provide\s+(?:additional|further|more)|"
    r"no\s+(?:further|additional|more)\s+context|"
    r"the\s+batch\s+does\s+not\s+contain|"
    r"there\s+(?:is|are)\s+no\s+additional)",
    re.IGNORECASE,
)


def _is_filler(title: str, description: str) -> bool:
    if not title:
        return True
    if _FILLER_TITLE_RE.search(title):
        return True
    if description and _FILLER_DESC_RE.search(description):
        return True
    return False


def analyse_country(headlines, country_name, hours, max_keep=10):
    # Cap the pool sent to the LLM so we stay inside Groq's free-tier
    # tokens-per-minute limit. The primary model is llama-3.1-8b-instant
    # (30k TPM free), the fallbacks are 70b (12k) and gemma2-9b (15k), so
    # 50 headlines × 120-char descriptions ≈ 6k input tokens leaves headroom
    # for output tokens even on the tightest bucket.
    # sample_for_llm round-robins across sources so every outlet stays
    # represented rather than one loud feed dominating.
    llm_cap = int(os.environ.get("COUNTRY_REPORT_LLM_HEADLINES", "50"))
    pool = sample_for_llm(headlines, llm_cap) if len(headlines) > llm_cap else headlines
    # Trim descriptions HARD before sending — the LLM only needs enough context
    # to disambiguate the story, and every character costs tokens.
    numbered = "\n".join(
        f"[{i}] ({h['source']}) {h['title']} - {h['description'][:120]}"
        for i, h in enumerate(pool)
    )
    prompt = USER_TEMPLATE_COUNTRY.format(
        country=country_name, max_keep=max_keep, hours=hours,
        n_headlines=len(pool), headlines=numbered
    )
    headlines = pool  # downstream source_idx resolution must use the same list
    raw = _call_llm_with_backoff(prompt, SYSTEM_PROMPT_COUNTRY)
    try:
        parsed = json.loads(raw)
    except json.JSONDecodeError:
        m = re.search(r"\{.*\}", raw, re.DOTALL)
        if not m:
            raise RuntimeError(f"LLM returned non-JSON: {raw[:200]}")
        parsed = json.loads(m.group(0))
    events = parsed.get("events", [])
    enriched = []
    seen_idx = set()
    seen_titles = set()
    for ev in events:
        try:
            idx = int(ev.get("source_idx", -1))
        except (ValueError, TypeError):
            idx = -1
        # Reject any entry that doesn't map to a real headline in the batch —
        # if there's no valid source_idx it's almost certainly fabricated.
        if not (0 <= idx < len(headlines)):
            continue
        # Reject duplicate picks of the same source headline
        if idx in seen_idx:
            continue
        src_url = headlines[idx]["url"]
        src_name = headlines[idx]["source"]
        title = str(ev.get("title", "")).strip()
        desc = str(ev.get("description", "")).strip()
        if not title:
            continue
        # Drop fabricated / filler entries
        if _is_filler(title, desc):
            continue
        # Drop duplicate titles (LLM re-phrasing to hit target count)
        tkey = re.sub(r"\W+", " ", title.lower()).strip()[:100]
        if tkey in seen_titles:
            continue
        seen_titles.add(tkey)
        seen_idx.add(idx)
        if _is_hypothetical(title) or _is_hypothetical(desc):
            continue
        try:
            lat = float(ev["lat"]); lng = float(ev["lng"])
        except (KeyError, ValueError, TypeError):
            continue
        if not (-90 <= lat <= 90 and -180 <= lng <= 180):
            continue
        try:
            sev = int(ev.get("severity", 3))
        except (ValueError, TypeError):
            sev = 3
        sev = max(1, min(5, sev))
        if sev >= 4 and _looks_like_threat_only(title, desc):
            sev = 2
        src_image = headlines[idx].get("image") if 0 <= idx < len(headlines) else None
        src_pub_ms = headlines[idx].get("pub_ms") if 0 <= idx < len(headlines) else 0
        ev_ts = src_pub_ms if src_pub_ms else int(time.time() * 1000)
        row = {
            "title": title[:200],
            "description": desc[:600],
            "lat": round(lat, 4),
            "lng": round(lng, 4),
            "severity": sev,
            "location": str(ev.get("location", "")).strip()[:120],
            "source": src_name,
            "url": src_url,
            "image": src_image or None,
            "ts": ev_ts,
        }
        row["coverage"] = compute_coverage(row, headlines)
        enriched.append(row)
    enriched.sort(key=lambda e: e.get("ts", 0), reverse=True)
    return enriched


# --------------------------------------------------------------------------

class handler(BaseHTTPRequestHandler):
    def _send_json(self, status, obj):
        body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):  # noqa: N802
        self._send_json(204, {})

    def do_GET(self):  # noqa: N802
        # Diagnostic ping — visit this URL in a browser to check the function
        # is reachable and see whether GROQ_API_KEY made it into the runtime.
        has_groq = bool(os.environ.get("GROQ_API_KEY"))
        has_anthropic = bool(os.environ.get("ANTHROPIC_API_KEY"))
        self._send_json(200, {
            "ok": True,
            "route": "/api/country-report",
            "countries_with_local_feed": len(COUNTRY_FEEDS),
            "env": {
                "GROQ_API_KEY_set": has_groq,
                "ANTHROPIC_API_KEY_set": has_anthropic,
                "GROQ_MODEL": os.environ.get("GROQ_MODEL", "llama-3.3-70b-versatile"),
            },
            "hint": ("Send POST with {code,name,hours,keep} to run a report."
                     if (has_groq or has_anthropic)
                     else "No LLM key found in the environment. Set GROQ_API_KEY in Vercel → Settings → Environment Variables and REDEPLOY."),
        })

    def do_POST(self):  # noqa: N802
        try:
            n = int(self.headers.get("Content-Length", 0))
            payload = json.loads(self.rfile.read(n)) if n else {}
        except Exception as exc:
            self._send_json(400, {"error": f"bad request: {exc}"})
            return
        code = str(payload.get("code", "")).strip().lower()
        name = str(payload.get("name", "")).strip()
        hours = int(payload.get("hours", 168) or 168)
        keep = int(payload.get("keep", 20) or 20)
        hours = max(1, min(720, hours))
        keep = max(3, min(30, keep))
        if not name:
            self._send_json(400, {"error": "missing country name"})
            return
        try:
            headlines = collect_headlines_for_country(name, code, hours)
            if not headlines:
                self._send_json(200, {
                    "country": name, "code": code, "hours": hours,
                    "events": [], "note": "No headlines found for this country in the selected window."
                })
                return
            events = analyse_country(headlines, name, hours, max_keep=keep)
            self._send_json(200, {
                "country": name, "code": code, "hours": hours,
                "headlines_considered": len(headlines),
                "events": events,
            })
        except Exception as exc:
            self._send_json(500, {"error": str(exc), "type": type(exc).__name__})
