import { useCallback, useEffect, useRef, useState } from "react";
import * as Tone from "tone";

// -----------------------------------------------------------------------------
//  Make a Beat — a 6-instrument × 16-step sequencer (one bar of sixteenths).
// -----------------------------------------------------------------------------

const STEPS = 16;

const INSTRUMENTS = [
  { id: "kick", label: "Kick" },
  { id: "snare", label: "Snare" },
  { id: "hat", label: "Hi-hat" },
  { id: "clap", label: "Clap" },
  { id: "bass", label: "Bass" },
  { id: "stab", label: "Stab" },
];

// Each voice returns a node plus a trigger(time) function.
const VOICES = {
  kick: () => {
    const synth = new Tone.MembraneSynth().toDestination();
    synth.volume.value = -4;
    return { node: synth, trigger: (t) => synth.triggerAttackRelease("C1", "8n", t) };
  },
  snare: () => {
    const synth = new Tone.NoiseSynth({
      noise: { type: "pink" },
      envelope: { attack: 0.001, decay: 0.12, sustain: 0 },
    }).toDestination();
    synth.volume.value = -8;
    return { node: synth, trigger: (t) => synth.triggerAttackRelease("16n", t) };
  },
  hat: () => {
    const synth = new Tone.MetalSynth({
      envelope: { attack: 0.001, decay: 0.05, release: 0.01 },
      harmonicity: 5.1,
      modulationIndex: 32,
      resonance: 4000,
      octaves: 1.5,
    }).toDestination();
    synth.volume.value = -22;
    return { node: synth, trigger: (t) => synth.triggerAttackRelease("C6", "32n", t) };
  },
  clap: () => {
    const synth = new Tone.NoiseSynth({
      noise: { type: "white" },
      envelope: { attack: 0.001, decay: 0.3, sustain: 0 },
    }).toDestination();
    synth.volume.value = -12;
    return { node: synth, trigger: (t) => synth.triggerAttackRelease("8n", t) };
  },
  bass: () => {
    const synth = new Tone.MonoSynth({
      oscillator: { type: "square" },
      filter: { frequency: 300 },
      envelope: { attack: 0.005, decay: 0.25, sustain: 0.2, release: 0.2 },
    }).toDestination();
    synth.volume.value = -10;
    return { node: synth, trigger: (t) => synth.triggerAttackRelease("E1", "8n", t) };
  },
  stab: () => {
    const synth = new Tone.FMSynth({
      harmonicity: 3,
      modulationIndex: 8,
      envelope: { attack: 0.005, decay: 0.2, sustain: 0, release: 0.15 },
    }).toDestination();
    synth.volume.value = -12;
    return { node: synth, trigger: (t) => synth.triggerAttackRelease("E4", "16n", t) };
  },
};

const emptyGrid = () => INSTRUMENTS.map(() => Array(STEPS).fill(false));

