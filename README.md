# GEOINT Strategic Intelligence Globe v2

Interactive 3D world map for geopolitical analysis with high-resolution borders (10m), comprehensive country intelligence data, extraction sites, military bases, and event tracking.

![GEOINT Globe](https://img.shields.io/badge/GEOINT-Strategic_Globe-0a4a6a?style=for-the-badge)

## Features

- **10m Resolution Borders** — Coastlines and borders at ~1km detail via Natural Earth 10m TopoJSON
- **Country Intelligence Panels** — GDP, GDP/capita, population, ethnic composition, cultural profiles
- **Geography Tab** — Terrain composition (plains/hills/mountains %), major mountains, plains, rivers, lakes
- **Economy Tab** — Top exports/imports (Economic Complexity Atlas data), extraction sites with coordinates
- **Strategic Tab** — Domestic military installations + foreign bases with map markers
- **Interactive 3D Globe** — Three.js WebGL, drag to rotate, scroll to zoom, country hover elevation
- **Event System** — Right-click to place intel markers (Conflict, Diplomacy, Economic, Alert)
- **Country Color Customization** — Assign custom colors to any country
- **Dark Intelligence Theme** — Muted grey-blue palette, IBM Plex Mono + Barlow typography

## Data Coverage

**Full intelligence data (25+ countries):** USA, China, Russia, UK, France, Germany, Italy, Japan, India, Brazil, South Korea, Saudi Arabia, Turkey, Australia, Egypt, Nigeria, South Africa, Israel, Iran, Pakistan, Tanzania, Ukraine, Poland, Mexico, Canada, Indonesia, Thailand, Vietnam, Philippines, Jordan

**Basic data (60+ countries):** GDP, population, capital, flag for all remaining major nations.

## Deploy to Vercel

### Option A: One-Click Deploy

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **"New Project"** → Import your GitHub repo
4. Vercel auto-detects static site — click **Deploy**
5. Done! Your globe is live.

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# From project root
vercel

# Follow prompts — select project name, confirm settings
# Vercel will deploy and give you a URL
```

### Option C: Manual GitHub → Vercel

1. Create a new GitHub repository
2. Push all files:

```bash
git init
git add .
git commit -m "Initial GEOINT Globe deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/geoint-globe.git
git push -u origin main
```

3. Go to [vercel.com/new](https://vercel.com/new)
4. Select your `geoint-globe` repository
5. Framework Preset: **Other**
6. Output Directory: `public`
7. Click **Deploy**

## Local Development

```bash
# Simple HTTP server
npx serve public -l 3000

# Or with Python
cd public && python3 -m http.server 3000
```

Open `http://localhost:3000`

## Controls

| Action | Effect |
|--------|--------|
| **Drag** | Rotate globe |
| **Scroll** | Zoom in/out |
| **Click country** | Select → shows intelligence panel |
| **Right-click** | Place event marker at location |
| **☰ button** | Toggle right sidebar |
| **✕ button** | Close detail panel |
| **Click extraction/base** | Pan globe to location |

## Project Structure

```
geoint-globe/
├── public/
│   ├── index.html    # Main application (Three.js globe + UI)
│   └── data.js       # Country intelligence database
├── package.json      # NPM config
├── vercel.json       # Vercel deployment config
└── README.md
```

## Data Sources

- **Borders:** Natural Earth 10m via [world-atlas](https://github.com/topojson/world-atlas)
- **GDP/Population:** World Bank Open Data (2023-2024 estimates)
- **Trade/Exports:** OEC / Economic Complexity Atlas
- **Military Bases:** Open-source intelligence (OSINT), SIPRI
- **Ethnic Data:** CIA World Factbook

## Tech Stack

- **Three.js r128** — WebGL 3D rendering
- **Earcut** — Polygon triangulation
- **TopoJSON** — Efficient geographic data
- **Vanilla JS** — No framework dependencies
- **IBM Plex Mono + Barlow** — Typography

## License

MIT — Use freely for research, analysis, or educational purposes.

---

*CLASSIFICATION: UNCLASSIFIED // GEOINT STRATEGIC GLOBE v2.0*
