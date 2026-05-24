import { useState } from "react";
import "./GameBase.css";
import "./SceneSort.css";

const SCENE_SETS = [
  [
    { id:1, text:"Jake Sully arrives at the RDA facility on Pandora for the first time", order:1 },
    { id:2, text:"Jake controls his Avatar body and runs through the jungle for the first time", order:2 },
    { id:3, text:"Jake meets Neytiri after she saves him from the forest creatures at night", order:3 },
    { id:4, text:"Jake successfully bonds with the Ikran on the Mons Veritatis cliffs", order:4 },
    { id:5, text:"The RDA destroys Hometree while the Omaticaya watch helplessly", order:5 },
  ],
  [
    { id:6,  text:"Jake connects to Eywa at the Tree of Souls and prays for her help", order:1 },
    { id:7,  text:"Toruk Makto — Jake rides the great Leonopteryx for the first time", order:2 },
    { id:8,  text:"All Na'vi clans unite and march to battle against the RDA forces", order:3 },
    { id:9,  text:"Jake and Neytiri fight side by side against Quaritch in his AMP suit", order:4 },
    { id:10, text:"Jake's human body dies and his consciousness transfers permanently into his Avatar", order:5 },
  ],
  [
    { id:11, text:"Lo'ak discovers the Tulkun Ronal and forms a deep connection with it", order:1 },
    { id:12, text:"The Sully family flees Hometree and seeks refuge with the Metkayina reef clan", order:2 },
    { id:13, text:"Spider is captured by Quaritch and taken aboard the RDA ship", order:3 },
    { id:14, text:"The great Tulkun Payakan charges the RDA whaling vessel in a fierce battle", order:4 },
    { id:15, text:"Jake holds his son Neteyam as he dies from his wounds after the final battle", order:5 },
  ],
];

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

export default function SceneSort() {
  const [phase,    setPhase]    = useState("idle");
  const [scenes,   setScenes]   = useState([]);
  const [correct,  setCorrect]  = useState(null);
  const [round,    setRound]    = useState(0);
  const [score,    setScore]    = useState(0);
  const [dragIdx,  setDragIdx]  = useState(null);

  const start = () => {
    setScore(0); setRound(0); setCorrect(null);
    loadRound(0);
    setPhase("playing");
  };

  const loadRound = (r) => {
    const set = SCENE_SETS[r % SCENE_SETS.length];
    setScenes(shuffle(set));
    setCorrect(null);
  };

  // Drag handlers
  const onDragStart = (i) => setDragIdx(i);
  const onDrop = (i) => {
    if (dragIdx === null || dragIdx === i) return;
    const next = [...scenes];
    const [moved] = next.splice(dragIdx, 1);
    next.splice(i, 0, moved);
    setScenes(next);
    setDragIdx(null);
  };

  // Mobile tap-to-swap
  const [selected, setSelected] = useState(null);
  const handleTap = (i) => {
    if (selected === null) { setSelected(i); return; }
    if (selected === i) { setSelected(null); return; }
    const next = [...scenes];
    [next[selected], next[i]] = [next[i], next[selected]];
    setScenes(next);
    setSelected(null);
  };

  const checkAnswer = () => {
    const isCorrect = scenes.every((s, i) => s.order === i + 1);
    setCorrect(isCorrect);
    if (isCorrect) setScore(s => s + 1);
    setTimeout(() => {
      if (round + 1 >= SCENE_SETS.length) { setPhase("done"); }
      else { const nr = round + 1; setRound(nr); loadRound(nr); }
    }, 1500);
  };

  return (
    <div className="gb">
      <div className="gb__bg"><div className="gb__bg-orb gb__bg-orb--1" /><div className="gb__bg-orb gb__bg-orb--2" /><div className="gb__bg-grid" /></div>
      <div className="gb__container gb__container--wide">
        <div className="gb__header">
          <p className="gb__eyebrow">🎬 Scene Challenge</p>
          <h2 className="gb__title">Avatar Scene Sorter</h2>
          <p className="gb__subtitle">Drag scenes into the correct order they happened in the films</p>
        </div>

        {phase === "idle" && (
          <div className="gb__idle">
            <div className="gb__scene-preview">🎬 🔀 📽️</div>
            <p className="gb__idle-hint">
              5 scenes from Avatar appear shuffled — drag them into the correct chronological order.<br />
              <strong>Mobile:</strong> Tap a card, then tap where to move it.
            </p>
            <button className="gb__btn" onClick={start}>Start Game →</button>
          </div>
        )}

        {phase === "playing" && (
          <div className="gb__play">
            <div className="gb__stats">
              <div className="gb__stat"><span className="gb__stat-val" style={{color:"#39ff14"}}>{score}</span><span className="gb__stat-key">Correct</span></div>
              <div className="gb__stat"><span className="gb__stat-val" style={{color:"#c084fc"}}>{round+1}/{SCENE_SETS.length}</span><span className="gb__stat-key">Round</span></div>
            </div>

            {correct !== null && (
              <div className={`gb__check-result ${correct?"gb__target--ok":"gb__target--err"}`}>
                {correct ? "✓ Perfect order!" : "✗ Not quite — moving on…"}
              </div>
            )}

            <div className="ss__list">
              {scenes.map((scene, i) => (
                <div
                  key={scene.id}
                  className={`ss__card ${selected===i?"ss__card--selected":""} ${dragIdx===i?"ss__card--dragging":""}`}
                  draggable
                  onDragStart={() => onDragStart(i)}
                  onDragOver={e => e.preventDefault()}
                  onDrop={() => onDrop(i)}
                  onClick={() => handleTap(i)}
                >
                  <span className="ss__num">{i + 1}</span>
                  <span className="ss__text">{scene.text}</span>
                  <span className="ss__drag-hint">⠿</span>
                </div>
              ))}
            </div>

            <button className="gb__btn gb__btn--check" onClick={checkAnswer} disabled={correct !== null}>
              ✓ Check Order
            </button>
          </div>
        )}

        {phase === "done" && (
          <div className="gb__result">
            <div className="gb__result-seal">🎬</div>
            <h3 className="gb__result-title">All Done!</h3>
            <div className="gb__result-scores">
              <div className="gb__result-score"><span className="gb__result-num" style={{color:"#c084fc"}}>{score}/{SCENE_SETS.length}</span><span className="gb__result-label">Correct</span></div>
            </div>
            <p className="gb__result-msg">
              {score === SCENE_SETS.length ? "🏆 Perfect Avatar knowledge! Eywa is proud." :
               score >= 2 ? "🎬 Good memory of Pandora's story!" :
               "🌱 Rewatch Avatar and try again!"}
            </p>
            <button className="gb__btn" onClick={start}>Play Again</button>
          </div>
        )}
      </div>
    </div>
  );
}
