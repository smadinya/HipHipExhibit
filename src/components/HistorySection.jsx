import { HISTORY } from "../data/exhibit.js";

export default function HistorySection() {
  return (
    <section className="section history" id="history">
      <p className="section__eyebrow">The story · How it spread</p>
      <h2 className="section__title">From the Bronx to the world</h2>
      <p className="section__lead history__intro">{HISTORY.intro}</p>

      <div className="history__sections">
        {HISTORY.sections.map((s) => (
          <article key={s.heading} className="history__section">
            <h3 className="history__heading">{s.heading}</h3>
            <p className="history__body">{s.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
