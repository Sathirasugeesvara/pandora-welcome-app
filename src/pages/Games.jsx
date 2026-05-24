import "./Games.css";

const GAME_CARDS = [
  {
    id: "naviname",
    title: "Na'vi Name Generator",
    tagline: "Discover your Na'vi warrior name",
    desc: "Enter your human name and Eywa will reveal your true Na'vi identity, clan, and spirit animal.",
    icon: "🐾",
    color: "#00e5ff",
    colorDim: "rgba(0,229,255,0.08)",
    colorGlow: "rgba(0,229,255,0.35)",
    badge: "Identity",
    players: "Solo",
  },
  {
    id: "navitype",
    title: "Na'vi Word Typer",
    tagline: "Type Na'vi words as fast as you can",
    desc: "Na'vi words flash on screen one by one. Type them correctly as fast as possible. Score = words per minute.",
    icon: "🔡",
    color: "#a78bfa",
    colorDim: "rgba(167,139,250,0.08)",
    colorGlow: "rgba(167,139,250,0.35)",
    badge: "Speed",
    players: "Solo",
  },
  {
    id: "tapclan",
    title: "Tap the Clan",
    tagline: "Tap the right clan before time runs out",
    desc: "A clan name appears — tap the correct clan icon as fast as you can. Miss it and lose a life. How many can you get?",
    icon: "🎯",
    color: "#ff6b35",
    colorDim: "rgba(255,107,53,0.08)",
    colorGlow: "rgba(255,107,53,0.35)",
    badge: "Reflex",
    players: "Solo",
  },
  {
    id: "mathquest",
    title: "Pandora Math Quest",
    tagline: "Solve math problems in Pandora style",
    desc: "Quick fire +, −, ×, ÷, squares and square roots. Answer as many as you can in 60 seconds. Score = correct answers.",
    icon: "🔢",
    color: "#39ff14",
    colorDim: "rgba(57,255,20,0.08)",
    colorGlow: "rgba(57,255,20,0.35)",
    badge: "Math",
    players: "Solo",
  },
  {
    id: "csquiz",
    title: "CS & Tech Quiz",
    tagline: "C language, computer history & tech",
    desc: "Questions on C programming, computer history, and tech fundamentals. 10 questions — how many can you get right?",
    icon: "💻",
    color: "#22d3ee",
    colorDim: "rgba(34,211,238,0.08)",
    colorGlow: "rgba(34,211,238,0.35)",
    badge: "CS",
    players: "Solo",
  },
  {
    id: "scenesort",
    title: "Avatar Scene Sorter",
    tagline: "Sort Avatar movie scenes in order",
    desc: "5 iconic Avatar movie scenes appear shuffled. Drag and drop them into the correct chronological order. Race the clock!",
    icon: "🎬",
    color: "#c084fc",
    colorDim: "rgba(192,132,252,0.08)",
    colorGlow: "rgba(192,132,252,0.35)",
    badge: "Order",
    players: "Solo",
  },
];

export default function Games({ onNavigate }) {
  return (
    <div className="games">
      <div className="games__bg" aria-hidden="true">
        <div className="games__bg-orb games__bg-orb--1" />
        <div className="games__bg-orb games__bg-orb--2" />
        <div className="games__bg-orb games__bg-orb--3" />
        <div className="games__bg-grid" />
      </div>

      <div className="games__spores" aria-hidden="true">
        {Array.from({ length: 25 }).map((_, i) => (
          <span key={i} className="games__spore" style={{
            left: `${(i * 4.1 + 2) % 100}%`,
            animationDelay: `${(i * 0.35) % 8}s`,
            animationDuration: `${6 + (i % 5)}s`,
          }} />
        ))}
      </div>

      <div className="games__container">
        <div className="games__header">
          <p className="games__eyebrow">✦ Arena of Pandora ✦</p>
          <h1 className="games__title">
            <span className="games__title-small">Welcome to the</span>
            <span className="games__title-main">Game Zone</span>
          </h1>
          <div className="games__ornament">
            <span /><span className="games__gem" /><span className="games__gem games__gem--sm" /><span className="games__gem" /><span />
          </div>
          <p className="games__subtitle">
            Six challenges await you in the world of Pandora.<br />
            Choose your game and prove your worth to Eywa.
          </p>
        </div>

        <div className="games__grid">
          {GAME_CARDS.map((game, i) => (
            <button
              key={game.id}
              className="game-card"
              style={{
                "--c":     game.color,
                "--cdim":  game.colorDim,
                "--cglow": game.colorGlow,
                animationDelay: `${i * 0.1}s`,
              }}
              onClick={() => onNavigate(game.id)}
            >
              <div className="game-card__border" />
              <span className="game-card__corner game-card__corner--tl" />
              <span className="game-card__corner game-card__corner--tr" />
              <span className="game-card__corner game-card__corner--bl" />
              <span className="game-card__corner game-card__corner--br" />
              <div className="game-card__badge">{game.badge}</div>
              <div className="game-card__icon-wrap">
                <div className="game-card__icon-ring" />
                <span className="game-card__icon">{game.icon}</span>
                <div className="game-card__icon-glow" />
              </div>
              <div className="game-card__body">
                <h3 className="game-card__title">{game.title}</h3>
                <p className="game-card__tagline">{game.tagline}</p>
                <p className="game-card__desc">{game.desc}</p>
              </div>
              <div className="game-card__footer">
                <span className="game-card__players">👤 {game.players}</span>
                <span className="game-card__play">Play Now <span className="game-card__arrow">→</span></span>
              </div>
              <div className="game-card__scan" />
            </button>
          ))}
        </div>

        <div className="games__footer">
          <div className="games__footer-line">
            <span /><span className="games__gem games__gem--sm" /><span />
          </div>
          <p className="games__footer-text">Together as One. Stronger as a Family. #PMTFamily</p>
        </div>
      </div>
    </div>
  );
}