// Preset patterns, row order: kick, snare, hat, clap, bass, stab.
const PRESETS = {
  "Boom Bap": [
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  "Four-on-the-Floor": [
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  ],
  Syncopated: [
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
  ],
};

const presetGrid = (name) => PRESETS[name].map((row) => row.map(Boolean));

export default function BeatMaker({ audioReady, owner }) {
  const [grid, setGrid] = useState(emptyGrid);
  const [playing, setPlaying] = useState(false);
  const [bpm, setBpm] = useState(90);
  const [currentStep, setCurrentStep] = useState(-1);

  // The sequence callback reads the grid from a ref so toggles apply live
  // without rebuilding the sequence.
  const gridRef = useRef(grid);
  gridRef.current = grid;

  const nodesRef = useRef(null); // { voices: {id: {node, trigger}}, seq }

  const stopAll = useCallback(() => {
    if (nodesRef.current) {
      nodesRef.current.seq.dispose();
      Object.values(nodesRef.current.voices).forEach((v) => v.node.dispose());
      nodesRef.current = null;
    }
    const t = Tone.getTransport();
    t.stop();
    t.cancel();
    setPlaying(false);
    setCurrentStep(-1);
    owner.release("beatmaker");
  }, [owner]);

  const stopRef = useRef(stopAll);
  stopRef.current = stopAll;
  useEffect(() => () => stopRef.current(), []);

  const play = async () => {
    if (!audioReady || playing) return;
    await Tone.start();
    owner.claim("beatmaker", () => stopRef.current());
    const t = Tone.getTransport();
    t.bpm.value = bpm;
    const voices = Object.fromEntries(INSTRUMENTS.map(({ id }) => [id, VOICES[id]()]));
    const seq = new Tone.Sequence(
      (time, step) => {
        INSTRUMENTS.forEach(({ id }, row) => {
          if (gridRef.current[row][step]) voices[id].trigger(time);
        });
        Tone.getDraw().schedule(() => setCurrentStep(step), time);
      },
      [...Array(STEPS).keys()],
      "16n"
    ).start(0);
    nodesRef.current = { voices, seq };
    t.start();
    setPlaying(true);
  };

  const toggleCell = (row, step) => {
    setGrid((g) => g.map((r, ri) => (ri === row ? r.map((on, si) => (si === step ? !on : on)) : r)));
  };

  const changeBpm = (value) => {
    setBpm(value);
    if (playing) Tone.getTransport().bpm.value = value;
  };

  return (
    <div className="beatmaker demo" style={{ "--accent": "var(--gold)" }} aria-disabled={!audioReady}>
      <span className="demo__kicker">Rhythm &amp; Meter → Your turn</span>
      <h3 className="demo__title">Make a beat</h3>
      <p className="demo__caption">
        This is rhythm and meter in your own hands: 16 sixteenth-notes make one 4/4 bar. Keep
        your hits on the numbered beats for a straight pattern, or push them between the beats
        — that gap is syncopation, the same push you heard in the demo above.
      </p>

      <div className="beatmaker__controls">
        {!playing ? (
          <button className="chip chip--active" disabled={!audioReady} onClick={play}>
            ▶ Play
          </button>
        ) : (
          <button className="chip chip--stop" onClick={() => stopAll()}>
            ■ Stop
          </button>
        )}
        <label className="beatmaker__bpm">
          <span>{bpm} BPM</span>
          <input
            type="range"
            min={70}
            max={140}
            value={bpm}
            disabled={!audioReady}
            onChange={(e) => changeBpm(Number(e.target.value))}
            aria-label="Tempo in beats per minute"
          />
        </label>
        <button
          className="chip"
          disabled={!audioReady}
          onClick={() => setGrid(emptyGrid())}
        >
          Clear
        </button>
        {Object.keys(PRESETS).map((name) => (
          <button
            key={name}
            className="chip"
            disabled={!audioReady}
            onClick={() => setGrid(presetGrid(name))}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="beatmaker__grid" role="grid" aria-label="Beat sequencer: 6 instruments by 16 steps">
        <div className="beatmaker__row beatmaker__row--head" role="row">
          <span className="beatmaker__label" aria-hidden="true" />
          {Array.from({ length: STEPS }, (_, s) => (
            <span key={s} className="beatmaker__count" aria-hidden="true">
              {s % 4 === 0 ? s / 4 + 1 : "·"}
            </span>
          ))}
        </div>
        {INSTRUMENTS.map(({ id, label }, row) => (
          <div key={id} className="beatmaker__row" role="row">
            <span className="beatmaker__label">{label}</span>
            {grid[row].map((on, step) => (
              <button
                key={step}
                role="gridcell"
                className={[
                  "beatmaker__cell",
                  on ? "beatmaker__cell--on" : "",
                  step === currentStep ? "beatmaker__cell--now" : "",
                  step % 4 === 0 ? "beatmaker__cell--beat" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-pressed={on}
                aria-label={`${label}, step ${step + 1}`}
                disabled={!audioReady}
                onClick={() => toggleCell(row, step)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
