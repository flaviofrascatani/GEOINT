#!/usr/bin/env python3
"""
GEOINT autonomous news agent.
 
Pulls geopolitical / economic headlines from free RSS feeds, asks an LLM
(Groq free tier by default, Anthropic optional) to keep only the strategically
relevant ones, classify severity on a 5-step scale, and geocode them, then
writes public/events.json. Designed to run unattended in GitHub Actions.
 
Severity scale (matches the front-end):
    1 GREEN   diplomatic detente
    2 YELLOW  economic / military treaties
    3 ORANGE  diplomatic tension, small skirmishes, econ / military hardening
    4 RED     degenerating military / economic situation, critical
    5 PURPLE  full-scale war, civil war outbreak
 
Environment variables:
    GROQ_API_KEY        free key from https://console.groq.com  (preferred)
    ANTHROPIC_API_KEY   optional Anthropic fallback
    GEOINT_MAX_EVENTS   keep most-recent N events in file (default 200)
    GEOINT_MAX_AGE_H    drop events older than N hours (default 168 = 7d)
    GEOINT_FEED_LIMIT   max headlines fetched per feed (default 25)
"""
 
from __future__ import annotations
import datetime as dt
import hashlib
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path
 
ROOT = Path(__file__).resolve().parent.parent
OUT_FILE = ROOT / "public" / "events.json"
 
# ---- Free RSS feeds (no key required) -------------------------------------
RSS_FEEDS = [
    ("Reuters World", "https://feeds.reuters.com/Reuters/worldNews"),
    ("BBC World", "http://feeds.bbci.co.uk/news/world/rss.xml"),
    ("BBC Business", "http://feeds.bbci.co.uk/news/business/rss.xml"),
    ("Al Jazeera", "https://www.aljazeera.com/xml/rss/all.xml"),
    ("ANSA Mondo", "https://www.ansa.it/sito/notizie/mondo/mondo_rss.xml"),
    ("ANSA Economia", "https://www.ansa.it/sito/notizie/economia/economia_rss.xml"),
    ("GNews Geopolitics", "https://news.google.com/rss/search?q=geopolitics+OR+sanctions+OR+conflict&hl=en"),
]
 
USER_AGENT = "Mozilla/5.0 (compatible; GEOINT-agent/1.0; +https://github.com)"
 
SEVERITY_GUIDE = (
    "Severity scale (output an INTEGER 1-5):\n"
    "  1 GREEN   diplomatic detente, peace deals, prisoner exchanges, summits with positive outcome\n"
    "  2 YELLOW  economic or military treaty signed, defense pact, new trade agreement, alliance expansion\n"
    "  3 ORANGE  diplomatic friction, small skirmish, sanctions tightened, troop build-up, expulsion of diplomats\n"
    "  4 RED     deteriorating military or economic situation, missile strikes, financial crisis, government collapse imminent\n"
    "  5 PURPLE  full-scale war outbreak, civil war erupts, total economic collapse, mass mobilisation\n"
)
 
# ---------------------------------------------------------------------------
 
def fetch_url(url: str, timeout: int = 20) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()
 
 
def parse_rss(xml_bytes: bytes) -> list:
    """Tiny RSS / Atom parser — no external dep."""
    items = []
    try:
        root = ET.fromstring(xml_bytes)
    except ET.ParseError:
        return items
    for el in root.iter():
        if "}" in el.tag:
            el.tag = el.tag.split("}", 1)[1]
    for it in root.iter("item"):
        title = (it.findtext("title") or "").strip()
        link = (it.findtext("link") or "").strip()
        desc = (it.findtext("description") or "").strip()
        pub = (it.findtext("pubDate") or "").strip()
        if title:
            items.append({"title": title, "link": link, "desc": desc, "pub": pub})
    for it in root.iter("entry"):
        title = (it.findtext("title") or "").strip()
        link_el = it.find("link")
        link = link_el.get("href", "") if link_el is not None else ""
        desc = (it.findtext("summary") or it.findtext("content") or "").strip()
        pub = (it.findtext("updated") or it.findtext("published") or "").strip()
        if title:
            items.append({"title": title, "link": link, "desc": desc, "pub": pub})
    return items
 
 
