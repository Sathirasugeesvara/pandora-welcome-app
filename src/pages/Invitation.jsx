import { useState, useEffect, useRef } from "react";
import "./Invitation.css";

const SHEET_ID  = "1p3fyLuCrlzu0tbjLgcmPnaePwi3mlX7opY6vcWVjnFg";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=Sheet1`;


const EVENT_DATE  = "Coming Soon";   // e.g. "15th August 2026"
const EVENT_TIME  = "Coming Soon";   // e.g. "6:00 PM"
const EVENT_VENUE = "Coming Soon";   // e.g. "Nelum Pokuna Theatre"


function parseCSV(csv) {
  const lines = csv.trim().split("\n").slice(1);
  return lines.map((line) => {
    const cols = line.match(/(".*?"|[^,\n]+)/g) || [];
    return {
      name:  cols[0]?.replace(/"/g, "").trim() || "",
      index: cols[1]?.replace(/"/g, "").trim() || "",
      image: cols[2]?.replace(/"/g, "").trim() || "", 
    };
  }).filter((r) => r.name && r.index);
}


function toDriveEmbed(url) {
  if (!url) return "";
  
  // Format 1: https://drive.google.com/file/d/FILE_ID/view
  const matchD = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (matchD) return `https://drive.google.com/thumbnail?id=${matchD[1]}&sz=s400`;

  // Format 2: https://drive.google.com/open?id=FILE_ID
  const matchOpen = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (matchOpen) return `https://drive.google.com/thumbnail?id=${matchOpen[1]}&sz=s400`;

  return url;
}


