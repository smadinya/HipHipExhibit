import { motion } from "framer-motion";
import { TIMELINE, SONGS, RHYTHM_METER } from "../data/exhibit.js";

// Map each timeline song entry to its accent color.
const accentFor = (songId) => SONGS.find((s) => s.id === songId)?.accent;

export default function Timeline() {
  return (
    <section className="section timeline" id="timeline">
      <p className="section__eyebrow">A short history</p>
      <h2 className="section__title">From one block to every continent</h2>
      <p className="section__lead">
        Five decades, one steady 4/4 pulse. {RHYTHM_METER.fundamentalDef}
      </p>

      <ol className="timeline__track">
        {TIMELINE.map((item, i) => {
          const accent = item.songId ? accentFor(item.songId) : undefined;
          return (
            <motion.li
              key={`${item.year}-${i}`}
              className={"timeline__item" + (item.songId ? " timeline__item--song" : "")}
              style={accent ? { "--dot": accent } : undefined}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3) }}
            >
              <div className="timeline__year">{item.year}</div>
              <div className="timeline__label">{item.label}</div>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
