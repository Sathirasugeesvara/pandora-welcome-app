import { useState, useEffect, useRef } from "react";
import "./GameBase.css";

function genQ(score) {
  const level = Math.floor(score / 5);
  const ops = level < 2 ? ["+","-"] : level < 4 ? ["+","-","×","÷"] : ["+","-","×","÷","²","√"];
  const op = ops[Math.floor(Math.random() * ops.length)];
  let a, b, answer, display;

  if (op === "√") {
    const roots = [4,9,16,25,36,49,64,81,100,121,144];
    a = roots[Math.floor(Math.random() * roots.length)];
    answer = Math.sqrt(a);
    display = `√${a}`;
  } else if (op === "²") {
    a = Math.floor(Math.random() * 12) + 2;
    answer = a * a;
    display = `${a}²`;
  } else if (op === "÷") {
    b = Math.floor(Math.random() * 10) + 1;
    answer = Math.floor(Math.random() * 10) + 1;
    a = b * answer;
    display = `${a} ÷ ${b}`;
  } else if (op === "×") {
    a = Math.floor(Math.random() * 12) + 1;
    b = Math.floor(Math.random() * 12) + 1;
    answer = a * b;
    display = `${a} × ${b}`;
  } else if (op === "-") {
    a = Math.floor(Math.random() * 50) + 10;
    b = Math.floor(Math.random() * a);
    answer = a - b;
    display = `${a} − ${b}`;
  } else {
    a = Math.floor(Math.random() * 50) + 1;
    b = Math.floor(Math.random() * 50) + 1;
    answer = a + b;
    display = `${a} + ${b}`;
  }

  // Generate 3 wrong options
  const wrongs = new Set();
  while (wrongs.size < 3) {
    const w = answer + Math.floor(Math.random() * 20) - 10;
    if (w !== answer && w >= 0) wrongs.add(w);
  }
  const choices = [...wrongs, answer].sort(() => Math.random() - 0.5);
  return { display, answer, choices, op };
}

export default function MathQuest() {
  const [phase,    setPhase]    = useState("idle");
  const [q,        setQ]        = useState(null);
  const [score,    setScore]    = useState(0);
  const [wrong,    setWrong]    = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [flash,    setFlash]    = useState(null); // "ok" | "err"
  const [picked,   setPicked]   = useState(null);
  const timerRef = useRef(null);

  const next = (s) => { setQ(genQ(s)); setFlash(null); setPicked(null); };

  const start = () => {
    setScore(0); setWrong(0); setTimeLeft(60);
    setPhase("playing");
    setQ(genQ(0));
  };

  useEffect(() => {
    if (phase !== "playing") return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); setPhase("done"); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]);

  const handlePick = (choice) => {
    if (flash || !q) return;
    setPicked(choice);
    if (choice === q.answer) {
      setFlash("ok");
      setScore(s => { const ns = s+1; setTimeout(() => next(ns), 500); return ns; });
    } else {
      setFlash("err");
      setWrong(w => w+1);
      setTimeout(() => next(score), 700);
    }
  };

  return (
    <div className="gb">
      <div className="gb__bg"><div className="gb__bg-orb gb__bg-orb--1" /><div className="gb__bg-orb gb__bg-orb--2" /><div className="gb__bg-grid" /></div>
      <div className="gb__container">
        <div className="gb__header">
          <p className="gb__eyebrow">🔢 Math Challenge</p>
          <h2 className="gb__title">Pandora Math Quest</h2>
          <p className="gb__subtitle">+  −  ×  ÷  x²  √x · Answer as many as you can in 60 seconds</p>
        </div>

        {phase === "idle" && (
          <div className="gb__idle">
            <div className="gb__math-preview">
              {["12 + 7","√64","9²","48 ÷ 6","13 × 4"].map((ex,i) => (
                <span key={i} className="gb__math-ex">{ex}</span>
              ))}
            </div>
            <p className="gb__idle-hint">Tap the correct answer · Gets harder as your score grows!</p>
            <button className="gb__btn" onClick={start}>Start Game →</button>
          </div>
        )}

        {phase === "playing" && q && (
          <div className="gb__play">
            <div className="gb__stats">
              <div className="gb__stat"><span className="gb__stat-val" style={{color:"#39ff14"}}>{score}</span><span className="gb__stat-key">Correct</span></div>
              <div className="gb__stat"><span className="gb__stat-val" style={{color:"#ff6b35"}}>{wrong}</span><span className="gb__stat-key">Wrong</span></div>
              <div className="gb__stat" style={{color: timeLeft<=10?"#ff6b35":"#00e5ff"}}>
                <span className="gb__stat-val">{timeLeft}</span><span className="gb__stat-key">Secs</span>
              </div>
            </div>
            <div className="gb__timer-bar-wrap">
              <div className="gb__timer-bar" style={{width:`${(timeLeft/60)*100}%`, background: timeLeft<=10?"#ff6b35":"#39ff14"}} />
            </div>

            <div className={`gb__math-display ${flash==="ok"?"gb__target--ok":flash==="err"?"gb__target--err":""}`}>
              <p className="gb__math-question">{q.display} = ?</p>
              {flash === "ok" && <p className="gb__flash-msg" style={{color:"#39ff14"}}>✓ Correct!</p>}
              {flash === "err" && <p className="gb__flash-msg" style={{color:"#ff6b35"}}>✗ Answer: {q.answer}</p>}
            </div>

            <div className="gb__choices">
              {q.choices.map((ch, i) => (
                <button
                  key={i}
                  className={`gb__choice ${picked===ch ? (ch===q.answer?"gb__choice--ok":"gb__choice--err") : ""}`}
                  onClick={() => handlePick(ch)}
                  disabled={!!flash}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === "done" && (
          <div className="gb__result">
            <div className="gb__result-seal">🔢</div>
            <h3 className="gb__result-title">Time's Up!</h3>
            <div className="gb__result-scores">
              <div className="gb__result-score"><span className="gb__result-num" style={{color:"#39ff14"}}>{score}</span><span className="gb__result-label">Correct</span></div>
              <div className="gb__result-score"><span className="gb__result-num" style={{color:"#ff6b35"}}>{wrong}</span><span className="gb__result-label">Wrong</span></div>
              <div className="gb__result-score"><span className="gb__result-num" style={{color:"#a78bfa"}}>{Math.round(score/(score+wrong||1)*100)}%</span><span className="gb__result-label">Accuracy</span></div>
            </div>
            <p className="gb__result-msg">
              {score >= 20 ? "🧠 Mathematical genius of Pandora!" :
               score >= 10 ? "⚡ Strong mind! Eywa approves." :
               "🌱 Keep calculating, warrior!"}
            </p>
            <button className="gb__btn" onClick={start}>Play Again</button>
          </div>
        )}
      </div>
    </div>
  );
}
