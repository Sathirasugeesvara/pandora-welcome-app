import { useState } from "react";
import "./Clans.css";

const CLANS = [
  {
    id: "omaticaya",
    name: "Omaticaya",
    title: "People of the Forest",
    motto: "One with the Forest",
    color: "#39ff14",
    colorDim: "rgba(57,255,20,0.08)",
    colorGlow: "rgba(57,255,20,0.4)",
    colorMid: "rgba(57,255,20,0.2)",
    img: "/clans/omaticaya.png",
    element: "🌿 Earth",
    strength: "Spirit Bond",
    territory: "Hometree Forest",
    description:
      "The Omaticaya are the forest-born clan — deeply connected to the spirit of Pandora through Eywa. Their bond with the Ikran and the forest creatures runs deeper than blood. They move like shadows between ancient trees, feeling every pulse of the living world beneath their feet.",
    traits: ["Spiritual", "Agile", "Hunters", "Mystic"],
    power: 92,
  },
  {
    id: "metkayina",
    name: "Metkayina",
    title: "People of the Ocean",
    motto: "Strength from the Ocean",
    color: "#00e5ff",
    colorDim: "rgba(0,229,255,0.08)",
    colorGlow: "rgba(0,229,255,0.4)",
    colorMid: "rgba(0,229,255,0.2)",
    img: "/clans/metkayina.png",
    element: "🌊 Water",
    strength: "Ocean Mastery",
    territory: "Coral Reefs of Pandora",
    description:
      "Born from the sea, the Metkayina are a proud reef clan who ride the great Tulkun like kin and breathe the ocean as their second home. Their tails are broader, their lungs deeper, their hearts as vast as the endless waters they call home.",
    traits: ["Divers", "Riders", "Healers", "Enduring"],
    power: 88,
  },
  {
    id: "ash",
    name: "Ash Clan",
    title: "Children of the Flame",
    motto: "Fire is our Strength",
    color: "#ff6b35",
    colorDim: "rgba(255,107,53,0.08)",
    colorGlow: "rgba(255,107,53,0.4)",
    colorMid: "rgba(255,107,53,0.2)",
    img: "/clans/ash-clan.png",
    element: "🔥 Fire",
    strength: "Volcanic Power",
    territory: "The Ash Peaks",
    description:
      "Forged in the shadow of Pandora's great volcanoes, the Ash Clan carries the fire of the earth in their veins. Fearless and relentless, they channel the raw destructive beauty of lava fields into unmatched warrior spirit. Where others see ruin, they find power.",
    traits: ["Warriors", "Fearless", "Forge", "Explosive"],
    power: 85,
  },
  {
    id: "skyriders",
    name: "Sky Riders",
    title: "Lords of the Sky",
    motto: "Freedom Above All",
    color: "#a78bfa",
    colorDim: "rgba(167,139,250,0.08)",
    colorGlow: "rgba(167,139,250,0.4)",
    colorMid: "rgba(167,139,250,0.2)",
    img: "/clans/sky-riders.png",
    element: "⚡ Wind",
    strength: "Aerial Combat",
    territory: "The Floating Peaks",
    description:
      "The Sky Riders soar above the clouds on their great Ikran, masters of wind and altitude. They see the world as no ground-dweller can — vast, boundless, and full of possibility. Freedom is not a word to them. It is a way of breathing.",
    traits: ["Scouts", "Swift", "Tacticians", "Free"],
    power: 87,
  },
  {
    id: "tulkun",
    name: "Tulkun Guardians",
    title: "Sentinels of the Deep",
    motto: "We Protect, We Honor",
    color: "#22d3ee",
    colorDim: "rgba(34,211,238,0.08)",
    colorGlow: "rgba(34,211,238,0.4)",
    colorMid: "rgba(34,211,238,0.2)",
    img: "/clans/tulkun-guardians.png",
    element: "🐋 Deep",
    strength: "Ancient Wisdom",
    territory: "The Deep Waters",
    description:
      "Bound to the great Tulkun — the most intelligent beings on Pandora — the Tulkun Guardians are protectors of ancient knowledge and sacred bonds. They do not fight without cause, but when the deep is threatened, no force in Pandora can stand against their resolve.",
    traits: ["Protectors", "Wise", "Loyal", "Ancient"],
    power: 83,
  },
  {
    id: "warriors",
    name: "Pandora Warriors",
    title: "United Blade of Pandora",
    motto: "United. Strong. Unbreakable.",
    color: "#c084fc",
    colorDim: "rgba(192,132,252,0.08)",
    colorGlow: "rgba(192,132,252,0.4)",
    colorMid: "rgba(192,132,252,0.2)",
    img: "/clans/pandora-warriors.png",
    element: "💜 Spirit",
    strength: "Unity & Honor",
    territory: "All of Pandora",
    description:
      "The Pandora Warriors draw their strength not from one land or one element — but from the unbreakable bond between all clans. They are the living proof that when Pandora's people stand as one, no enemy can divide them. Their spirit is the spirit of the planet itself.",
    traits: ["United", "Honorable", "Versatile", "Unbreakable"],
    power: 90,
  },
];

