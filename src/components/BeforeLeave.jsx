import { useEffect, useState, useRef } from "react";
import "./BeforeLeave.css";

export default function BeforeLeave() {
  const [show,        setShow]        = useState(false);
  const confirmedRef  = useRef(false);
  const sentinelCount = useRef(1); // tracks how many sentinels we've pushed

  useEffect(() => {
    // Push the first sentinel
    window.history.pushState({ pandoraSentinel: true }, "");

    const onPopState = () => {
      if (confirmedRef.current) return; // already leaving — don't intercept
      // Push another sentinel to keep us here
      window.history.pushState({ pandoraSentinel: true }, "");
      sentinelCount.current += 1;
      setShow(true);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const handleStay = () => setShow(false);

  const handleLeave = () => {
    confirmedRef.current = true;
    setShow(false);
    // Go back by exactly how many sentinels we pushed
    window.history.go(-sentinelCount.current);
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
          <span /><span className="bl-popup__gem" /><span className="bl-popup__gem bl-popup__gem--sm" /><span className="bl-popup__gem" /><span />
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
