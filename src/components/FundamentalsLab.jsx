import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as Tone from "tone";
import { SONGS, RHYTHM_METER } from "../data/exhibit.js";

const byId = (id) => SONGS.find((s) => s.id === id);

// -----------------------------------------------------------------------------
//  Shared patterns / phrases (kept tiny so each idea is clear, not musical
//  showing-off). All grids are 4/4.
// -----------------------------------------------------------------------------

// Sampling layers (Public Enemy) — three loops that stack into a dense collage.
const SAMPLE_LAYERS = {
  drum: () => {
    const kick = new Tone.MembraneSynth().toDestination();
    kick.volume.value = -6;
    const hat = new Tone.NoiseSynth({
      noise: { type: "white" },
      envelope: { attack: 0.001, decay: 0.04, sustain: 0 },
    }).toDestination();
    hat.volume.value = -22;
    const kickSeq = new Tone.Sequence(
      (time, hit) => hit && kick.triggerAttackRelease("C1", "8n", time),
      [1, 0, 0, 0, 1, 0, 1, 0],
      "8n"
    ).start(0);
    const hatSeq = new Tone.Sequence(
      (time, hit) => hit && hat.triggerAttackRelease("16n", time),
      [0, 1, 0, 1, 0, 1, 0, 1],
      "8n"
    ).start(0);
    return [kick, hat, kickSeq, hatSeq];
  },
  bass: () => {
    const bass = new Tone.FMSynth({ harmonicity: 1, modulationIndex: 3 }).toDestination();
    bass.volume.value = -10;
    const seq = new Tone.Sequence(
      (time, note) => note && bass.triggerAttackRelease(note, "8n", time),
      ["E1", null, "E1", "G1", null, "A1", null, "G1"],
      "8n"
    ).start(0);
    return [bass, seq];
  },
  vocal: () => {
    const stab = new Tone.Synth({
      oscillator: { type: "sawtooth" },
      envelope: { attack: 0.01, decay: 0.18, sustain: 0, release: 0.1 },
    }).toDestination();
    stab.volume.value = -16;
    const seq = new Tone.Sequence(
      (time, note) => note && stab.triggerAttackRelease(note, "16n", time),
      [null, null, "E4", null, null, "E4", "G4", null],
      "8n"
    ).start(0);
    return [stab, seq];
  },
};

// Syncopation (Zeebra) — two 8-step grids.
const SYNC_PATTERNS = {
  straight: {
    kick: [1, 0, 1, 0, 1, 0, 1, 0], // a hit on every beat
    snare: [0, 0, 0, 0, 1, 0, 0, 0],
  },
  syncopated: {
    kick: [1, 0, 0, 1, 0, 0, 1, 0], // pushed onto the offbeats
    snare: [0, 0, 1, 0, 1, 0, 0, 1],
  },
};

// Timbre (MC Solaar) — the same five-note phrase, [note, secondsFromNow].
const TIMBRE_PHRASE = [
  ["C4", 0],
  ["E4", 0.26],
  ["G4", 0.52],
  ["A4", 0.78],
  ["G4", 1.04],
];

// Call-and-response (Positive Black Soul).
const CALL_PHRASE = [
  ["E4", 0],
  ["G4", 0.24],
  ["A4", 0.48],
];
const RESPONSE_PHRASE = [
  ["A4", 0],
  ["G4", 0.22],
  ["E4", 0.44],
  ["D4", 0.66],
];
const RESPONSE_OFFSET = 0.95; // response starts after the call finishes

// -----------------------------------------------------------------------------
//  Presentational card wrapper
// -----------------------------------------------------------------------------
function DemoCard({ accent, kicker, title, caption, audioReady, children }) {
  return (
    <div className="demo" style={{ "--accent": accent }} aria-disabled={!audioReady}>
      <span className="demo__kicker">{kicker}</span>
      <h3 className="demo__title">{title}</h3>
      <p className="demo__caption">{caption}</p>
      <div className="demo__controls">{children}</div>
    </div>
  );
}

