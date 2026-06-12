import { forwardRef, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  useMapContext,
} from "react-simple-maps";
import geoData from "world-atlas/countries-110m.json";
import { ORIGIN, SONGS } from "../data/exhibit.js";

// Map canvas in px (also the SVG viewBox, so it scales to its container).
// Height is trimmed so Antarctica falls below the frame.
const MAP_W = 980;
const MAP_H = 440;
const PROJECTION_CONFIG = { rotate: [-11, 0, 0], center: [0, 10], scale: 179 };

// Order in which connection lines radiate out of the Bronx.
const ARC_ORDER = ["mc-solaar", "zeebra", "positive-black-soul"];
const ARC_DURATION = 0.85;
const ARC_GAP = 0.85;

const GEO_STYLE = {
  default: {
    fill: "#1c1c23",
    stroke: "rgba(244, 239, 230, 0.10)",
    strokeWidth: 0.5,
    outline: "none",
  },
};
GEO_STYLE.hover = GEO_STYLE.default;
GEO_STYLE.pressed = GEO_STYLE.default;

// A gentle upward-bowing arc between two projected points.
function arcPath([ox, oy], [tx, ty]) {
  const mx = (ox + tx) / 2;
  const my = (oy + ty) / 2;
  const lift = Math.hypot(tx - ox, ty - oy) * 0.22;
  return `M ${ox} ${oy} Q ${mx} ${my - lift} ${tx} ${ty}`;
}

// Radiating connection arcs, drawn in projected screen space so the NY → Tokyo
// line sweeps across the frame instead of splitting at the map's edge the way
// a great-circle <Line> would. Must render inside <ComposableMap>.
function SpreadArcs({ inView }) {
  const { projection } = useMapContext();
  const origin = projection(ORIGIN.lonLat);
  return (
    <g fill="none">
      {ARC_ORDER.map((id, i) => {
        const song = SONGS.find((s) => s.id === id);
        return (
          <motion.path
            key={id}
            d={arcPath(origin, projection(song.lonLat))}
            stroke={song.accent}
            strokeWidth={2}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 3px ${song.accent})` }}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.95 } : {}}
            transition={{ duration: ARC_DURATION, delay: i * ARC_GAP, ease: "easeInOut" }}
          />
        );
      })}
    </g>
  );
}

const WorldMap = forwardRef(function WorldMap({ onSelect }, sectionRef) {
  const frameRef = useRef(null);
  const inView = useInView(frameRef, { once: true, amount: 0.35 });

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

      <div className="map__frame" ref={frameRef}>
        <ComposableMap
          width={MAP_W}
          height={MAP_H}
          projection="geoNaturalEarth1"
          projectionConfig={PROJECTION_CONFIG}
          role="group"
          aria-label="World map showing hip-hop spreading from the South Bronx to Paris, Tokyo, and Dakar"
        >
          {/* Country shapes — purely a backdrop, so they never swallow clicks */}
          <g pointerEvents="none">
            <Geographies geography={geoData}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography key={geo.rsmKey} geography={geo} style={GEO_STYLE} tabIndex={-1} />
                ))
              }
            </Geographies>
          </g>

          {/* Radiating connection arcs (Bronx → Paris → Tokyo → Dakar) */}
          <SpreadArcs inView={inView} />

          {/* Bronx origin marker (decorative). The Bronx and the New York song
              node are the same spot at world scale, so the origin renders as a
              pulsing ring around the New York node rather than a second dot. */}
          <Marker coordinates={ORIGIN.lonLat} aria-hidden="true">
            <motion.circle
              r={10}
              fill="none"
              stroke="var(--gold)"
              strokeWidth={1.2}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={inView ? { scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] } : {}}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              style={{ transformOrigin: "0px 0px" }}
            />
            <text className="map__node-label map__origin-label" y={-14} textAnchor="middle">
              Bronx · 1973
            </text>
          </Marker>

          {/* City nodes (clickable + keyboard-focusable) */}
          {SONGS.map((song) => {
            const delay = nodePulseDelay(song.id);
            return (
              <Marker
                key={song.id}
                coordinates={song.lonLat}
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
                  r={9}
                  fill={song.accent}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={inView ? { scale: [1, 1.8, 1], opacity: [0.45, 0, 0.45] } : {}}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay }}
                  style={{ transformOrigin: "0px 0px" }}
                />
                {/* Solid node */}
                <motion.circle
                  r={4.5}
                  fill={song.accent}
                  stroke="#0d0d0f"
                  strokeWidth={1}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay }}
                  style={{ transformOrigin: "0px 0px" }}
                />
                {/* Larger transparent hit area for easy clicking/touch */}
                <circle className="map__node-hit" r={14} />
                <text className="map__node-label" y={15} textAnchor="middle">
                  {song.city.split(",")[0]}
                </text>
              </Marker>
            );
          })}
        </ComposableMap>
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
