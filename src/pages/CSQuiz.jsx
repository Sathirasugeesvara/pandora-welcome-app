import { useState } from "react";
import "./GameBase.css";

const QUESTIONS = [
  { q:"Who is known as the father of the C programming language?", choices:["Dennis Ritchie","Linus Torvalds","Bill Gates","Alan Turing"], answer:"Dennis Ritchie" },
  { q:"In C, which symbol is used to end a statement?", choices:[":",".",";","!"], answer:";" },
  { q:"What does CPU stand for?", choices:["Central Processing Unit","Computer Personal Unit","Central Program Utility","Core Processing Unit"], answer:"Central Processing Unit" },
  { q:"Which year was the C language created?", choices:["1960","1972","1985","1991"], answer:"1972" },
  { q:"What is the output of printf(\"%d\", 5+3)?", choices:["53","8","5+3","Error"], answer:"8" },
  { q:"Who invented the World Wide Web?", choices:["Bill Gates","Steve Jobs","Tim Berners-Lee","Mark Zuckerberg"], answer:"Tim Berners-Lee" },
  { q:"What does RAM stand for?", choices:["Random Access Memory","Read All Memory","Rapid Access Module","Run All Memory"], answer:"Random Access Memory" },
  { q:"Which data type stores a single character in C?", choices:["string","char","letter","text"], answer:"char" },
  { q:"What was the first computer bug — literally?", choices:["A virus","A moth found in a relay","A software glitch","A corrupted disk"], answer:"A moth found in a relay" },
  { q:"In C, what does 'int' stand for?", choices:["Internal","Integer","Interface","Interrupt"], answer:"Integer" },
  { q:"Which company made the first personal computer?", choices:["Apple","IBM","Microsoft","Altair"], answer:"Altair" },
  { q:"What does HTTP stand for?", choices:["HyperText Transfer Protocol","High Tech Transfer Protocol","HyperText Transport Program","Home Transfer Text Protocol"], answer:"HyperText Transfer Protocol" },
  { q:"In C, which operator is used for pointer dereferencing?", choices:["&","*","->","::"], answer:"*" },
  { q:"What year was the first iPhone released?", choices:["2005","2006","2007","2008"], answer:"2007" },
  { q:"Which sorting algorithm has O(n log n) average time complexity?", choices:["Bubble Sort","Selection Sort","Merge Sort","Linear Search"], answer:"Merge Sort" },
  { q:"In C, 'malloc' is used for?", choices:["Math calculations","Dynamic memory allocation","Array declaration","Function calling"], answer:"Dynamic memory allocation" },
  { q:"What does SQL stand for?", choices:["Structured Query Language","Simple Question Language","Standard Queue Logic","System Query Link"], answer:"Structured Query Language" },
  { q:"Which gate outputs true only when both inputs are true?", choices:["OR","NOT","AND","XOR"], answer:"AND" },
  { q:"What is the binary representation of decimal 10?", choices:["1010","1100","1001","0110"], answer:"1010" },
  { q:"Who co-founded Apple with Steve Jobs?", choices:["Bill Gates","Steve Wozniak","Linus Torvalds","Paul Allen"], answer:"Steve Wozniak" },
];

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

export default function CSQuiz() {
  const [phase,   setPhase]   = useState("idle");
  const [qs,      setQs]      = useState([]);
  const [index,   setIndex]   = useState(0);
  const [score,   setScore]   = useState(0);
  const [picked,  setPicked]  = useState(null);
  const [flash,   setFlash]   = useState(null);

  const start = () => {
    setQs(shuffle(QUESTIONS).slice(0, 10));
    setIndex(0); setScore(0); setPicked(null); setFlash(null);
    setPhase("playing");
  };

  const handlePick = (choice) => {
    if (flash) return;
    const q = qs[index];
    setPicked(choice);
    if (choice === q.answer) {
      setFlash("ok");
      setScore(s => s + 1);
    } else {
      setFlash("err");
    }
    setTimeout(() => {
      if (index + 1 >= qs.length) { setPhase("done"); }
      else { setIndex(i => i + 1); setPicked(null); setFlash(null); }
    }, 900);
  };

  const q = qs[index];

  return (
    <div className="gb">
      <div className="gb__bg"><div className="gb__bg-orb gb__bg-orb--1" /><div className="gb__bg-orb gb__bg-orb--2" /><div className="gb__bg-grid" /></div>
      <div className="gb__container">
        <div className="gb__header">
          <p className="gb__eyebrow">💻 Knowledge Challenge</p>
          <h2 className="gb__title">CS & Tech Quiz</h2>
          <p className="gb__subtitle">C language · Computer history · Tech fundamentals · 10 questions</p>
        </div>

        {phase === "idle" && (
          <div className="gb__idle">
            <div className="gb__cs-icons">💻 🖥️ ⌨️ 🖱️ 🔌</div>
            <p className="gb__idle-hint">10 questions on C programming, computer history & tech. How many can you get right?</p>
            <button className="gb__btn" onClick={start}>Start Quiz →</button>
          </div>
        )}

        {phase === "playing" && q && (
          <div className="gb__play">
            <div className="gb__stats">
              <div className="gb__stat"><span className="gb__stat-val" style={{color:"#39ff14"}}>{score}</span><span className="gb__stat-key">Score</span></div>
              <div className="gb__stat"><span className="gb__stat-val" style={{color:"#00e5ff"}}>{index+1}/10</span><span className="gb__stat-key">Question</span></div>
            </div>

            {/* Progress bar */}
            <div className="gb__timer-bar-wrap">
              <div className="gb__timer-bar" style={{width:`${((index+1)/10)*100}%`, background:"#22d3ee"}} />
            </div>

            <div className={`gb__math-display ${flash==="ok"?"gb__target--ok":flash==="err"?"gb__target--err":""}`}>
              <p className="gb__cs-question">{q.q}</p>
              {flash==="ok" && <p className="gb__flash-msg" style={{color:"#39ff14"}}>✓ Correct!</p>}
              {flash==="err" && <p className="gb__flash-msg" style={{color:"#ff6b35"}}>✗ {q.answer}</p>}
            </div>

            <div className="gb__choices gb__choices--4">
              {q.choices.map((ch, i) => (
                <button
                  key={i}
                  className={`gb__choice gb__choice--wide ${
                    picked===ch ? (ch===q.answer?"gb__choice--ok":"gb__choice--err") :
                    flash && ch===q.answer ? "gb__choice--ok" : ""
                  }`}
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
            <div className="gb__result-seal">💻</div>
            <h3 className="gb__result-title">Quiz Complete!</h3>
            <div className="gb__result-scores">
              <div className="gb__result-score"><span className="gb__result-num" style={{color:"#22d3ee"}}>{score}/10</span><span className="gb__result-label">Score</span></div>
              <div className="gb__result-score"><span className="gb__result-num" style={{color:"#a78bfa"}}>{score*10}%</span><span className="gb__result-label">Accuracy</span></div>
            </div>
            <p className="gb__result-msg">
              {score >= 8 ? "🏆 Master coder of Pandora!" :
               score >= 5 ? "💡 Good knowledge, keep learning!" :
               "📚 The scrolls await — study and try again!"}
            </p>
            <button className="gb__btn" onClick={start}>Play Again</button>
          </div>
        )}
      </div>
    </div>
  );
}
