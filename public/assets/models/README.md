# Satellite 3D models — offline cache

The satellite tracker looks for models in this folder first. Every file below
is optional — if it's missing the app renders a semantically-named procedural
fallback that the curated Parts list still highlights correctly.

## Option A — pre-download NASA's official models (recommended)

From the repo root, run:

```
python tools/download_models.py
```

That drops `ISS.glb` (~42 MB) and `Hubble.glb` (~11 MB) into this folder,
sourced from NASA's Solar System Exploration:

- `https://assets.science.nasa.gov/content/dam/science/psd/solar/2023/09/i/ISS_stationary.glb`
- `https://assets.science.nasa.gov/content/dam/science/psd/solar/2023/09/h/Hubble.glb`

License: NASA content is free to use — see
https://www.nasa.gov/nasa-brand-center/images-and-media/

## Option B — let the app cache them on first load

Open the page and click ISS or Hubble. The browser fetches from NASA once
(needs internet) and stores the .glb in the Cache API. Subsequent loads work
offline. If NASA is unreachable, the app falls back to a low-poly CC-BY 3.0
model hosted on the Poly Pizza CDN.

## Adding the other satellites (Tiangong, Starlink, GPS …)

No official free glTFs exist for these missions. Grab any of the community
models below (**check each licence!**), save it in this folder under the
exact filename shown, and refresh the page — the app will pick it up
automatically. Otherwise you get the built-in procedural model.

| File name        | Mission              | Free source suggestions                                                                                             |
| ---------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `Tiangong.glb`   | Chinese Tiangong CSS | Sketchfab (search "tiangong space station" — many CC-BY models); MakerWorld: https://makerworld.com/en/models/845722|
| `Starlink.glb`   | SpaceX Starlink      | FetchCFD: https://fetchcfd.com/view-project/2300-starlink-3d-model (based on langgesagt's Reddit release); Sketchfab: search "starlink satellite" |
| `OneWeb.glb`     | OneWeb               | Sketchfab: search "oneweb satellite"                                                                                |
| `Iridium.glb`    | Iridium NEXT         | Sketchfab: search "iridium satellite"                                                                               |
| `GPS.glb`        | GPS Navstar          | Sketchfab: search "gps satellite" or "navstar"                                                                      |
| `GLONASS.glb`    | GLONASS              | Sketchfab: search "glonass"                                                                                         |
| `Galileo.glb`    | Galileo              | Sketchfab / ESA — search "galileo satellite"                                                                        |
| `BeiDou.glb`     | BeiDou-3             | Sketchfab: search "beidou"                                                                                          |
| `Sentinel.glb`   | Sentinel / Copernicus| ESA: https://sentinel.esa.int/web/sentinel/multimedia/3d-model — download and rename                                |
| `GOES.glb`       | GOES-R series        | NOAA: https://www.nesdis.noaa.gov/current-satellite-missions/currently-flying/goes-r-series (browse for downloads)  |

### Sketchfab quick recipe

1. Open the model page (e.g. https://sketchfab.com/3d-models/starlink-spacex-satellite-0a60f6720c5141c9a1c6d71aac108b31).
2. Click **Download 3D Model** (top right) — free login required.
3. Pick **glTF (binary)** to get a `.glb` file.
4. Rename it to the filename in the table above and drop it into this folder.
5. Refresh the browser tab.

### Licence

Sketchfab's default free downloads are CC-BY. Keep the author credit — the
mission's detail panel shows the model in a viewer only; you're not
redistributing it.
