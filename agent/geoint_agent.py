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
    GEOINT_MAX_AGE_H    drop events older than N hours (default 336 = 14d)
    GEOINT_FEED_LIMIT   max headlines fetched per feed (default 25)

Extra behaviour:
    * Every selected event is cross-referenced against ALL fetched headlines
      and gets a Ground News-style coverage record:
      {"left": n, "center": n, "right": n, "total": n, "sources": [...]}.
    * A story already on the map is NOT re-added on later days. It is only
      refreshed if a meaningful change occurred (severity shift).
"""

from __future__ import annotations
import datetime as dt
import hashlib
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT_FILE = ROOT / "public" / "events.json"

# ---- Free RSS feeds (no key required) -------------------------------------
# Ground News-style roster: (name, url, bias)
# bias in {left, lean_left, center, lean_right, right}
# NOTE: keep this list in sync with RSS_SOURCES in public/index.html
RSS_FEEDS = [
    # ---- LEFT ----
    ("CNN World", "http://rss.cnn.com/rss/edition_world.rss", "left"),
    ("HuffPost World", "https://www.huffpost.com/section/world-news/feed", "left"),
    ("MSNBC", "https://feeds.nbcnews.com/msnbc/public/news", "left"),
    ("The Daily Beast", "https://feeds.thedailybeast.com/rss/articles", "left"),
    ("The Intercept", "https://theintercept.com/feed/?rss", "left"),
    # ---- LEAN LEFT ----
    ("New York Times World", "https://rss.nytimes.com/services/xml/rss/nyt/World.xml", "lean_left"),
    ("Washington Post World", "https://feeds.washingtonpost.com/rss/world", "lean_left"),
    ("The Guardian World", "https://www.theguardian.com/world/rss", "lean_left"),
    ("NBC News World", "https://feeds.nbcnews.com/nbcnews/public/world", "lean_left"),
    ("ABC News International", "https://abcnews.go.com/abcnews/internationalheadlines", "lean_left"),
    ("CBS News World", "https://www.cbsnews.com/latest/rss/world", "lean_left"),
    ("NDTV World", "https://feeds.feedburner.com/ndtvnews-world-news", "lean_left"),
    ("Business Insider", "https://feeds.businessinsider.com/custom/all", "lean_left"),
    ("Mirror World", "https://www.mirror.co.uk/news/world-news/?service=rss", "lean_left"),
    ("Der Spiegel International", "https://www.spiegel.de/international/index.rss", "lean_left"),
    ("Al Jazeera", "https://www.aljazeera.com/xml/rss/all.xml", "lean_left"),
    ("Time", "https://time.com/feed/", "lean_left"),
    ("Le Monde English", "https://www.lemonde.fr/en/rss/une.xml", "lean_left"),
    ("The Hindu International", "https://www.thehindu.com/news/international/feeder/default.rss", "lean_left"),
    # ---- CENTER ----
    ("Reuters World", "https://feeds.reuters.com/Reuters/worldNews", "center"),
    ("BBC World", "http://feeds.bbci.co.uk/news/world/rss.xml", "center"),
    ("BBC Business", "http://feeds.bbci.co.uk/news/business/rss.xml", "center"),
    ("CNBC World", "https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=100727362", "center"),
    ("Axios", "https://api.axios.com/feed/", "center"),
    ("Politico", "https://rss.politico.com/politics-news.xml", "center"),
    ("IBTimes", "https://www.ibtimes.com/rss", "center"),
    ("RTE News", "https://www.rte.ie/rss/news.xml", "center"),
    ("Financial Times World", "https://www.ft.com/world?format=rss", "center"),
    ("Sky News World", "https://feeds.skynews.com/feeds/rss/world.xml", "center"),
    ("France 24", "https://www.france24.com/en/rss", "center"),
    ("DW News", "https://rss.dw.com/rdf/rss-en-all", "center"),
    ("The Hill", "https://thehill.com/news/feed/", "center"),
    ("News24", "https://feeds.24.com/articles/news24/World/rss", "center"),
    ("Jerusalem Post", "https://www.jpost.com/rss/rssfeedsfrontpage.aspx", "center"),
    ("ANSA Mondo", "https://www.ansa.it/sito/notizie/mondo/mondo_rss.xml", "center"),
    ("ANSA Economia", "https://www.ansa.it/sito/notizie/economia/economia_rss.xml", "center"),
    ("GNews Geopolitics", "https://news.google.com/rss/search?q=geopolitics+OR+sanctions+OR+conflict&hl=en", "center"),
    ("Google News Top", "https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en", "center"),
    # -- Wire services from the sources panel --
    ("Associated Press", "https://feeds.apnews.com/rss/apf-topnews", "center"),
    ("Bloomberg Politics", "https://feeds.bloomberg.com/politics/news.rss", "center"),
    # -- Italy / France --
    ("Adnkronos Internazionale", "https://www.adnkronos.com/RSS_Internazionale.xml", "center"),
    ("AGI Estero", "https://www.agi.it/estero/rss", "center"),
    # -- Middle East regional --
    ("Times of Israel", "https://www.timesofisrael.com/feed/", "center"),
    ("Al-Monitor", "https://www.al-monitor.com/rss", "center"),
    # -- Africa (previously under-represented) --
    ("Africanews", "https://www.africanews.com/feed/rss", "center"),
    ("All Africa", "https://allafrica.com/tools/headlines/rdf/latest/headlines.rdf", "center"),
    ("Egypt Independent", "https://egyptindependent.com/feed/", "center"),
    ("The Africa Report", "https://www.theafricareport.com/feed/", "center"),
    # -- Japan (previously ZERO coverage) --
    ("NHK World", "https://www3.nhk.or.jp/nhkworld/en/news/all.rss", "center"),
    ("Kyodo News", "https://english.kyodonews.net/rss/news.xml", "center"),
    ("Japan Times", "https://www.japantimes.co.jp/feed/", "center"),
    ("Nikkei Asia", "https://asia.nikkei.com/rss/feed/nar", "center"),
    # -- China / East Asia --
    ("South China Morning Post", "https://www.scmp.com/rss/91/feed", "center"),
    ("Focus Taiwan", "https://focustaiwan.tw/rss/aall.xml", "center"),
    ("Yonhap News", "https://en.yna.co.kr/RSS/news.xml", "center"),
    # -- South-East Asia --
    ("Channel News Asia", "https://www.channelnewsasia.com/rssfeeds/8395986", "center"),
    ("Bangkok Post", "https://www.bangkokpost.com/rss/data/topstories.xml", "center"),
    ("Straits Times Asia", "https://www.straitstimes.com/news/asia/rss.xml", "center"),
    ("Jakarta Post", "https://www.thejakartapost.com/rss", "center"),
    # -- India --
    ("Times of India World", "https://timesofindia.indiatimes.com/rssfeeds/296589292.cms", "center"),
    ("Hindustan Times World", "https://www.hindustantimes.com/feeds/rss/world-news/index.xml", "center"),
    # -- Latin America / Brazil (previously under-represented) --
    ("Rio Times", "https://www.riotimesonline.com/feed/", "center"),
    ("MercoPress", "https://en.mercopress.com/rss/", "center"),
    ("Buenos Aires Times", "https://www.batimes.com.ar/feed", "center"),
    # ---- LEAN RIGHT ----
    ("The Telegraph", "https://www.telegraph.co.uk/news/rss.xml", "lean_right"),
    ("New York Post", "https://nypost.com/feed/", "lean_right"),
    ("Washington Times World", "https://www.washingtontimes.com/rss/headlines/news/world/", "lean_right"),
    ("Die Welt", "https://www.welt.de/feeds/latest.rss", "lean_right"),
    ("Business Standard", "https://www.business-standard.com/rss/latest.rss", "lean_right"),
    ("TASS", "https://tass.com/rss/v2.xml", "lean_right"),
    ("RT News", "https://www.rt.com/rss/news/", "lean_right"),
    ("Al Arabiya English", "https://english.alarabiya.net/feed/rss2/en.xml", "lean_right"),
    ("Wall Street Journal World", "https://feeds.a.dj.com/rss/RSSWorldNews.xml", "lean_right"),
    ("Arab News", "https://www.arabnews.com/rss.xml", "lean_right"),
    ("Daily Sabah", "https://www.dailysabah.com/rss/latest", "lean_right"),
    # ---- RIGHT ----
    ("Fox News World", "https://moxie.foxnews.com/google-publisher/world.xml", "right"),
    ("Daily Express World", "https://www.express.co.uk/posts/rss/78/world", "right"),
    ("OAN", "https://www.oann.com/feed/", "right"),
    ("Breitbart", "https://feeds.feedburner.com/breitbart", "right"),
    ("Daily Star World", "https://www.dailystar.co.uk/news/world-news/?service=rss", "right"),
    ("Washington Examiner", "https://www.washingtonexaminer.com/section/news/feed", "right"),
    ("Daily Mail World", "https://www.dailymail.co.uk/news/worldnews/index.rss", "right"),
    ("Epoch Times World", "https://www.theepochtimes.com/c-world/feed", "right"),
    ("Global Times", "https://www.globaltimes.cn/rss/outbrain.xml", "right"),
    ("China Daily World", "https://www.chinadaily.com.cn/rss/world_rss.xml", "right"),
    ("Sputnik International", "https://sputnikglobe.com/export/rss2/archive/index.xml", "right"),
    ("Tehran Times", "https://www.tehrantimes.com/rss.xml", "right"),
]

# Collapse the 5-step bias scale into the 3 buckets shown on the coverage bar
BIAS_BUCKET = {
    "left": "left", "lean_left": "left",
    "center": "center",
    "lean_right": "right", "right": "right",
}

USER_AGENT = "Mozilla/5.0 (compatible; GEOINT-agent/1.0; +https://github.com)"

# ---- Editorial filters ----------------------------------------------------
# GEOINT reports EVENTS THAT HAPPENED. Speculative or hypothetical framings
# ("X may attack Y", "Y could rise", "expected to", "considering", etc.) are
# noise and must be excluded from the map. These regexes catch the most common
# forms without over-firing on prose (e.g. "May" the month).
HYPOTHETICAL_RE = re.compile(
    # Modal verbs that always introduce speculation in headlines.
    r"\b(might|could|would|should)\s+\w+|"
    # "may" is trickier because it's also the month; require a following word
    # that is NOT a digit or a year, and NOT the specific date form "May 3rd".
    r"\bmay\s+(?!\d{1,2}(st|nd|rd|th)?\b)(?!\w+\s+\d{4}\b)[a-z]{2,}\b|"
    r"\b(possibly|potentially|perhaps|maybe)\b|"
    r"\bis\s+(expected|likely|set|poised|thought|believed|rumo(u)?red)\s+to\b|"
    r"\b(are)\s+(expected|likely|set|poised|thought|believed|rumo(u)?red)\s+to\b|"
    r"\b(planning|considering|weighing|mulling|eyeing|floating|proposing)\s+to\b|"
    r"\b(appears?|seems?)\s+to\b|"
    r"\brumo(u)?r(s|ed|oured)?\b|"
    r"\b(no decision|no final decision|talks of|reports of a possible)\b",
    re.IGNORECASE,
)

def _is_hypothetical(text: str) -> bool:
    if not text:
        return False
    # Guard: single "may" as a bare month reference at the very end of a sentence
    # or in a date pattern shouldn't trigger. The regex above handles most cases.
    return bool(HYPOTHETICAL_RE.search(text))


# ---- Geographic sanity: country centroids + rough max-distance ------------
# Used to sanity-check the LLM's geocoding: if a headline mentions Iran and
# the returned coordinates are 6 000 km from Tehran with no other country
# mentioned, drop the event. Coordinates are (lat, lng, radius_deg).
COUNTRY_BOX = {
    # Middle East / North Africa
    "iran": (32.4, 53.7, 12), "iraq": (33.2, 43.7, 8), "syria": (34.8, 39.0, 6),
    "yemen": (15.6, 48.5, 10), "houthi": (15.6, 48.5, 10), "houthis": (15.6, 48.5, 10),
    "saudi arabia": (23.9, 45.1, 15), "uae": (24.0, 54.0, 5), "qatar": (25.3, 51.2, 3),
    "kuwait": (29.3, 47.5, 3), "bahrain": (26.0, 50.5, 2), "oman": (21.5, 55.9, 8),
    "jordan": (31.3, 36.5, 5), "lebanon": (33.9, 35.9, 3), "israel": (31.0, 34.9, 4),
    "palestine": (31.9, 35.2, 3), "gaza": (31.4, 34.4, 2), "west bank": (32.0, 35.3, 3),
    "turkey": (39.0, 35.0, 10), "egypt": (26.8, 30.8, 10), "libya": (26.3, 17.2, 12),
    "tunisia": (33.9, 9.6, 6), "algeria": (28.0, 3.0, 15), "morocco": (31.8, -7.1, 8),
    "sudan": (12.9, 30.2, 12), "south sudan": (7.0, 30.0, 8),
    # Sub-Saharan Africa
    "nigeria": (9.1, 8.7, 10), "ethiopia": (9.1, 40.5, 10), "kenya": (0.0, 37.9, 8),
    "south africa": (-30.6, 22.9, 12), "somalia": (5.2, 46.2, 10),
    "dr congo": (-4.0, 21.8, 12), "drc": (-4.0, 21.8, 12), "congo": (-1.0, 15.0, 8),
    "uganda": (1.4, 32.3, 5), "tanzania": (-6.4, 34.9, 8), "ghana": (7.9, -1.0, 5),
    "senegal": (14.5, -14.5, 5), "mali": (17.6, -4.0, 10), "niger": (17.6, 8.1, 10),
    "cameroon": (7.4, 12.4, 8), "rwanda": (-2.0, 30.0, 3), "burundi": (-3.4, 29.9, 3),
    "mozambique": (-18.7, 35.5, 8), "angola": (-11.2, 17.9, 10), "zimbabwe": (-19.0, 29.2, 6),
    "madagascar": (-18.8, 46.9, 8),
    # Europe
    "russia": (61.5, 100.0, 40), "ukraine": (48.4, 31.2, 10), "belarus": (53.7, 27.9, 6),
    "poland": (51.9, 19.1, 6), "germany": (51.2, 10.4, 6), "france": (46.6, 2.2, 8),
    "spain": (40.5, -3.7, 8), "portugal": (39.4, -8.2, 5), "italy": (41.9, 12.6, 8),
    "greece": (39.1, 21.8, 6), "cyprus": (35.1, 33.4, 3), "malta": (35.9, 14.4, 2),
    "netherlands": (52.1, 5.3, 4), "belgium": (50.5, 4.5, 3), "luxembourg": (49.8, 6.1, 2),
    "switzerland": (46.8, 8.2, 3), "austria": (47.5, 14.5, 4), "hungary": (47.2, 19.5, 4),
    "romania": (45.9, 25.0, 5), "bulgaria": (42.7, 25.5, 4), "serbia": (44.0, 20.9, 4),
    "croatia": (45.1, 15.2, 4), "slovenia": (46.1, 14.8, 3), "slovakia": (48.7, 19.7, 3),
    "czech": (49.8, 15.5, 4), "czechia": (49.8, 15.5, 4),
    "bosnia": (43.9, 17.7, 3), "montenegro": (42.7, 19.4, 3),
    "albania": (41.2, 20.2, 3), "north macedonia": (41.6, 21.7, 3), "kosovo": (42.6, 20.9, 3),
    "moldova": (47.4, 28.4, 3),
    "sweden": (62.0, 15.0, 10), "norway": (60.5, 8.5, 10), "finland": (61.9, 25.7, 8),
    "denmark": (56.3, 9.5, 4), "iceland": (64.9, -19.0, 6),
    "estonia": (58.6, 25.0, 3), "latvia": (56.9, 24.6, 3), "lithuania": (55.2, 23.9, 4),
    "united kingdom": (54.0, -2.4, 7), "uk": (54.0, -2.4, 7), "britain": (54.0, -2.4, 7),
    "england": (52.4, -1.2, 5), "scotland": (56.9, -4.2, 5), "ireland": (53.4, -8.2, 4),
    # Americas
    "usa": (39.8, -98.6, 22), "united states": (39.8, -98.6, 22), "america": (39.8, -98.6, 22),
    "us ": (39.8, -98.6, 22), " us,": (39.8, -98.6, 22),
    "washington": (38.9, -77.0, 5), "canada": (56.1, -106.3, 25), "mexico": (23.6, -102.5, 12),
    "brazil": (-14.2, -51.9, 18), "argentina": (-38.4, -63.6, 15), "chile": (-35.7, -71.5, 15),
    "colombia": (4.6, -74.3, 8), "venezuela": (6.4, -66.6, 8), "peru": (-9.2, -75.0, 10),
    "ecuador": (-1.8, -78.2, 5), "bolivia": (-16.3, -63.6, 8), "uruguay": (-32.5, -55.8, 3),
    "paraguay": (-23.4, -58.4, 5), "guatemala": (15.8, -90.2, 3), "honduras": (15.2, -86.2, 3),
    "el salvador": (13.8, -88.9, 2), "nicaragua": (12.9, -85.2, 3), "costa rica": (9.7, -83.7, 2),
    "panama": (8.5, -80.8, 3), "cuba": (21.5, -77.8, 5), "haiti": (18.9, -72.3, 2),
    "dominican republic": (18.7, -70.2, 3), "jamaica": (18.1, -77.3, 2), "puerto rico": (18.2, -66.6, 2),
    # Asia
    "china": (35.9, 104.2, 25), "taiwan": (23.7, 121.0, 4), "hong kong": (22.4, 114.1, 2),
    "japan": (36.2, 138.3, 8), "north korea": (40.3, 127.5, 5), "south korea": (35.9, 127.8, 4),
    "korea": (37.6, 127.4, 6), "mongolia": (46.9, 103.8, 15),
    "india": (20.6, 78.9, 15), "pakistan": (30.4, 69.3, 8), "bangladesh": (23.7, 90.4, 4),
    "sri lanka": (7.9, 80.8, 3), "nepal": (28.4, 84.1, 4), "bhutan": (27.5, 90.4, 2),
    "afghanistan": (33.9, 67.7, 8), "kazakhstan": (48.0, 66.9, 20), "uzbekistan": (41.4, 64.6, 10),
    "kyrgyzstan": (41.2, 74.8, 5), "tajikistan": (38.9, 71.3, 4), "turkmenistan": (38.9, 59.6, 8),
    "azerbaijan": (40.1, 47.6, 4), "armenia": (40.1, 45.0, 3), "georgia": (42.3, 43.4, 4),
    "vietnam": (14.1, 108.3, 10), "thailand": (15.9, 100.9, 8), "myanmar": (21.9, 95.9, 8),
    "burma": (21.9, 95.9, 8), "laos": (19.9, 102.5, 5), "cambodia": (12.6, 104.9, 4),
    "malaysia": (4.2, 109.5, 8), "indonesia": (-2.5, 118.0, 20), "philippines": (12.9, 121.8, 10),
    "singapore": (1.35, 103.8, 1), "brunei": (4.5, 114.7, 2),
    # Oceania
    "australia": (-25.3, 133.8, 22), "new zealand": (-40.9, 174.9, 10),
    "papua": (-6.3, 143.9, 8), "fiji": (-17.7, 178.1, 5),
    # ---- Conflict zones / disputed regions (always add these because news
    # headlines usually reference the region, not the sovereign country) ----
    "donbas": (48.0, 38.0, 4), "donetsk": (48.0, 37.8, 2), "luhansk": (48.6, 39.3, 2),
    "crimea": (45.3, 34.0, 3), "kherson": (46.65, 32.6, 3), "zaporizhzhia": (47.85, 35.1, 3),
    "kharkiv": (49.99, 36.23, 2), "kyiv": (50.45, 30.52, 2), "odesa": (46.48, 30.73, 2),
    "odessa": (46.48, 30.73, 2), "mariupol": (47.10, 37.55, 2), "bakhmut": (48.60, 38.00, 2),
    "sumy": (50.90, 34.80, 2),
    "kursk": (51.73, 36.19, 3),
    "kaliningrad": (54.71, 20.51, 2), "belgorod": (50.60, 36.60, 3),
    "kashmir": (34.0, 76.0, 4), "ladakh": (34.2, 78.0, 3),
    "xinjiang": (41.0, 85.0, 8), "tibet": (30.0, 88.0, 8),
    "sinai": (29.5, 33.6, 3),
    "tigray": (13.5, 39.0, 3), "darfur": (13.6, 24.0, 5),
    "sahel": (15.0, 5.0, 15),
    "red sea": (20.0, 38.5, 8), "gulf of aden": (12.5, 47.0, 4),
    "strait of hormuz": (26.57, 56.25, 2), "persian gulf": (26.0, 52.0, 5),
    "south china sea": (13.0, 116.0, 10), "east china sea": (28.0, 125.0, 6),
    "taiwan strait": (24.0, 120.0, 3), "sea of japan": (40.0, 135.0, 8),
    "black sea": (43.0, 34.0, 6), "baltic sea": (58.0, 20.0, 6),
    "mediterranean": (36.0, 18.0, 15),
    # ---- Major cities (whole-word matches) ----
    "washington": (38.9, -77.0, 3), "new york": (40.7, -74.0, 2), "los angeles": (34.05, -118.24, 2),
    "moscow": (55.75, 37.62, 3), "st petersburg": (59.93, 30.34, 2), "vladivostok": (43.12, 131.90, 3),
    "beijing": (39.90, 116.40, 3), "shanghai": (31.23, 121.47, 2), "shenzhen": (22.54, 114.06, 2),
    "hong kong": (22.40, 114.10, 2), "taipei": (25.03, 121.57, 2),
    "tokyo": (35.68, 139.69, 2), "seoul": (37.57, 126.98, 2), "pyongyang": (39.02, 125.75, 2),
    "delhi": (28.61, 77.21, 2), "mumbai": (19.08, 72.88, 2), "bengaluru": (12.97, 77.59, 2),
    "islamabad": (33.68, 73.05, 2), "karachi": (24.86, 67.00, 2),
    "tehran": (35.69, 51.39, 2), "isfahan": (32.65, 51.68, 2), "shiraz": (29.59, 52.58, 2),
    "sanaa": (15.35, 44.19, 2), "aden": (12.80, 45.03, 2),
    "riyadh": (24.71, 46.68, 2), "mecca": (21.42, 39.83, 2), "doha": (25.29, 51.53, 2),
    "abu dhabi": (24.47, 54.37, 2), "dubai": (25.20, 55.27, 2),
    "baghdad": (33.32, 44.36, 2), "damascus": (33.51, 36.29, 2), "aleppo": (36.20, 37.16, 2),
    "beirut": (33.89, 35.50, 2), "amman": (31.95, 35.93, 2), "jerusalem": (31.78, 35.22, 2),
    "tel aviv": (32.09, 34.78, 2), "gaza city": (31.52, 34.45, 1),
    "ankara": (39.93, 32.87, 2), "istanbul": (41.01, 28.98, 2),
    "cairo": (30.04, 31.24, 2), "tripoli": (32.89, 13.19, 2), "khartoum": (15.50, 32.56, 2),
    "addis ababa": (9.03, 38.74, 2), "nairobi": (-1.29, 36.82, 2), "mogadishu": (2.05, 45.32, 2),
    "kinshasa": (-4.32, 15.32, 2), "lagos": (6.52, 3.38, 2), "abuja": (9.08, 7.40, 2),
    "johannesburg": (-26.20, 28.05, 2), "cape town": (-33.92, 18.42, 2), "pretoria": (-25.75, 28.19, 2),
    "london": (51.51, -0.13, 2), "paris": (48.86, 2.35, 2), "berlin": (52.52, 13.40, 2),
    "brussels": (50.85, 4.35, 2), "amsterdam": (52.37, 4.90, 2), "the hague": (52.07, 4.30, 2),
    "madrid": (40.42, -3.70, 2), "barcelona": (41.39, 2.17, 2), "rome": (41.90, 12.50, 2),
    "milan": (45.46, 9.19, 2), "athens": (37.98, 23.72, 2), "warsaw": (52.23, 21.01, 2),
    "prague": (50.09, 14.42, 2), "budapest": (47.50, 19.04, 2), "bucharest": (44.44, 26.10, 2),
    "sofia": (42.70, 23.32, 2), "belgrade": (44.79, 20.44, 2), "vienna": (48.21, 16.37, 2),
    "geneva": (46.20, 6.14, 2), "zurich": (47.37, 8.55, 2), "helsinki": (60.17, 24.94, 2),
    "stockholm": (59.33, 18.07, 2), "oslo": (59.91, 10.75, 2), "copenhagen": (55.68, 12.57, 2),
    "dublin": (53.35, -6.26, 2), "edinburgh": (55.95, -3.19, 2),
    "sydney": (-33.87, 151.21, 2), "melbourne": (-37.81, 144.96, 2), "canberra": (-35.28, 149.13, 2),
    "wellington": (-41.29, 174.78, 2),
    "mexico city": (19.43, -99.13, 2), "brasilia": (-15.79, -47.88, 2), "sao paulo": (-23.55, -46.63, 2),
    "buenos aires": (-34.60, -58.38, 2), "santiago": (-33.45, -70.65, 2), "lima": (-12.05, -77.04, 2),
    "bogota": (4.71, -74.07, 2), "caracas": (10.48, -66.90, 2),
    "havana": (23.11, -82.36, 2), "panama city": (8.98, -79.52, 2),
    "toronto": (43.65, -79.38, 2), "ottawa": (45.42, -75.70, 2), "vancouver": (49.28, -123.12, 2),
    "kabul": (34.52, 69.18, 2), "kandahar": (31.63, 65.72, 2),
    "hanoi": (21.03, 105.85, 2), "ho chi minh": (10.82, 106.63, 2),
    "bangkok": (13.76, 100.50, 2), "jakarta": (-6.21, 106.85, 2),
    "manila": (14.60, 120.98, 2), "kuala lumpur": (3.14, 101.69, 2), "singapore city": (1.35, 103.82, 1),
    "yangon": (16.87, 96.20, 2),
}
# Aliases handled inline via ' ' padding to match whole-word only.

def _mentioned_places(text: str) -> list:
    """Return a list of (country_key, lat, lng, radius_deg) for countries the
    headline explicitly mentions. Case-insensitive; whole-word match."""
    t = " " + re.sub(r"[^\w\s]", " ", text.lower()) + " "
    hits = []
    for key, (lat, lng, r) in COUNTRY_BOX.items():
        needle = " " + key + " "
        if needle in t:
            hits.append((key, lat, lng, r))
    return hits


def _coords_plausible(title: str, description: str, lat: float, lng: float) -> bool:
    """If the headline mentions any country from COUNTRY_BOX, the coordinates
    must be within one of their radii. If NO country is mentioned we let the
    LLM's choice stand. Returns True if the pin is plausible."""
    hits = _mentioned_places((title or "") + " " + (description or ""))
    if not hits:
        return True
    for _key, clat, clng, r in hits:
        # Angular distance in degrees (rough Chebyshev on lat/lng)
        if abs(lat - clat) <= r and (
            min(abs(lng - clng), 360 - abs(lng - clng))
        ) <= r * 1.4:
            return True
    return False

