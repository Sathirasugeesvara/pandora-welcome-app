import { useEffect, useState, useRef } from "react";
import "./BeforeLeave.css";

export default function BeforeLeave({ currentPage, onNavigate }) {
  const [show, setShow] = useState(false);
  const leavingRef = useRef(false);

  useEffect(() => {
    // Always push a sentinel so we can catch back button
    window.history.pushState({ pandora: true }, "");

    const onPopState = () => {
      if (leavingRef.current) return;

      // Always re-push so page stays
      window.history.pushState({ pandora: true }, "");

      if (currentPage === "home") {
        // On home → ask leave confirmation
        setShow(true);
      } else {
        // On any other page → go to home
        onNavigate("home");
      }
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [currentPage, onNavigate]); // re-register when page changes

  const handleStay = () => setShow(false);

  const handleLeave = () => {
    leavingRef.current = true;
    setShow(false);
    // Clear all sentinels and actually leave
    window.history.go(-window.history.length);
    // Fallback — close the tab or go to a blank page
    setTimeout(() => {
      window.close();
      // If window.close() blocked, navigate away
      window.location.href = "about:blank";
    }, 100);
  };

  if (!show) return null;

  return (
    <div className="bl-overlay" onClick={handleStay}>
      <div className="bl-popup" onClick={(e) => e.stopPropagation()}>

        <div className="bl-popup__shimmer" />
        <div className="bl-popup__glow" />
        <span className="bl-popup__corner bl-popup__corner--tl" />
        <span className="bl-popup__corner bl-popup__corner--tr" />
        <span className="bl-popup__corner bl-popup__corner--bl" />
        <span className="bl-popup__corner bl-popup__corner--br" />

        <div className="bl-popup__icon-wrap">
          <div className="bl-popup__icon-ring bl-popup__icon-ring--1" />
          <div className="bl-popup__icon-ring bl-popup__icon-ring--2" />
          <div className="bl-popup__icon-ring bl-popup__icon-ring--3" />
          <span className="bl-popup__icon">🌿</span>
        </div>

        <p className="bl-popup__eyebrow">✦ Eywa Speaks ✦</p>
        <h3 className="bl-popup__title">Leaving Pandora?</h3>

        <div className="bl-popup__divider">
          <span />
          <span className="bl-popup__gem" />
          <span className="bl-popup__gem bl-popup__gem--sm" />
          <span className="bl-popup__gem" />
          <span />
        </div>

        <p className="bl-popup__body">
          The spirit of <span className="bl-hi">Pandora</span> still calls to you.<br />
          Your journey with the <span className="bl-hi">PMT Family</span><br />
          has only just begun.
        </p>

        <p className="bl-popup__sub">— Are you sure you want to leave? —</p>

        <div className="bl-popup__btns">
          <button className="bl-popup__btn bl-popup__btn--stay" onClick={handleStay}>
            <span className="bl-popup__btn-icon">🌿</span>
            Stay in Pandora
          </button>
          <button className="bl-popup__btn bl-popup__btn--leave" onClick={handleLeave}>
            Leave
          </button>
        </div>

        <p className="bl-popup__quote">"I see you." — Eywa</p>
      </div>
    </div>
  );
}
