import { useState, useRef } from "react";
import "./NaviName.css";

// ── Na'vi name generation logic ──────────────────────────────
// Real Na'vi language uses patterns like:
// Prefix (clan) + root (from name sounds) + suffix (trait/role)

const PREFIXES = [
  "Te", "Mo", "Tsu", "Ro", "Ne", "Ey", "Ka", "Lo", "Sa", "Rì",
  "Ke", "Pa", "Nì", "Tì", "Aw", "Ay", "Fu", "Si", "Wä", "Zì"
];

const SUFFIXES_WARRIOR = [
  "tìran", "yìng", "steu", "kämon", "tìtxur", "rxon", "mune",
  "vul", "kxll", "pähem", "säpi", "tìng", "wopx", "stä'nì"
];

const CLAN_TITLES = {
  0: { clan: "Omaticaya",        title: "Taronyu",    meaning: "Hunter",         color: "#39ff14" },
  1: { clan: "Metkayina",        title: "Tskxekeng",  meaning: "Warrior",        color: "#00e5ff" },
  2: { clan: "Ash Clan",         title: "Tìkangkem",  meaning: "Fire Keeper",    color: "#ff6b35" },
  3: { clan: "Sky Riders",       title: "Makto",      meaning: "Rider",          color: "#a78bfa" },
  4: { clan: "Tulkun Guardians", title: "Tìfnu",      meaning: "Guardian",       color: "#22d3ee" },
  5: { clan: "Pandora Warriors", title: "Uniltìranyu", meaning: "Dream Walker",  color: "#c084fc" },
};

const TRAITS = [
  "Your spirit runs swift as the forest wind.",
  "The ocean sings through your veins.",
  "Fire cannot burn what fire has forged.",
  "The sky bows to those who dare to ride it.",
  "Ancient wisdom flows beneath your every word.",
  "Where you stand, Pandora herself takes root.",
  "Your eyes see what others dare not look for.",
  "Eywa has long known your name.",
  "You carry the memory of all who came before.",
  "The ikran circle above your path — they have chosen.",
];

const SPIRIT_ANIMALS = [
  { name: "Ikran",       emoji: "🦅", meaning: "Freedom & sight beyond sight" },
  { name: "Palulukan",   emoji: "🐆", meaning: "Raw power & fearlessness" },
  { name: "Tulkun",      emoji: "🐋", meaning: "Ancient wisdom & deep bond" },
  { name: "Yerik",       emoji: "🦌", meaning: "Grace & forest intuition" },
  { name: "Viperwolf",   emoji: "🐺", meaning: "Loyalty & pack strength" },
  { name: "Toruk",       emoji: "🔥", meaning: "Legendary destiny" },
];

function generateNaviName(input) {
  const clean = input.trim().toLowerCase().replace(/[^a-z]/g, "");
  if (!clean) return null;

  // Deterministic seed from name so same name = same result
  const seed = clean.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);

  const prefix    = PREFIXES[seed % PREFIXES.length];
  const suffix    = SUFFIXES_WARRIOR[(seed * 3 + 7) % SUFFIXES_WARRIOR.length];
  const clanIndex = seed % 6;
  const clan      = CLAN_TITLES[clanIndex];
  const trait     = TRAITS[(seed * 7 + 3) % TRAITS.length];
  const spirit    = SPIRIT_ANIMALS[(seed * 11 + 5) % SPIRIT_ANIMALS.length];

  // Build Na'vi name from actual input sounds
  const mid = clean.length > 4
    ? clean.slice(0, 2) + "'" + clean.slice(-2)
    : clean.slice(0, 3);

  const naviName = prefix + mid + suffix;
  // Capitalise first letter
  const formatted = naviName.charAt(0).toUpperCase() + naviName.slice(1);

  return { naviName: formatted, clan, trait, spirit };
}

