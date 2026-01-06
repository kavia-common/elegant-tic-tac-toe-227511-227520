import React from "react";
import { Square } from "./Square";

/**
 * PUBLIC_INTERFACE
 * 3x3 board rendering component.
 */
export function Board({ squares, onPlay, disabled, winningLine }) {
  return (
    <div className="ttt-board" role="grid" aria-label="Tic-tac-toe board">
      {squares.map((value, index) => {
        const isWinning = Array.isArray(winningLine)
          ? winningLine.includes(index)
          : false;

        const cellLabel = value
          ? `Cell ${index + 1}, ${value}`
          : `Cell ${index + 1}, empty`;

        return (
          <div key={index} role="row" className="ttt-board-cellwrap">
            <Square
              index={index}
              value={value}
              onPlay={onPlay}
              disabled={disabled || Boolean(value)}
              isWinning={isWinning}
              ariaLabel={cellLabel}
            />
          </div>
        );
      })}
    </div>
  );
}
