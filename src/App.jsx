import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Gallery from "./pages/Gallery";
import Leaderboard from "./pages/Leaderboard";
import Clans from "./pages/Clans";
import About from "./pages/About";
import Invitation from "./pages/Invitation";
import Games from "./pages/Games";
import NaviName from "./pages/NaviName";
import ClanQuiz from "./pages/ClanQuiz";
import ClanRoulette from "./pages/ClanRoulette";
import Trivia from "./pages/Trivia";
import MemoryMatch from "./pages/MemoryMatch";
import WordScramble from "./pages/WordScramble";
import "./App.css";

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
          <button className="hero__btn hero__btn--primary" onClick={() => onNavigate("games")}>
            Play Games
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

const PAGES = {
  home:        (props)      => <HomePage {...props} />,
  invitation:  (props)      => <Invitation {...props} />,
  leaderboard: (props)      => <Leaderboard {...props} />,//<ComingSoonPage label="Leaderboard" />
  gallery:     (props)      => <Gallery {...props} />,
  games:       (props)      => <Games {...props} />,
  about:       (props)      => <About {...props} />,
  clans:       (props)      => <Clans {...props} />,//<ComingSoonPage label="Clans" />

  
  naviname:     (props) => <NaviName {...props} />,
  clanquiz:     (props) => <ClanQuiz {...props} />,
  clanroulette: (props) => <ClanRoulette {...props} />,
  trivia:       (props) => <Trivia {...props} />,
  memorymatch:  (props) => <MemoryMatch {...props} />,
  wordscramble: (props) => <WordScramble {...props} />,
};

// Pages that are "sub-pages" — show Back button
const GAME_PAGES = ["naviname","clanquiz","clanroulette","trivia","memorymatch","wordscramble"];

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const PageComponent = PAGES[currentPage] ?? PAGES.home;
  const isGamePage = GAME_PAGES.includes(currentPage);

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

