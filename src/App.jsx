import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Gallery from "./pages/Gallery";
import Leaderboard from "./pages/Leaderboard";
import "./App.css";

// ── Page placeholders (replace with real pages as you build them) ──
function HomePage({ onNavigate }) {
  return (
    <section id="home" className="hero">
      <div className="hero__bg-overlay" />
      <div className="hero__content">
        <p className="hero__eyebrow">
          University of Sri Jayewardenepura · Faculty of Applied Sciences
        </p>
        <h1 className="hero__title">
          <span className="hero__title-pmt">PMT Family</span>
          <span className="hero__title-sub">Welcomes You to</span>
          <span className="hero__title-pandora">PANDORA</span>
        </h1>
        <p className="hero__tagline">A New Journey Begins</p>
        <div className="hero__ctas">
          <button className="hero__btn hero__btn--primary" onClick={() => onNavigate("clans")}>
            Discover Clans
          </button>
          <button className="hero__btn hero__btn--outline" onClick={() => onNavigate("leaderboard")}>
            Leaderboard
          </button>
        </div>
      </div>
      <div className="hero__scroll-hint">
        <span />
        <p>Scroll</p>
      </div>
    </section>
  );
}

function ComingSoonPage({ label }) {
  return (
    <div className="coming-soon">
      <div className="coming-soon__inner">
        <p className="coming-soon__eyebrow">✦ {label} ✦</p>
        <h2 className="coming-soon__title">Coming Soon</h2>
        <p className="coming-soon__sub">This section is on its way to Pandora.</p>
      </div>
    </div>
  );
}

// ── Page map — swap ComingSoonPage for real pages as you build them ──
const PAGES = {
  home:        (props) => <HomePage {...props} />,
  invitation:  ()      => <ComingSoonPage label="Invitation" />,
  leaderboard: ()      => <Leaderboard />,
  gallery:     ()      => <Gallery />,
  about:       ()      => <ComingSoonPage label="About" />,
  clans:       ()      => <ComingSoonPage label="Clans" />,
};

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const PageComponent = PAGES[currentPage] ?? PAGES.home;

  return (
    <div className="app">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="app__main">
        <PageComponent onNavigate={handleNavigate} />
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
