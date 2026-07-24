# Satellite 3D models — offline cache

The satellite tracker looks for models here first. The app also falls back to
fetching them at runtime from NASA's CDN and caching them in the browser's
IndexedDB, so you can either:

## Option A — pre-download (recommended for offline use)

From the repo root, run:

```
python tools/download_models.py
```

That will drop `ISS.glb` and `Hubble.glb` into this folder. They are hosted by
NASA at:

- `https://assets.science.nasa.gov/content/dam/science/psd/solar/2023/09/i/ISS_stationary.glb`
- `https://assets.science.nasa.gov/content/dam/science/psd/solar/2023/09/h/Hubble.glb`

Sizes: ISS is ~42 MB, Hubble is ~11 MB.

## Option B — let the app cache them on first load

Just open the page and click the ISS / Hubble missions. The browser will fetch
from NASA once (needs internet) and store the .glb inside IndexedDB. Subsequent
loads work offline.

## Tiangong

NASA doesn't host an official Tiangong model. If you have one, save it here
as `Tiangong.glb` and the app will pick it up automatically. Otherwise the app
falls back to an in-code procedural model.
