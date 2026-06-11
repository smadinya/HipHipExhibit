import { motion } from "framer-motion";

export default function Hero({ onBegin }) {
  return (
    <header className="hero">
      <motion.h1
        className="hero__title"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Hip-Hop <span>Without</span> Borders
      </motion.h1>

      <motion.p
        className="hero__tagline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        How a Bronx block party became a global language.
      </motion.p>

      <motion.div
        className="hero__cta"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
      >
        <button className="btn btn--primary" onClick={onBegin}>
          Begin the journey ↓
        </button>
      </motion.div>

      <p className="hero__scroll">Scroll to explore</p>
    </header>
  );
}
