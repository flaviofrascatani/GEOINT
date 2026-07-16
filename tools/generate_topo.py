#!/usr/bin/env python3
"""
GEOINT static topographic map generator.

Pre-renders the DEM contour SVG (same algorithm + style as public/topo.js)
for EVERY country, using real elevation data from the Open-Meteo Elevation
API, and writes them to public/topo/<id>.svg.

The frontend loads these static files instantly; the runtime Open-Meteo
fetch in topo.js remains only as a fallback for countries missing here.

Run from repo root (GitHub Actions or locally):
    python tools/generate_topo.py            # only missing countries
    python tools/generate_topo.py --force    # regenerate everything

No external dependencies (stdlib only).
"""
from __future__ import annotations
import json, math, os, re, sys, time, urllib.request
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public" / "topo"
WORLD_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"
ELEV_URL = "https://api.open-meteo.com/v1/elevation?latitude={lats}&longitude={lngs}"
GRID_W, GRID_H = 40, 28          # same as topo.js
TARGET_LINES = 12
VIEW_W, VIEW_H = 400, 260
CHUNK = 100                       # Open-Meteo max locations per request
THROTTLE_S = 0.25                 # be polite: ~4 req/s total
UA = "Mozilla/5.0 (compatible; GEOINT-topo/1.0; +https://github.com)"

_last = [0.0]
def fetch_json(url, retries=4):
    for attempt in range(retries):
        wait = _last[0] + THROTTLE_S - time.time()
        if wait > 0:
            time.sleep(wait)
        _last[0] = time.time()
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=30) as r:
                return json.loads(r.read())
        except Exception as e:
            if attempt == retries - 1:
                raise
            time.sleep(2 * (attempt + 1))

# ---------------- topojson decode (same as frontend TJ.feature) -------------
def decode_topo(tp):
    s = tp["transform"]["scale"]; t = tp["transform"]["translate"]
    arcs = []
    for a in tp["arcs"]:
        x = y = 0; out = []
        for p in a:
            x += p[0]; y += p[1]
            out.append([x * s[0] + t[0], y * s[1] + t[1]])
        arcs.append(out)
    def rv(i):
        return list(reversed(arcs[~i])) if i < 0 else list(arcs[i])
    def rn(ids):
        c = []
        for i in ids:
            a = rv(i)
            if c: a = a[1:]
            c += a
        return c
    feats = []
    for g in tp["objects"]["countries"]["geometries"]:
        geo = None
        if g["type"] == "Polygon":
            geo = [rn(r) for r in g["arcs"]]                 # list of rings
        elif g["type"] == "MultiPolygon":
            geo = [rn(poly[0]) for poly in g["arcs"]]        # outer rings only
        feats.append({"id": g.get("id"), "name": (g.get("properties") or {}).get("name"), "rings": geo})
    return feats

def norm_id(raw):
    if raw is None: return None
    s = str(raw)
    return str(int(s)) if s.isdigit() else s

def synth_id(name):
    if not name: return None
    return "x_" + re.sub(r"[^a-z0-9]+", "_", name.lower())

# ---------------- bbox with antimeridian unwrap (same as topo.js) -----------
def bbox_of(rings):
    mn_lng = mn_lat = float("inf"); mx_lng = mx_lat = float("-inf")
    for ring in rings or []:
        prev = None; unwrapped = []
        for p in ring:
            lng = p[0]
            if prev is not None:
                while lng - prev > 180: lng -= 360
                while lng - prev < -180: lng += 360
            unwrapped.append((lng, p[1])); prev = lng
        for lng, lat in unwrapped:
            mn_lng = min(mn_lng, lng); mx_lng = max(mx_lng, lng)
            mn_lat = min(mn_lat, lat); mx_lat = max(mx_lat, lat)
    if not math.isfinite(mn_lng): return None
    pad_lng = (mx_lng - mn_lng) * 0.04; pad_lat = (mx_lat - mn_lat) * 0.04
    return (mn_lng - pad_lng, mx_lng + pad_lng, mn_lat - pad_lat, mx_lat + pad_lat)