SEVERITY_GUIDE = (
    "Severity scale (output an INTEGER 1-5) — apply these criteria STRICTLY:\n"
    "  1 GREEN   diplomatic détente, peace deal signed, prisoner exchange, humanitarian aid delivered, summit with concrete positive outcome.\n"
    "  2 YELLOW  treaty / defense pact / trade agreement signed; alliance expansion; ALSO any THREAT, ultimatum, warning, sabre-rattling, tariff proposal, or announced-but-not-executed strike/attack ('threatens', 'warns', 'may launch', 'plans to hit').\n"
    "  3 ORANGE  diplomatic friction with material consequence, small skirmish (<100 casualties), sanctions tightened, troop build-up begun, expulsion of diplomats, seizure of vessels/assets, embassy closure.\n"
    "  4 RED     deteriorating military or economic situation with REAL EXECUTED events: missile strikes carried out, active financial crisis, coup attempt in progress, single-incident attacks with 100–999 casualties.\n"
    "  5 PURPLE  RESERVED strictly for one of the following, and ONLY when the event has actually happened (not been threatened):\n"
    "           (a) formal declaration of war between states,\n"
    "           (b) actual nuclear detonation or a nuclear-strike order,\n"
    "           (c) outbreak of a civil war,\n"
    "           (d) a single attack with 1 000 or more confirmed casualties,\n"
    "           (e) a humanitarian crisis with 10 000 or more war-related casualties reported.\n"
    "  ⚠  THREATS, RHETORIC, warnings, 'X may attack Y', 'X could deploy', 'X considering Y', unfulfilled promises: these are NEVER 4 or 5. They are YELLOW (2). No exceptions.\n"
)

