import "./ComingSoon.css";
export default function WordScramble({ onNavigate }) {
  return (
    <div className="cs-game">
      <div className="cs-game__inner">
        <p className="cs-game__eyebrow">✦ Pandora Game ✦</p>
        <h2 className="cs-game__title">WordScramble</h2>
        <p className="cs-game__sub">This game is being forged in Pandora — coming very soon!</p>
        <button className="cs-game__btn" onClick={() => onNavigate("games")}>← Back to Games</button>
      </div>
    </div>
  );
}
