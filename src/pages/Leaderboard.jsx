import { useState } from "react";
import "./Leaderboard.css";

// ── Clan SVG Icons (matching poster emblems) ──────────────────────
const ClanIcon = ({ clan, size = 48 }) => {
  const icons = {
    omaticaya: (
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="27" stroke="#39ff14" strokeWidth="1.5" opacity="0.6"/>
        <circle cx="30" cy="30" r="22" stroke="#39ff14" strokeWidth="0.8" opacity="0.3"/>
        {/* Tree of Souls / forest leaf */}
        <path d="M30 10 C30 10 18 20 18 32 C18 40 23 46 30 48 C37 46 42 40 42 32 C42 20 30 10 30 10Z"
          fill="#39ff14" opacity="0.15" stroke="#39ff14" strokeWidth="1"/>
        <path d="M30 48 L30 18" stroke="#39ff14" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M30 28 C30 28 22 24 20 18" stroke="#39ff14" strokeWidth="1" strokeLinecap="round" opacity="0.7"/>
        <path d="M30 28 C30 28 38 24 40 18" stroke="#39ff14" strokeWidth="1" strokeLinecap="round" opacity="0.7"/>
        <path d="M30 36 C30 36 24 33 22 28" stroke="#39ff14" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
        <path d="M30 36 C30 36 36 33 38 28" stroke="#39ff14" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
        <circle cx="30" cy="48" r="2" fill="#39ff14" opacity="0.8"/>
        {/* glow dots */}
        <circle cx="20" cy="18" r="1.5" fill="#39ff14" opacity="0.6"/>
        <circle cx="40" cy="18" r="1.5" fill="#39ff14" opacity="0.6"/>
        <circle cx="22" cy="28" r="1" fill="#39ff14" opacity="0.5"/>
        <circle cx="38" cy="28" r="1" fill="#39ff14" opacity="0.5"/>
      </svg>
    ),
    metkayina: (
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="27" stroke="#00e5ff" strokeWidth="1.5" opacity="0.6"/>
        <circle cx="30" cy="30" r="22" stroke="#00e5ff" strokeWidth="0.8" opacity="0.3"/>
        {/* Ocean whale / wave */}
        <path d="M10 34 Q18 22 30 26 Q42 30 50 22" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M12 40 Q20 30 30 33 Q40 36 50 28" stroke="#00e5ff" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5"/>
        {/* Tulkun-like shape */}
        <path d="M18 30 Q24 18 30 20 Q38 18 42 28 Q46 36 38 40 Q30 44 22 40 Q16 36 18 30Z"
          fill="#00e5ff" opacity="0.1" stroke="#00e5ff" strokeWidth="1"/>
        <path d="M42 28 L50 24 L46 32Z" fill="#00e5ff" opacity="0.4"/>
        <circle cx="24" cy="27" r="2" fill="#00e5ff" opacity="0.7"/>
        {/* water sparkles */}
        <circle cx="16" cy="38" r="1" fill="#00e5ff" opacity="0.5"/>
        <circle cx="44" cy="20" r="1" fill="#00e5ff" opacity="0.5"/>
        <circle cx="30" cy="45" r="1.5" fill="#00e5ff" opacity="0.4"/>
      </svg>
    ),
    ash: (
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="27" stroke="#ff6b35" strokeWidth="1.5" opacity="0.6"/>
        <circle cx="30" cy="30" r="22" stroke="#ff8c42" strokeWidth="0.8" opacity="0.3"/>
        {/* Volcano / fire */}
        <path d="M14 46 L24 28 L30 22 L36 28 L46 46Z" fill="#ff6b35" opacity="0.15" stroke="#ff6b35" strokeWidth="1"/>
        <path d="M24 28 L30 22 L36 28" stroke="#ff8c42" strokeWidth="1.2" fill="none"/>
        {/* Flames */}
        <path d="M30 22 C30 22 26 16 28 12 C28 12 30 15 32 12 C32 12 34 16 30 22Z"
          fill="#ff6b35" opacity="0.8" stroke="#ff8c42" strokeWidth="0.5"/>
        <path d="M27 20 C27 20 24 15 25 11 C25 11 27 14 30 11" 
          stroke="#ff8c42" strokeWidth="0.8" opacity="0.5" fill="none" strokeLinecap="round"/>
        <path d="M33 20 C33 20 36 15 35 11 C35 11 33 14 30 11"
          stroke="#ff8c42" strokeWidth="0.8" opacity="0.5" fill="none" strokeLinecap="round"/>
        {/* Lava flow */}
        <path d="M30 22 L28 30 L25 34" stroke="#ff6b35" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        <path d="M30 22 L32 32 L35 36" stroke="#ff8c42" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
        <circle cx="30" cy="10" r="2" fill="#ffaa00" opacity="0.9"/>
        <circle cx="26" cy="14" r="1" fill="#ff6b35" opacity="0.7"/>
        <circle cx="34" cy="14" r="1" fill="#ff6b35" opacity="0.7"/>
      </svg>
    ),
    skyriders: (
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="27" stroke="#a78bfa" strokeWidth="1.5" opacity="0.6"/>
        <circle cx="30" cy="30" r="22" stroke="#a78bfa" strokeWidth="0.8" opacity="0.3"/>
        {/* Ikran / flying creature wings */}
        <path d="M30 30 C30 30 14 20 10 12 C10 12 18 18 22 16 C22 16 20 22 30 26Z"
          fill="#a78bfa" opacity="0.25" stroke="#a78bfa" strokeWidth="1"/>
        <path d="M30 30 C30 30 46 20 50 12 C50 12 42 18 38 16 C38 16 40 22 30 26Z"
          fill="#a78bfa" opacity="0.25" stroke="#a78bfa" strokeWidth="1"/>
        {/* Body */}
        <ellipse cx="30" cy="30" rx="4" ry="6" fill="#a78bfa" opacity="0.4" stroke="#a78bfa" strokeWidth="1"/>
        {/* Tail */}
        <path d="M30 36 C28 40 26 44 28 48" stroke="#a78bfa" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6"/>
        {/* Stars / freedom dots */}
        <circle cx="14" cy="14" r="1.5" fill="#c4b5fd" opacity="0.8"/>
        <circle cx="46" cy="14" r="1.5" fill="#c4b5fd" opacity="0.8"/>
        <circle cx="10" cy="28" r="1" fill="#a78bfa" opacity="0.5"/>
        <circle cx="50" cy="28" r="1" fill="#a78bfa" opacity="0.5"/>
        <circle cx="30" cy="15" r="1" fill="#c4b5fd" opacity="0.6"/>
      </svg>
    ),
    tulkun: (
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="27" stroke="#22d3ee" strokeWidth="1.5" opacity="0.6"/>
        <circle cx="30" cy="30" r="22" stroke="#22d3ee" strokeWidth="0.8" opacity="0.3"/>
        {/* Large whale shape */}
        <path d="M10 30 Q16 20 30 22 Q44 20 52 28 Q48 38 36 40 Q24 44 16 38 Q8 36 10 30Z"
          fill="#22d3ee" opacity="0.12" stroke="#22d3ee" strokeWidth="1.2"/>
        {/* Tail fin */}
        <path d="M52 28 L58 22 L58 34 Z" fill="#22d3ee" opacity="0.5"/>
        {/* Eye */}
        <circle cx="20" cy="28" r="3" fill="none" stroke="#22d3ee" strokeWidth="1"/>
        <circle cx="20" cy="28" r="1.5" fill="#22d3ee" opacity="0.8"/>
        {/* Bioluminescent patterns */}
        <path d="M28 30 Q32 26 36 30 Q32 34 28 30Z" fill="#22d3ee" opacity="0.3"/>
        <circle cx="34" cy="35" r="1" fill="#22d3ee" opacity="0.6"/>
        <circle cx="40" cy="32" r="1" fill="#22d3ee" opacity="0.5"/>
        <circle cx="44" cy="36" r="1.5" fill="#22d3ee" opacity="0.4"/>
        {/* Water ripples */}
        <path d="M12 42 Q20 38 28 42" stroke="#22d3ee" strokeWidth="0.8" fill="none" opacity="0.4" strokeLinecap="round"/>
        <path d="M32 44 Q40 40 48 42" stroke="#22d3ee" strokeWidth="0.8" fill="none" opacity="0.3" strokeLinecap="round"/>
      </svg>
    ),
    warriors: (
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="27" stroke="#c084fc" strokeWidth="1.5" opacity="0.6"/>
        <circle cx="30" cy="30" r="22" stroke="#c084fc" strokeWidth="0.8" opacity="0.3"/>
        {/* Shield / warrior */}
        <path d="M30 12 L44 18 L44 32 Q44 42 30 50 Q16 42 16 32 L16 18 Z"
          fill="#c084fc" opacity="0.1" stroke="#c084fc" strokeWidth="1.2"/>
        {/* Spear */}
        <path d="M30 14 L30 48" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
        <path d="M27 14 L30 10 L33 14Z" fill="#c084fc" opacity="0.9"/>
        {/* Crossed lines */}
        <path d="M20 22 L40 38" stroke="#c084fc" strokeWidth="0.8" opacity="0.4" strokeLinecap="round"/>
        <path d="M40 22 L20 38" stroke="#c084fc" strokeWidth="0.8" opacity="0.4" strokeLinecap="round"/>
        {/* Diamond center */}
        <path d="M30 26 L34 30 L30 34 L26 30 Z" fill="#c084fc" opacity="0.6" stroke="#c084fc" strokeWidth="0.5"/>
        {/* Corner ornaments */}
        <circle cx="20" cy="20" r="1.5" fill="#c084fc" opacity="0.6"/>
        <circle cx="40" cy="20" r="1.5" fill="#c084fc" opacity="0.6"/>
        <circle cx="30" cy="48" r="2" fill="#c084fc" opacity="0.5"/>
      </svg>
    ),
  };
  return icons[clan] ?? null;
};

