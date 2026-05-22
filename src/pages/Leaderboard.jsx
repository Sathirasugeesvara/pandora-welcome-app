import { useState, useEffect } from "react";
import "./Leaderboard.css";

// ─────────────────────────────────────────────────────────────────
// GOOGLE SHEETS SETUP
// 1. Create a Google Form with 2 fields:
//    - "Clan Name" (dropdown with exact clan names below)
//    - "Points"    (number field)
// 2. Open the linked Google Sheet
//    → File → Share → Publish to web → Sheet1 → CSV → Publish
// 3. Paste that URL below
// ─────────────────────────────────────────────────────────────────
const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1z8dWBB84dKLqcg8phkHKkTlAGIqQyD_5aqWnO5Q8xfs/export?format=csv";

const CLAN_CONFIG = {
  "Omaticaya":        { id: "omaticaya",  color: "#39ff14", colorDim: "rgba(57,255,20,0.10)",   colorGlow: "rgba(57,255,20,0.4)",   img: "/clans/omaticaya.png" },
  "Metkayina":        { id: "metkayina",  color: "#00e5ff", colorDim: "rgba(0,229,255,0.10)",   colorGlow: "rgba(0,229,255,0.4)",   img: "/clans/metkayina.png" },
  "Ash Clan":         { id: "ash",        color: "#ff6b35", colorDim: "rgba(255,107,53,0.10)",  colorGlow: "rgba(255,107,53,0.4)",  img: "/clans/ash-clan.png" },
  "Sky Riders":       { id: "skyriders",  color: "#a78bfa", colorDim: "rgba(167,139,250,0.10)", colorGlow: "rgba(167,139,250,0.4)", img: "/clans/sky-riders.png" },
  "Tulkun Guardians": { id: "tulkun",     color: "#22d3ee", colorDim: "rgba(34,211,238,0.10)",  colorGlow: "rgba(34,211,238,0.4)",  img: "/clans/tulkun-guardians.png" },
  "Pandora Warriors": { id: "warriors",   color: "#c084fc", colorDim: "rgba(192,132,252,0.10)", colorGlow: "rgba(192,132,252,0.4)", img: "/clans/pandora-warriors.png" },
};

const CLAN_MOTTOS = {
  "Omaticaya":        "One with the Forest",
  "Metkayina":        "Strength from the Ocean",
  "Ash Clan":         "Fire is our Strength",
  "Sky Riders":       "Freedom Above All",
  "Tulkun Guardians": "We Protect, We Honor",
  "Pandora Warriors": "United. Strong. Unbreakable.",
};

