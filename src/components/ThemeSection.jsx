import { THEME } from "../data/exhibit.js";

export default function ThemeSection() {
  return (
    <section className="section history theme" id="theme">
      <p className="section__eyebrow">The argument · What ties it together</p>
      <h2 className="section__title">One form, four voices</h2>

      {THEME.map((paragraph, i) => (
        <p key={i} className={i === 0 ? "section__lead history__intro" : "theme__body"}>
          {paragraph}
        </p>
      ))}
    </section>
  );
}
