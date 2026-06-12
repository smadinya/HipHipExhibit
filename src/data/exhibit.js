// =============================================================================
//  Hip-Hop Without Borders — ALL exhibit content lives in this file.
// =============================================================================

export const ORIGIN = {
  place: "South Bronx, New York",
  year: 1973,
  // [longitude, latitude] for the react-simple-maps marker.
  lonLat: [-73.86, 40.84],
  blurb:
    "Hip-hop was started in the South Bronx during the early 1970s by black and Latino kids who built a new kind of music out of what they had. DJs looped the breaks of funk and soul records so that the best part of a song could keep going forever. They had MCs talk over those loops to keep the crowd moving. At the time there was no money or industry behind it, only small block parties and borrowed equipment. The interesting part is that it didn't stay in the Bronx; within twenty years it showed up in Dakar, Tokyo, Paris, and more. The artists from these countries weren't just copying the sound of American Rap, but using it to say something about their own lives.",
  // The four elements of hip-hop, surfaced in the Origin section.
  elements: ["DJing", "MCing", "Breaking", "Graffiti"],
};

// The exhibit's theme essay — rendered by ThemeSection.jsx, one paragraph per
// entry, in order.
export const THEME = [
  "Hip-hop was started in the South Bronx during the early 1970s by black and Latino kids who built a new kind of music out of what they had. DJs looped the breaks of funk and soul records so that the best part of a song could keep going forever. They had MCs talk over those loops to keep the crowd moving. At the time there was no money or industry behind it, only small block parties and borrowed equipment. The interesting part is that it didn't stay in the Bronx; within twenty years it showed up in Dakar, Tokyo, Paris, and more. The artists from these countries weren't just copying the sound of American Rap, but using it to say something about their own lives.",
  "The main theme of this exhibit is exactly how these artists utilized Hip Hop. It became a global language, not just a script to copy and paste. And people used the language as a tool to communicate their living situations, culture and political climate. You take a beat, you take rhyme, you take flow and attitude, and you fill all of it with your own words and your own politics. The four songs here show four versions of that exact process. Despite being from 4 different parts of the world in different cultures and languages, they're all doing the same basic thing, which is bending an American form until it fits somewhere else.",
  "The first question to ask is how did American rap spread so easily. Part of the answer is because of its accessibility. You don't need a full band or an expensive studio to make rap, just a beat and a voice are enough. That low barrier meant young people almost anywhere could pick it up. The other part of the answer comes from why Hip-Hop was made in the first place. From the beginning it was the music of people who weren't being listened to and other countries latched on to that ideal. Senegalese youth were dealing with the leftovers of French colonialism, Japanese kids were carving out an identity inside a culture that didn't leave much room for it, and French rappers wanted something of their own instead of more American dominance. All of them found that hip-hop already had a shape that fit. The form came with a built-in stance. It was made for talking back.",
  "This is where the course idea of cultural identity matters. When Positive Black Soul rap in Wolof, French, and English on \"Respect the Nubians,\" that language mixing is the whole point. They're combining Hip Hop with their African roots and showing that their identity is layered, postcolonial, and proud. MC Solaar does something similar on \"Bouge de là,\" where he isn't trying to sound like a New York rapper at all. He builds a Parisian identity instead, using his French wordplay and smooth delivery. Zeebra does the same for Japan on \"Mr. Dynamite,\" rapping in Japanese and local slang to prove that rap could belong there too. Public Enemy's \"Fight the Power\" is the original version of this stance, the American protest anthem that the rest of these artists were responding to even from far away. You can read all of this through Gramsci, where Hip Hop becomes a tool for groups outside the center of power to push back against the culture that dominates them. And sometimes that dominant culture is the United States itself.",
  "The music fundamentals make the connection even clearer. The most applicable one here is rhythm and meter, because that's where you can actually hear the translation happening. Rap flow is built on how a rapper's stressed syllables line up against the beat, and English has its own natural rhythm that American rap grew out of. Wolof, French, and Japanese don't stress syllables the same way English does, so when these artists rap in their own languages the flow has to change with them. The beat might stay close to the American template, but the voice riding on top of it moves differently. That difference is the whole theme in miniature. You can hear the other fundamentals doing this same work too, from the dense sampling on \"Fight the Power\" to the call-and-response on \"Respect the Nubians,\" the syncopation in Zeebra's delivery, and the timbre of MC Solaar's voice sitting against a sparse beat.",
  "All of this adds up to a different way of thinking about influence. It's easy to assume that when American culture spreads it just flattens everything into a copy of itself, but Hip Hop shows that isn't how it always works. The form crossed borders without erasing what it found on the other side, and instead it gave people a new way to sound like themselves. Each of these four songs is proof that a genre invented by one community in one city could become something a kid in Dakar or Tokyo or Paris could pick up and make their own. The music didn't replace what was already there. It just gave people one more way to say who they are.",
];

