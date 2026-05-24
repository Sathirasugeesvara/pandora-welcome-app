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
import NaviType from "./pages/NaviType";
import TapClan from "./pages/TapClan";
import MathQuest from "./pages/MathQuest";
import CSQuiz from "./pages/CSQuiz";
import SceneSort from "./pages/SceneSort";
import "./App.css";

function HomePage({ onNavigate }) {
  return (
    <section id="home" className="hero">
      <div className="hero__bg-overlay" />
      <div className="hero__content">
        <p className="hero__eyebrow">University of Sri Jayewardenepura · Faculty of Applied Sciences</p>
        <h1 className="hero__title">
          <span className="hero__title-pmt">PMT Family</span>
          <span className="hero__title-sub">Welcomes You to</span>
          <span className="hero__title-pandora">PANDORA</span>
        </h1>
        <p className="hero__tagline">A New Journey Begins</p>
        <div className="hero__ctas">
          <button className="hero__btn hero__btn--primary" onClick={() => onNavigate("games")}>Play Games</button>
          <button className="hero__btn hero__btn--outline" onClick={() => onNavigate("leaderboard")}>Leaderboard</button>
        </div>
      </div>
      <div className="hero__scroll-hint"><span /><p>Scroll</p></div>
    </section>
  );
}

const PAGES = {
  home:        (props) => <HomePage {...props} />,
  invitation:  (props) => <Invitation {...props} />,
  leaderboard: (props) => <Leaderboard {...props} />,
  gallery:     (props) => <Gallery {...props} />,
  games:       (props) => <Games {...props} />,
  about:       (props) => <About {...props} />,
  clans:       (props) => <Clans {...props} />,
  // Games
  naviname:    (props) => <NaviName {...props} />,
  navitype:    (props) => <NaviType {...props} />,
  tapclan:     (props) => <TapClan {...props} />,
  mathquest:   (props) => <MathQuest {...props} />,
  csquiz:      (props) => <CSQuiz {...props} />,
  scenesort:   (props) => <SceneSort {...props} />,
};

const GAME_PAGES = ["naviname","navitype","tapclan","mathquest","csquiz","scenesort"];

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
        {isGamePage && (
          <button className="app__back-btn" onClick={() => handleNavigate("games")}>
            ← Back to Games
          </button>
        )}
        <PageComponent onNavigate={handleNavigate} />
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
