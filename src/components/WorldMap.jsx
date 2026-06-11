import { forwardRef, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ORIGIN, SONGS } from "../data/exhibit.js";

// The map uses an equirectangular projection: the world is 2:1, so a viewBox of
// 100 x 50 lets us drop nodes straight from their { x, y } percentages.
const VB_W = 100;
const VB_H = 50;
const sx = (p) => p.x; // x% maps 1:1 onto a 100-unit-wide viewBox
const sy = (p) => p.y * (VB_H / 100); // y% scaled into the 50-unit-tall viewBox

// Order in which connection lines radiate out of the Bronx.
const ARC_ORDER = ["mc-solaar", "zeebra", "positive-black-soul"];
const ARC_DURATION = 0.85;
const ARC_GAP = 0.85;

// A gentle upward-bowing arc from the origin to a target node.
function arcPath(from, to) {
  const ox = sx(from);
  const oy = sy(from);
  const tx = sx(to);
  const ty = sy(to);
  const mx = (ox + tx) / 2;
  const my = (oy + ty) / 2;
  const lift = Math.hypot(tx - ox, ty - oy) * 0.22;
  return `M ${ox} ${oy} Q ${mx} ${my - lift} ${tx} ${ty}`;
}

// A faint abstract dot field as the map backdrop (clean, not photoreal).
function buildDots() {
  const dots = [];
  const step = 3;
  for (let x = step; x < VB_W; x += step) {
    for (let y = step; y < VB_H; y += step) {
      dots.push({ x, y });
    }
  }
  return dots;
}

const WorldMap = forwardRef(function WorldMap({ onSelect }, sectionRef) {
  const svgRef = useRef(null);
  const inView = useInView(svgRef, { once: true, amount: 0.35 });
  const dots = useMemo(buildDots, []);

  const arcEndDelay = (songId) => ARC_ORDER.indexOf(songId) * ARC_GAP + ARC_DURATION;

  // When does each node "light up"? The New York node is the Bronx's neighbor,
  // so it pulses first; the rest light up as their arc arrives.
  const nodePulseDelay = (songId) =>
    songId === "public-enemy" ? 0.25 : arcEndDelay(songId);

  return (
    <section className="section map" id="map" ref={sectionRef}>
      <p className="section__eyebrow">The centerpiece · Follow the sound</p>
      <h2 className="section__title">Out of the Bronx, into the world</h2>
      <p className="section__lead">
        In 1973 it lived on a few blocks. Within two decades it had taken root on four
        continents. Tap any city to hear how it answered back.
      </p>

      <div className="map__frame">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          role="group"
          aria-label="World map showing hip-hop spreading from the South Bronx to Paris, Tokyo, and Dakar"
        >
          {/* Backdrop dot field */}
          <g className="map__dots">
            {dots.map((d, i) => (
              <circle key={i} className="map__dot" cx={d.x} cy={d.y} r={0.22} />
            ))}
          </g>

          {/* Faint orientation lines (equator + prime meridian) */}
          <line x1="0" y1={VB_H / 2} x2={VB_W} y2={VB_H / 2} stroke="rgba(244,239,230,0.06)" strokeWidth="0.15" />
          <line x1={VB_W / 2} y1="0" x2={VB_W / 2} y2={VB_H} stroke="rgba(244,239,230,0.06)" strokeWidth="0.15" />

          {/* Radiating connection arcs (Bronx → Paris → Tokyo → Dakar) */}
          <g fill="none">
            {ARC_ORDER.map((id, i) => {
              const song = SONGS.find((s) => s.id === id);
              return (
                <motion.path
                  key={id}
                  d={arcPath(ORIGIN.coords, song.coords)}
                  stroke={song.accent}
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  style={{ filter: `drop-shadow(0 0 1.2px ${song.accent})` }}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 0.95 } : {}}
                  transition={{
                    duration: ARC_DURATION,
                    delay: i * ARC_GAP,
                    ease: "easeInOut",
                  }}
                />
              );
            })}
          </g>

          {/* Bronx origin marker (decorative) */}
          <g aria-hidden="true">
            <motion.circle
              cx={sx(ORIGIN.coords)}
              cy={sy(ORIGIN.coords)}
              r={2.4}
              fill="none"
              stroke="var(--gold)"
              strokeWidth="0.25"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={
                inView
                  ? { scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }
                  : {}
              }
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              style={{ transformOrigin: `${sx(ORIGIN.coords)}px ${sy(ORIGIN.coords)}px` }}
            />
            <circle cx={sx(ORIGIN.coords)} cy={sy(ORIGIN.coords)} r={1.1} fill="var(--gold)" />
            <text
              className="map__node-label map__origin-label"
              x={sx(ORIGIN.coords)}
              y={sy(ORIGIN.coords) - 2.6}
              textAnchor="middle"
              fontSize={2.1}
            >
              Bronx · 1973
            </text>
          </g>

          {/* City nodes (clickable + keyboard-focusable) */}
          {SONGS.map((song) => {
            const cx = sx(song.coords);
            const cy = sy(song.coords);
            const delay = nodePulseDelay(song.id);
            return (
              <g
                key={song.id}
                className="map__node"
                role="button"
                tabIndex={0}
                aria-label={`${song.city}: ${song.artist} — ${song.title}. Open details.`}
                onClick={() => onSelect(song.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(song.id);
                  }
                }}
              >
                {/* Pulsing halo */}
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={2.2}
                  fill={song.accent}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={inView ? { scale: [1, 1.8, 1], opacity: [0.45, 0, 0.45] } : {}}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay,
                  }}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                />
                {/* Solid node */}
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={1.1}
                  fill={song.accent}
                  stroke="#0d0d0f"
                  strokeWidth="0.2"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay }}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                />
                {/* Larger transparent hit area for easy clicking/touch */}
                <circle className="map__node-hit" cx={cx} cy={cy} r={3} />
                <text
                  className="map__node-label"
                  x={cx}
                  y={cy + 3.4}
                  textAnchor="middle"
                  fontSize={2.1}
                >
                  {song.city.split(",")[0]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="map__legend" aria-hidden="true">
        <span>
          <i style={{ background: "var(--gold)" }} /> Origin (South Bronx)
        </span>
        {SONGS.filter((s) => s.id !== "public-enemy").map((s) => (
          <span key={s.id}>
            <i style={{ background: s.accent }} /> {s.city.split(",")[0]}
          </span>
        ))}
      </div>
    </section>
  );
});

export default WorldMap;