export default function Clans() {
  const [active, setActive] = useState(null);

  return (
    <div className="clans">
      {/* Background */}
      <div className="clans__bg" aria-hidden="true">
        <div className="clans__bg-orb clans__bg-orb--1" />
        <div className="clans__bg-orb clans__bg-orb--2" />
        <div className="clans__bg-orb clans__bg-orb--3" />
        <div className="clans__bg-grid" />
      </div>

      <div className="clans__container">

        {/* Header */}
        <div className="clans__header">
          <p className="clans__eyebrow">✦ The Six Clans of Pandora ✦</p>
          <h2 className="clans__title">Choose Your Clan</h2>
          <div className="clans__divider">
            <span /><span className="clans__diamond" /><span />
          </div>
          <p className="clans__subtitle">
            Each clan carries the soul of Pandora in their own way.<br />
            Which calls to you?
          </p>
        </div>

        {/* Grid */}
        <div className="clans__grid">
          {CLANS.map((clan, i) => (
            <div
              key={clan.id}
              className={`clan-card ${active === clan.id ? "clan-card--active" : ""}`}
              style={{
                "--c":    clan.color,
                "--cdim": clan.colorDim,
                "--cglow":clan.colorGlow,
                "--cmid": clan.colorMid,
                animationDelay: `${i * 0.08}s`,
              }}
              onClick={() => setActive(active === clan.id ? null : clan.id)}
            >
              {/* Glow border animation */}
              <div className="clan-card__border" />

              {/* Top section */}
              <div className="clan-card__top">
                {/* Image */}
                <div className="clan-card__img-wrap">
                  <div className="clan-card__img-ring" />
                  <img
                    src={clan.img}
                    alt={clan.name}
                    className="clan-card__img"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                  <div className="clan-card__img-glow" />
                </div>

                {/* Name block */}
                <div className="clan-card__name-block">
                  <p className="clan-card__title">{clan.title}</p>
                  <h3 className="clan-card__name">{clan.name}</h3>
                  <p className="clan-card__motto">"{clan.motto}"</p>
                </div>
              </div>

              {/* Element + territory pills */}
              <div className="clan-card__pills">
                <span className="clan-card__pill">{clan.element}</span>
                <span className="clan-card__pill">{clan.strength}</span>
              </div>

              {/* Power bar */}
              <div className="clan-card__power">
                <div className="clan-card__power-label">
                  <span>Clan Power</span>
                  <span className="clan-card__power-num">{clan.power}</span>
                </div>
                <div className="clan-card__power-track">
                  <div
                    className="clan-card__power-fill"
                    style={{ width: active === clan.id ? `${clan.power}%` : "0%" }}
                  />
                </div>
              </div>

              {/* Expandable description */}
              <div className={`clan-card__expand ${active === clan.id ? "clan-card__expand--open" : ""}`}>
                <div className="clan-card__expand-inner">
                  {/* Separator */}
                  <div className="clan-card__sep" />

                  {/* Description */}
                  <p className="clan-card__desc">{clan.description}</p>

                  {/* Territory */}
                  <div className="clan-card__territory">
                    <span className="clan-card__territory-label">Territory</span>
                    <span className="clan-card__territory-val">{clan.territory}</span>
                  </div>

                  {/* Traits */}
                  <div className="clan-card__traits">
                    {clan.traits.map((t) => (
                      <span key={t} className="clan-card__trait">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tap hint */}
              <div className="clan-card__hint">
                {active === clan.id ? "▲ Close" : "▼ Learn More"}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <div className="clans__footer-line">
          <span /><p>Together as One. Stronger as a Family. #PMTFamily</p><span />
        </div>
      </div>
    </div>
  );
}
