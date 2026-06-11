import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const isPlaceholder = (text) => text.trim().startsWith("// REPLACE");

export default function CityPanel({ song, onClose, onPrev, onNext }) {
  const panelRef = useRef(null);

  // Focus the panel on open; restore focus to the triggering element on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    panelRef.current?.focus();
    return () => {
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, []);

  // Keyboard: Esc closes, arrows navigate between cities.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNext();
      else if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div
      className="panel-overlay"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="panel"
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={`${song.city}: ${song.artist} — ${song.title}`}
        style={{ "--accent": song.accent }}
        onClick={(e) => e.stopPropagation()}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
      >
        <button className="panel__close" onClick={onClose} aria-label="Close panel">
          ×
        </button>

        <p className="panel__city">{song.city}</p>
        <h2 className="panel__title">{song.title}</h2>
        <p className="panel__meta">
          {song.artist} · {song.year}
        </p>

        <div className="panel__video">
          <iframe
            src={`https://www.youtube.com/embed/${song.youtubeId}`}
            title={`${song.artist} — ${song.title} (YouTube)`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="panel__fundamental">
          <span className="badge">{song.fundamental}</span>
          <p style={{ margin: 0 }}>{song.fundamentalDef}</p>
        </div>

        <h3 className="panel__h">Background</h3>
        <p className={isPlaceholder(song.background) ? "placeholder" : undefined}>
          {song.background}
        </p>

        <h3 className="panel__h">Summary</h3>
        <p className={isPlaceholder(song.summary) ? "placeholder" : undefined}>
          {song.summary}
        </p>

        <div className="panel__nav">
          <button className="btn btn--ghost" onClick={onPrev}>
            ← Prev
          </button>
          <button className="btn btn--ghost" onClick={onNext}>
            Next →
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