# ---------------------------------------------------------------------------

def fetch_url(url: str, timeout: int = 12) -> bytes:
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


def _fetch_feed_worker(entry, limit_per_feed):
    src_name, url, bias = entry
    try:
        raw = fetch_url(url, timeout=15)
    except Exception as exc:
        print(f"[feed] {src_name} FAILED: {exc}", file=sys.stderr)
        return []
    try:
        items = parse_rss(raw)[:limit_per_feed]
    except Exception as exc:
        print(f"[feed] {src_name} PARSE FAILED: {exc}", file=sys.stderr)
        return []
    print(f"[feed] {src_name}: {len(items)} items", file=sys.stderr)
    return [{
        "source": src_name,
        "bias": bias,
        "title": it["title"],
        "description": strip_html(it["desc"])[:400],
        "url": it["link"],
        "image": it.get("image") or "",
        "pub_ms": it.get("pub_ms") or 0,
    } for it in items]


def collect_headlines(limit_per_feed: int) -> list:
    """Fetch every RSS feed in parallel. With ~80 feeds sequential fetching
    would take several minutes and any hung feed blocks the rest — parallel
    keeps total wall time under ~20 s even if a few sources time out."""
    import concurrent.futures as _cf
    out = []
    with _cf.ThreadPoolExecutor(max_workers=24) as ex:
        futures = [ex.submit(_fetch_feed_worker, e, limit_per_feed) for e in RSS_FEEDS]
        for f in futures:
            try:
                out.extend(f.result(timeout=20))
            except Exception as exc:
                print(f"[feed] worker exception: {exc}", file=sys.stderr)
    seen, dedup = set(), []
    for h in out:
        k = h["title"].lower()[:120]
        if k in seen:
            continue
        seen.add(k)
        dedup.append(h)
    return dedup