def strip_html(s: str) -> str:
    s = re.sub(r"<[^>]+>", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s
 
 
def collect_headlines(limit_per_feed: int) -> list:
    out = []
    for src_name, url in RSS_FEEDS:
        try:
            raw = fetch_url(url)
            items = parse_rss(raw)[:limit_per_feed]
            for it in items:
                out.append({
                    "source": src_name,
                    "title": it["title"],
                    "description": strip_html(it["desc"])[:400],
                    "url": it["link"],
                })
            print(f"[feed] {src_name}: {len(items)} items", file=sys.stderr)
        except Exception as exc:
            print(f"[feed] {src_name} FAILED: {exc}", file=sys.stderr)
    seen, dedup = set(), []
    for h in out:
        k = h["title"].lower()[:120]
        if k in seen:
            continue
        seen.add(k)
        dedup.append(h)
    return dedup
 
 
# ---- LLM clients ----------------------------------------------------------
 
def call_groq(prompt: str, system: str) -> str:
    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        raise RuntimeError("GROQ_API_KEY not set")
    body = json.dumps({
        "model": os.environ.get("GROQ_MODEL", "llama-3.3-70b-versatile"),
        "temperature": 0.1,
        "response_format": {"type": "json_object"},
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": prompt},
        ],
    }).encode("utf-8")
    req = urllib.request.Request(
        "https://api.groq.com/openai/v1/chat/completions",
        data=body,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "User-Agent": USER_AGENT,
            "Accept": "application/json",
        },
    )
    with urllib.request.urlopen(req, timeout=90) as r:
        data = json.loads(r.read())
    return data["choices"][0]["message"]["content"]
 
 
def call_anthropic(prompt: str, system: str) -> str:
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        raise RuntimeError("ANTHROPIC_API_KEY not set")
    body = json.dumps({
        "model": os.environ.get("ANTHROPIC_MODEL", "claude-3-5-haiku-latest"),
        "max_tokens": 4096,
        "system": system,
        "messages": [{"role": "user", "content": prompt}],
    }).encode("utf-8")
    req = urllib.request.Request(
        "https://api.anthropic.com/v1/messages",
        data=body,
        headers={
            "x-api-key": api_key,
            "anthropic-version": "2023-06-01",
            "Content-Type": "application/json",
            "User-Agent": USER_AGENT,
            "Accept": "application/json",
        },
    )
    with urllib.request.urlopen(req, timeout=90) as r:
        data = json.loads(r.read())
    return data["content"][0]["text"]
 
 
def call_llm(prompt: str, system: str) -> str:
    if os.environ.get("GROQ_API_KEY"):
        return call_groq(prompt, system)
    if os.environ.get("ANTHROPIC_API_KEY"):
        return call_anthropic(prompt, system)
    raise RuntimeError("Set GROQ_API_KEY (free at console.groq.com) or ANTHROPIC_API_KEY")
 
 
# ---- Analysis prompt ------------------------------------------------------
 
SYSTEM_PROMPT = (
    "You are a geopolitical and economic intelligence analyst. "
    "From a batch of news headlines you select only items of strategic significance "
    "(armed conflicts, sanctions, treaties, diplomatic incidents, major economic shocks, "
    "elections with geopolitical consequences). You ignore sports, celebrity, weather, "
    "domestic crime, lifestyle. For each selected item you output strict JSON.\n\n"
    + SEVERITY_GUIDE +
    "\nFor each event also provide approximate latitude and longitude of the city or "
    "country where it primarily occurred. Use your geographic knowledge; do not guess "
    "if truly unknown — drop the item instead. Coordinates must be decimal degrees, "
    "lat in [-90,90], lng in [-180,180]."
)
 