function parseCSV(csv) {
  const lines = csv.trim().split("\n").slice(1); // skip header row
  const totals = {};

  lines.forEach((line) => {
    const cols   = line.match(/(".*?"|[^,]+)(?=,|$)/g) || [];
    const name   = cols[0]?.replace(/"/g, "").trim();
    const points = parseInt(cols[1]?.replace(/"/g, "").trim(), 10) || 0;
    if (name && CLAN_CONFIG[name]) {
      totals[name] = (totals[name] || 0) + points;
    }
  });

  return Object.entries(CLAN_CONFIG)
    .map(([name, cfg]) => ({
      name,
      ...cfg,
      motto:  CLAN_MOTTOS[name] || "",
      points: totals[name] || 0,
    }))
    .sort((a, b) => b.points - a.points);
}

const ordinal = (n) => ["", "1st", "2nd", "3rd"][n] || `${n}th`;

export default function Leaderboard() {
  const [clans,       setClans]       = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);
  const [highlighted, setHighlighted] = useState(null);

  useEffect(() => {
    fetch(`${SHEET_CSV_URL}&t=${Date.now()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Could not reach Google Sheet");
        return res.text();
      })
      .then((text) => {
        setClans(parseCSV(text));
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        // Show clans with 0 pts so page doesn't break
        setClans(
          Object.entries(CLAN_CONFIG).map(([name, cfg]) => ({
            name, ...cfg, motto: CLAN_MOTTOS[name] || "", points: 0,
          }))
        );
        setLoading(false);
      });
  }, []);

  const maxPts = clans[0]?.points || 1;

  return (
    <div className="lb">
      <div className="lb__bg" aria-hidden="true">
        <div className="lb__bg-orb lb__bg-orb--1" />
        <div className="lb__bg-orb lb__bg-orb--2" />
        <div className="lb__bg-grid" />
      </div>

      <div className="lb__container">

        {/* Header */}
        <div className="lb__header">
          <p className="lb__eyebrow">✦ The Six Clans Compete ✦</p>
          <h2 className="lb__title">Leaderboard</h2>
          <div className="lb__divider">
            <span /><span className="lb__divider-diamond" /><span />
          </div>
          <p className="lb__subtitle">Together as One. Stronger as a Family.</p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="lb__skeletons">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="lb__skeleton" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        )}

        {/* Error notice */}
        {error && !loading && (
          <div className="lb__error">
            <span>⚠</span> Scores unavailable — connect Google Sheet to see live points.
          </div>
        )}

        {/* Podium top 3 */}
        {!loading && clans.length >= 3 && (
          <div className="lb__podium">
            <PodiumSlot clan={clans[1]} rank={2} />
            <PodiumSlot clan={clans[0]} rank={1} />
            <PodiumSlot clan={clans[2]} rank={3} />
          </div>
        )}

        {/* Full list */}
        {!loading && clans.length > 0 && (
          <div className="lb__list">
            {clans.map((clan, i) => {
              const rank = i + 1;
              const pct  = maxPts > 0 ? Math.round((clan.points / maxPts) * 100) : 0;
              return (
                <div
                  key={clan.id}
                  className={`lb__row ${highlighted === clan.id ? "lb__row--highlighted" : ""}`}
                  style={{
                    "--clan-color": clan.color,
                    "--clan-dim":   clan.colorDim,
                    "--clan-glow":  clan.colorGlow,
                    animationDelay: `${i * 0.07}s`,
                  }}
                  onMouseEnter={() => setHighlighted(clan.id)}
                  onMouseLeave={() => setHighlighted(null)}
                  onTouchStart={() => setHighlighted((h) => h === clan.id ? null : clan.id)}
                >
                  {/* Rank */}
                  <div className="lb__row-rank">
                    {rank === 1 && <span className="lb__medal">🥇</span>}
                    {rank === 2 && <span className="lb__medal">🥈</span>}
                    {rank === 3 && <span className="lb__medal">🥉</span>}
                    {rank  > 3 && <span className="lb__row-num">{rank}</span>}
                  </div>

                  {/* Icon */}
                  <div className="lb__row-icon">
                    <img
                      src={clan.img}
                      alt={clan.name}
                      className="lb__row-img"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  </div>

                  {/* Name + bar */}
                  <div className="lb__row-info">
                    <div className="lb__row-top">
                      <span className="lb__row-name">{clan.name}</span>
                      <span className="lb__row-motto">{clan.motto}</span>
                    </div>
                    <div className="lb__row-bar-wrap">
                      <div className="lb__row-bar" style={{ width: `${pct}%` }} />
                    </div>
                  </div>

                  {/* Points */}
                  <div className="lb__row-pts">
                    <span className="lb__pts-val">{clan.points.toLocaleString()}</span>
                    <span className="lb__pts-label">pts</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <p className="lb__note">✦ Scores update in real time as Pandora unfolds ✦</p>
      </div>
    </div>
  );
}

function PodiumSlot({ clan, rank }) {
  return (
    <div
      className={`lb__podium-slot lb__podium-slot--${rank}`}
      style={{
        "--clan-color": clan.color,
        "--clan-glow":  clan.colorGlow,
        "--clan-dim":   clan.colorDim,
      }}
    >
      {rank === 1 && <div className="lb__podium-crown">♛</div>}
      <div className="lb__podium-icon">
        <img
          src={clan.img}
          alt={clan.name}
          className="lb__podium-img"
          onError={(e) => { e.target.style.display = "none"; }}
        />
      </div>
      <p className="lb__podium-rank">{ordinal(rank)}</p>
      <p className="lb__podium-name">{clan.name}</p>
      <p className="lb__podium-pts">
        {clan.points.toLocaleString()} <span>pts</span>
      </p>
      <div className="lb__podium-base" />
    </div>
  );
}
