#!/usr/bin/env python3
"""Download NASA's official 3D models for the satellite tracker and cache them
locally under public/assets/models/. Run once from the repo root:

    python tools/download_models.py

All the .glb files are licensed by NASA for free use — see:
https://science.nasa.gov/nasa-brand-center/images-and-media/
"""
import os, sys, urllib.request, ssl, pathlib

# Source: https://science.nasa.gov/3d-resources/
MODELS = {
    "ISS.glb":    "https://assets.science.nasa.gov/content/dam/science/psd/solar/2023/09/i/ISS_stationary.glb?emrc=6a1b6a66a70c4",
    "Hubble.glb": "https://assets.science.nasa.gov/content/dam/science/psd/solar/2023/09/h/Hubble.glb?emrc=69ffe70c92a13",
    # Tiangong: NASA doesn't publish an official model. If you have one, drop it in as Tiangong.glb.
}

ROOT = pathlib.Path(__file__).resolve().parents[1]
DEST = ROOT / "public" / "assets" / "models"
DEST.mkdir(parents=True, exist_ok=True)

ctx = ssl.create_default_context()
for name, url in MODELS.items():
    out = DEST / name
    if out.exists() and out.stat().st_size > 100_000:
        print(f"[skip] {name} already present ({out.stat().st_size/1_000_000:.1f} MB)")
        continue
    print(f"[dl] {name}  ←  {url}")
    req = urllib.request.Request(url, headers={"User-Agent": "GEOINT-model-fetcher/1.0"})
    with urllib.request.urlopen(req, context=ctx, timeout=90) as r, open(out, "wb") as f:
        while True:
            chunk = r.read(1 << 15)
            if not chunk:
                break
            f.write(chunk)
    print(f"      → {out}  ({out.stat().st_size/1_000_000:.2f} MB)")
print("Done. Reload the page in your browser.")
