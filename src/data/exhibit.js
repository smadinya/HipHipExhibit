// =============================================================================
//  Hip-Hop Without Borders — ALL exhibit content lives in this file.
//  Edit the // REPLACE drafts below with finalized text, swap in real YouTube
//  IDs (replace YOUTUBE_ID_HERE), and verify the // VERIFY years.
// =============================================================================

export const ORIGIN = {
  place: "South Bronx, New York",
  year: 1973,
  // [longitude, latitude] for the react-simple-maps marker.
  lonLat: [-73.86, 40.84],
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
    lonLat: [-73.99, 40.71], // nudged just south of the Bronx so both markers read
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
    lonLat: [2.35, 48.85],
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
    lonLat: [139.69, 35.68],
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
    lonLat: [-17.44, 14.69],
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

// The History section — rendered by HistorySection.jsx between the world map
// and the Fundamentals Lab.
export const HISTORY = {
  intro:
    "Hip-hop began in the Bronx in the 1970s as a Black and Latino youth culture built around DJing, MCing, breaking, and graffiti, and it quickly became a way to narrate urban life, inequality, and identity. As it spread, it was not simply copied; artists in other countries adapted it to local languages, political struggles, and cultural references, which is why hip-hop became a global form of expression rather than only an American genre.",
  sections: [
    {
      heading: "Origins in the U.S.",
      body:
        "Most histories place hip-hop's emergence in the South Bronx in the early 1970s, especially around DJ Kool Herc's party innovations with breakbeats and turntable techniques. By the late 1970s and 1980s, rap records, block parties, radio, touring, and music video exposure helped turn a local scene into a national and then international style. U.S. artists also established hip-hop's political role, using lyrics to address racism, policing, poverty, and Black pride.",
    },
    {
      heading: "How it went global",
      body:
        "Scholars describe hip-hop as a diaspora-like culture that moved across ethnic, linguistic, and geographic boundaries. Its spread was accelerated by media circulation, touring, imported recordings, dance culture, satellite TV, and later the internet, but local youth scenes were the real drivers of transformation because they made hip-hop meaningful in new settings. A key point in the scholarship is that \"global hip-hop\" is not one thing; it becomes different in each place through translation, remix, and local political use.",
    },
    {
      heading: "How countries used it",
      body:
        "In West Africa, hip-hop often became a language of identity, social critique, and civic voice, with artists using local languages and code-switching to claim authenticity and speak to everyday realities. In East Asia, hip-hop has been used to negotiate race, youth identity, resistance, and the tension between Black cultural origins and local appropriation. In France and other parts of Western Europe, rap became a major outlet for immigrant, postcolonial, and banlieue identity, often addressing racism, policing, citizenship, and exclusion.",
    },
    {
      heading: "Regional patterns",
      body:
        "West African rap is frequently tied to multilingual expression and public advocacy, with scholars emphasizing language choice as a form of cultural and political positioning. Japanese hip-hop scholarship highlights translation of Black diasporic style into Japanese contexts, where artists use rap to explore race, marginality, and urban identity. French rap is especially associated with immigrant and postcolonial communities, and scholarship shows that it helped reshape debates about Frenchness, race, and belonging.",
    },
  ],
};

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
  "Stevens, Eric. \"History of Hip-Hop: From Humble Origins to Global Fame.\" Red Bull. // add link",
  "\"The Global Hip-Hop Diaspora: Understanding the Culture.\" // add link",
  "\"Hip-Hop at 50: Global Culture, Global Voices.\" University of Arizona. // add link",
  "\"Between New York and Paris: Hip Hop and the Transnational Politics of Race, Culture, and Citizenship.\" // add link",
  "\"Vernacular Verses: Language, Identity and African Hip-Hop.\" // add link",
  "\"Blackness, Race, and Language Politics in Japanese Hiphop.\" // add link",
  "\"French Rap's Role in French Society.\" // add link",
  "\"Rap and Hip-Hop Timeline.\" Carnegie Hall. // add link",
];
