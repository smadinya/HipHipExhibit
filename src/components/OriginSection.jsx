import { motion } from "framer-motion";
import { ORIGIN } from "../data/exhibit.js";

// A draft placeholder still carries the // REPLACE marker — render it muted.
const isPlaceholder = (text) => text.trim().startsWith("// REPLACE");

export default function OriginSection() {
  return (
    <section className="section origin" id="origin">
      <p className="section__eyebrow">The beginning · {ORIGIN.place}</p>

      <motion.div
        className="origin__year"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        {ORIGIN.year}
      </motion.div>

      <h2 className="section__title">It started on one block.</h2>

      <ul className="elements" aria-label="The four elements of hip-hop">
        {ORIGIN.elements.map((el) => (
          <li key={el}>{el}</li>
        ))}
      </ul>

      <p className={"section__lead" + (isPlaceholder(ORIGIN.blurb) ? " placeholder" : "")}>
        {ORIGIN.blurb}
      </p>
    </section>
  );
}
