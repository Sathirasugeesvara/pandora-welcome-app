import { useState, useEffect, useRef, useCallback } from "react";
import "./GameBase.css";

const CLANS = [
  { id:"omaticaya",  name:"Omaticaya",        color:"#39ff14", img:"/clans/omaticaya.png",         emoji:"🌿" },
  { id:"metkayina",  name:"Metkayina",         color:"#00e5ff", img:"/clans/metkayina.png",         emoji:"🌊" },
  { id:"ash",        name:"Ash Clan",           color:"#ff6b35", img:"/clans/ash-clan.png",          emoji:"🔥" },
  { id:"skyriders",  name:"Sky Riders",         color:"#a78bfa", img:"/clans/sky-riders.png",       emoji:"⚡" },
  { id:"tulkun",     name:"Tulkun Guardians",   color:"#22d3ee", img:"/clans/tulkun-guardians.png", emoji:"🐋" },
  { id:"warriors",   name:"Pandora Warriors",   color:"#c084fc", img:"/clans/pandora-warriors.png", emoji:"💜" },
];

export default function TapClan() {
  const [phase,   setPhase]   = useState("idle");
  const [target,  setTarget]  = useState(null);
  const [score,   setScore]   = useState(0);
  const [lives,   setLives]   = useState(3);
  const [timeLeft,setTimeLeft]= useState(3); // per round
  const [flash,   setFlash]   = useState(null); // clanId correct|wrong
  const [round,   setRound]   = useState(0);
  const timerRef = useRef(null);

  const nextRound = useCallback((currentScore, currentLives) => {
    if (currentLives <= 0) { setPhase("done"); return; }
    const rand = CLANS[Math.floor(Math.random() * CLANS.length)];
    setTarget(rand);
    setTimeLeft(Math.max(1.5, 3 - currentScore * 0.05)); // speeds up
    setFlash(null);
    setRound(r => r + 1);
  }, []);

  useEffect(() => {
    if (phase !== "playing" || !target) return;
    clearInterval(timerRef.current);
    const speed = Math.max(1500, 3000 - score * 50);
    timerRef.current = setTimeout(() => {
      // time ran out — lose a life
      setFlash("timeout");
      setLives(l => {
        const nl = l - 1;
        setTimeout(() => nextRound(score, nl), 700);
        return nl;
      });
    }, speed);
    return () => clearTimeout(timerRef.current);
  }, [target, phase]);

  const start = () => {
    setScore(0); setLives(3); setRound(0);
    setPhase("playing");
    setTimeout(() => nextRound(0, 3), 100);
  };

  const handleTap = (clan) => {
    if (phase !== "playing" || flash) return;
    clearTimeout(timerRef.current);
    if (clan.id === target.id) {
      setFlash("correct");
      setScore(s => {
        const ns = s + 1;
        setTimeout(() => nextRound(ns, lives), 500);
        return ns;
      });
    } else {
      setFlash("wrong");
      setLives(l => {
        const nl = l - 1;
        setTimeout(() => nextRound(score, nl), 700);
        return nl;
      });
    }
  };

  return (
    <div className="gb">
      <div className="gb__bg"><div className="gb__bg-orb gb__bg-orb--1" /><div className="gb__bg-orb gb__bg-orb--2" /><div className="gb__bg-grid" /></div>
      <div className="gb__container">
        <div className="gb__header">
          <p className="gb__eyebrow">🎯 Reflex Challenge</p>
          <h2 className="gb__title">Tap the Clan</h2>
          <p className="gb__subtitle">Clan name appears — tap the correct icon before time runs out!</p>
        </div>

        {phase === "idle" && (
          <div className="gb__idle">
            <div className="gb__clan-preview">
              {CLANS.map(c => (
                <div key={c.id} className="gb__clan-prev-item" style={{"--c": c.color}}>
                  <img src={c.img} alt={c.name} className="gb__clan-prev-img" onError={e=>e.target.textContent=c.emoji} />
                </div>
              ))}
            </div>
            <p className="gb__idle-hint">3 lives · Gets faster as your score increases. How many can you tap?</p>
            <button className="gb__btn" onClick={start}>Start Game →</button>
          </div>
        )}

        {phase === "playing" && target && (
          <div className="gb__play">
            <div className="gb__stats">
              <div className="gb__stat"><span className="gb__stat-val" style={{color:"#39ff14"}}>{score}</span><span className="gb__stat-key">Score</span></div>
              <div className="gb__stat"><span className="gb__stat-val" style={{color:"#ff6b35"}}>{"❤️".repeat(lives)}{"🖤".repeat(3-lives)}</span><span className="gb__stat-key">Lives</span></div>
              <div className="gb__stat"><span className="gb__stat-val" style={{color:"#00e5ff"}}>{round}</span><span className="gb__stat-key">Round</span></div>
            </div>

            {/* Target name */}
            <div className={`gb__target-display ${flash === "correct" ? "gb__target--ok" : flash === "wrong" || flash === "timeout" ? "gb__target--err" : ""}`}>
              <p className="gb__target-label">TAP THIS CLAN</p>
              <h3 className="gb__target-name" style={{color: target.color}}>{target.name}</h3>
              {flash === "correct" && <p className="gb__flash-msg" style={{color:"#39ff14"}}>✓ Correct!</p>}
              {flash === "wrong"   && <p className="gb__flash-msg" style={{color:"#ff6b35"}}>✗ Wrong clan!</p>}
              {flash === "timeout" && <p className="gb__flash-msg" style={{color:"#ff6b35"}}>⏱ Too slow!</p>}
            </div>

            {/* Clan grid */}
            <div className="gb__clan-grid">
              {CLANS.map(clan => (
                <button
                  key={clan.id}
                  className="gb__clan-btn"
                  style={{"--c": clan.color}}
                  onClick={() => handleTap(clan)}
                  disabled={!!flash}
                >
                  <img src={clan.img} alt={clan.name} className="gb__clan-img"
                    onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="block"; }} />
                  <span className="gb__clan-emoji" style={{display:"none"}}>{clan.emoji}</span>
                  <span className="gb__clan-label">{clan.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === "done" && (
          <div className="gb__result">
            <div className="gb__result-seal">🎯</div>
            <h3 className="gb__result-title">Game Over!</h3>
            <div className="gb__result-scores">
              <div className="gb__result-score">
                <span className="gb__result-num" style={{color:"#ff6b35"}}>{score}</span>
                <span className="gb__result-label">Final Score</span>
              </div>
              <div className="gb__result-score">
                <span className="gb__result-num" style={{color:"#00e5ff"}}>{round}</span>
                <span className="gb__result-label">Rounds</span>
              </div>
            </div>
            <p className="gb__result-msg">
              {score >= 20 ? "🔥 Legendary reflexes! The clans bow to you." :
               score >= 10 ? "⚡ Strong warrior! Keep sharpening your senses." :
               "🌱 The forest teaches patience — try again!"}
            </p>
            <button className="gb__btn" onClick={start}>Play Again</button>
          </div>
        )}
      </div>
    </div>
  );
}
