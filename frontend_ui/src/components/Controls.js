import React from "react";

/**
 * PUBLIC_INTERFACE
 * Game controls (restart round, reset scores).
 */
export function Controls({ onRestartRound, onResetScores, disableRestart }) {
  return (
    <div className="ttt-controls" aria-label="Game controls">
      <button
        type="button"
        className="ttt-button ttt-button-primary"
        onClick={onRestartRound}
        disabled={disableRestart}
      >
        Restart Round
      </button>

      <button
        type="button"
        className="ttt-button ttt-button-ghost"
        onClick={onResetScores}
      >
        Reset Scores
      </button>
    </div>
  );
}
