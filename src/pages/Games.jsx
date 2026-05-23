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
    id: "clanquiz",
    title: "Clan Sorting Quiz",
    tagline: "Which clan do you truly belong to?",
    desc: "Answer 5 questions about your spirit and personality. Eywa herself will sort you into your rightful clan.",
    icon: "🎴",
    color: "#a78bfa",
    colorDim: "rgba(167,139,250,0.08)",
    colorGlow: "rgba(167,139,250,0.35)",
    badge: "Quiz",
    players: "Solo",
  },
  {
    id: "clanroulette",
    title: "Clan Roulette",
    tagline: "Spin the wheel of fate",
    desc: "Leave your destiny to Pandora. Spin the sacred wheel and let the spirit of Eywa choose your clan.",
    icon: "🎡",
    color: "#ff6b35",
    colorDim: "rgba(255,107,53,0.08)",
    colorGlow: "rgba(255,107,53,0.35)",
    badge: "Luck",
    players: "Solo",
  },
  {
    id: "trivia",
    title: "Pandora Trivia",
    tagline: "Test your knowledge of Pandora",
    desc: "10 questions about the world of Pandora, its clans, and Na'vi lore. How well do you know your new home?",
    icon: "🌿",
    color: "#39ff14",
    colorDim: "rgba(57,255,20,0.08)",
    colorGlow: "rgba(57,255,20,0.35)",
    badge: "Trivia",
    players: "Solo",
  },
  {
    id: "memorymatch",
    title: "Clan Memory Match",
    tagline: "Match the clan emblems",
    desc: "Flip the cards and match all six clan emblems before time runs out. Test your memory in the forest of Pandora.",
    icon: "🧠",
    color: "#22d3ee",
    colorDim: "rgba(34,211,238,0.08)",
    colorGlow: "rgba(34,211,238,0.35)",
    badge: "Memory",
    players: "Solo",
  },
  {
    id: "wordscramble",
    title: "Na'vi Word Scramble",
    tagline: "Unscramble the Na'vi language",
    desc: "Scrambled Na'vi words appear one by one. Unscramble them all as fast as you can to prove your worth.",
    icon: "🔤",
    color: "#c084fc",
    colorDim: "rgba(192,132,252,0.08)",
    colorGlow: "rgba(192,132,252,0.35)",
    badge: "Word",
    players: "Solo",
  },
];

export default function Games({ onNavigate }) {
  return (
    <div className="games">
      {/* Background */}
      <div className="games__bg" aria-hidden="true">
        <div className="games__bg-orb games__bg-orb--1" />
        <div className="games__bg-orb games__bg-orb--2" />
        <div className="games__bg-orb games__bg-orb--3" />
        <div className="games__bg-grid" />
      </div>

      {/* Floating spores */}
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

        {/* Header */}
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

        {/* Game cards grid */}
        <div className="games__grid">
          {GAME_CARDS.map((game, i) => (
            <button
              key={game.id}
              className="game-card"
              style={{
                "--c":    game.color,
                "--cdim": game.colorDim,
                "--cglow":game.colorGlow,
                animationDelay: `${i * 0.1}s`,
              }}
              onClick={() => onNavigate(game.id)}
            >
              {/* Glow border */}
              <div className="game-card__border" />

              {/* Corner accents */}
              <span className="game-card__corner game-card__corner--tl" />
              <span className="game-card__corner game-card__corner--tr" />
              <span className="game-card__corner game-card__corner--bl" />
              <span className="game-card__corner game-card__corner--br" />

              {/* Badge */}
              <div className="game-card__badge">{game.badge}</div>

              {/* Icon */}
              <div className="game-card__icon-wrap">
                <div className="game-card__icon-ring" />
                <span className="game-card__icon">{game.icon}</span>
                <div className="game-card__icon-glow" />
              </div>

              {/* Text */}
              <div className="game-card__body">
                <h3 className="game-card__title">{game.title}</h3>
                <p className="game-card__tagline">{game.tagline}</p>
                <p className="game-card__desc">{game.desc}</p>
              </div>

              {/* Footer */}
              <div className="game-card__footer">
                <span className="game-card__players">👤 {game.players}</span>
                <span className="game-card__play">
                  Play Now <span className="game-card__arrow">→</span>
                </span>
              </div>

              {/* Scan line effect */}
              <div className="game-card__scan" />
            </button>
          ))}
        </div>

        {/* Bottom tagline */}
        <div className="games__footer">
          <div className="games__footer-line">
            <span /><span className="games__gem games__gem--sm" /><span />
          </div>
          <p className="games__footer-text">
            Together as One. Stronger as a Family. #PMTFamily
          </p>
        </div>

      </div>
    </div>
  );
}