// Animated letter reveal component
function RevealText({ text, className, delay = 0 }) {
  return (
    <span className={className} style={{ "--delay": `${delay}ms` }}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="navi__reveal-char"
          style={{ animationDelay: `${delay + i * 40}ms` }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

export default function NaviName() {
  const [input,     setInput]     = useState("");
  const [result,    setResult]    = useState(null);
  const [revealed,  setRevealed]  = useState(false);
  const [summoning, setSummoning] = useState(false);
  const [phase,     setPhase]     = useState(0); // 0=idle 1=summoning 2=revealed
  const inputRef = useRef(null);

  const handleGenerate = () => {
    if (!input.trim() || summoning) return;
    const generated = generateNaviName(input);
    if (!generated) return;

    setPhase(1);
    setSummoning(true);
    setRevealed(false);
    setResult(null);

    setTimeout(() => {
      setResult(generated);
      setPhase(2);
      setSummoning(false);
      setTimeout(() => setRevealed(true), 100);
    }, 2200);
  };

  const handleReset = () => {
    setPhase(0);
    setResult(null);
    setRevealed(false);
    setInput("");
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div className="navi" data-phase={phase}>

      {/* ── Atmospheric background ── */}
      <div className="navi__bg" aria-hidden="true">
        <div className="navi__bg-deep" />
        <div className="navi__bg-mist navi__bg-mist--1" />
        <div className="navi__bg-mist navi__bg-mist--2" />
        <div className="navi__bg-mist navi__bg-mist--3" />
        <div className="navi__bg-grid" />
        <div className="navi__bg-vignette" />
        {result && (
          <div className="navi__bg-clan-bloom"
            style={{ "--bloom": result.clan.color }} />
        )}
      </div>

      {/* Floating spores */}
      <div className="navi__spores" aria-hidden="true">
        {Array.from({ length: 35 }).map((_, i) => (
          <span key={i} className="navi__spore" style={{
            left: `${(i * 2.9 + 1) % 100}%`,
            animationDelay: `${(i * 0.28) % 10}s`,
            animationDuration: `${7 + (i % 6)}s`,
            width:  `${1.5 + (i % 3)}px`,
            height: `${1.5 + (i % 3)}px`,
          }} />
        ))}
      </div>

      <div className="navi__container">

        {/* ── Header ── */}
        <div className="navi__header">
          <p className="navi__eyebrow">✦ Sacred Naming Ritual of Pandora ✦</p>
          <h1 className="navi__title">
            <span className="navi__title-discover">Discover Your</span>
            <span className="navi__title-main">Na'vi Name</span>
          </h1>
          <div className="navi__title-ornament">
            <span /><span className="navi__gem" /><span className="navi__gem navi__gem--sm" /><span className="navi__gem" /><span />
          </div>
          <p className="navi__subtitle">
            Every soul that enters Pandora is reborn with a Na'vi name.<br />
            Speak your name to Eywa — and she will reveal who you truly are.
          </p>
        </div>

        {/* ── Input section ── */}
        {phase < 2 && (
          <div className={`navi__input-section ${phase === 1 ? "navi__input-section--hidden" : ""}`}>
            <div className="navi__input-wrap">
              <label className="navi__label">ENTER YOUR HUMAN NAME</label>
              <div className="navi__input-row">
                <div className="navi__input-box">
                  <span className="navi__input-leaf">🌿</span>
                  <input
                    ref={inputRef}
                    type="text"
                    className="navi__input"
                    placeholder="e.g. Kasun, Nimasha…"
                    value={input}
                    maxLength={30}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                    autoComplete="off"
                  />
                </div>
                <button
                  className="navi__btn"
                  onClick={handleGenerate}
                  disabled={!input.trim()}
                >
                  Reveal Name
                  <span className="navi__btn-icon">→</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Summoning animation ── */}
        {phase === 1 && (
          <div className="navi__summoning">
            <div className="navi__summoning-orb">
              <div className="navi__summoning-ring navi__summoning-ring--1" />
              <div className="navi__summoning-ring navi__summoning-ring--2" />
              <div className="navi__summoning-ring navi__summoning-ring--3" />
              <div className="navi__summoning-core" />
            </div>
            <div className="navi__summoning-texts">
              <p className="navi__summoning-line" style={{ animationDelay: "0s" }}>
                Connecting to Eywa…
              </p>
              <p className="navi__summoning-line" style={{ animationDelay: "0.7s" }}>
                Reading your spirit…
              </p>
              <p className="navi__summoning-line" style={{ animationDelay: "1.4s" }}>
                Your name is being woven…
              </p>
            </div>
          </div>
        )}

        {/* ── Result card ── */}
        {result && (
          <div className={`navi__result ${revealed ? "navi__result--revealed" : ""}`}
            style={{ "--c": result.clan.color }}>

            {/* Animated border */}
            <div className="navi__result-border" />

            {/* Corner accents */}
            <span className="navi__corner navi__corner--tl" />
            <span className="navi__corner navi__corner--tr" />
            <span className="navi__corner navi__corner--bl" />
            <span className="navi__corner navi__corner--br" />

            {/* Eywa seal */}
            <div className="navi__seal">
              <div className="navi__seal-ring navi__seal-ring--1" />
              <div className="navi__seal-ring navi__seal-ring--2" />
              <div className="navi__seal-eye">
                <div className="navi__seal-eye-inner" />
              </div>
            </div>

            {/* Eywa speaks */}
            <p className="navi__result-eywa">Eywa has spoken</p>

            {/* The Na'vi name — big reveal */}
            <div className="navi__name-reveal">
              <p className="navi__name-label">Your Na'vi Name is</p>
              <h2 className="navi__name">
                {revealed && <RevealText text={result.naviName} delay={200} />}
              </h2>
              <p className="navi__name-pronounce">
                /{result.naviName.toLowerCase().replace(/'/g, "ʔ")}/
              </p>
            </div>

            {/* Divider */}
            <div className="navi__result-divider">
              <span /><span className="navi__gem" style={{ background: result.clan.color, boxShadow: `0 0 10px ${result.clan.color}` }} /><span />
            </div>

            {/* Clan assignment */}
            <div className="navi__clan-block">
              <p className="navi__clan-label">Clan Assignment</p>
              <p className="navi__clan-name">{result.clan.clan}</p>
              <div className="navi__clan-title-row">
                <span className="navi__clan-title">{result.clan.title}</span>
                <span className="navi__clan-meaning">· {result.clan.meaning}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="navi__result-divider">
              <span /><span className="navi__gem navi__gem--sm" style={{ background: result.clan.color }} /><span />
            </div>

            {/* Spirit animal */}
            <div className="navi__spirit-block">
              <p className="navi__spirit-label">Your Spirit Animal</p>
              <div className="navi__spirit-row">
                <span className="navi__spirit-emoji">{result.spirit.emoji}</span>
                <div>
                  <p className="navi__spirit-name">{result.spirit.name}</p>
                  <p className="navi__spirit-meaning">{result.spirit.meaning}</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="navi__result-divider">
              <span /><span className="navi__gem navi__gem--sm" style={{ background: result.clan.color }} /><span />
            </div>

            {/* Trait prophecy */}
            <div className="navi__trait-block">
              <p className="navi__trait-label">✦ Eywa's Prophecy ✦</p>
              <p className="navi__trait">{result.trait}</p>
            </div>

            {/* Try again */}
            <button className="navi__reset" onClick={handleReset}>
              ↺ Try Another Name
            </button>

          </div>
        )}

        {/* Idle quote */}
        {phase === 0 && (
          <div className="navi__idle">
            <div className="navi__idle-dots">
              <span /><span /><span />
            </div>
            <p className="navi__idle-quote">"I see you, {input || "stranger"}."</p>
            <p className="navi__idle-sub">— Eywa, Spirit of Pandora —</p>
          </div>
        )}

      </div>
    </div>
  );
}