// =============================================================================
//  Sampling — incremental layering
// =============================================================================
function SamplingDemo({ audioReady, owner }) {
  const song = byId("public-enemy");
  const [layers, setLayers] = useState({ drum: false, bass: false, vocal: false });
  const nodesRef = useRef({});
  const countRef = useRef(0);

  const disposeLayer = (name) => {
    (nodesRef.current[name] || []).forEach((n) => n.dispose());
    delete nodesRef.current[name];
  };

  const stopAll = useCallback(() => {
    Object.keys(nodesRef.current).forEach(disposeLayer);
    nodesRef.current = {};
    countRef.current = 0;
    const t = Tone.getTransport();
    t.stop();
    t.cancel();
    setLayers({ drum: false, bass: false, vocal: false });
    owner.release("sampling");
  }, [owner]);

  const stopRef = useRef(stopAll);
  stopRef.current = stopAll;
  useEffect(() => () => stopRef.current(), []);

  const toggle = (name) => {
    if (!audioReady) return;
    const turningOn = !layers[name];
    if (turningOn) {
      if (countRef.current === 0) {
        owner.claim("sampling", () => stopRef.current());
        const t = Tone.getTransport();
        t.bpm.value = 95;
        t.start();
      }
      nodesRef.current[name] = SAMPLE_LAYERS[name]();
      countRef.current += 1;
    } else {
      disposeLayer(name);
      countRef.current = Math.max(0, countRef.current - 1);
      if (countRef.current === 0) {
        const t = Tone.getTransport();
        t.stop();
        t.cancel();
        owner.release("sampling");
      }
    }
    setLayers((p) => ({ ...p, [name]: turningOn }));
  };

  return (
    <DemoCard
      accent={song.accent}
      kicker={`Sampling → ${song.artist}`}
      title="Stack the samples"
      caption="The Bomb Squad layered sample on sample until the track felt overwhelming. Toggle the loops to build that density yourself."
      audioReady={audioReady}
    >
      {["drum", "bass", "vocal"].map((name) => (
        <button
          key={name}
          className="chip"
          aria-pressed={layers[name]}
          disabled={!audioReady}
          onClick={() => toggle(name)}
        >
          {name === "drum" ? "Drums" : name === "bass" ? "Bassline" : "Vocal stab"}
        </button>
      ))}
      <button className="chip chip--stop" disabled={!audioReady} onClick={() => stopAll()}>
        ■ Stop
      </button>
    </DemoCard>
  );
}

// =============================================================================
//  Timbre — same phrase, four voices (no Transport; one-shot)
// =============================================================================
function TimbreDemo({ audioReady }) {
  const song = byId("mc-solaar");
  const ref = useRef(null); // { gain, synths }

  const ensure = () => {
    if (!ref.current) {
      const gain = new Tone.Gain(1).toDestination();
      const synths = {
        Sine: new Tone.Synth({ oscillator: { type: "sine" } }).connect(gain),
        Sawtooth: new Tone.Synth({ oscillator: { type: "sawtooth" } }).connect(gain),
        Square: new Tone.Synth({ oscillator: { type: "square" } }).connect(gain),
        FM: new Tone.FMSynth().connect(gain),
      };
      ref.current = { gain, synths };
    }
    return ref.current;
  };

  useEffect(
    () => () => {
      if (ref.current) {
        Object.values(ref.current.synths).forEach((s) => s.dispose());
        ref.current.gain.dispose();
      }
    },
    []
  );

  const play = (kind) => {
    if (!audioReady) return;
    const { gain, synths } = ensure();
    gain.gain.cancelScheduledValues(Tone.now());
    gain.gain.value = 1;
    const now = Tone.now() + 0.05;
    TIMBRE_PHRASE.forEach(([note, t]) => synths[kind].triggerAttackRelease(note, "8n", now + t));
  };

  const stop = () => {
    if (ref.current) ref.current.gain.gain.value = 0; // mute any in-flight phrase
  };

  return (
    <DemoCard
      accent={song.accent}
      kicker={`Timbre → ${song.artist}`}
      title="Same notes, new color"
      caption="MC Solaar's voice stays cool and round over a clicking beat. Play the identical five-note phrase through four tone colors."
      audioReady={audioReady}
    >
      {["Sine", "Sawtooth", "Square", "FM"].map((kind) => (
        <button key={kind} className="chip" disabled={!audioReady} onClick={() => play(kind)}>
          {kind}
        </button>
      ))}
      <button className="chip chip--stop" disabled={!audioReady} onClick={stop}>
        ■ Stop
      </button>
    </DemoCard>
  );
}