export const SONGS = [
  {
    id: "public-enemy",
    city: "New York, USA",
    lonLat: [-73.99, 40.71], // nudged just south of the Bronx so both markers read
    accent: "#f5b301",
    artist: "Public Enemy",
    title: "Fight the Power",
    year: 1989,
    youtubeId: "mmo3HFa2vjg",
    fundamental: "Sampling",
    fundamentalDef:
      "Taking a recorded sound or phrase from an existing track and reusing it in a new composition.",
    background:
      "Public Enemy put out \"Fight the Power\" in 1989. Spike Lee asked them for an anthem for his movie Do the Right Thing, which is about racial tension on the hottest day of a Brooklyn summer. Chuck D took the title from an older Isley Brothers song and built a new one around it. The Bomb Squad handled production.",
    summary:
      "The track hits like a wall of sound. The Bomb Squad packed in so many samples that even they couldn't keep track of them all. That's sampling pushed about as far as it can go. The beat pulls from James Brown's \"Funky Drummer,\" Sly and the Family Stone, and around twenty other records. It opens with a spoken clip from activist Thomas \"TNT\" Todd, then the drums drop in. There's no bass line and no reverb anywhere, because the producers wanted it raw instead of smooth. Chuck D sits low and hard in the mix while Flavor Flav answers him back. The whole thing sounds like a protest rally turned into a beat.",
  },
  {
    id: "mc-solaar",
    city: "Paris, France",
    lonLat: [2.35, 48.85],
    accent: "#4cc9f0",
    artist: "MC Solaar",
    title: "Bouge de là",
    year: 1991,
    youtubeId: "MNYsmMDZfiA",
    fundamental: "Timbre",
    fundamentalDef:
      "The tonal color of a sound — what makes a voice or instrument distinct even at the same pitch.",
    background:
      "MC Solaar was born Claude M'Barali in Dakar, Senegal, in 1969, and his family moved to France when he was a baby. \"Bouge de là\" was his debut single in 1991 and one of the first big rap hits France had. The beat is built on a sample of \"The Message\" by the English band Cymande. It went platinum, and producers Jimmy Jay and Boom Bass made it.",
    summary:
      "This one is the opposite of \"Fight the Power.\" Public Enemy is loud and packed. \"Bouge de là\" is smooth and loose. The thing to listen for here is timbre, the color of a sound. Solaar's delivery is relaxed and clever, and you catch that even if you don't speak French. His voice is warm and conversational, and it sits back on the beat instead of attacking it. The hook means something close to \"move out of the way.\" Each verse follows him through Paris running into someone new who wants him gone. The mood stays light the whole way through.",
  },
  {
    id: "zeebra",
    city: "Tokyo, Japan",
    lonLat: [139.69, 35.68],
    accent: "#f72585",
    artist: "Zeebra",
    title: "Mr. Dynamite",
    year: 1999,
    youtubeId: "mWp3M89g4HM",
    fundamental: "Syncopation",
    fundamentalDef:
      "Rhythmic emphasis on offbeats or unexpected beats, creating forward momentum.",
    background:
      "Zeebra, born Hideyuki Yokoi in Tokyo in 1971, released \"Mr. Dynamite\" in 1999. It was the first hip-hop single to break into the top 50 on the Japanese pop charts. Before going solo he helped start King Giddra, a group built on a Public Enemy foundation that used rap to talk about social issues. That puts him in a straight line back to the first song in this exhibit.",
    summary:
      "The thing to listen for here is syncopation, the way a rapper lands on the offbeats. Japanese doesn't stress syllables the way English does, so Zeebra has to find another way to make his flow hit. Scholar Ian Condry points out that Japanese rappers bend their own language to get rhyme and rhythm out of it. You can hear Zeebra push and pull against the beat and drop accents where you don't expect them, which keeps the verse moving. In Japan the song is known for what fans call the most famous sixteen bars in the country. The beat is bright and high-energy, and the song is about chasing your dreams and getting through hard times.",
  },
  {
    id: "positive-black-soul",
    city: "Dakar, Senegal",
    lonLat: [-17.44, 14.69],
    accent: "#90be6d",
    artist: "Positive Black Soul",
    title: "Respect the Nubians",
    year: 1995,
    youtubeId: "jUk1Tx0bMMY",
    fundamental: "Call-and-response",
    fundamentalDef:
      "A structure where one phrase (the call) is answered by another (the response) — rooted in West African oral tradition.",
    background:
      "Positive Black Soul started in Dakar in 1989 and were one of the first hip-hop groups in Senegal. The group is Didier Awadi and Amadou Barry, who goes by Duggy Tee. \"Respect the Nubians\" came off their mid-90s breakthrough, and it's a song about Black pride and demanding respect. They rap in Wolof, French, and English and work traditional instruments like the kora and balafon into the beat.",
    summary:
      "The fundamental here is call-and-response, which comes straight out of West African oral tradition. Awadi and Duggy Tee trade lines back and forth, one calling and the other answering, the same back-and-forth you hear in older Senegalese music. The beat layers traditional instruments like the kora and balafon under the drums, so it sounds modern and rooted at the same time. They move between Wolof, French, and English, sometimes inside one verse. The hook is in English and calls for respect, which makes the message land for listeners outside Senegal too. The mood is proud and steady, built to demand something without shouting for it.",
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
  { year: 1995, label: 'Positive Black Soul — "Respect the Nubians" (Dakar)', songId: "positive-black-soul" },
  { year: 1999, label: 'Zeebra — "Mr. Dynamite" (Tokyo)', songId: "zeebra" },
  { year: 2017, label: "Hip-hop becomes the most-streamed genre worldwide" },
];

// The Creative Offering explanation — rendered by CreativeOffering.jsx just
// above the Works Cited section.
export const CREATIVE_OFFERING = {
  blurb:
    "I built a website so people can play with this exhibit instead of only reading it. It covers hip-hop's history, plays all four songs next to where they came from, and turns each fundamental into a beat you can hear. The build-your-own-beat tool, made with Tone.js, hands you the same pieces these artists used and lets you make your own. That is the theme in action.",
};

export const SOURCES = [
  "Condry, Ian. Hip-Hop Japan: Rap and the Paths of Cultural Globalization. Duke University Press, 2006.",
  "\"Fight the Power by Public Enemy.\" WhoSampled, www.whosampled.com/Public-Enemy/Fight-the-Power/.",
  "\"'Fight the Power': The Story Behind Public Enemy's Searing Anthem.\" uDiscoverMusic, www.udiscovermusic.com/stories/public-enemy-fight-the-power-song-feature/.",
  "MC Solaar. \"Bouge de là (Clip officiel).\" YouTube, uploaded by MC Solaar, www.youtube.com/watch?v=MNYsmMDZfiA.",
  "\"MC Solaar – Bouge de là.\" French in Oxford, www.frenchinoxford.co.uk/songs/1991-mc-solaar-bouge-de-la/.",
  "\"Positive Black Soul Are Back!\" Music In Africa, www.musicinafrica.net/magazine/positive-black-soul-are-back.",
  "Positive Black Soul. \"Respect the Nubians.\" YouTube, www.youtube.com/watch?v=jUk1Tx0bMMY.",
  "Public Enemy. \"Fight the Power.\" YouTube, uploaded by PublicEnemyVEVO, www.youtube.com/watch?v=mmo3HFa2vjg.",
  "Zeebra. \"MR.DYNAMITE (Official Music Video).\" YouTube, www.youtube.com/watch?v=mWp3M89g4HM.",
];