def sample_for_llm(headlines: list, cap: int, rotate: int = None) -> list:
    """Round-robin fra le fonti, cosi' ogni feed (e quindi ogni orientamento
    editoriale) resta rappresentato nel prompt.

    Il giro finale e' quasi sempre incompleto: se le fonti sono 40 e i posti
    38, due fonti restano fuori. Senza accorgimenti sarebbero SEMPRE le stesse
    due, escluse a ogni corsa per mesi. Per questo l'ordine dei bucket viene
    ruotato a ogni esecuzione: lo svantaggio dell'ultimo posto gira fra tutte
    le fonti e nel tempo si annulla.

    La rotazione dipende dall'ora, quindi e' stabile dentro una singola corsa
    (utile per i tentativi ripetuti) ma cambia fra una corsa e l'altra.
    """
    if len(headlines) <= cap:
        return headlines
    by_src = {}
    for h in headlines:
        by_src.setdefault(h.get("source", "?"), []).append(h)
    buckets = [by_src[k] for k in sorted(by_src)]
    if rotate is None:
        rotate = int(time.time() // 3600)
    if buckets:
        r = rotate % len(buckets)
        buckets = buckets[r:] + buckets[:r]
    out, i = [], 0
    while len(out) < cap:
        added = False
        for lst in buckets:
            if i < len(lst):
                out.append(lst[i])
                added = True
                if len(out) >= cap:
                    break
        if not added:
            break
        i += 1
    return out


# ---- LLM clients ----------------------------------------------------------

# Groq dismette i modelli con regolarita'. I Llama 3.x sono stati spenti il
# 16 agosto 2026: le richieste a quegli ID tornano errore e l'agente smette di
# produrre notizie. Qui c'e' la mappa di rimpiazzo: se una variabile d'ambiente
# punta ancora a un modello morto, viene rimappata da sola con un avviso,
# invece di far fallire tutta la corsa.
DEAD_MODELS = {
    "llama-3.3-70b-versatile": "openai/gpt-oss-120b",
    "llama-3.1-8b-instant": "openai/gpt-oss-20b",
    "llama3-70b-8192": "openai/gpt-oss-120b",
    "llama3-8b-8192": "openai/gpt-oss-20b",
    "gemma2-9b-it": "openai/gpt-oss-20b",
    "qwen/qwen3-32b": "openai/gpt-oss-120b",
    "meta-llama/llama-4-scout-17b-16e-instruct": "openai/gpt-oss-120b",
    "meta-llama/llama-4-maverick-17b-128e-instruct": "openai/gpt-oss-120b",
    "moonshotai/kimi-k2-instruct": "openai/gpt-oss-120b",
    "moonshotai/kimi-k2-instruct-0905": "openai/gpt-oss-120b",
    "mixtral-8x7b-32768": "openai/gpt-oss-120b",
    "deepseek-r1-distill-llama-70b": "openai/gpt-oss-120b",
}

DEFAULT_GROQ_MODEL = "openai/gpt-oss-120b"


def resolve_model(name: str) -> str:
    """Sostituisce gli ID dismessi con il rimpiazzo consigliato da Groq."""
    if not name:
        return DEFAULT_GROQ_MODEL
    name = name.strip()
    repl = DEAD_MODELS.get(name)
    if repl:
        print(f"[llm] '{name}' e' stato dismesso da Groq: uso '{repl}'",
              file=sys.stderr)
        return repl
    return name


# Groq conta come "richiesti" input PIU' max_completion_tokens. Sul piano
# gratuito il limite e' 8.000 token al minuto: chiedere 8.192 token di uscita
# faceva sforare OGNI richiesta, anche una da una riga (errore 413).
GROQ_TPM_LIMIT = int(os.environ.get("GROQ_TPM_LIMIT", "8000"))
DEFAULT_MAX_TOKENS = 2600
RUNTIME_MAX_TOKENS = None      # abbassato dai tentativi successivi


def estimate_tokens(text: str) -> int:
    """Stima prudente: circa 1 token ogni 3,5 caratteri."""
    return int(len(text)/3.5) + 1


def token_budget_for_input() -> int:
    """Quanti token restano per il prompt, lasciando margine al limite."""
    out = RUNTIME_MAX_TOKENS or int(os.environ.get("GROQ_MAX_TOKENS", DEFAULT_MAX_TOKENS))
    return max(600, int(GROQ_TPM_LIMIT*0.88) - out)


def groq_body(model: str, prompt: str, system: str, json_mode: bool = True,
              max_tokens: int = None) -> dict:
    """Corpo della richiesta, adattato alla famiglia del modello.

    I sostituti dei Llama sono modelli di ragionamento e vogliono parametri
    diversi fra loro:
      - GPT-OSS non accetta 'reasoning_format'; il ragionamento finisce nel
        campo 'reasoning' e si esclude con 'include_reasoning'. Accetta
        reasoning_effort low/medium/high.
      - Qwen 3.6 accetta 'reasoning_format', ma con JSON mode il valore 'raw'
        provoca un 400: si usa 'hidden'. Il suo reasoning_effort ammette solo
        none/default.
    Scambiarli genera errori 400, quindi si distingue sul prefisso dell'ID.
    """
    body = {
        "model": model,
        "temperature": float(os.environ.get("GROQ_TEMPERATURE", "0.2")),
        "max_completion_tokens": (max_tokens or RUNTIME_MAX_TOKENS
                                  or int(os.environ.get("GROQ_MAX_TOKENS",
                                                        DEFAULT_MAX_TOKENS))),
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": prompt},
        ],
    }
    if json_mode:
        body["response_format"] = {"type": "json_object"}

    if model.startswith("openai/gpt-oss"):
        body["include_reasoning"] = False
        body["reasoning_effort"] = os.environ.get("GROQ_REASONING_EFFORT", "low")
    elif model.startswith("qwen/"):
        body["reasoning_format"] = "hidden"
        body["reasoning_effort"] = "none"
    return body


