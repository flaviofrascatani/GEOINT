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
    _is_hypothetical,
    _looks_like_threat_only,
    _coords_plausible,
)
from country_feeds import COUNTRY_FEEDS  # noqa: E402


# --------------------------------------------------------------------------

def _fetch_one_feed(entry, limit, cutoff_ms):
    src_name, url, bias = entry
    try:
        raw = fetch_url(url, timeout=6)
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


def collect_headlines_for_country(country_name, code, hours, limit_per_feed=25,
                                   max_global=48):
    """Fetch a mix of country-mention-filtered global headlines plus 1-2 local
    outlets in parallel. Uses aggressive parallelism to fit inside Vercel's
    25 s hobby-plan duration while pulling a broad pool."""
    cutoff_ms = int((time.time() - hours * 3600) * 1000)
    local_entries = COUNTRY_FEEDS.get((code or "").lower(), [])
    global_entries = list(RSS_FEEDS)[:max_global]
    entries = list(local_entries) + global_entries
    all_items = []
    with _cf.ThreadPoolExecutor(max_workers=16) as ex:
        futures = [ex.submit(_fetch_one_feed, e, limit_per_feed, cutoff_ms) for e in entries]
        for f in futures:
            try:
                all_items.extend(f.result(timeout=8))
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
    # Country-scope filter for global-feed items. Rules:
    #   - Local outlet items always kept.
    #   - Title mention → keep.
    #   - Description mention → keep only if NO other prominent country is
    #     mentioned in the title (otherwise the story is about that other
    #     country and our target is a peripheral reference).
    #   - Description mention with 2+ hits and no rival title-country → keep.
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
        # No title mention but description mentions us. Only accept if no OTHER
        # prominent country dominates the title.
        rival_title_hits = rival_matcher.findall(title) if rival_matcher else []
        # Exclude rivals that are actually our own matchers (edge case)
        rival_title_hits = [r for r in rival_title_hits if not (own_matcher.match(r or ""))]
        if len(rival_title_hits) == 0 and desc_hits >= 2:
            filtered.append(h)
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
    "already scoped to ONE country. From this batch, select AS MANY meaningful "
    "items as the batch contains, up to the requested limit. Cover the FULL "
    "spectrum: politics, government decisions, elections, security incidents, "
    "military operations, terror attacks, diplomacy, trade, sanctions, "
    "economy, energy, finance, technology deals, court rulings, corruption, "
    "protests and civil unrest, humanitarian developments, natural disasters "
    "with policy implications, notable cultural/scientific milestones with a "
    "public-affairs angle. IGNORE only pure sports, celebrity gossip, "
    "weather forecasts, ordinary domestic crime, lifestyle features.\n\n"
    "PACKING GUIDANCE:\n"
    "  - Do NOT be conservative. If the batch gives you 10-15 valid stories, "
    "return 10-15. Only return fewer if the batch genuinely lacks them.\n"
    "  - Group multi-source coverage of the same story into a single item — "
    "but count that as ONE, and still fill the rest of the slots.\n"
    "  - A local outlet's front-page story is almost always worth including "
    "if it fits any category above.\n"
    "  - Prefer diverse topics: a good brief mixes political, security, "
    "economic and social items rather than being all one kind.\n\n"
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

USER_TEMPLATE_COUNTRY = """You are writing an intelligence report on: {country}.

Return a JSON object with a single top-level array called `events`, where each entry has:
  title, description (1-2 sentences), lat, lng, severity (1-5), location (City, Country), source_idx.

Rules:
- TARGET SIZE: aim to return around {max_keep} items when the batch supports it. Small countries with quiet news cycles can return fewer, but do not artificially trim.
- Aim for a MIX of severities and topics — a good brief spans politics, security, economy and society.
- `source_idx` is the 0-based index of the picked headline in the numbered list below.
- Description in the same language as the source headline.

There are {n_headlines} headlines about {country} in the last {hours} hours. Skim them all before picking, then produce the report.

Headlines:
{headlines}
"""


def analyse_country(headlines, country_name, hours, max_keep=10):
    numbered = "\n".join(
        f"[{i}] ({h['source']}) {h['title']} - {h['description'][:200]}"
        for i, h in enumerate(headlines)
    )
    prompt = USER_TEMPLATE_COUNTRY.format(
        country=country_name, max_keep=max_keep, hours=hours,
        n_headlines=len(headlines), headlines=numbered
    )
    raw = call_llm(prompt, SYSTEM_PROMPT_COUNTRY)
    try:
        parsed = json.loads(raw)
    except json.JSONDecodeError:
        m = re.search(r"\{.*\}", raw, re.DOTALL)
        if not m:
            raise RuntimeError(f"LLM returned non-JSON: {raw[:200]}")
        parsed = json.loads(m.group(0))
    events = parsed.get("events", [])
    enriched = []
    for ev in events:
        try:
            idx = int(ev.get("source_idx", -1))
        except (ValueError, TypeError):
            idx = -1
        src_url = headlines[idx]["url"] if 0 <= idx < len(headlines) else None
        src_name = headlines[idx]["source"] if 0 <= idx < len(headlines) else None
        title = str(ev.get("title", "")).strip()
        desc = str(ev.get("description", "")).strip()
        if not title:
            continue
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
        keep = int(payload.get("keep", 15) or 15)
        hours = max(1, min(720, hours))
        keep = max(3, min(25, keep))
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