// ── Clan data ─────────────────────────────────────────────────────
const CLANS = [
  {
    id: "omaticaya",
    name: "Omaticaya",
    motto: "One with the Forest",
    color: "#39ff14",
    colorDim: "rgba(57,255,20,0.12)",
    colorGlow: "rgba(57,255,20,0.35)",
    points: 4820,
    tasks: 24,
    wins: 9,
    members: 18,
  },
  {
    id: "metkayina",
    name: "Metkayina",
    motto: "Strength from the Ocean",
    color: "#00e5ff",
    colorDim: "rgba(0,229,255,0.12)",
    colorGlow: "rgba(0,229,255,0.35)",
    points: 4310,
    tasks: 21,
    wins: 7,
    members: 20,
  },
  {
    id: "ash",
    name: "Ash Clan",
    motto: "Fire is our Strength",
    color: "#ff6b35",
    colorDim: "rgba(255,107,53,0.12)",
    colorGlow: "rgba(255,107,53,0.35)",
    points: 3990,
    tasks: 19,
    wins: 6,
    members: 17,
  },
  {
    id: "skyriders",
    name: "Sky Riders",
    motto: "Freedom Above All",
    color: "#a78bfa",
    colorDim: "rgba(167,139,250,0.12)",
    colorGlow: "rgba(167,139,250,0.35)",
    points: 3750,
    tasks: 18,
    wins: 5,
    members: 16,
  },
  {
    id: "tulkun",
    name: "Tulkun Guardians",
    motto: "We Protect, We Honor",
    color: "#22d3ee",
    colorDim: "rgba(34,211,238,0.12)",
    colorGlow: "rgba(34,211,238,0.35)",
    points: 3400,
    tasks: 16,
    wins: 4,
    members: 19,
  },
  {
    id: "warriors",
    name: "Pandora Warriors",
    motto: "United. Strong. Unbreakable.",
    color: "#c084fc",
    colorDim: "rgba(192,132,252,0.12)",
    colorGlow: "rgba(192,132,252,0.35)",
    points: 3100,
    tasks: 14,
    wins: 3,
    members: 21,
  },
];