_THINK_RE = re.compile(r"<think>.*?</think>", re.S | re.I)


def extract_content(data: dict) -> str:
    """Testo utile della risposta, a prova di modello di ragionamento.

    Se il modello ha speso tutti i token nel ragionamento, 'content' puo'
    arrivare vuoto: in quel caso si ripiega sul campo 'reasoning' e si cerca
    il primo oggetto JSON bilanciato al suo interno.
    """
    msg = (data.get("choices") or [{}])[0].get("message") or {}
    text = (msg.get("content") or "").strip()
    if not text:
        text = (msg.get("reasoning") or "").strip()
    text = _THINK_RE.sub("", text).strip()
    if text.startswith("```"):
        text = re.sub(r"^```[a-zA-Z]*\s*", "", text)
        text = re.sub(r"\s*```$", "", text).strip()
    if text and not text.lstrip().startswith(("{", "[")):
        start = text.find("{")
        if start >= 0:
            depth, in_str, esc = 0, False, False
            for i in range(start, len(text)):
                ch = text[i]
                if in_str:
                    if esc:
                        esc = False
                    elif ch == "\\":
                        esc = True
                    elif ch == '"':
                        in_str = False
                    continue
                if ch == '"':
                    in_str = True
                elif ch == "{":
                    depth += 1
                elif ch == "}":
                    depth -= 1
                    if depth == 0:
                        return text[start:i + 1]
    return text


def step_summary(md: str) -> None:
    """Scrive nel riepilogo della corsa di GitHub Actions.

    Il pannello 'Summary' della pagina del workflow mostra solo 'Process
    completed with exit code 1': il motivo resta sepolto nei log. Quello che
    si scrive qui compare invece in evidenza sulla pagina della corsa."""
    path = os.environ.get("GITHUB_STEP_SUMMARY")
    if not path:
        return
    try:
        with open(path, "a", encoding="utf-8") as fh:
            fh.write(md.rstrip() + "\n\n")
    except Exception:
        pass


GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"


