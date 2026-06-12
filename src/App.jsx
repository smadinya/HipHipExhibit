import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Hero from "./components/Hero.jsx";
import OriginSection from "./components/OriginSection.jsx";
import WorldMap from "./components/WorldMap.jsx";
import HistorySection from "./components/HistorySection.jsx";
import ThemeSection from "./components/ThemeSection.jsx";
import CityPanel from "./components/CityPanel.jsx";
import FundamentalsLab from "./components/FundamentalsLab.jsx";
import Timeline from "./components/Timeline.jsx";
import CreativeOffering from "./components/CreativeOffering.jsx";
import Sources from "./components/Sources.jsx";
import { SONGS } from "./data/exhibit.js";

export default function App() {
  const mapRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);

  const selectedIndex = SONGS.findIndex((s) => s.id === selectedId);
  const selectedSong = selectedIndex >= 0 ? SONGS[selectedIndex] : null;

  const scrollToMap = () =>
    mapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const go = (delta) => {
    const next = (selectedIndex + delta + SONGS.length) % SONGS.length;
    setSelectedId(SONGS[next].id);
  };

  return (
    <>
      <Hero onBegin={scrollToMap} />
      <OriginSection />
      <WorldMap ref={mapRef} onSelect={setSelectedId} />
      <HistorySection />
      <ThemeSection />
      <FundamentalsLab />
      <Timeline />
      <CreativeOffering />
      <Sources />

      <footer className="credit">
        Hip-Hop Without Borders · A music-appreciation exhibit · Built with React, Vite &amp;
        Tone.js
      </footer>

      <AnimatePresence>
        {selectedSong && (
          <CityPanel
            key={selectedSong.id}
            song={selectedSong}
            onClose={() => setSelectedId(null)}
            onPrev={() => go(-1)}
            onNext={() => go(1)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