function Spores() {
  return (
    <div className="inv__spores" aria-hidden="true">
      {Array.from({ length: 40 }).map((_, i) => (
        <span key={i} className="inv__spore"
          style={{
            left: `${(i * 2.6 + 1) % 100}%`,
            animationDelay: `${(i * 0.25) % 9}s`,
            animationDuration: `${6 + (i % 6)}s`,
            width:  `${1.5 + (i % 3)}px`,
            height: `${1.5 + (i % 3)}px`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}

export default function Invitation() {
  const [query,     setQuery]     = useState("");
  const [freshers,  setFreshers]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);
  const [result,    setResult]    = useState(null);
  const [notFound,  setNotFound]  = useState(false);
  const [revealed,  setRevealed]  = useState(false);
  const [searching, setSearching] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [imgError,  setImgError]  = useState(false);
  const inputRef = useRef(null);
  const cardRef  = useRef(null);

  useEffect(() => {
    fetch(`${SHEET_URL}&cachebust=${Date.now()}`, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then((text) => {
        if (text.includes("Sign in")) throw new Error("Sheet is private — set sharing to 'Anyone with link'");
        setFreshers(parseCSV(text));
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  
  const handleSearch = () => {
    const q = query.trim().toUpperCase();
    if (!q) return;
    setSearching(true);
    setRevealed(false);
    setNotFound(false);
    setImgError(false);
    setResult(null);

    setTimeout(() => {
      const match = freshers.find((f) => f.index.toUpperCase() === q);
      setSearching(false);
      if (match) {
        setResult(match);
        setTimeout(() => setRevealed(true), 80);
      } else {
        setNotFound(true);
      }
    }, 1200);
  };

  // Download using html2canvas
  const handleDownload = async () => {
    if (!cardRef.current || downloading) return;
    setDownloading(true);
    try {
      // Dynamically load html2canvas
      if (!window.html2canvas) {
        await new Promise((resolve, reject) => {
          const s = document.createElement("script");
          s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
          s.onload = resolve;
          s.onerror = reject;
          document.head.appendChild(s);
        });
      }
      const canvas = await window.html2canvas(cardRef.current, {
  backgroundColor: "#020e1c",
  scale: 3,           // higher = sharper
  useCORS: true,
  allowTaint: false,
  logging: false,
  letterRendering: true,
  foreignObjectRendering: false,
});
      const link = document.createElement("a");
      link.download = `Pandora_Invitation_${result.index}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
      alert("Download failed. Try right-clicking the card and saving as image.");
    } finally {
      setDownloading(false);
    }
  };

  const photoUrl = result ? toDriveEmbed(result.image) : "";

  return (
    <div className={`inv ${revealed ? "inv--revealed" : ""}`}>
      <div className="inv__bg" aria-hidden="true">
        <div className="inv__bg-layer inv__bg-layer--1" />
        <div className="inv__bg-layer inv__bg-layer--2" />
        <div className="inv__bg-layer inv__bg-layer--3" />
        <div className="inv__bg-vignette" />
        <div className="inv__bg-grid" />
        <div className="inv__bg-scanlines" />
      </div>

      <Spores />

      <div className="inv__container">

        {/* ── Page hero ── */}
        <div className="inv__hero">
          <div className="inv__hero-badge">
            <span className="inv__hero-badge-dot" />
            <span>Freshers' Welcome · 2026</span>
            <span className="inv__hero-badge-dot" />
          </div>

          <div className="inv__logo-wrap">
            <div className="inv__logo-ring inv__logo-ring--1" />
            <div className="inv__logo-ring inv__logo-ring--2" />
            <img src="/favicon.png" alt="PMT" className="inv__logo-img"
              onError={(e) => { e.target.style.display = "none"; }} />
          </div>

          <h1 className="inv__hero-title">
            <span className="inv__hero-small">AMT Family presents</span>
            <span className="inv__hero-pandora">PANDORA</span>
            <span className="inv__hero-sub">A New Journey Begins</span>
          </h1>

          <div className="inv__ornament">
            <span /><span className="inv__gem" /><span className="inv__gem inv__gem--sm" /><span className="inv__gem" /><span />
          </div>

          <p className="inv__hero-desc">
            The gates of Pandora open for those who are chosen.<br />
            Enter your index number to reveal your personal invitation.
          </p>
        </div>

        {/* ── Search ── */}
        <div className="inv__search-section">
          {loading && (
            <div className="inv__loading">
              <div className="inv__loading-orb">
                <div className="inv__loading-ring" />
                <span className="inv__loading-dot" />
              </div>
              <span className="inv__loading-text">Summoning the scroll of Pandora…</span>
            </div>
          )}

          {error && (
            <div className="inv__error-wrap">
              <span className="inv__error-icon">⚠</span>
              <p className="inv__error-text">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className="inv__input-wrap">
              <label className="inv__input-label">YOUR INDEX NUMBER</label>
              <div className="inv__input-row">
                <div className="inv__input-box">
                  <span className="inv__input-prefix">✦</span>
                  <input
                    ref={inputRef}
                    type="text"
                    className="inv__input"
                    placeholder="e.g. AS20251234"
                    value={query}
                    maxLength={20}
                    onChange={(e) => {
                      setQuery(e.target.value.toUpperCase());
                      setNotFound(false);
                      if (!e.target.value) { setResult(null); setRevealed(false); }
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <button
                  className={`inv__btn ${searching ? "inv__btn--searching" : ""}`}
                  onClick={handleSearch}
                  disabled={searching}
                >
                  {searching ? (
                    <span className="inv__btn-spinner" />
                  ) : (
                    <>Reveal <span className="inv__btn-arrow">→</span></>
                  )}
                </button>
              </div>

              {searching && (
                <div className="inv__searching-msg">
                  <span className="inv__searching-pulse" />
                  <span>Searching the scrolls of Pandora…</span>
                </div>
              )}

              {notFound && !searching && (
                <div className="inv__not-found">
                  <div className="inv__not-found-icon">◌</div>
                  <p className="inv__not-found-title">No Invitation Found</p>
                  <p className="inv__not-found-sub">
                    The index number <strong>{query}</strong> is not in the list.<br />
                    Check the spelling or contact the organiser.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Invitation Card ── */}
        {result && (
          <>
            <div
              ref={cardRef}
              className={`inv__card ${revealed ? "inv__card--revealed" : ""}`}
            >
              <span className="inv__card-corner inv__card-corner--tl" />
              <span className="inv__card-corner inv__card-corner--tr" />
              <span className="inv__card-corner inv__card-corner--bl" />
              <span className="inv__card-corner inv__card-corner--br" />
              <div className="inv__card-glow" />

              <div className="inv__seal">
                <div className="inv__seal-ring inv__seal-ring--1" />
                <div className="inv__seal-ring inv__seal-ring--2" />
                <div className="inv__seal-ring inv__seal-ring--3" />
                <img src="/favicon.png" alt="PMT" className="inv__seal-img"
                  onError={(e) => { e.target.style.display = "none"; }} />
                <div className="inv__seal-glow" />
              </div>

              <div className="inv__card-header">
                <p className="inv__card-univ">University of Sri Jayewardenepura</p>
                <p className="inv__card-faculty">Faculty of Applied Sciences</p>
                <p className="inv__card-dept">Pure Maths Combination</p>
              </div>

              <div className="inv__card-divider">
                <span /><span className="inv__gem" /><span className="inv__gem inv__gem--sm" /><span className="inv__gem" /><span />
              </div>

              {/* ── Portrait photo ── */}
              {/* ── Portrait photo ── */}
{photoUrl && (
  <div className="inv__portrait-wrap">
    <div className="inv__portrait-ring inv__portrait-ring--1" />
    <div className="inv__portrait-ring inv__portrait-ring--2" />
    <div className="inv__portrait-frame">
      <img
        src={photoUrl}
        alt={result.name}
        className="inv__portrait-img"
      />
      <div className="inv__portrait-overlay" />
    </div>
    <div className="inv__portrait-glow" />
  </div>
)}

              <p className="inv__card-presents">This scroll is presented to</p>

              <h2 className="inv__card-name">{result.name}</h2>

              <p className="inv__card-index-display">{result.index}</p>

              <div className="inv__card-divider">
                <span /><span className="inv__gem inv__gem--sm" /><span />
              </div>

              <div className="inv__card-body">
                <p>
                  You are hereby <span className="inv__card-highlight">officially invited</span> to step
                  through the portal and enter the world of <span className="inv__card-highlight">Pandora</span> —
                  a realm of wonder, spirit, and belonging.
                </p>
                <p>
                  As a chosen fresher of the <span className="inv__card-highlight">PMT Family</span>,
                  this day marks the beginning of a journey that will define your years at the
                  Faculty of Applied Sciences. You are no longer just a student —
                  you are a <span className="inv__card-highlight">child of Pandora</span>.
                </p>
                <p>
                  The clans await. The forest breathes. The ocean calls.<br />
                  Come, and discover where you truly belong.
                </p>
              </div>

              <div className="inv__card-divider">
                <span /><span className="inv__gem" /><span className="inv__gem inv__gem--sm" /><span className="inv__gem" /><span />
              </div>

              {/* ── Date · Time · Venue · Dress Code ── */}
              <div className="inv__card-event-grid">
                <div className="inv__card-event-item">
                  <span className="inv__card-event-icon">📅</span>
                  <span className="inv__card-event-label">Date</span>
                  <span className={`inv__card-event-val ${EVENT_DATE === "Coming Soon" ? "inv__card-event-val--tba" : ""}`}>
                    {EVENT_DATE}
                  </span>
                </div>
                <div className="inv__card-event-item">
                  <span className="inv__card-event-icon">🕐</span>
                  <span className="inv__card-event-label">Time</span>
                  <span className={`inv__card-event-val ${EVENT_TIME === "Coming Soon" ? "inv__card-event-val--tba" : ""}`}>
                    {EVENT_TIME}
                  </span>
                </div>
                <div className="inv__card-event-item">
                  <span className="inv__card-event-icon">📍</span>
                  <span className="inv__card-event-label">Venue</span>
                  <span className={`inv__card-event-val ${EVENT_VENUE === "Coming Soon" ? "inv__card-event-val--tba" : ""}`}>
                    {EVENT_VENUE}
                  </span>
                </div>
                <div className="inv__card-event-item">
                  <span className="inv__card-event-icon">🖤</span>
                  <span className="inv__card-event-label">Dress Code</span>
                  <span className="inv__card-event-val">All Black</span>
                </div>
              </div>


              <div className="inv__card-footer">
                <div className="inv__card-sig">
                  <div className="inv__card-sig-line" />
                  <p className="inv__card-sig-name">AMT Family</p>
                  <p className="inv__card-sig-role">Organisers · Pandora 2026</p>
                </div>
              </div>

              <p className="inv__card-quote">"Eywa has heard you."</p>

              <div className="inv__card-hashtags">
                <span>#PMTFamily</span>
                <span>#AMTFamily</span>
                <span>#Pandora2026</span>
              </div>
            </div>

            {/* ── Download button — outside cardRef so it won't appear in screenshot ── */}
            {revealed && (
              <button
                className={`inv__download-btn ${downloading ? "inv__download-btn--busy" : ""}`}
                onClick={handleDownload}
                disabled={downloading}
              >
                {downloading ? (
                  <><span className="inv__btn-spinner inv__btn-spinner--dark" /> Generating…</>
                ) : (
                  <>⬇ Download Invitation</>
                )}
              </button>
            )}
          </>
        )}

        {!result && !notFound && !searching && (
          <div className="inv__idle-quote">
            <div className="inv__idle-line"><span /><span /><span /></div>
            <p>"I see you."</p>
            <p className="inv__idle-sub">— Pandora awaits —</p>
          </div>
        )}

      </div>
    </div>
  );
}