// =============================================================================
//  Syncopation — straight vs syncopated loop
// =============================================================================
function SyncopationDemo({ audioReady, owner }) {
  const song = byId("zeebra");
  const [playing, setPlaying] = useState(false);
  const [mode, setMode] = useState("straight");
  const modeRef = useRef("straight");
  modeRef.current = mode;
  const nodesRef = useRef([]);

  const stopAll = useCallback(() => {
    nodesRef.current.forEach((n) => n.dispose());
    nodesRef.current = [];
    const t = Tone.getTransport();
    t.stop();
    t.cancel();
    setPlaying(false);
    owner.release("sync");
  }, [owner]);

  const stopRef = useRef(stopAll);
  stopRef.current = stopAll;
  useEffect(() => () => stopRef.current(), []);

  const play = () => {
    if (!audioReady || playing) return;
    owner.claim("sync", () => stopRef.current());
    const t = Tone.getTransport();
    t.bpm.value = 90;
    const kick = new Tone.MembraneSynth().toDestination();
    const snare = new Tone.NoiseSynth({
      noise: { type: "pink" },
      envelope: { attack: 0.001, decay: 0.12, sustain: 0 },
    }).toDestination();
    snare.volume.value = -8;
    const seq = new Tone.Sequence(
      (time, step) => {
        const p = SYNC_PATTERNS[modeRef.current];
        if (p.kick[step]) kick.triggerAttackRelease("C1", "8n", time);
        if (p.snare[step]) snare.triggerAttackRelease("16n", time);
      },
      [0, 1, 2, 3, 4, 5, 6, 7],
      "8n"
    ).start(0);
    nodesRef.current = [kick, snare, seq];
    t.start();
    setPlaying(true);
  };

  return (
    <DemoCard
      accent={song.accent}
      kicker={`Syncopation → ${song.artist}`}
      title="Land off the beat"
      caption="Zeebra's flow leans on the offbeats. Start the loop, then flip between a straight pulse and a syncopated one to feel the push."
      audioReady={audioReady}
    >
      {!playing ? (
        <button className="chip chip--active" disabled={!audioReady} onClick={play}>
          ▶ Play loop
        </button>
      ) : (
        <button className="chip chip--stop" onClick={() => stopAll()}>
          ■ Stop
        </button>
      )}
      {["straight", "syncopated"].map((m) => (
        <button
          key={m}
          className="chip"
          aria-pressed={mode === m}
          disabled={!audioReady}
          onClick={() => setMode(m)}
        >
          {m === "straight" ? "Straight" : "Syncopated"}
        </button>
      ))}
    </DemoCard>
  );
}

// =============================================================================
//  Call-and-response — one-shot dialogue
// =============================================================================
function CallResponseDemo({ audioReady }) {
  const song = byId("positive-black-soul");
  const ref = useRef(null); // { gain, call, response }

  const ensure = () => {
    if (!ref.current) {
      const gain = new Tone.Gain(1).toDestination();
      const call = new Tone.Synth({
        oscillator: { type: "triangle" },
        envelope: { attack: 0.01, decay: 0.2, sustain: 0.2, release: 0.2 },
      }).connect(gain);
      const response = new Tone.FMSynth({ harmonicity: 2, modulationIndex: 6 }).connect(gain);
      ref.current = { gain, call, response };
    }
    return ref.current;
  };

  useEffect(
    () => () => {
      if (ref.current) {
        ref.current.call.dispose();
        ref.current.response.dispose();
        ref.current.gain.dispose();
      }
    },
    []
  );

  const play = () => {
    if (!audioReady) return;
    const { gain, call, response } = ensure();
    gain.gain.cancelScheduledValues(Tone.now());
    gain.gain.value = 1;
    const now = Tone.now() + 0.05;
    CALL_PHRASE.forEach(([note, t]) => call.triggerAttackRelease(note, "8n", now + t));
    RESPONSE_PHRASE.forEach(([note, t]) =>
      response.triggerAttackRelease(note, "8n", now + RESPONSE_OFFSET + t)
    );
  };

  const stop = () => {
    if (ref.current) ref.current.gain.gain.value = 0;
  };

  return (
    <DemoCard
      accent={song.accent}
      kicker={`Call-and-response → ${song.artist}`}
      title="One voice answers another"
      caption="Positive Black Soul trade phrases like griots. Press play: one timbre calls, a contrasting one answers."
      audioReady={audioReady}
    >
      <button className="chip chip--active" disabled={!audioReady} onClick={play}>
        ▶ Play call &amp; response
      </button>
      <button className="chip chip--stop" disabled={!audioReady} onClick={stop}>
        ■ Stop
      </button>
    </DemoCard>
  );
}

