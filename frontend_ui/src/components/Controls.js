import React from "react";

/**
 * PUBLIC_INTERFACE
 * Game controls:
 * - restart round
 * - reset scores
 * - preferences (sound + celebrations)
 */
export function Controls({
  onRestartRound,
  onResetScores,
  disableRestart,
  soundEnabled,
  celebrationsEnabled,
  onToggleSound,
  onToggleCelebrations,
}) {
  return (
    <div className="ttt-controls" aria-label="Game controls">
      <div className="ttt-controls-actions">
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

      <div className="ttt-controls-toggles" aria-label="Preferences">
        <label className="ttt-toggle">
          <span className="ttt-toggle-label">Sound</span>
          <button
            type="button"
            className={[
              "ttt-toggle-button",
              soundEnabled ? "is-on" : "is-off",
            ].join(" ")}
            onClick={onToggleSound}
            aria-label={soundEnabled ? "Mute sound effects" : "Unmute sound effects"}
            aria-pressed={soundEnabled}
          >
            <span className="ttt-toggle-knob" aria-hidden="true" />
          </button>
        </label>

        <label className="ttt-toggle">
          <span className="ttt-toggle-label">Celebrations</span>
          <button
            type="button"
            className={[
              "ttt-toggle-button",
              celebrationsEnabled ? "is-on" : "is-off",
            ].join(" ")}
            onClick={onToggleCelebrations}
            aria-label={
              celebrationsEnabled ? "Disable celebrations" : "Enable celebrations"
            }
            aria-pressed={celebrationsEnabled}
          >
            <span className="ttt-toggle-knob" aria-hidden="true" />
          </button>
        </label>
      </div>
    </div>
  );
}
