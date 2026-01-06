import React from "react";

/**
 * PUBLIC_INTERFACE
 * Displays score totals for the match.
 */
export function Scoreboard({ scores }) {
  return (
    <section className="ttt-card ttt-scoreboard" aria-label="Scoreboard">
      <div className="score-item score-x">
        <div className="score-label">X</div>
        <div className="score-value">{scores.X}</div>
      </div>
      <div className="score-item score-draw">
        <div className="score-label">Draws</div>
        <div className="score-value">{scores.draws}</div>
      </div>
      <div className="score-item score-o">
        <div className="score-label">O</div>
        <div className="score-value">{scores.O}</div>
      </div>
    </section>
  );
}
