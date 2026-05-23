import "./Gallery.css";

// import image1 from "../assets/image1.png";
// import image2 from "../assets/image2.png";
// import image3 from "../assets/image3.png";
// import image4 from "../assets/image4.png";
// import image5 from "../assets/image5.png";
// import image6 from "../assets/image6.png";

const IMAGES = [
  //{ src: image1, caption: "Pandora Awakens" },
  // { src: image2, caption: "" },
  // { src: image3, caption: "" },
  // { src: image4, caption: "" },
  // { src: image5, caption: "" },
  // { src: image6, caption: "" },
];

// Remaining empty slots to always show 6 grid cells
const GRID_SIZE   = 6;
const filledCount = IMAGES.length;
const emptySlots  = Math.max(0, GRID_SIZE - filledCount);

export default function Gallery() {
  return (
    <section id="gallery" className="gallery">

      {/* Background */}
      <div className="gallery__bg" aria-hidden="true">
        <div className="gallery__bg-orb gallery__bg-orb--1" />
        <div className="gallery__bg-orb gallery__bg-orb--2" />
        <div className="gallery__bg-grid" />
      </div>

      <div className="gallery__container">

        {/* Header */}
        <div className="gallery__header">
          <p className="gallery__eyebrow">✦ Memories of Pandora ✦</p>
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
            {filledCount === 0
              ? "The event hasn't taken place yet — but when Pandora awakens, every memory will live here."
              : `${filledCount} moment${filledCount > 1 ? "s" : ""} captured from the world of Pandora.`
            }
          </p>
        </div>

        {/* ── Featured main image ── */}
        {IMAGES.length > 0 && (
          <div className="gallery__featured">
            <div className="gallery__featured-corner gallery__featured-corner--tl" />
            <div className="gallery__featured-corner gallery__featured-corner--tr" />
            <div className="gallery__featured-corner gallery__featured-corner--bl" />
            <div className="gallery__featured-corner gallery__featured-corner--br" />
            <img
              src={IMAGES[0].src}
              alt={IMAGES[0].caption || "Pandora"}
              className="gallery__featured-img"
            />
            <div className="gallery__featured-overlay">
              <div className="gallery__featured-overlay-inner">
                {IMAGES[0].caption && (
                  <p className="gallery__featured-caption">{IMAGES[0].caption}</p>
                )}
                <p className="gallery__featured-tag">✦ Featured</p>
              </div>
            </div>
          </div>
        )}

        {/* ── Empty state if no images at all ── */}
        {IMAGES.length === 0 && (
          <div className="gallery__empty-hero">
            <div className="gallery__empty-hero-glow" />
            <div className="gallery__empty-hero-icon">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <rect x="6" y="14" width="52" height="38" rx="4"
                  stroke="url(#camGrad)" strokeWidth="1.5" />
                <circle cx="32" cy="33" r="10"
                  stroke="url(#camGrad)" strokeWidth="1.5" />
                <circle cx="32" cy="33" r="5" fill="url(#camGrad)" opacity="0.2" />
                <rect x="22" y="10" width="10" height="4" rx="2"
                  stroke="url(#camGrad)" strokeWidth="1.2" />
                <circle cx="50" cy="20" r="2.5" fill="url(#camGrad)" opacity="0.5" />
                <defs>
                  <linearGradient id="camGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#00e5ff" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3 className="gallery__empty-hero-title">No Photos Yet</h3>
            <p className="gallery__empty-hero-sub">
              The Pandora event is coming soon.<br />
              Once it unfolds, this gallery will fill with moments from all clans.
            </p>
            <div className="gallery__empty-hero-badge">
              <span className="gallery__pulse" />
              Event Incoming
            </div>
          </div>
        )}

        {/* ── Grid (filled + empty slots) ── */}
        <div className="gallery__grid">

          {/* Real images (skip index 0 — already shown as featured) */}
          {IMAGES.slice(1).map((img, i) => (
            <div key={i} className="gallery__slot gallery__slot--filled"
              style={{ animationDelay: `${i * 0.06}s` }}>
              <div className="gallery__slot-inner">
                <img
                  src={img.src}
                  alt={img.caption || `Pandora moment ${i + 2}`}
                  className="gallery__slot-img"
                />
                {img.caption && (
                  <div className="gallery__slot-caption">{img.caption}</div>
                )}
                <span className="gallery__corner gallery__corner--tl" />
                <span className="gallery__corner gallery__corner--tr" />
                <span className="gallery__corner gallery__corner--bl" />
                <span className="gallery__corner gallery__corner--br" />
              </div>
            </div>
          ))}

          {/* Empty placeholder slots */}
          {Array.from({ length: emptySlots }).map((_, i) => (
            <div key={`empty-${i}`} className="gallery__slot"
              style={{ animationDelay: `${(IMAGES.length + i) * 0.06}s` }}>
              <div className="gallery__slot-inner">
                <div className="gallery__slot-scan" />
                <span className="gallery__corner gallery__corner--tl" />
                <span className="gallery__corner gallery__corner--tr" />
                <span className="gallery__corner gallery__corner--bl" />
                <span className="gallery__corner gallery__corner--br" />
                <svg className="gallery__slot-icon" width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="3" y="6" width="22" height="16" rx="2"
                    stroke="currentColor" strokeWidth="1" />
                  <circle cx="14" cy="14" r="4"
                    stroke="currentColor" strokeWidth="1" />
                  <circle cx="21" cy="9" r="1.5" fill="currentColor" opacity="0.4" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="gallery__bottom">
          <p className="gallery__bottom-text">
            Be part of the story — join us on the day and your moments will be immortalised here.
          </p>
        </div>

      </div>
    </section>
  );
}