# ---------------- elevation grid --------------------------------------------
def fetch_grid(bbox):
    mn_lng, mx_lng, mn_lat, mx_lat = bbox
    lats, lngs = [], []
    for j in range(GRID_H):
        lat = mn_lat + (mx_lat - mn_lat) * (j / (GRID_H - 1))
        for i in range(GRID_W):
            lng = mn_lng + (mx_lng - mn_lng) * (i / (GRID_W - 1))
            lats.append(f"{lat:.4f}")
            lngs.append(f"{((lng + 540) % 360 - 180):.4f}")
    elev = [0.0] * len(lats)
    for s in range(0, len(lats), CHUNK):
        url = ELEV_URL.format(lats=",".join(lats[s:s+CHUNK]), lngs=",".join(lngs[s:s+CHUNK]))
        j = fetch_json(url)
        for k, e in enumerate(j.get("elevation") or []):
            elev[s + k] = e if isinstance(e, (int, float)) else 0.0
    return elev

# ---------------- marching squares (port of topo.js) ------------------------
def marching_squares(grid, W, H, level):
    segs = []
    def interp(a, b): return (level - a) / (b - a) if b != a else 0.5
    for y in range(H - 1):
        for x in range(W - 1):
            tl = grid[y*W+x]; tr = grid[y*W+x+1]; br = grid[(y+1)*W+x+1]; bl = grid[(y+1)*W+x]
            code = (8 if tl > level else 0) | (4 if tr > level else 0) | (2 if br > level else 0) | (1 if bl > level else 0)
            if code in (0, 15): continue
            t = lambda: (x + interp(tl, tr), y)
            r = lambda: (x + 1, y + interp(tr, br))
            b = lambda: (x + interp(bl, br), y + 1)
            l = lambda: (x, y + interp(tl, bl))
            def push(p, q): segs.append((p[0], p[1], q[0], q[1]))
            if code in (1, 14): push(l(), b())
            elif code in (2, 13): push(b(), r())
            elif code in (3, 12): push(l(), r())
            elif code in (4, 11): push(t(), r())
            elif code == 5: push(l(), t()); push(b(), r())
            elif code in (6, 9): push(t(), b())
            elif code in (7, 8): push(l(), t())
            elif code == 10: push(t(), r()); push(l(), b())
    return segs

def segs_to_polylines(segs):
    key = lambda x, y: f"{x:.3f}_{y:.3f}"
    adj = {}
    for i, s in enumerate(segs):
        k1 = key(s[0], s[1]); k2 = key(s[2], s[3])
        adj.setdefault(k1, []).append((i, (s[2], s[3])))
        adj.setdefault(k2, []).append((i, (s[0], s[1])))
    used = [False] * len(segs)
    polylines = []
    for i, s in enumerate(segs):
        if used[i]: continue
        used[i] = True
        line = [(s[0], s[1]), (s[2], s[3])]
        for grow_end in (True, False):
            while True:
                cur = line[-1] if grow_end else line[0]
                nxt = None
                for j, other in adj.get(key(cur[0], cur[1]), []):
                    if not used[j]: nxt = (j, other); break
                if not nxt: break
                used[nxt[0]] = True
                if grow_end: line.append(nxt[1])
                else: line.insert(0, nxt[1])
        if len(line) >= 3: polylines.append(line)
    return polylines

def smooth_path(pts, tension=0.5):
    if len(pts) < 2: return ""
    if len(pts) == 2:
        return f"M{pts[0][0]:.1f} {pts[0][1]:.1f} L{pts[1][0]:.1f} {pts[1][1]:.1f}"
    d = f"M{pts[0][0]:.1f} {pts[0][1]:.1f}"
    for i in range(len(pts) - 1):
        p0 = pts[i-1] if i > 0 else pts[i]
        p1 = pts[i]; p2 = pts[i+1]
        p3 = pts[i+2] if i+2 < len(pts) else p2
        c1x = p1[0] + (p2[0]-p0[0])/6*tension; c1y = p1[1] + (p2[1]-p0[1])/6*tension
        c2x = p2[0] - (p3[0]-p1[0])/6*tension; c2y = p2[1] - (p3[1]-p1[1])/6*tension
        d += f" C{c1x:.1f} {c1y:.1f}, {c2x:.1f} {c2y:.1f}, {p2[0]:.1f} {p2[1]:.1f}"
    return d

