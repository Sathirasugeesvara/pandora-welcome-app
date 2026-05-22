import "./Gallery.css";

const PLACEHOLDER_SLOTS = Array.from({ length: 12 });

export default function Gallery() {
  return (
    <section id="gallery" className="gallery">

      {/* Background atmosphere */}
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
            The event hasn't taken place yet — but when Pandora awakens,
            every memory will live here.
          </p>
        </div>

        {/* Empty-state hero card */}
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

        {/* Placeholder grid */}
        <div className="gallery__grid">
          {PLACEHOLDER_SLOTS.map((_, i) => (
            <div
              key={i}
              className="gallery__slot"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
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
