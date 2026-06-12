import { CREATIVE_OFFERING } from "../data/exhibit.js";

// A draft placeholder still carries the // TODO marker — render it muted.
const isPlaceholder = (text) => text.trim().startsWith("// TODO");

export default function CreativeOffering() {
  return (
    <section className="section creative" id="creative-offering">
      <p className="section__eyebrow">Creative offering</p>
      <h2 className="section__title">About the creative offering</h2>

      <p
        className={
          "section__lead" + (isPlaceholder(CREATIVE_OFFERING.blurb) ? " placeholder" : "")
        }
      >
        {CREATIVE_OFFERING.blurb}
      </p>
    </section>
  );
}
