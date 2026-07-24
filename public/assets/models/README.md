# Satellite 3D models — offline cache

The satellite tracker looks for models here first. Every file below is optional
— if it's missing, the app renders a semantically-named procedural fallback
that the curated Parts list still highlights correctly.

## Option A — pre-download NASA's official models (recommended for offline use)

From the repo root, run:

```
python tools/download_models.py
```

That drops `ISS.glb` (~42 MB) and `Hubble.glb` (~11 MB) into this folder,
sourced from NASA's Solar System Exploration:

- `https://assets.science.nasa.gov/content/dam/science/psd/solar/2023/09/i/ISS_stationary.glb`
- `https://assets.science.nasa.gov/content/dam/science/psd/solar/2023/09/h/Hubble.glb`

License: NASA content is free to use, see
https://www.nasa.gov/nasa-brand-center/images-and-media/

## Option B — let the app cache them on first load

Open the page and click ISS or Hubble. The browser fetches from NASA once
(needs internet) and stores the .glb in the Cache API. Subsequent loads work
offline.

## Adding other satellites (Tiangong, Starlink, GPS, …)

NASA doesn't host every model. If you obtain a glTF/glb from another source
(Sketchfab, TurboSquid, CGTrader, FetchCFD, 3DModels.org …), just save it in
this folder under one of the following filenames and the app will pick it up
automatically:

| File name        | Mission                                       |
| ---------------- | --------------------------------------------- |
| `Tiangong.glb`   | Chinese Tiangong Space Station                |
| `Starlink.glb`   | SpaceX Starlink                                |
| `OneWeb.glb`     | OneWeb                                         |
| `Iridium.glb`    | Iridium NEXT                                   |
| `GPS.glb`        | GPS (Navstar)                                  |
| `GLONASS.glb`    | GLONASS                                        |
| `Galileo.glb`    | Galileo                                        |
| `BeiDou.glb`     | BeiDou-3                                       |
| `Sentinel.glb`   | Copernicus / Sentinel                          |
| `GOES.glb`       | Geostationary belt (GOES / Meteosat / Himawari)|

Free public sources worth trying (check licenses):

- Tiangong: Sketchfab, MakerWorld, 3DModels.org
- Starlink: FetchCFD (langgesagt-based, `.glb`), Sketchfab (Malacodart's model),
  3DModels.org (Starlink 2nd gen)

Once dropped in, refresh the page and the app will use the real model. If the
file is missing, you'll see the built-in procedural fallback — each of its
pieces is already named so the curated Parts list still highlights the right
component.
