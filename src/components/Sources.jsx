import { SOURCES, SONGS } from "../data/exhibit.js";

const isPlaceholder = (text) => text.trim().startsWith("// REPLACE");
const youtubeUrl = (id) => `https://www.youtube.com/watch?v=${id}`;

export default function Sources() {
  return (
    <section className="section sources" id="sources">
      <p className="section__eyebrow">Citations</p>
      <h2 className="section__title">Works Cited</h2>

      <ul className="sources__list">
        {SOURCES.map((src, i) =>
          isPlaceholder(src) ? (
            <li key={i} className="placeholder">
              {src}
            </li>
          ) : (
            // Finalized entries may contain a raw URL; render it as a link.
            <li key={i}>
              <Citation text={src} />
            </li>
          )
        )}
      </ul>

      <div className="sources__sub">
        <p className="section__eyebrow">Musical examples (YouTube)</p>
        <ul className="sources__list">
          {SONGS.map((song) => (
            <li key={song.id}>
              {song.artist} — “{song.title}” ({song.year}):{" "}
              <a href={youtubeUrl(song.youtubeId)} target="_blank" rel="noreferrer">
                {youtubeUrl(song.youtubeId)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Turn the first bare URL in a citation string into a clickable link.
function Citation({ text }) {
  const match = text.match(/https?:\/\/\S+/);
  if (!match) return text;
  const url = match[0];
  const [before, after] = text.split(url);
  return (
    <>
      {before}
      <a href={url} target="_blank" rel="noreferrer">
        {url}
      </a>
      {after}
    </>
  );
}