USER_TEMPLATE = """Here are recent news headlines. Return a JSON object:
{{"events":[ {{ "title": "...", "description": "1-2 sentence summary", "lat": float, "lng": float, "severity": 1-5, "location": "City, Country", "source_idx": int }} ]}}
 
Rules:
- Keep at most {max_keep} items, the most strategically important.
- `source_idx` is the index of the source headline in the list below (0-based).
- Description must be in the same language as the original headline.
- If a headline is not strategically significant, omit it. Better few good ones than many weak.
- Severity must reflect the GLOBAL strategic impact, not local sentiment.
 
Headlines (numbered):
{headlines}
"""
 
 
def analyse(headlines: list, max_keep: int) -> list:
    numbered = "\n".join(
        f"[{i}] ({h['source']}) {h['title']} — {h['description'][:200]}"
        for i, h in enumerate(headlines)
    )
    prompt = USER_TEMPLATE.format(max_keep=max_keep, headlines=numbered)
    raw = call_llm(prompt, SYSTEM_PROMPT)
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
        if not title:
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
        ev_id = hashlib.sha1(
            (title + dt.datetime.now(dt.timezone.utc).strftime("%Y%m%d")).encode("utf-8")
        ).hexdigest()[:12]
        enriched.append({
            "id": ev_id,
            "title": title[:200],
            "description": str(ev.get("description", "")).strip()[:600],
            "lat": round(lat, 4),
            "lng": round(lng, 4),
            "severity": sev,
            "location": str(ev.get("location", "")).strip()[:120],
            "source": src_name,
            "url": src_url,
            "image": None,
            "ts": int(time.time() * 1000),
        })
    return enriched
 
 
# ---- File I/O -------------------------------------------------------------
 
def load_existing() -> dict:
    if not OUT_FILE.exists():
        return {"schema": 1, "updated": None, "events": []}
    try:
        return json.loads(OUT_FILE.read_text(encoding="utf-8"))
    except Exception:
        return {"schema": 1, "updated": None, "events": []}
 
 
def save(events: list) -> None:
    payload = {
        "schema": 1,
        "updated": dt.datetime.now(dt.timezone.utc).isoformat(),
        "events": events,
    }
    OUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUT_FILE.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(f"[write] {OUT_FILE} ({len(events)} events)", file=sys.stderr)
 
 
# ---- Main -----------------------------------------------------------------
 
def main() -> int:
    max_events = int(os.environ.get("GEOINT_MAX_EVENTS", "200"))
    max_age_h = int(os.environ.get("GEOINT_MAX_AGE_H", "168"))
    feed_limit = int(os.environ.get("GEOINT_FEED_LIMIT", "25"))
    keep_per_run = int(os.environ.get("GEOINT_KEEP_PER_RUN", "8"))
 
    existing = load_existing()
    old_events = existing.get("events", [])
 
    cutoff_ms = (time.time() - max_age_h * 3600) * 1000
    old_events = [e for e in old_events if e.get("ts", 0) >= cutoff_ms]
 
    print(f"[start] {len(old_events)} existing events after pruning", file=sys.stderr)
    headlines = collect_headlines(feed_limit)
    print(f"[start] {len(headlines)} headlines collected", file=sys.stderr)
    if not headlines:
        save(old_events)
        return 0
 
    new_events = analyse(headlines, max_keep=keep_per_run)
    print(f"[llm] {len(new_events)} events after analysis", file=sys.stderr)
 
    seen = {e["id"] for e in old_events if "id" in e}
    for ev in new_events:
        if ev["id"] in seen:
            continue
        old_events.append(ev)
        seen.add(ev["id"])
 
    old_events.sort(key=lambda e: e.get("ts", 0), reverse=True)
    old_events = old_events[:max_events]
 
    save(old_events)
    return 0
 
 
if __name__ == "__main__":
    sys.exit(main())
 
