import React from "react";

/**
 * PUBLIC_INTERFACE
 * A single interactive cell for the tic-tac-toe board.
 * Keyboard accessible (Enter/Space) and screen-reader labeled.
 */
export function Square({
  index,
  value,
  onPlay,
  disabled,
  isWinning,
  ariaLabel,
}) {
  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onPlay(index);
    }
  };

  return (
    <button
      type="button"
      className={[
        "ttt-square",
        value ? "is-filled" : "",
        isWinning ? "is-winning" : "",
      ].join(" ")}
      onClick={() => onPlay(index)}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <span className="ttt-mark" aria-hidden="true">
        {value === "X" ? (
          <span className="mark-x">
            <span className="x-stroke x-a" />
            <span className="x-stroke x-b" />
          </span>
        ) : value === "O" ? (
          <span className="mark-o" />
        ) : null}
      </span>
    </button>
  );
}
