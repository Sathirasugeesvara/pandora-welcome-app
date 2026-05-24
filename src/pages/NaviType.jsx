import { useState, useEffect, useRef } from "react";
import "./GameBase.css";

const WORDS = [
  "Eywa","Omaticaya","Ikran","Toruk","Tsaheylu","Makto","Taronyu",
  "Neytiri","Tsu'tey","Pandora","Metkayina","Tulkun","Palulukan",
  "Navi","Skxawng","Kehe","Sran","Tìftia","Aysänumvìri","Oeyä",
  "Tìfkeytok","Fpìl","Tskxe","Vul","Fkxen","Syaksyuk","Yerik",
  "Tìtxur","Mawey","Kxangangang",
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function NaviType() {
  const [phase, setPhase]     = useState("idle"); // idle | playing | done
  const [words, setWords]     = useState([]);
  const [index, setIndex]     = useState(0);
  const [input, setInput]     = useState("");
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong]     = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [flash, setFlash]     = useState(""); // "ok" | "err"
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  const start = () => {
    setWords(shuffle(WORDS));
    setIndex(0); setInput(""); setCorrect(0); setWrong(0); setTimeLeft(60);
    setPhase("playing");
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  useEffect(() => {
    if (phase !== "playing") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(timerRef.current); setPhase("done"); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]);

  const handleInput = (e) => {
    const val = e.target.value;
    setInput(val);
    const target = words[index % words.length];
    if (val === target) {
      setCorrect((c) => c + 1);
      setFlash("ok");
      setIndex((i) => i + 1);
      setInput("");
      setTimeout(() => setFlash(""), 300);
    } else if (val.length >= target.length + 2) {
      setWrong((w) => w + 1);
      setFlash("err");
      setInput("");
      setTimeout(() => setFlash(""), 300);
    }
  };

  const wpm = Math.round((correct / (60 - timeLeft || 1)) * 60);
  const currentWord = words[index % words.length] || "";

  return (
    <div className="gb">
      <div className="gb__bg"><div className="gb__bg-orb gb__bg-orb--1" /><div className="gb__bg-orb gb__bg-orb--2" /><div className="gb__bg-grid" /></div>
      <div className="gb__container">
        <div className="gb__header">
          <p className="gb__eyebrow">🔡 Speed Challenge</p>
          <h2 className="gb__title">Na'vi Word Typer</h2>
          <p className="gb__subtitle">Type each Na'vi word correctly as fast as you can · 60 seconds</p>
        </div>

        {phase === "idle" && (
          <div className="gb__idle">
            <div className="gb__idle-preview">
              {WORDS.slice(0,5).map((w,i) => <span key={i} className="gb__preview-word">{w}</span>)}
              <span className="gb__preview-word" style={{opacity:0.4}}>…</span>
            </div>
            <p className="gb__idle-hint">Na'vi words appear one by one — type them correctly as fast as possible!</p>
            <button className="gb__btn" onClick={start}>Start Game →</button>
          </div>
        )}

        {phase === "playing" && (
          <div className="gb__play">
            {/* Stats row */}
            <div className="gb__stats">
              <div className="gb__stat"><span className="gb__stat-val" style={{color:"#39ff14"}}>{correct}</span><span className="gb__stat-key">Correct</span></div>
              <div className="gb__stat"><span className="gb__stat-val" style={{color:"#ff6b35"}}>{wrong}</span><span className="gb__stat-key">Wrong</span></div>
              <div className="gb__stat gb__stat--timer" style={{color: timeLeft <= 10 ? "#ff6b35" : "#00e5ff"}}>
                <span className="gb__stat-val">{timeLeft}</span><span className="gb__stat-key">Secs</span>
              </div>
            </div>

            {/* Timer bar */}
            <div className="gb__timer-bar-wrap">
              <div className="gb__timer-bar" style={{width:`${(timeLeft/60)*100}%`, background: timeLeft <= 10 ? "#ff6b35" : "#00e5ff"}} />
            </div>

            {/* Word display */}
            <div className={`gb__word-display ${flash === "ok" ? "gb__word-display--ok" : flash === "err" ? "gb__word-display--err" : ""}`}>
              <p className="gb__word">{currentWord}</p>
              <p className="gb__word-count">Word #{index + 1}</p>
            </div>

            {/* Input */}
            <input
              ref={inputRef}
              className={`gb__input ${flash === "err" ? "gb__input--err" : flash === "ok" ? "gb__input--ok" : ""}`}
              value={input}
              onChange={handleInput}
              placeholder="Type the word…"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </div>
        )}

        {phase === "done" && (
          <div className="gb__result">
            <div className="gb__result-seal">🔡</div>
            <h3 className="gb__result-title">Time's Up!</h3>
            <div className="gb__result-scores">
              <div className="gb__result-score">
                <span className="gb__result-num" style={{color:"#a78bfa"}}>{wpm}</span>
                <span className="gb__result-label">WPM</span>
              </div>
              <div className="gb__result-score">
                <span className="gb__result-num" style={{color:"#39ff14"}}>{correct}</span>
                <span className="gb__result-label">Correct</span>
              </div>
              <div className="gb__result-score">
                <span className="gb__result-num" style={{color:"#ff6b35"}}>{wrong}</span>
                <span className="gb__result-label">Wrong</span>
              </div>
            </div>
            <p className="gb__result-msg">
              {wpm >= 30 ? "⚡ Incredible speed! Eywa is proud." :
               wpm >= 15 ? "👍 Good effort, warrior! Keep training." :
               "🌱 The forest accepts all — try again!"}
            </p>
            <button className="gb__btn" onClick={start}>Play Again</button>
          </div>
        )}
      </div>
    </div>
  );
}