// =============================================================================
//  Rhythm & meter — the foundation, a 4/4 metronome
// =============================================================================
function RhythmDemo({ audioReady, owner }) {
  const [playing, setPlaying] = useState(false);
  const nodesRef = useRef([]);

  const stopAll = useCallback(() => {
    nodesRef.current.forEach((n) => n.dispose());
    nodesRef.current = [];
    const t = Tone.getTransport();
    t.stop();
    t.cancel();
    setPlaying(false);
    owner.release("rhythm");
  }, [owner]);

  const stopRef = useRef(stopAll);
  stopRef.current = stopAll;
  useEffect(() => () => stopRef.current(), []);

  const play = () => {
    if (!audioReady || playing) return;
    owner.claim("rhythm", () => stopRef.current());
    const t = Tone.getTransport();
    t.bpm.value = 100;
    const click = new Tone.MembraneSynth({
      pitchDecay: 0.008,
      octaves: 2,
      envelope: { attack: 0.001, decay: 0.14, sustain: 0 },
    }).toDestination();
    const seq = new Tone.Sequence(
      (time, beat) => click.triggerAttackRelease(beat === 0 ? "C3" : "C2", "16n", time),
      [0, 1, 2, 3],
      "4n"
    ).start(0);
    nodesRef.current = [click, seq];
    t.start();
    setPlaying(true);
  };

  return (
    <DemoCard
      accent="var(--gold)"
      kicker={RHYTHM_METER.fundamental}
      title="Feel the 4/4 grid"
      caption={RHYTHM_METER.caption}
      audioReady={audioReady}
    >
      {!playing ? (
        <button className="chip chip--active" disabled={!audioReady} onClick={play}>
          ▶ Metronome
        </button>
      ) : (
        <button className="chip chip--stop" onClick={() => stopAll()}>
          ■ Stop
        </button>
      )}
    </DemoCard>
  );
}

// =============================================================================
//  Lab shell — audio gate + exclusive Transport ownership
// =============================================================================
export default function FundamentalsLab() {
  const [audioReady, setAudioReady] = useState(false);

  // Only one Transport-driven demo plays at a time. Claiming stops the previous
  // owner; releasing clears ownership if we still hold it.
  const ownerRef = useRef(null);
  const owner = useMemo(
    () => ({
      claim(id, stop) {
        if (ownerRef.current && ownerRef.current.id !== id) ownerRef.current.stop();
        ownerRef.current = { id, stop };
      },
      release(id) {
        if (ownerRef.current && ownerRef.current.id === id) ownerRef.current = null;
      },
    }),
    []
  );

  const enable = async () => {
    await Tone.start();
    setAudioReady(true);
  };

  return (
    <section className="section lab" id="lab">
      <p className="section__eyebrow">The Fundamentals Lab</p>
      <h2 className="section__title">Hear how it works</h2>
      <p className="section__lead">
        Real synthesized audio, no recordings. Each demo isolates one building block of
        hip-hop and ties it to a song from the map.
      </p>

      <div className="lab__gate">
        {audioReady ? (
          <p>
            🔊 Audio is on — try any demo below. (Only one looping demo plays at a time.)
          </p>
        ) : (
          <>
            <button className="btn btn--primary" onClick={enable}>
              Enable audio
            </button>
            <p>Audio starts only after you click — then the demos come alive.</p>
          </>
        )}
      </div>

      <div className="lab__grid">
        <RhythmDemo audioReady={audioReady} owner={owner} />
        <SamplingDemo audioReady={audioReady} owner={owner} />
        <TimbreDemo audioReady={audioReady} />
        <SyncopationDemo audioReady={audioReady} owner={owner} />
        <CallResponseDemo audioReady={audioReady} />
      </div>
    </section>
  );
}
