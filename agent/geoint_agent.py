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


IMG_IN_HTML_RE = re.compile(r'<img[^>]+src=["\'](https?://[^"\']+)["\']', re.IGNORECASE)


def _extract_image(item) -> str:
    """Look for an image URL in common RSS/Atom places."""
    # enclosure type="image/*" url="..."
    for enc in item.iter("enclosure"):
        url = enc.get("url") or ""
        typ = (enc.get("type") or "").lower()
        if url and ("image" in typ or url.lower().endswith((".jpg", ".jpeg", ".png", ".webp", ".gif"))):
            return url
    # media:content / media:thumbnail (namespace already stripped)
    for tag in ("content", "thumbnail"):
        for m in item.iter(tag):
            url = m.get("url") or ""
            if url and any(url.lower().endswith(ext) for ext in (".jpg", ".jpeg", ".png", ".webp", ".gif")):
                return url
            # media:content may not have extension; trust it if type starts with image
            if url and (m.get("type") or "").lower().startswith("image"):
                return url
    # <img> inside description / content
    for body_tag in ("description", "summary", "content", "encoded"):
        body = item.findtext(body_tag) or ""
        match = IMG_IN_HTML_RE.search(body)
        if match:
            return match.group(1)
    return ""


def _parse_pubdate(s: str) -> int:
    """Return Unix ms, or 0 if unparseable."""
    if not s:
        return 0
    s = s.strip()
    # RFC 822: Mon, 29 Jun 2026 12:34:56 GMT
    for fmt in (
        "%a, %d %b %Y %H:%M:%S %z",
        "%a, %d %b %Y %H:%M:%S GMT",
        "%a, %d %b %Y %H:%M:%S %Z",
        "%Y-%m-%dT%H:%M:%S%z",
        "%Y-%m-%dT%H:%M:%SZ",
        "%Y-%m-%dT%H:%M:%S.%f%z",
        "%Y-%m-%dT%H:%M:%S.%fZ",
    ):
        try:
            d = dt.datetime.strptime(s, fmt)
            if d.tzinfo is None:
                d = d.replace(tzinfo=dt.timezone.utc)
            return int(d.timestamp() * 1000)
        except ValueError:
            continue
    return 0


def parse_rss(xml_bytes: bytes) -> list:
    """Tiny RSS / Atom parser - no external dep."""
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
            items.append({
                "title": title, "link": link, "desc": desc, "pub": pub,
                "image": _extract_image(it),
                "pub_ms": _parse_pubdate(pub),
            })
    for it in root.iter("entry"):
        title = (it.findtext("title") or "").strip()
        link_el = it.find("link")
        link = link_el.get("href", "") if link_el is not None else ""
        desc = (it.findtext("summary") or it.findtext("content") or "").strip()
        pub = (it.findtext("updated") or it.findtext("published") or "").strip()
        if title:
            items.append({
                "title": title, "link": link, "desc": desc, "pub": pub,
                "image": _extract_image(it),
                "pub_ms": _parse_pubdate(pub),
            })
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
                    "image": it.get("image") or "",
                    "pub_ms": it.get("pub_ms") or 0,
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
    "From a batch of news headlines you select items of strategic significance "
    "across the FULL spectrum: armed conflicts AND peace deals, sanctions AND trade "
    "agreements, diplomatic incidents AND state visits, economic shocks AND major "
    "investment pacts, elections with geopolitical consequences. "
    "You IGNORE sports, celebrity, weather, domestic crime, lifestyle.\n\n"
    "IMPORTANT: actively look for positive items too. Diplomatic detente, treaties, "
    "alliance expansions, peace negotiations, prisoner exchanges, normalisation deals "
    "all matter and belong on the map as GREEN (1) or YELLOW (2). Do not over-weight "
    "negative news. A good batch typically contains a MIX of severities 1 through 5.\n\n"
    + SEVERITY_GUIDE +
    "\nGEOCODING RULES — CRITICAL:\n"
    "• Pin each event to the MOST SPECIFIC location available: the exact city, base, "
    "  battlefield, parliament building, embassy, port, or summit venue where the "
    "  event actually happened. NOT the country capital as a default.\n"
    "• If the headline says 'strike on Aleppo' → pin Aleppo (36.20, 37.16), NOT Damascus.\n"
    "• If 'NATO summit in The Hague' → pin The Hague (52.07, 4.30), NOT Brussels.\n"
    "• If 'sanctions on Russia announced by EU' → pin Brussels (50.85, 4.35) (the actor's HQ), not Moscow.\n"
    "• If 'Trump meets Xi in Busan' → pin Busan (35.18, 129.08).\n"
    "• If 'oil tanker seized in Strait of Hormuz' → pin the strait (26.57, 56.25).\n"
    "• Multi-location: pick where the ACTION occurred (signing, strike, summit), not where it is reported from.\n"
    "• If you truly cannot identify a specific place, DROP THE ITEM rather than guessing the country centroid.\n"
    "• Lat/lng must be decimal degrees with 2+ decimals of precision when possible, lat ∈ [-90,90], lng ∈ [-180,180]."
)

