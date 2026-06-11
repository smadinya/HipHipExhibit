// =============================================================================
//  Hip-Hop Without Borders — ALL exhibit content lives in this file.
//  Edit the // REPLACE drafts below with finalized text, swap in real YouTube
//  IDs (replace YOUTUBE_ID_HERE), and verify the // VERIFY years.
// =============================================================================

export const ORIGIN = {
  place: "South Bronx, New York",
  year: 1973,
  // The Bronx origin node, as an approximate % position on an equirectangular
  // world map. Nudged up-left of the New York song node so both read clearly
  // (the Bronx sits just north of the Public Enemy / New York node).
  coords: { x: 27.9, y: 25.4 },
  // REPLACE — origin story: Kool Herc's 1973 block parties, the four elements
  // (DJing, MCing, breaking, graffiti), Black and Latino youth, why it started
  blurb:
    "// REPLACE — origin story: Kool Herc's 1973 block parties, the four elements (DJing, MCing, breaking, graffiti), Black and Latino youth, why it started",
  // The four elements of hip-hop, surfaced in the Origin section.
  elements: ["DJing", "MCing", "Breaking", "Graffiti"],
};

export const SONGS = [
  {
    id: "public-enemy",
    city: "New York, USA",
    coords: { x: 29.5, y: 27.3 }, // approx % on an equirectangular world map; fine-tune
    accent: "#f5b301",
    artist: "Public Enemy",
    title: "Fight the Power",
    year: 1989,
    youtubeId: "YOUTUBE_ID_HERE",
    fundamental: "Sampling",
    fundamentalDef:
      "Taking a recorded sound or phrase from an existing track and reusing it in a new composition.",
    background:
      "// REPLACE — Bomb Squad production; made for Spike Lee's Do the Right Thing; anti-racist anthem; dense sample collage",
    summary:
      "// REPLACE — 100+ words on the layered samples and how the density creates urgency",
  },
  {
    id: "mc-solaar",
    city: "Paris, France",
    coords: { x: 50.6, y: 22.9 },
    accent: "#4cc9f0",
    artist: "MC Solaar",
    title: "Bouge de là",
    year: 1991,
    youtubeId: "YOUTUBE_ID_HERE",
    fundamental: "Timbre",
    fundamentalDef:
      "The tonal color of a sound — what makes a voice or instrument distinct even at the same pitch.",
    background:
      "// REPLACE — MC Solaar's 1991 debut; French wordplay; a distinctly Parisian answer to US hip-hop",
    summary:
      "// REPLACE — 100+ words on Solaar's smooth, conversational delivery against the sparse drum-machine backdrop",
  },
  {
    id: "zeebra",
    city: "Tokyo, Japan",
    coords: { x: 88.8, y: 30.2 },
    accent: "#f72585",
    artist: "Zeebra",
    title: "Mr. Dynamite",
    year: 1997, // VERIFY exact year
    youtubeId: "YOUTUBE_ID_HERE",
    fundamental: "Syncopation",
    fundamentalDef:
      "Rhythmic emphasis on offbeats or unexpected beats, creating forward momentum.",
    background:
      "// REPLACE — mid-90s; an early Japanese rap crossover; Japanese slang over American hip-hop aesthetics",
    summary:
      "// REPLACE — 100+ words on how the Japanese-language flow creates rhythmic tension with the beat",
  },
  {
    id: "positive-black-soul",
    city: "Dakar, Senegal",
    coords: { x: 45.2, y: 41.8 },
    accent: "#90be6d",
    artist: "Positive Black Soul",
    title: "Kôyô Kôyô",
    year: 1995, // VERIFY exact year
    youtubeId: "YOUTUBE_ID_HERE",
    fundamental: "Call-and-response",
    fundamentalDef:
      "A structure where one phrase (the call) is answered by another (the response) — rooted in West African oral tradition.",
    background:
      "// REPLACE — Duggy Tee & Didier Awadi; Dakar; Wolof/French/English; Pan-African, postcolonial identity",
    summary:
      "// REPLACE — 100+ words on the vocal interplay between the two MCs mirroring West African tradition",
  },
];

// The 5th fundamental required by the rubric. Surfaced as an intro card in the
// Fundamentals Lab with a small 4/4 metronome demo.
export const RHYTHM_METER = {
  fundamental: "Rhythm & Meter",
  fundamentalDef:
    "Meter is the steady underlying pulse grouped into measures (hip-hop almost always counts in 4/4). Rhythm is the pattern of sounds placed against that pulse — everything else in hip-hop is built on top of this grid.",
  caption:
    "Every demo below sits on a 4/4 grid. Tap the metronome to feel the four-beat pulse all of hip-hop is counted in.",
};

// Optional horizontal timeline. The four songs are flagged with songId so the
// Timeline component can color/mark them with each song's accent.
export const TIMELINE = [
  { year: 1973, label: "Kool Herc's back-to-school jam in the South Bronx" },
  { year: 1979, label: '"Rapper\'s Delight" takes rap to vinyl and the radio' },
  { year: 1982, label: '"The Message" turns rap toward social commentary' },
  { year: 1989, label: 'Public Enemy — "Fight the Power"', songId: "public-enemy" },
  { year: 1991, label: 'MC Solaar — "Bouge de là" (Paris)', songId: "mc-solaar" },
  { year: 1995, label: 'Positive Black Soul — "Kôyô Kôyô" (Dakar)', songId: "positive-black-soul" }, // VERIFY year
  { year: 1997, label: 'Zeebra — "Mr. Dynamite" (Tokyo)', songId: "zeebra" }, // VERIFY year
  { year: 2017, label: "Hip-hop becomes the most-streamed genre worldwide" },
];

export const SOURCES = [
  // REPLACE — MLA Works Cited entries, one string each, with working links
  "// REPLACE — MLA Works Cited entry 1, with a working link (e.g. https://...)",
  "// REPLACE — MLA Works Cited entry 2, with a working link (e.g. https://...)",
  "// REPLACE — MLA Works Cited entry 3, with a working link (e.g. https://...)",
];
