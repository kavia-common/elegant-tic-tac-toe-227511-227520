import React, { useMemo } from "react";

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
  onInvalidPlay,
}) {
  const markClassName = useMemo(() => {
    if (value === "X") return "mark-x mark-drawin";
    if (value === "O") return "mark-o mark-drawin";
    return "";
  }, [value]);

  const tryPlay = () => {
    if (disabled) return;
    if (value) {
      onInvalidPlay?.();
      return;
    }
    onPlay(index);
  };

  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      // When focused, allow "invalid" feedback too.
      if (value) {
        onInvalidPlay?.();
        return;
      }
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
      onClick={tryPlay}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <span className="ttt-mark" aria-hidden="true">
        {value === "X" ? (
          <span className={markClassName}>
            <span className="x-stroke x-a" />
            <span className="x-stroke x-b" />
          </span>
        ) : value === "O" ? (
          <span className={markClassName} />
        ) : null}
      </span>
    </button>
  );
}
