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


def collect_headlines_for_country(country_name, code, hours, limit_per_feed=12,
                                   max_global=18):
    """Fetch a mix of country-mention-filtered global headlines plus 1-2 local
    outlets in parallel. Vercel serverless has a ~10 s hard cap on the hobby
    plan, so we cap parallelism and per-feed timeouts."""
    cutoff_ms = int((time.time() - hours * 3600) * 1000)
    local_entries = COUNTRY_FEEDS.get((code or "").lower(), [])
    global_entries = list(RSS_FEEDS)[:max_global]
    entries = list(local_entries) + global_entries
    all_items = []
    with _cf.ThreadPoolExecutor(max_workers=8) as ex:
        futures = [ex.submit(_fetch_one_feed, e, limit_per_feed, cutoff_ms) for e in entries]
        for f in futures:
            try:
                all_items.extend(f.result(timeout=7))
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
    # Country-scope filter for global-feed items: keep only those that mention
    # the country by name (case-insensitive). Local items are always kept.
    local_srcs = {e[0] for e in local_entries}
    needle_re = re.compile(r"\b" + re.escape(country_name) + r"\b", re.IGNORECASE)
    aliases = _country_aliases(country_name, code)
    alias_re = re.compile(r"\b(" + "|".join(re.escape(a) for a in aliases) + r")\b", re.IGNORECASE) if aliases else None
    filtered = []
    for h in unique:
        if h["source"] in local_srcs:
            filtered.append(h)
            continue
        text = h["title"] + " " + h["description"]
        if needle_re.search(text) or (alias_re and alias_re.search(text)):
            filtered.append(h)
    return filtered


def _country_aliases(name, code):
    """Return alternate names for common countries so RSS filters catch
    'US', 'UK', 'Britain', etc. even when the headline avoids the formal name."""
    c = (code or "").lower()
    n = (name or "").lower()
    table = {
        "usa": ["us", "u.s.", "u.s.a.", "america", "united states"],
        "gbr": ["uk", "u.k.", "britain", "british"],
        "cod": ["drc", "d.r. congo", "democratic republic of congo"],
        "cze": ["czech republic"],
        "kor": ["south korea"],
        "prk": ["north korea", "dprk"],
        "rus": ["russian federation"],
        "irn": ["persia"],
        "mmr": ["burma"],
        "civ": ["cote d'ivoire", "cote d’ivoire", "ivory coast"],
        "syr": ["syrian arab republic"],
    }
    out = table.get(c, [])
    return [a for a in out if a and a != n]


# --------------------------------------------------------------------------

SYSTEM_PROMPT_COUNTRY = (
    "You are a geopolitical and economic intelligence analyst producing an "
    "on-demand country brief. You receive a batch of headlines that are "
    "already scoped to ONE country. From this batch, select the items of real "
    "strategic significance - armed events, treaties, elections, sanctions, "
    "trade decisions, diplomatic moves, humanitarian developments - across the "
    "FULL spectrum, positive as well as negative. IGNORE sports, celebrity, "
    "weather, domestic crime, lifestyle.\n\n"
    "EDITORIAL DISCIPLINE - reject the following outright:\n"
    "  - Speculative/hypothetical stories ('may', 'might', 'could', 'would', "
    "'possibly', 'expected to', 'likely to', 'planning to', 'considering', "
    "'appears to', 'rumoured'). Report events that HAPPENED, not what MIGHT.\n"
    "  - Opinion pieces, analysis columns, 'here's why', explainers.\n"
    "  - Duplicate coverage of a story already listed in the batch - keep the "
    "single most complete/factual version.\n\n"
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
- Keep at most {max_keep} items. If fewer than {max_keep} deserve inclusion, return fewer.
- Aim for a MIX of severities - do not fill the report with 4s and 5s if the news doesn't warrant it.
- `source_idx` is the 0-based index of the picked headline in the numbered list below.
- Description in the same language as the source headline.

Headlines about {country} in the last {hours} hours:
{headlines}
"""


def analyse_country(headlines, country_name, hours, max_keep=10):
    numbered = "\n".join(
        f"[{i}] ({h['source']}) {h['title']} - {h['description'][:200]}"
        for i, h in enumerate(headlines)
    )
    prompt = USER_TEMPLATE_COUNTRY.format(
        country=country_name, max_keep=max_keep, hours=hours, headlines=numbered
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
        self._send_json(200, {"ok": True, "route": "/api/country-report",
                              "countries_with_local_feed": len(COUNTRY_FEEDS)})

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
        keep = int(payload.get("keep", 10) or 10)
        hours = max(1, min(720, hours))
        keep = max(3, min(20, keep))
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
