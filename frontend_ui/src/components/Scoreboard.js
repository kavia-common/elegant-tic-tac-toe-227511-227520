import React, { useEffect, useRef, useState } from "react";

function useBump(value) {
  const prev = useRef(value);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (value !== prev.current) {
      setBump(true);
      const t = window.setTimeout(() => setBump(false), 320);
      prev.current = value;
      return () => window.clearTimeout(t);
    }
    prev.current = value;
  }, [value]);

  return bump;
}

/**
 * PUBLIC_INTERFACE
 * Displays score totals for the match.
 */
export function Scoreboard({ scores }) {
  const bumpX = useBump(scores.X);
  const bumpO = useBump(scores.O);
  const bumpD = useBump(scores.draws);

  return (
    <section className="ttt-card ttt-scoreboard" aria-label="Scoreboard">
      <div className="score-item score-x">
        <div className="score-label">X</div>
        <div className={["score-value", bumpX ? "is-bumping" : ""].join(" ")}>
          {scores.X}
        </div>
      </div>
      <div className="score-item score-draw">
        <div className="score-label">Draws</div>
        <div className={["score-value", bumpD ? "is-bumping" : ""].join(" ")}>
          {scores.draws}
        </div>
      </div>
      <div className="score-item score-o">
        <div className="score-label">O</div>
        <div className={["score-value", bumpO ? "is-bumping" : ""].join(" ")}>
          {scores.O}
        </div>
      </div>
    </section>
  );
}