def _groq_post(api_key: str, body: dict, timeout: int = 120) -> dict:
    """POST a Groq. In caso di errore HTTP rilancia un RuntimeError che
    CONTIENE il corpo della risposta.

    Senza questo, urllib solleva solo 'HTTP Error 400: Bad Request' e nei log
    del workflow non si capisce nulla: era esattamente il motivo per cui il
    guasto restava misterioso."""
    req = urllib.request.Request(
        GROQ_URL,
        data=json.dumps(body).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "User-Agent": USER_AGENT,
            "Accept": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        detail = ""
        try:
            detail = e.read().decode("utf-8", "replace")[:600]
        except Exception:
            pass
        raise RuntimeError(f"Groq HTTP {e.code} ({body.get('model')}): {detail}") from None


def call_groq(prompt: str, system: str) -> str:
    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        raise RuntimeError("GROQ_API_KEY not set")
    model = resolve_model(os.environ.get("GROQ_MODEL", DEFAULT_GROQ_MODEL))
    body = groq_body(model, prompt, system)
    try:
        data = _groq_post(api_key, body)
    except RuntimeError as e:
        # Un 400 significa quasi sempre che un parametro non piace piu' a
        # Groq (i modelli di ragionamento sono nuovi e lo schema cambia).
        # Invece di arrendersi, si riprova con il corpo essenziale: meglio una
        # risposta senza rifiniture che nessuna notizia.
        if "HTTP 400" not in str(e):
            raise
        minimal = {k: v for k, v in body.items()
                   if k in ("model", "messages", "temperature", "response_format")}
        print(f"[llm] 400 con i parametri estesi: {str(e)[:200]}", file=sys.stderr)
        print("[llm] riprovo con la richiesta essenziale…", file=sys.stderr)
        data = _groq_post(api_key, minimal)
    return extract_content(data)


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
    "EDITORIAL DISCIPLINE — reject the following outright:\n"
    "  • Speculative or hypothetical stories: any title containing 'may', 'might', "
    "'could', 'would', 'possibly', 'potentially', 'is expected to', 'is likely to', "
    "'is set to', 'planning to', 'considering', 'weighing', 'mulling', 'appears to', "
    "'reportedly could', 'rumoured', 'rumored'. GEOINT reports events that HAPPENED, "
    "not what MIGHT happen. If the story is only a possibility, DROP IT.\n"
    "  • Opinion pieces, analysis columns, 'here's why', 'what to know', explainers.\n"
    "  • Duplicate coverage of a story already listed in the batch — keep the single "
    "most complete/factual version.\n\n"
    "IMPORTANT: actively look for positive items too. Diplomatic detente, treaties, "
    "alliance expansions, peace negotiations, prisoner exchanges, normalisation deals "
    "all matter and belong on the map as GREEN (1) or YELLOW (2). Do not over-weight "
    "negative news. A good batch typically contains a MIX of severities 1 through 4.\n\n"
    + SEVERITY_GUIDE +
    "\nGEOCODING RULES — CRITICAL:\n"
    "• The pin MUST fall inside a country explicitly named in the headline or "
    "  description. NEVER place a pin in a country that is not mentioned at all.\n"
    "• Pin each event to the MOST SPECIFIC location available: the exact city, base, "
    "  battlefield, parliament building, embassy, port, or summit venue where the "
    "  event actually happened. NOT the country capital as a default.\n"
    "• 'Actor + Target' rule: for stories like 'Trump threatens Iran' the pin goes on "
    "  the TARGET's capital (Tehran, 35.69, 51.39), because that is where the "
    "  consequence lands. NEVER pin such stories on an unrelated country (e.g. China).\n"
    "• If the headline says 'strike on Aleppo' → pin Aleppo (36.20, 37.16), NOT Damascus.\n"
    "• If 'NATO summit in The Hague' → pin The Hague (52.07, 4.30), NOT Brussels.\n"
    "• If 'sanctions on Russia announced by EU' → pin Moscow (55.75, 37.62) — the target.\n"
    "• If 'Trump meets Xi in Busan' → pin Busan (35.18, 129.08).\n"
    "• If 'oil tanker seized in Strait of Hormuz' → pin the strait (26.57, 56.25).\n"
    "• If 'Houthis attack shipping in Red Sea' → pin the Red Sea (15.5, 42.0) or Sanaa (15.35, 44.19).\n"
    "• Multi-location: pick where the ACTION occurred (signing, strike, summit), not where it is reported from.\n"
    "• If you truly cannot identify a specific place, DROP THE ITEM rather than guessing.\n"
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


THREAT_RE = re.compile(
    r"\b(threat(en|ens|ened|ening)?s?|warn(s|ed|ing)?|ultimatum|sabre[- ]?rattl|"
    r"vow(s|ed)?\s+to|"
    r"promis(es|ed)\s+to|pledg(es|ed)\s+to|"
    r"says?\s+(he|she|it|they)\s+(will|may|could|would)|"
    r"plans?\s+to\s+(attack|strike|hit|invade|deploy|launch|bomb)|"
    r"considering|weighing|mulling|"
    r"prepared\s+to|ready\s+to|"
    r"could\s+(attack|strike|deploy|launch|invade|use))\b",
    re.IGNORECASE,
)

def _looks_like_threat_only(title: str, description: str = "") -> bool:
    """True when the story is a threat/warning/rhetoric with no executed action."""
    text = (title or "") + " " + (description or "")
    if not THREAT_RE.search(text):
        return False
    # If the same text also mentions an executed action, keep the higher severity
    executed = re.search(
        r"\b(launched|fired|struck|hit|killed|dead|wounded|casualties|"
        r"declared\s+war|invaded|bombed|destroyed|captured|seized|"
        r"detonated|assassinat(ed|ion)|signed|ratified)\b", text, re.IGNORECASE)
    return not bool(executed)


def fit_pool(pool: list, max_keep: int) -> list:
    """Riduce il lotto finche' il prompt non rientra nel budget di token.

    Meglio analizzare 45 notizie e pubblicarle che chiederne 150 e ricevere
    un 413 ogni volta, che e' esattamente cio' che accadeva."""
    budget = token_budget_for_input()
    fixed = estimate_tokens(SYSTEM_PROMPT + USER_TEMPLATE) + 80
    out = list(pool)
    while out:
        body = "\n".join(
            f"[{i}] ({h['source']}) {h['title']} — {h['description'][:200]}"
            for i, h in enumerate(out)
        )
        if fixed + estimate_tokens(body) <= budget:
            break
        # Ridurre NON significa troncare: si rifa' il round-robin alla
        # dimensione piu' piccola, altrimenti sparirebbero sempre le fonti
        # che stanno in fondo alla lista.
        target = max(10, int(len(out)*0.85))
        out = sample_for_llm(out, target)
        if len(out) <= 10:
            break
    if len(out) < len(pool):
        print(f"[llm] lotto ridotto da {len(pool)} a {len(out)} notizie "
              f"per restare sotto {budget} token di ingresso", file=sys.stderr)
    return out


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
    dropped_hypo = 0
    dropped_bad_geo = 0
    downgraded = 0
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
        # ---- Editorial filter: reject anything hypothetical ----
        original_headline = headlines[idx]["title"] + " " + headlines[idx]["description"] if 0 <= idx < len(headlines) else ""
        if _is_hypothetical(title) or _is_hypothetical(desc) or _is_hypothetical(original_headline):
            dropped_hypo += 1
            print(f"[filter] dropped hypothetical: {title[:80]}", file=sys.stderr)
            continue
        try:
            lat = float(ev["lat"]); lng = float(ev["lng"])
        except (KeyError, ValueError, TypeError):
            continue
        if not (-90 <= lat <= 90 and -180 <= lng <= 180):
            continue
        # ---- Geographic sanity: pin must fall on a mentioned country ----
        if not _coords_plausible(title, desc, lat, lng):
            dropped_bad_geo += 1
            print(f"[filter] dropped implausible geolocation ({lat:.1f},{lng:.1f}): {title[:80]}", file=sys.stderr)
            continue
        try:
            sev = int(ev.get("severity", 3))
        except (ValueError, TypeError):
            sev = 3
        sev = max(1, min(5, sev))
        # ---- Severity cap: threats/rhetoric can never be RED (4) or PURPLE (5) ----
        if sev >= 4 and _looks_like_threat_only(title, desc):
            downgraded += 1
            print(f"[severity] downgraded threat-only {sev}->2: {title[:80]}", file=sys.stderr)
            sev = 2
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
    if dropped_hypo or dropped_bad_geo or downgraded:
        print(f"[analyse] dropped_hypo={dropped_hypo} dropped_bad_geo={dropped_bad_geo} threat_downgraded={downgraded}", file=sys.stderr)
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
    max_age_h = int(os.environ.get("GEOINT_MAX_AGE_H", "336"))  # 14 days
    feed_limit = int(os.environ.get("GEOINT_FEED_LIMIT", "25"))
    keep_per_run = int(os.environ.get("GEOINT_KEEP_PER_RUN", "8"))

    existing = load_existing()
    old_events = existing.get("events", [])

    cutoff_ms = (time.time() - max_age_h * 3600) * 1000
    old_events = [e for e in old_events if e.get("ts", 0) >= cutoff_ms]

    # === COVERAGE MIGRATION ===
    # Upgrade coverage saved by older agent versions: sources stored as plain
    # strings (no bias/link) and missing 5-way buckets. Without this, the
    # frontend can only show every outlet as "Center".
    for e in old_events:
        cov = e.get("coverage")
        if not cov:
            continue
        srcs = cov.get("sources") or []
        if srcs and isinstance(srcs[0], str):
            srcs = [{"n": s, "b": SOURCE_BIAS.get(s, "center"), "u": None} for s in srcs]
            cov["sources"] = srcs
        changed = False
        for s in srcs:
            if isinstance(s, dict) and not s.get("b"):
                s["b"] = SOURCE_BIAS.get(s.get("n", ""), "center")
                changed = True
        if ("buckets" not in cov or changed) and srcs and isinstance(srcs[0], dict):
            b5 = {"left": 0, "lean_left": 0, "center": 0, "lean_right": 0, "right": 0}
            for s in srcs:
                sb = s.get("b") if s.get("b") in b5 else "center"
                b5[sb] += 1
            cov["buckets"] = b5
            cov["left"] = b5["left"] + b5["lean_left"]
            cov["center"] = b5["center"]
            cov["right"] = b5["right"] + b5["lean_right"]
            cov["total"] = sum(b5.values())

    print(f"[start] {len(old_events)} existing events after pruning", file=sys.stderr)
    headlines = collect_headlines(feed_limit)
    print(f"[start] {len(headlines)} headlines collected", file=sys.stderr)
    if not headlines:
        save(old_events)
        return 0
    # === PRE-LLM FILTER ===
    # Discard speculative / hypothetical headlines before sending anything to the
    # LLM. Cheaper (fewer tokens) and prevents the model from picking noise.
    pre_n = len(headlines)
    headlines = [
        h for h in headlines
        if not _is_hypothetical(h.get("title", "") + " " + h.get("description", ""))
    ]
    print(f"[filter] dropped {pre_n - len(headlines)} hypothetical/speculative headlines pre-LLM", file=sys.stderr)

    llm_cap = int(os.environ.get("GEOINT_LLM_HEADLINES", "150"))
    pool = fit_pool(sample_for_llm(headlines, llm_cap), keep_per_run)
    print(f"[llm] sending {len(pool)}/{len(headlines)} headlines to the model", file=sys.stderr)
    new_events = None
    last_exc = None
    for attempt in range(3):
        try:
            new_events = analyse(pool, max_keep=keep_per_run)
            break
        except Exception as exc:
            last_exc = exc
            print(f"[llm] attempt {attempt + 1} failed: {exc}", file=sys.stderr)
            # Limiti di token: si riduce SIA il prompt SIA lo spazio chiesto
            # per la risposta, perche' Groq somma i due.
            globals()["RUNTIME_MAX_TOKENS"] = max(
                900, int((RUNTIME_MAX_TOKENS or DEFAULT_MAX_TOKENS) * 0.6))
            pool = fit_pool(sample_for_llm(pool, max(15, len(pool) // 2)),
                            keep_per_run)
            print(f"[llm] nuovo tentativo con {len(pool)} notizie e "
                  f"{RUNTIME_MAX_TOKENS} token di uscita", file=sys.stderr)
            time.sleep(20)
    if new_events is None:
        # PRIMA questa condizione usciva sempre con 0 ("Never fail the
        # workflow"): il risultato era che dal 16/08/2026, quando Groq ha
        # spento i Llama, l'agente falliva ogni 30 minuti mostrando sempre
        # spunta verde. Nessuno poteva accorgersene. Ora il file degli eventi
        # viene comunque conservato (il sito non resta mai senza dati), ma il
        # workflow FALLISCE in modo visibile e arriva la notifica.
        print(f"[llm] analysis FAILED after retries: {last_exc} — keeping existing events",
              file=sys.stderr)
        save(old_events)
        if os.environ.get("GEOINT_FAIL_SILENTLY") == "1":
            return 0
        print("\n" + "=" * 68, file=sys.stderr)
        print("L'ANALISI LLM NON E' RIUSCITA — nessuna notizia nuova.", file=sys.stderr)
        print(f"Ultimo errore: {last_exc}", file=sys.stderr)
        print("Per capire il motivo:  python agent/geoint_agent.py --selftest",
              file=sys.stderr)
        step_summary(f"## Nessuna notizia nuova\n\nL'analisi LLM non e' riuscita.\n\n"
                     f"**Ultimo errore:** `{str(last_exc)[:400]}`\n\n"
                     "Gli eventi gia' presenti sono stati conservati.")
        print("=" * 68, file=sys.stderr)
        return 1
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
    # ---- Pre-batch dedup: collapse near-duplicates in *this run's* new_events ----
    # (Fixes the "Trump Threatens Iran and Houthis" + "Trump Threatens 'Massive
    # Attack' on Iran" case, where the LLM emitted two rows for the same story.)
    deduped_new = []
    batch_dropped = 0
    for ev in new_events:
        if find_similar(ev, deduped_new, threshold=0.35) is not None:
            batch_dropped += 1
            print(f"[dedup] pre-batch collapsed: {ev['title'][:80]}", file=sys.stderr)
            continue
        deduped_new.append(ev)
    if batch_dropped:
        print(f"[dedup] pre-batch collapsed {batch_dropped} events", file=sys.stderr)
    new_events = deduped_new

    added = 0
    skipped_dup = 0
    updated = 0
    spread_count = 0
    for ev in new_events:
        if ev["id"] in seen:
            skipped_dup += 1
            continue
        # === GROUND NEWS-STYLE COVERAGE BAR ===
        ev["coverage"] = compute_coverage(ev, headlines)
        # === SEMANTIC DEDUP WITH MEANINGFUL-CHANGE DETECTION ===
        # A story repeated over several days is NOT re-added. It only refreshes
        # the existing pin when something meaningful changed (severity shift).
        match = find_similar(ev, recent_for_dedup, threshold=0.35)
        if match is not None:
            old_sev = int(match.get("severity", 3))
            if abs(int(ev["severity"]) - old_sev) >= 1:
                match["title"] = ev["title"]
                match["description"] = ev["description"]
                match["severity"] = ev["severity"]
                match["ts"] = max(ev.get("ts", 0), match.get("ts", 0)) or int(time.time() * 1000)
                match["url"] = ev.get("url") or match.get("url")
                match["source"] = ev.get("source") or match.get("source")
                match["coverage"] = ev.get("coverage") or match.get("coverage")
                updated += 1
                print(f"[dedup] updated (severity {old_sev}->{ev['severity']}): {ev['title'][:80]}", file=sys.stderr)
            else:
                skipped_dup += 1
                print(f"[dedup] skipped repeat (no meaningful change): {ev['title'][:80]}", file=sys.stderr)
            continue
        # === ANTI-CLUSTERING ===
        # If an event with very-close coords exists within 7 days, spread this one out
        if spread_if_clustered(ev, old_events, cluster_window_ms, min_deg=1.0):
            spread_count += 1
        old_events.append(ev)
        seen.add(ev["id"])
        recent_for_dedup.append(ev)
        added += 1

    print(f"[merge] added={added} updated={updated} skipped_dup={skipped_dup} spread={spread_count}", file=sys.stderr)
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


def _entities(text: str) -> set:
    return {
        w.lower() for w in re.findall(r"\b[A-Z][a-z]{2,}\b", text or "")
        if w.lower() not in _STOP_TOKENS
    }


def find_similar(ev: dict, others: list, threshold: float = 0.40):
    """Return the first item in others that is semantically similar to ev,
    or None. Three signals are combined:
      1. Jaccard overlap on content tokens (>= threshold).
      2. Shared named entities (>= 2) + shared topic keyword.
      3. Same topic keyword AND >= 1 shared entity + moderate token overlap.
    """
    ev_text = (ev.get("title", "") + " " + ev.get("description", "")).strip()
    ev_tokens = _tokens(ev_text)
    if not ev_tokens:
        return None
    ev_entities = _entities(ev.get("title", ""))
    ev_topics = _topic_words(ev_text)

    for other in others:
        other_text = (other.get("title", "") + " " + other.get("description", "")).strip()
        other_tokens = _tokens(other_text)
        sim = _jaccard(ev_tokens, other_tokens)
        if sim >= threshold:
            return other
        other_entities = _entities(other.get("title", ""))
        other_topics = _topic_words(other_text)
        shared_ent = ev_entities & other_entities
        shared_topic = ev_topics & other_topics
        # Strong signal: same topic action + at least 2 shared entities (e.g. same actors)
        if shared_topic and len(shared_ent) >= 2:
            return other
        # Or: same topic + at least 1 shared entity + moderate token overlap
        if shared_topic and len(shared_ent) >= 1 and sim >= 0.25:
            return other
    return None


def is_similar_to_any(ev: dict, others: list, threshold: float = 0.40) -> bool:
    return find_similar(ev, others, threshold) is not None


# ---- Ground News-style coverage bar ----------------------------------------

SOURCE_BIAS = {name: bias for name, _url, bias in RSS_FEEDS}


def compute_coverage(ev: dict, headlines: list) -> dict:
    """Cross-reference an event against ALL fetched headlines from every feed
    and count how many left / center / right outlets covered the same story.
    Mirrors the Ground News coverage-distribution bar."""
    ev_text = (ev.get("title", "") + " " + ev.get("description", "")).strip()
    ev_tokens = _tokens(ev_text)
    ev_entities = _entities(ev.get("title", ""))
    ev_topics = _topic_words(ev_text)
    counts = {"left": 0, "center": 0, "right": 0}
    counts5 = {"left": 0, "lean_left": 0, "center": 0, "lean_right": 0, "right": 0}
    matched = []
    seen_sources = set()
    for h in headlines:
        src = h.get("source", "")
        if src in seen_sources:
            continue
        h_text = (h.get("title", "") + " " + h.get("description", "")).strip()
        h_tokens = _tokens(h_text)
        sim = _jaccard(ev_tokens, h_tokens)
        h_entities = _entities(h.get("title", ""))
        shared_ent = ev_entities & h_entities
        h_topics = _topic_words(h_text)
        is_match = (
            sim >= 0.30
            or (len(shared_ent) >= 2 and (ev_topics & h_topics))
            or len(shared_ent) >= 3
        )
        if not is_match:
            continue
        seen_sources.add(src)
        bias5 = h.get("bias", "center")
        if bias5 not in counts5:
            bias5 = "center"
        counts5[bias5] += 1
        counts[BIAS_BUCKET.get(bias5, "center")] += 1
        matched.append({"n": src, "b": bias5, "u": h.get("url") or None})
    # Always count at least the originating source
    if sum(counts.values()) == 0 and ev.get("source"):
        bias5 = SOURCE_BIAS.get(ev["source"], "center")
        if bias5 not in counts5:
            bias5 = "center"
        counts5[bias5] += 1
        counts[BIAS_BUCKET.get(bias5, "center")] = 1
        matched.append({"n": ev["source"], "b": bias5, "u": ev.get("url") or None})
    total = sum(counts.values())
    return {
        "left": counts["left"],
        "center": counts["center"],
        "right": counts["right"],
        "total": total,
        "buckets": counts5,
        "sources": matched[:30],
    }


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
def selftest() -> int:
    """Diagnosi rapida: dice in chiaro perche' l'agente non produce notizie.

    Fa UNA richiesta minima a Groq e stampa chiave, modello, esito e i limiti
    di quota che l'API restituisce nelle intestazioni. Dura pochi secondi.
    """
    print("=" * 68)
    print("GEOINT — diagnosi del collegamento LLM")
    print("=" * 68)

    groq = os.environ.get("GROQ_API_KEY")
    anth = os.environ.get("ANTHROPIC_API_KEY")
    print(f"GROQ_API_KEY        : {'presente (' + groq[:6] + '…)' if groq else 'ASSENTE'}")
    print(f"ANTHROPIC_API_KEY   : {'presente' if anth else 'assente'}")
    raw_model = os.environ.get("GROQ_MODEL", "")
    model = resolve_model(raw_model or DEFAULT_GROQ_MODEL)
    print(f"GROQ_MODEL richiesto: {raw_model or '(non impostato)'}")
    print(f"modello effettivo   : {model}")

    if not groq:
        step_summary("## Diagnosi LLM: FALLITA\n\n**Il segreto `GROQ_API_KEY` "
                     "non arriva al workflow.** Controlla Settings > Secrets and "
                     "variables > Actions: il nome deve essere esattamente "
                     "`GROQ_API_KEY`.")
        print("\nESITO: nessuna chiave Groq nell'ambiente.")
        print("  In locale : export GROQ_API_KEY=gsk_...")
        print("  Su GitHub : Settings > Secrets and variables > Actions > GROQ_API_KEY")
        return 1

    # max_tokens minuscolo: la prova deve verificare il collegamento, non
    # consumare l'intera quota al minuto
    probe = groq_body(
        model,
        'Rispondi solo con questo JSON: {"ok":true}',
        "Sei un servizio che risponde esclusivamente in JSON.",
        max_tokens=256,
    )
    print("\nInvio una richiesta di prova…")
    headers = {}
    try:
        try:
            data = _groq_post(groq, probe, timeout=60)
        except RuntimeError as e:
            if "HTTP 400" not in str(e):
                raise
            print(f"  i parametri estesi danno 400: {str(e)[:220]}")
            print("  riprovo con la richiesta essenziale…")
            minimal = {k: v for k, v in probe.items()
                       if k in ("model", "messages", "temperature", "response_format")}
            data = _groq_post(groq, minimal, timeout=60)
            print("  la richiesta essenziale funziona: l'agente usera' quella.")
    except RuntimeError as e:
        msg = str(e)
        print(f"\nESITO: {msg[:500]}")
        hint = "Guarda il log completo di questo passo."
        if "HTTP 401" in msg:
            hint = ("La chiave GROQ_API_KEY e' rifiutata: scaduta, revocata o "
                    "incollata male. Generane una nuova su "
                    "https://console.groq.com/keys e aggiornala in "
                    "Settings > Secrets and variables > Actions.")
            print("  La chiave e' rifiutata: scaduta, revocata o incollata male.")
            print("  Generane una nuova su https://console.groq.com/keys")
        elif "HTTP 404" in msg:
            hint = (f"Il modello `{model}` non esiste piu' o non e' abilitato "
                    "sul tuo piano. Elenco: https://console.groq.com/docs/models")
            print(f"  Il modello '{model}' non esiste piu' o non e' abilitato sul tuo piano.")
            print("  Elenco aggiornato: https://console.groq.com/docs/models")
        elif "HTTP 413" in msg or "too large" in msg.lower():
            hint = (f"La richiesta supera il limite di {GROQ_TPM_LIMIT} token al "
                    "minuto del tuo piano Groq. L'agente ora riduce da solo il "
                    "numero di notizie per rientrare; se accade ancora, abbassa "
                    "GEOINT_LLM_HEADLINES nel workflow.")
            print(f"  Richiesta troppo grande per il limite di {GROQ_TPM_LIMIT} TPM.")
        elif "HTTP 429" in msg:
            hint = ("Quota Groq esaurita. Riduci GEOINT_LLM_HEADLINES oppure "
                    "dirada il cron del workflow.")
            print("  Quota esaurita (richieste o token al minuto/giorno).")
            print("  Riduci GEOINT_LLM_HEADLINES oppure dirada il cron del workflow.")
        elif "HTTP 400" in msg:
            print("  Richiesta rifiutata anche nella forma essenziale.")
            hint = "Richiesta rifiutata anche nella forma essenziale."
        step_summary(f"## Diagnosi LLM: FALLITA\n\n**{msg[:400]}**\n\n{hint}")
        return 1
    except Exception as e:
        print(f"\nESITO: impossibile contattare Groq — {e}")
        step_summary(f"## Diagnosi LLM: FALLITA\n\nImpossibile contattare Groq: `{e}`")
        return 1

    content = extract_content(data)
    usage = data.get("usage") or {}
    print("\nESITO: collegamento RIUSCITO")
    print(f"  risposta      : {content[:120]}")
    print(f"  token usati   : entrata {usage.get('prompt_tokens', '?')}, "
          f"uscita {usage.get('completion_tokens', '?')}")
    try:
        json.loads(content)
        print("  JSON valido   : si")
    except Exception:
        print("  JSON valido   : NO — il modello non rispetta il formato richiesto")
        return 1
    step_summary(f"## Diagnosi LLM: OK\n\nModello `{model}` raggiungibile, "
                 "risposta JSON valida.")
    print("\nIl collegamento funziona. Se il sito resta senza notizie nuove,")
    print("il problema e' a valle: guarda i log del workflow 'GEOINT news agent'.")
    return 0


if __name__ == "__main__":
    if "--selftest" in sys.argv:
        sys.exit(selftest())
    sys.exit(main())
