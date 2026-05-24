import { useState } from "react";
import "./Footer.css";

const CLANS = [
  { name: "Omaticaya",        color: "#39ff14" },
  { name: "Metkayina",        color: "#00e5ff" },
  { name: "Ash Clan",         color: "#ff6b35" },
  { name: "Sky Riders",       color: "#a78bfa" },
  { name: "Tulkun Guardians", color: "#22d3ee" },
  { name: "Pandora Warriors", color: "#c084fc" },
];

const NAV_LINKS = {
  Explore: [
    { label: "Home",        page: "home" },
    { label: "Invitation",  page: "invitation" },
    { label: "Leaderboard", page: "leaderboard" },
    { label: "Clans",       page: "clans" },
    { label: "Gallery",     page: "gallery" },
    { label: "Games",       page: "games" },
    { label: "About",       page: "about" },
  ],
  Clans: CLANS.map((c) => ({ label: c.name, page: "clans" })),
  Connect: [
  { label: "Email", page: "mailto:sathirasugeesvara@gmail.com" },
  { label: "WhatsApp", page: "whatsapp-popup" },
  { label: "Phone", page: "tel:+94764627089" },
],
};

const WHATSAPP_LINK = "https://chat.whatsapp.com/Cx0zXSSC63OH83ZE5CnHaV";

// ── WhatsApp Popup ──
function WhatsAppPopup({ onClose }) {
  const [denied, setDenied] = useState(false);

  const handleYes = () => {
    window.open(WHATSAPP_LINK, "_blank");
    onClose();
  };

  const handleNo = () => {
    setDenied(true);
  };

  return (
    <div className="wa-overlay" onClick={onClose}>
      <div className="wa-popup" onClick={(e) => e.stopPropagation()}>
        <div className="wa-popup__glow" />
        <div className="wa-popup__corner wa-popup__corner--tl" />
        <div className="wa-popup__corner wa-popup__corner--tr" />
        <div className="wa-popup__corner wa-popup__corner--bl" />
        <div className="wa-popup__corner wa-popup__corner--br" />

        <div className="wa-popup__icon">💬</div>

        {!denied ? (
          <>
            <h3 className="wa-popup__title">PMT Family WhatsApp</h3>
            <p className="wa-popup__question">
              Are you a member of the <span className="wa-popup__highlight">PMT Family</span>?
            </p>
            <div className="wa-popup__btns">
              <button className="wa-popup__btn wa-popup__btn--yes" onClick={handleYes}>
                ✓ Yes, I am
              </button>
              <button className="wa-popup__btn wa-popup__btn--no" onClick={handleNo}>
                ✗ No
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="wa-popup__title">Access Restricted</h3>
            <p className="wa-popup__denied">
              Sorry, this group is exclusively for<br />
              <span className="wa-popup__highlight">PMT Family members</span> only.
            </p>
            <button className="wa-popup__btn wa-popup__btn--close" onClick={onClose}>
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function Footer({ onNavigate }) {
  const year = new Date().getFullYear();
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = (page) => {
  if (!page) return;

  if (page === "whatsapp-popup") {
    setShowPopup(true);
    return;
  }

  // External links
  if (
    page.startsWith("http") ||
    page.startsWith("mailto:") ||
    page.startsWith("tel:")
  ) {
    window.open(page, "_blank");
    return;
  }

  // Internal navigation
  if (onNavigate) {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

  return (
    <>
      {showPopup && <WhatsAppPopup onClose={() => setShowPopup(false)} />}

      <footer className="footer">
        <div className="footer__glow-bar" />

        <div className="footer__particles" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} className="footer__particle" style={{
              left: `${(i * 5.8 + 3) % 100}%`,
              animationDelay: `${(i * 0.4) % 6}s`,
              animationDuration: `${4 + (i % 4)}s`,
            }} />
          ))}
        </div>

      <div className="footer__container">
        {/* Brand */}
        <div className="footer__brand">
          <div className="footer__brand-logo">
            <img src="/favicon.png" alt="PMT Logo" className="footer__brand-logo-img" />
          </div>
          <h2 className="footer__brand-name">
            <span className="footer__brand-pmt">PMT</span>
            <span className="footer__brand-family">FAMILY</span>
          </h2>
          <p className="footer__brand-university">
            University of Sri Jayewardenepura<br />
            Faculty of Applied Sciences
          </p>
          <p className="footer__brand-tagline">Together as One. Stronger as a Family.</p>
          <p className="footer__brand-hash">#PMTFamily #AMTFamily</p>
        </div>

        {/* Links */}
        <div className="footer__links-grid">
          {Object.entries(NAV_LINKS).map(([section, items]) => (
            <div key={section} className="footer__links-col">
              <h4 className="footer__col-title">{section}</h4>
              <ul className="footer__col-list">
                {items.map((item) => (
                  <li key={item.label}>
                    <button
                      className="footer__col-link"
                      onClick={() => handleClick(item.page)}
                      style={{ cursor: item.page ? "pointer" : "default" }}
                    >
                      <span className="footer__col-arrow">›</span>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Clan strip */}
      <div className="footer__clans">
        <p className="footer__clans-label">THE SIX CLANS OF PANDORA</p>
        <div className="footer__clans-row">
          {CLANS.map((clan) => (
            <div key={clan.name} className="footer__clan" style={{ "--clan-color": clan.color }}>
              <span className="footer__clan-dot" />
              <span className="footer__clan-name">{clan.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="footer__bottom">
        <div className="footer__bottom-divider" />
        <div className="footer__bottom-inner">
          <span className="footer__copyright">
            © {year} AMT Family · University of Sri Jayewardenepura
          </span>
          <span className="footer__developer">
            <a href="https://sathirasugeesvara.github.io" target="_blank" rel="noopener noreferrer" className="footer__developer">
              Designed & Developed by Sathira Sugeesvara
            </a>
          </span>
          <span className="footer__pandora-tag">✦ PANDORA — A NEW JOURNEY BEGINS ✦</span>
        </div>
      </div>
    </footer>
    </>
  );
}
