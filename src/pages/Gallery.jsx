import { useState } from "react";
import "./Gallery.css";

 //import pandora1 from "../assets/image1.png";
 import pandora2 from "../assets/pandora2.png";
 import pandora3 from "../assets/pandora3.png";
 import pandora4 from "../assets/pandora4.png";
 import pandora5 from "../assets/pandora5.png";
 import pandora6 from "../assets/pandora6.png";
 import pandora7 from "../assets/pandora7.png";
 import pandora8 from "../assets/pandoraimage1.png";
 import pandora9 from "../assets/pandoraimage2.png";
 import pandora10 from "../assets/pandoraimage3.png";
 import pandora11 from "../assets/pandoraimage4.png";

const PANDORA_IMAGES = [
  //{ src: pandora1, caption: "One Family • One Journey • PMT Freshers' Welcome 2026" },
  { src: pandora2, caption: "Pandora Warriors • Strength Through Unity" },
  { src: pandora3, caption: "Metkayina • Guardians of the Ocean Spirit" },
  { src: pandora4, caption: "Omatikaya • Keepers of the Sacred Forest" },
  { src: pandora5, caption: "Tulkun Guardians • Courage Beyond the Waves" },
  { src: pandora6, caption: "Ash Clan • Forged in Fire, Bound by Pride" },
  { src: pandora7, caption: "Sky Riders • Together We Soar Higher" },
];

const PANDORA_HIGHLIGHTS = [
  {src: pandora8, caption: "The Guardian of Pandora welcomes the PMT Family."},
  {src: pandora9, caption: "Fire, spirit, and the heartbeat of Pandora."},
  {src: pandora10, caption: "The hunt begins — every warrior has a story."},
  {src: pandora11, caption: "A moment of wonder beneath the Tree of Souls."},
];

// MELLON'25 GALLERY

 import mellon1 from "../assets/mellon1.png";
 import mellon2 from "../assets/mellon2.png";
 import mellon3 from "../assets/mellon3.png";
 import mellon4 from "../assets/mellon4.png";
 import mellon5 from "../assets/mellon5.png";

const MELLON_IMAGES = [
   { src: mellon1, caption: "" },
   { src: mellon2, caption: "" },
   { src: mellon3, caption: "" },
   { src: mellon4, caption: "" },
   { src: mellon5, caption: "" },
];

// EXPERANZA GALLERY

 import experanza1 from "../assets/experanza1.png";
 import experanza2 from "../assets/experanza2.png";
 import experanza3 from "../assets/experanza3.png";
 import experanza4 from "../assets/experanza4.png";
 import experanza5 from "../assets/experanza5.png";

const EXPERANZA_IMAGES = [
   { src: experanza1, caption: "" },
   { src: experanza2, caption: "" },
   { src: experanza3, caption: "" },
   { src: experanza4, caption: "" },
   { src: experanza5, caption: "" },
];

// ENCHANTUS'23 GALLERY — 5 photos

 import enchantus1 from "../assets/enchantus1.png";
 import enchantus2 from "../assets/enchantus2.png";
 import enchantus3 from "../assets/enchantus3.png";
 import enchantus4 from "../assets/enchantus4.png";
 import enchantus5 from "../assets/enchantus5.png";

const ENCHANTUS_IMAGES = [
  { src: enchantus1, caption: "" },
  { src: enchantus2, caption: "" },
  { src: enchantus3, caption: "" },
  { src: enchantus4, caption: "" },
  { src: enchantus5, caption: "" }
];

// ── Lightbox ──────────────────────────────────────────────────
function Lightbox({ img, onClose }) {
  if (!img) return null;
  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lightbox__close" onClick={onClose}>✕</button>
      <img
        src={img.src}
        alt={img.caption || ""}
        className="lightbox__img"
        onClick={(e) => e.stopPropagation()}
      />
      {img.caption && (
        <p className="lightbox__caption">{img.caption}</p>
      )}
    </div>
  );
}

// ── Empty slot ────────────────────────────────────────────────
function EmptySlot({ index, total }) {
  return (
    <div className="gal__slot" style={{ animationDelay: `${index * 0.06}s` }}>
      <div className="gal__slot-inner">
        <div className="gal__slot-scan" style={{ animationDelay: `${index * 0.4}s` }} />
        <span className="gal__corner gal__corner--tl" />
        <span className="gal__corner gal__corner--tr" />
        <span className="gal__corner gal__corner--bl" />
        <span className="gal__corner gal__corner--br" />
        <div className="gal__slot-empty">
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
            <rect x="3" y="6" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="1" />
            <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1" />
            <circle cx="21" cy="9" r="1.5" fill="currentColor" opacity="0.4" />
          </svg>
          <span>Coming Soon</span>
        </div>
      </div>
    </div>
  );
}

