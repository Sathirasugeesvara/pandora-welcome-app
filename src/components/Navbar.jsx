import { useState, useEffect } from "react";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home",        page: "home" },
  { label: "Invitation",  page: "invitation" },
  { label: "Leaderboard", page: "leaderboard" },
  { label: "Clans",       page: "clans" },
  { label: "Gallery",     page: "gallery" },
  { label: "Games",       page: "games" },
  { label: "About",       page: "about" },
];

export default function Navbar({ currentPage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (page) => {
    onNavigate(page);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__glow-bar" />

      <div className="navbar__inner">
        {/* Logo */}
        <button className="navbar__logo" onClick={() => handleNav("home")}>
          <span className="navbar__logo-icon">
            <img src="/favicon.png" alt="PMT Logo" className="navbar__logo-img" />
          </span>
          <span className="navbar__logo-text">
            <span className="navbar__logo-pmt">PMT</span>
            <span className="navbar__logo-family">FAMILY</span>
          </span>
        </button>

        {/* Desktop Links */}
        <ul className="navbar__links">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <button
                className={`navbar__link ${currentPage === link.page ? "navbar__link--active" : ""}`}
                onClick={() => handleNav(link.page)}
              >
                <span className="navbar__link-dot" />
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button className="navbar__cta" onClick={() => handleNav("home")}>
          ✦
        </button>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? "navbar__hamburger--open" : ""}`}
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${menuOpen ? "navbar__mobile--open" : ""}`}>
        <div className="navbar__mobile-inner">
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.label}
              className={`navbar__mobile-link ${currentPage === link.page ? "navbar__mobile-link--active" : ""}`}
              style={{ animationDelay: `${i * 0.07}s` }}
              onClick={() => handleNav(link.page)}
            >
              {link.label}
            </button>
          ))}
          <button className="navbar__mobile-cta" onClick={() => handleNav("clans")}>
            ✦ Clan ✦
          </button>
        </div>
      </div>
    </nav>
  );
}