def pick_levels(grid, n):
    valid = sorted(v for v in grid if v is not None and math.isfinite(v))
    if not valid: return []
    lo = valid[int(len(valid) * 0.05)]
    hi = valid[min(int(len(valid) * 0.95), len(valid)-1)]
    if hi - lo < 5: return []
    return [lo + (hi - lo) * (i / (n + 1)) for i in range(1, n + 1)]

def build_svg(cid, grid):
    levels = pick_levels(grid, TARGET_LINES)
    if not levels:
        return (f'<svg viewBox="0 0 {VIEW_W} {VIEW_H}" xmlns="http://www.w3.org/2000/svg" style="display:block">'
                f'<rect width="{VIEW_W}" height="{VIEW_H}" fill="#0b1410"/>'
                f'<text x="{VIEW_W/2}" y="{VIEW_H/2}" fill="#5a6d5e" font-family="monospace" font-size="11" '
                f'text-anchor="middle">FLAT TERRAIN — NO CONTOUR DATA</text></svg>')
    cw = VIEW_W / (GRID_W - 1); ch = VIEW_H / (GRID_H - 1)
    paths = []
    for li, lvl in enumerate(levels):
        segs = marching_squares(grid, GRID_W, GRID_H, lvl)
        opacity = 0.35 + 0.55 * (li / len(levels))
        stroke = 0.5 + 0.7 * (li / len(levels))
        for line in segs_to_polylines(segs):
            if len(line) < 3: continue
            pts = [(gx * cw, VIEW_H - gy * ch) for gx, gy in line]
            paths.append(f'<path d="{smooth_path(pts)}" fill="none" stroke="rgba(213,232,210,{opacity:.2f})" '
                         f'stroke-width="{stroke:.2f}" stroke-linecap="round" stroke-linejoin="round"/>')
    return (f'<svg viewBox="0 0 {VIEW_W} {VIEW_H}" xmlns="http://www.w3.org/2000/svg" style="display:block">'
            f'<defs><linearGradient id="topobg-{cid}" x1="0" x2="0" y1="0" y2="1">'
            f'<stop offset="0%" stop-color="#0a1813"/><stop offset="100%" stop-color="#050b09"/>'
            f'</linearGradient></defs>'
            f'<rect width="{VIEW_W}" height="{VIEW_H}" fill="url(#topobg-{cid})"/>' + "".join(paths) + '</svg>')

# ---------------- main -------------------------------------------------------
def main():
    force = "--force" in sys.argv
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    print("[topo] downloading world atlas…", file=sys.stderr)
    world = fetch_json(WORLD_URL)
    feats = decode_topo(world)
    used = set()
    jobs = []
    for f in feats:
        cid = norm_id(f["id"]) or synth_id(f["name"])
        if not cid: continue
        if cid in used:
            cid = synth_id(f["name"])
            if not cid or cid in used: continue
        used.add(cid)
        out = OUT_DIR / f"{cid}.svg"
        if out.exists() and not force: continue
        bbox = bbox_of(f["rings"])
        if not bbox: continue
        jobs.append((cid, f["name"], bbox, out))
    print(f"[topo] {len(jobs)} countries to generate", file=sys.stderr)
    ok = fail = 0
    def work(job):
        cid, name, bbox, out = job
        try:
            grid = fetch_grid(bbox)
            out.write_text(build_svg(cid, grid), encoding="utf-8")
            return (cid, name, True, "")
        except Exception as e:
            return (cid, name, False, str(e)[:100])
    with ThreadPoolExecutor(max_workers=3) as ex:
        for cid, name, good, err in ex.map(work, jobs):
            if good:
                ok += 1
                print(f"[topo] ok   {cid:<12} {name}", file=sys.stderr)
            else:
                fail += 1
                print(f"[topo] FAIL {cid:<12} {name}: {err}", file=sys.stderr)
    print(f"[topo] done: {ok} generated, {fail} failed", file=sys.stderr)
    return 0

if __name__ == "__main__":
    sys.exit(main())