// ── Filled slot ───────────────────────────────────────────────
function FilledSlot({ img, index, onClick }) {
  return (
    <div
      className="gal__slot gal__slot--filled"
      style={{ animationDelay: `${index * 0.06}s` }}
      onClick={() => onClick(img)}
    >
      <div className="gal__slot-inner">
        <img src={img.src} alt={img.caption || ""} className="gal__slot-img" />
        <div className="gal__slot-shimmer" />
        {img.caption && <div className="gal__slot-caption">{img.caption}</div>}
        <span className="gal__corner gal__corner--tl" />
        <span className="gal__corner gal__corner--tr" />
        <span className="gal__corner gal__corner--bl" />
        <span className="gal__corner gal__corner--br" />
        <div className="gal__slot-zoom">🔍</div>
      </div>
    </div>
  );
}

// ── Gallery Section ───────────────────────────────────────────
function GallerySection({
  id,
  eyebrow,
  title,
  subtitle,
  color,
  colorDim,
  colorGlow,
  images,
  highlights = [],
  totalSlots,
  onOpenLight,
}) {
  const filled    = images.length;
  const empties   = Math.max(0, totalSlots - filled);
  const hasImages = filled > 0;
  const featured = images.length === totalSlots ? images[0] : null;
  const gridImgs =
    featured
      ? images.slice(1)
      : images;
  const gridEmpties = Math.max(0, totalSlots - 1 - gridImgs.length);

  return (
    <div
      className="gal__section"
      id={id}
      style={{ "--sec-color": color, "--sec-dim": colorDim, "--sec-glow": colorGlow }}
    >
      {/* Section header */}
      <div className="gal__section-header">
        <p className="gal__section-eyebrow">{eyebrow}</p>
        <h3 className="gal__section-title">{title}</h3>
        <div className="gal__section-divider">
          <span />
          <span className="gal__section-gem" />
          <span className="gal__section-gem gal__section-gem--sm" />
          <span className="gal__section-gem" />
          <span />
        </div>
        <p className="gal__section-subtitle">{subtitle}</p>
        <div className="gal__section-count">
          <span className="gal__section-count-filled">{filled}</span>
          <span className="gal__section-count-sep">/</span>
          <span className="gal__section-count-total">{totalSlots}</span>
          <span className="gal__section-count-label">photos</span>
        </div>
      </div>

      {/* Featured image */}
      {featured ? (
        <div className="gal__featured" onClick={() => onOpenLight(featured)}>
          <span className="gal__feat-corner gal__feat-corner--tl" />
          <span className="gal__feat-corner gal__feat-corner--tr" />
          <span className="gal__feat-corner gal__feat-corner--bl" />
          <span className="gal__feat-corner gal__feat-corner--br" />
          <img src={featured.src} alt={featured.caption || title} className="gal__featured-img" />
          <div className="gal__featured-overlay">
            <div className="gal__featured-overlay-inner">
              {featured.caption && <p className="gal__featured-caption">{featured.caption}</p>}
              <span className="gal__featured-tag">✦ Featured</span>
            </div>
          </div>
        </div>
      ) : (
        /* No images yet — big empty state */
        <div className="gal__empty-state">
          <div className="gal__empty-state-glow" />
          <span className="gal__feat-corner gal__feat-corner--tl" />
          <span className="gal__feat-corner gal__feat-corner--tr" />
          <span className="gal__feat-corner gal__feat-corner--bl" />
          <span className="gal__feat-corner gal__feat-corner--br" />
          <div className="gal__empty-icon">
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
              <rect x="4" y="11" width="44" height="32" rx="3" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="26" cy="27" r="8" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="26" cy="27" r="3.5" fill="currentColor" opacity="0.25" />
              <rect x="18" y="7" width="8" height="4" rx="2" stroke="currentColor" strokeWidth="1" />
              <circle cx="40" cy="16" r="2" fill="currentColor" opacity="0.4" />
            </svg>
          </div>
          <p className="gal__empty-title">No Photos Yet</p>
          <p className="gal__empty-sub">Photos will appear here once the event takes place.</p>
          <div className="gal__empty-badge">
            <span className="gal__pulse" />
            Coming Soon
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="gal__grid">
        {gridImgs.map((img, i) => (
          <FilledSlot key={i} img={img} index={i} onClick={onOpenLight} />
        ))}
        {Array.from({ length: gridEmpties }).map((_, i) => (
          <EmptySlot key={`e${i}`} index={gridImgs.length + i} />
        ))}
      </div>

      {/* Event Highlights */}

{highlights.length > 0 && (
  <>
    <div className="gal__highlights-header">
      <p className="gal__highlights-eyebrow">
        ✦ EVENT HIGHLIGHTS ✦
      </p>

      <h4 className="gal__highlights-title">
        Memories from Pandora
      </h4>

      <p className="gal__highlights-subtitle">
        Every smile, every performance and every unforgettable moment from the
        Freshers' Welcome.
      </p>
    </div>

    <div className="gal__grid">
      {highlights.map((img, i) => (
        <FilledSlot
          key={i}
          img={img}
          index={i}
          onClick={onOpenLight}
        />
      ))}
    </div>
  </>
)}
    </div>
  );
}

// ── Main Gallery Page ─────────────────────────────────────────
export default function Gallery() {
  const [lightboxImg, setLightboxImg] = useState(null);

  return (
    <div className="gallery">
      {/* Background */}
      <div className="gallery__bg" aria-hidden="true">
        <div className="gallery__bg-orb gallery__bg-orb--1" />
        <div className="gallery__bg-orb gallery__bg-orb--2" />
        <div className="gallery__bg-grid" />
      </div>

      {/* Lightbox */}
      <Lightbox img={lightboxImg} onClose={() => setLightboxImg(null)} />

      <div className="gallery__container">

        {/* Page header */}
        <div className="gallery__header">
          <p className="gallery__eyebrow">✦ Memories of the PMT Family ✦</p>
          <h2 className="gallery__title">Gallery</h2>
          <div className="gallery__divider">
            <span />
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <polygon points="10,1 18,6 18,14 10,19 2,14 2,6"
                stroke="#00e5ff" strokeWidth="1" fill="none" opacity="0.6" />
              <circle cx="10" cy="10" r="2" fill="#00e5ff" opacity="0.8" />
            </svg>
            <span />
          </div>
          <p className="gallery__desc">
            Three events. One family. Every moment lives here forever.
          </p>

          {/* Section jump links — use JS scroll, NOT href anchors */}
          <div className="gallery__jumps">
            {[
              { id: "sec-pandora",   label: "🌿 Pandora" },
              { id: "sec-mellon",    label: "🌟 Mellon'25" },
              { id: "sec-experanza", label: "💫 Experanza" },
              { id: "sec-enchantus", label: "✨ Enchantus'23" },
            ].map((j) => (
              <button
                key={j.id}
                className="gallery__jump"
                onClick={() => {
                  document.getElementById(j.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                {j.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Section 1: PANDORA ── */}
        <GallerySection
          id="sec-pandora"
          eyebrow="✦ Freshers' Welcome 2026 ✦"
          title="PANDORA"
          subtitle="A New Journey Begins — photos from an unforgettable day."
          color="#00e5ff"
          colorDim="rgba(0,229,255,0.06)"
          colorGlow="rgba(0,229,255,0.3)"
          images={PANDORA_IMAGES}
          highlights={PANDORA_HIGHLIGHTS}
          totalSlots={7}
          onOpenLight={setLightboxImg}
        />

        {/* ── Section 2: MELLON'25 ── */}
        <GallerySection
          id="sec-mellon"
          eyebrow="✦ 2025 ✦"
          title="MELLON'25"
          subtitle="Moments from the Mellon gathering — our bonds run deeper than time."
          color="#a78bfa"
          colorDim="rgba(167,139,250,0.06)"
          colorGlow="rgba(167,139,250,0.3)"
          images={MELLON_IMAGES}
          totalSlots={5}
          onOpenLight={setLightboxImg}
        />

        {/* ── Section 3: EXPERANZA ── */}
        <GallerySection
          id="sec-experanza"
          eyebrow="✦ 2024 ✦"
          title="EXPERANZA"
          subtitle="Where talent meets tradition — the spirit of Experanza lives on."
          color="#39ff14"
          colorDim="rgba(57,255,20,0.06)"
          colorGlow="rgba(57,255,20,0.3)"
          images={EXPERANZA_IMAGES}
          totalSlots={5}
          onOpenLight={setLightboxImg}
        />

        {/* ── Section 4: ENCHANTUS'23 ── */}
        <GallerySection
          id="sec-enchantus"
          eyebrow="✦ 2023 ✦"
          title="ENCHANTUS'23"
          subtitle="The day that enchanted us all — relive the magic of 2023."
          color="#f59e0b"
          colorDim="rgba(245,158,11,0.06)"
          colorGlow="rgba(245,158,11,0.3)"
          images={ENCHANTUS_IMAGES}
          totalSlots={5}
          onOpenLight={setLightboxImg}
        />

        {/* Bottom */}
        <div className="gallery__bottom">
          <p className="gallery__bottom-text">
            Be part of the story — every moment is immortalised here.
          </p>
        </div>

      </div>
    </div>
  );
}
