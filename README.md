# Hip-Hop Without Borders

An interactive single-page exhibit tracing how hip-hop spread from a 1973 South Bronx block
party to Paris, Tokyo, and Dakar. Built as a college music-appreciation final project.

The centerpiece is an animated SVG world map; the standout feature is a **Fundamentals Lab**
with real synthesized audio (Tone.js) demonstrating sampling, timbre, syncopation,
call-and-response, and rhythm/meter.

## Tech stack

- **React 18 + Vite** (JavaScript/JSX)
- **Tone.js** — all Fundamentals Lab audio
- **Framer Motion** — map line sequence, node pulses, panel slide-in
- Fully client-side. No backend, no API keys, no environment variables.

## Develop & build

```bash
npm install      # install dependencies
npm run dev      # local dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # serve the production build locally
```

## Editing the content

All exhibit content lives in [`src/data/exhibit.js`](src/data/exhibit.js). Search for
`// REPLACE` comments to find the placeholder text to finalize:

- `ORIGIN.blurb` — South Bronx origin story
- Each song's `background` (≥50 words) and `summary` (≥100 words)
- `SOURCES` — MLA Works Cited entries (one string each, with working links)
- Replace every `YOUTUBE_ID_HERE` with the real YouTube video ID
- Verify the years marked `// VERIFY` (Zeebra, Positive Black Soul)

## Deploy to Vercel

1. Import the repository into Vercel.
2. Framework preset: **Vite**
3. Build command: `npm run build`
4. Output directory: `dist`
5. No environment variables required.