const RANK_LABELS = ["", "🥇", "🥈", "🥉"];
const SORT_OPTIONS = [
  { key: "points",  label: "Points" },
  { key: "tasks",   label: "Tasks" },
  { key: "wins",    label: "Wins" },
];

export default function Leaderboard() {
  const [sortBy, setSortBy] = useState("points");
  const [highlighted, setHighlighted] = useState(null);

  const sorted = [...CLANS].sort((a, b) => b[sortBy] - a[sortBy]);
  const maxVal  = sorted[0]?.[sortBy] ?? 1;

  return (
    <div className="lb">
      {/* BG */}
      <div className="lb__bg" aria-hidden="true">
        <div className="lb__bg-orb lb__bg-orb--1" />
        <div className="lb__bg-orb lb__bg-orb--2" />
        <div className="lb__bg-grid" />
      </div>

      <div className="lb__container">

        {/* ── Header ── */}
        <div className="lb__header">
          <p className="lb__eyebrow">✦ The Six Clans Compete ✦</p>
          <h2 className="lb__title">Leaderboard</h2>
          <div className="lb__divider">
            <span /><span className="lb__divider-diamond" /><span />
          </div>
          <p className="lb__subtitle">Together as One. Stronger as a Family.</p>
        </div>

        {/* ── Sort tabs ── */}
        <div className="lb__sort">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              className={`lb__sort-btn ${sortBy === opt.key ? "lb__sort-btn--active" : ""}`}
              onClick={() => setSortBy(opt.key)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* ── Top 3 podium ── */}
        <div className="lb__podium">
          {/* 2nd */}
          {sorted[1] && (
            <div className="lb__podium-slot lb__podium-slot--2"
              style={{ "--clan-color": sorted[1].color, "--clan-glow": sorted[1].colorGlow }}>
              <div className="lb__podium-icon">
                <ClanIcon clan={sorted[1].id} size={52} />
              </div>
              <p className="lb__podium-rank">2nd</p>
              <p className="lb__podium-name">{sorted[1].name}</p>
              <p className="lb__podium-val">{sorted[1][sortBy].toLocaleString()}</p>
              <div className="lb__podium-base lb__podium-base--2" />
            </div>
          )}
          {/* 1st */}
          {sorted[0] && (
            <div className="lb__podium-slot lb__podium-slot--1"
              style={{ "--clan-color": sorted[0].color, "--clan-glow": sorted[0].colorGlow }}>
              <div className="lb__podium-crown">♛</div>
              <div className="lb__podium-icon lb__podium-icon--1">
                <ClanIcon clan={sorted[0].id} size={68} />
              </div>
              <p className="lb__podium-rank lb__podium-rank--1">1st</p>
              <p className="lb__podium-name">{sorted[0].name}</p>
              <p className="lb__podium-val">{sorted[0][sortBy].toLocaleString()}</p>
              <div className="lb__podium-base lb__podium-base--1" />
            </div>
          )}
          {/* 3rd */}
          {sorted[2] && (
            <div className="lb__podium-slot lb__podium-slot--3"
              style={{ "--clan-color": sorted[2].color, "--clan-glow": sorted[2].colorGlow }}>
              <div className="lb__podium-icon">
                <ClanIcon clan={sorted[2].id} size={44} />
              </div>
              <p className="lb__podium-rank">3rd</p>
              <p className="lb__podium-name">{sorted[2].name}</p>
              <p className="lb__podium-val">{sorted[2][sortBy].toLocaleString()}</p>
              <div className="lb__podium-base lb__podium-base--3" />
            </div>
          )}
        </div>

        {/* ── Full rankings list ── */}
        <div className="lb__list">
          {sorted.map((clan, i) => {
            const rank = i + 1;
            const pct  = Math.round((clan[sortBy] / maxVal) * 100);
            const isHigh = highlighted === clan.id;

            return (
              <div
                key={clan.id}
                className={`lb__row ${isHigh ? "lb__row--highlighted" : ""}`}
                style={{ "--clan-color": clan.color, "--clan-dim": clan.colorDim, "--clan-glow": clan.colorGlow }}
                onMouseEnter={() => setHighlighted(clan.id)}
                onMouseLeave={() => setHighlighted(null)}
                onTouchStart={() => setHighlighted(clan.id)}
              >
                {/* Rank */}
                <div className="lb__row-rank">
                  {rank <= 3
                    ? <span className="lb__row-medal">{RANK_LABELS[rank]}</span>
                    : <span className="lb__row-num">{rank}</span>
                  }
                </div>

                {/* Icon */}
                <div className="lb__row-icon">
                  <ClanIcon clan={clan.id} size={38} />
                </div>

                {/* Name + bar */}
                <div className="lb__row-info">
                  <div className="lb__row-top">
                    <span className="lb__row-name">{clan.name}</span>
                    <span className="lb__row-motto">{clan.motto}</span>
                  </div>
                  <div className="lb__row-bar-wrap">
                    <div
                      className="lb__row-bar"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="lb__row-stats">
                  <div className="lb__stat">
                    <span className="lb__stat-val">{clan.points.toLocaleString()}</span>
                    <span className="lb__stat-key">pts</span>
                  </div>
                  <div className="lb__stat lb__stat--sm">
                    <span className="lb__stat-val">{clan.tasks}</span>
                    <span className="lb__stat-key">tasks</span>
                  </div>
                  <div className="lb__stat lb__stat--sm">
                    <span className="lb__stat-val">{clan.wins}</span>
                    <span className="lb__stat-key">wins</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Footer note ── */}
        <p className="lb__note">
          ✦ Scores update in real time as Pandora unfolds ✦
        </p>

      </div>
    </div>
  );
}