USER_TEMPLATE = """Here are recent news headlines. Return a JSON object:
{{"events":[ {{ "title": "...", "description": "1-2 sentence summary", "lat": float, "lng": float, "severity": 1-5, "location": "City, Country", "source_idx": int }} ]}}

Rules:
- Keep at most {max_keep} items.
- Try to PICK A MIX of severities. If only severe items are picked, the map becomes a wall of red; aim for at least 2 items of severity 1 or 2 (green / yellow: peace deals, treaties, trade agreements, diplomatic openings) when the news batch contains any.
- `source_idx` is the index of the source headline in the list below (0-based).
- Description must be in the same language as the original headline.
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
        src_image = headlines[idx].get("image") if 0 <= idx < len(headlines) else None
        src_pub_ms = headlines[idx].get("pub_ms") if 0 <= idx < len(headlines) else 0
        # Use the article pubDate if available, otherwise now()
        ev_ts = src_pub_ms if src_pub_ms else int(time.time() * 1000)
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
            "image": src_image or None,
            "ts": ev_ts,
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
    # Dedup window: compare new events against events from the last 14 days
    dedup_window_ms = 14 * 24 * 3600 * 1000
    cluster_window_ms = 7 * 24 * 3600 * 1000
    now_ms = int(time.time() * 1000)
    recent_for_dedup = [
        e for e in old_events
        if (now_ms - e.get("ts", 0)) <= dedup_window_ms
    ]
    added = 0
    skipped_dup = 0
    spread_count = 0
    for ev in new_events:
        if ev["id"] in seen:
            skipped_dup += 1
            continue
        # === SEMANTIC DEDUP ===
        if is_similar_to_any(ev, recent_for_dedup, threshold=0.55):
            skipped_dup += 1
            print(f"[dedup] skipped similar: {ev['title'][:80]}", file=sys.stderr)
            continue
        # === ANTI-CLUSTERING ===
        # If an event with very-close coords exists within 7 days, spread this one out
        if spread_if_clustered(ev, old_events, cluster_window_ms, min_deg=1.0):
            spread_count += 1
        old_events.append(ev)
        seen.add(ev["id"])
        recent_for_dedup.append(ev)
        added += 1

    print(f"[merge] added={added} skipped_dup={skipped_dup} spread={spread_count}", file=sys.stderr)
    old_events.sort(key=lambda e: e.get("ts", 0), reverse=True)
    old_events = old_events[:max_events]

    save(old_events)
    return 0


# ---- Semantic similarity & anti-clustering helpers -----------------------------

_STOP_TOKENS = {
    "the","a","an","of","in","on","at","to","for","by","with","and","or","but",
    "is","are","was","were","be","been","being","has","have","had","do","does",
    "did","not","no","this","that","these","those","it","its","from","as","into",
    "after","before","over","amid","says","said","reports","report","new","more",
    "ha","gli","lo","la","le","il","del","della","dei","delle","un","una","che",
}


def _tokens(text: str) -> set:
    """Lowercase, strip punctuation, return a set of significant tokens."""
    if not text:
        return set()
    t = re.sub(r"[^\w\s']", " ", text.lower())
    out = set()
    for w in t.split():
        if len(w) <= 2:
            continue
        if w in _STOP_TOKENS:
            continue
        out.add(w)
    return out


def _jaccard(a: set, b: set) -> float:
    if not a or not b:
        return 0.0
    inter = len(a & b)
    union = len(a | b)
    return inter / union if union else 0.0


# Topic/action words that strongly indicate same-story across phrasings
_TOPIC_KEYWORDS = {
    "sanctions","sanction","embargo","ceasefire","truce","summit","treaty","accord",
    "deal","agreement","pact","strike","missile","drone","attack","invasion",
    "election","vote","poll","referendum","tariff","tariffs","trade","gas","oil",
    "nuclear","mobilisation","mobilization","prisoner","exchange","talks","negotiation",
    "negotiations","meeting","visit","ambassador","ambassadors","expel","expelled",
}


def _topic_words(text: str) -> set:
    """Return topic keywords found in the text."""
    if not text:
        return set()
    t = text.lower()
    return {w for w in _TOPIC_KEYWORDS if w in t}


def is_similar_to_any(ev: dict, others: list, threshold: float = 0.40) -> bool:
    """Return True if ev is semantically similar to any item in others.
    Three signals are combined:
      1. Jaccard overlap on content tokens (≥ threshold).
      2. Shared named entities (≥ 2) + shared topic keyword.
      3. Same topic keyword AND ≥ 2 shared named entities (catches rephrasings).
    """
    ev_text = (ev.get("title", "") + " " + ev.get("description", "")).strip()
    ev_tokens = _tokens(ev_text)
    if not ev_tokens:
        return False
    ev_entities = {
        w.lower() for w in re.findall(r"\b[A-Z][a-z]{2,}\b", ev.get("title", ""))
        if w.lower() not in _STOP_TOKENS
    }
    ev_topics = _topic_words(ev_text)

    for other in others:
        other_text = (other.get("title", "") + " " + other.get("description", "")).strip()
        other_tokens = _tokens(other_text)
        sim = _jaccard(ev_tokens, other_tokens)
        if sim >= threshold:
            return True
        other_entities = {
            w.lower() for w in re.findall(r"\b[A-Z][a-z]{2,}\b", other.get("title", ""))
            if w.lower() not in _STOP_TOKENS
        }
        other_topics = _topic_words(other_text)
        shared_ent = ev_entities & other_entities
        shared_topic = ev_topics & other_topics
        # Strong signal: same topic action + at least 2 shared entities (e.g. same actors)
        if shared_topic and len(shared_ent) >= 2:
            return True
        # Or: same topic + same severity + at least 1 shared entity
        if shared_topic and len(shared_ent) >= 1 and ev.get("severity") == other.get("severity") and sim >= 0.25:
            return True
    return False


def spread_if_clustered(ev: dict, others: list, window_ms: int, min_deg: float = 1.0) -> bool:
    """If ev is within min_deg of any event in others (within time window),
    offset its coords radially outward. Returns True if moved."""
    import math as _math
    ev_ts = ev.get("ts", 0)
    moved = False
    angles = [0, 60, 120, 180, 240, 300, 30, 90, 150, 210, 270, 330]
    max_attempts = 12
    attempt = 0
    while attempt < max_attempts:
        clustered = False
        for other in others:
            if abs(other.get("ts", 0) - ev_ts) > window_ms:
                continue
            dlat = ev["lat"] - other["lat"]
            dlng = ev["lng"] - other["lng"]
            if abs(dlat) < min_deg and abs(dlng) < min_deg:
                clustered = True
                break
        if not clustered:
            return moved
        ang = _math.radians(angles[attempt % len(angles)])
        offset = min_deg * 1.1
        ev["lat"] = round(ev["lat"] + offset * _math.cos(ang), 4)
        ev["lng"] = round(ev["lng"] + offset * _math.sin(ang), 4)
        ev["lat"] = max(-89.9, min(89.9, ev["lat"]))
        ev["lng"] = ((ev["lng"] + 180) % 360) - 180
        moved = True
        attempt += 1
    return moved
if __name__ == "__main__":
    sys.exit(main())
