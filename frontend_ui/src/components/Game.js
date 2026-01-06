import React, { useEffect, useMemo, useRef, useState } from "react";
import { Board } from "./Board";
import { Controls } from "./Controls";
import { Scoreboard } from "./Scoreboard";
import { getGameStatus } from "../utils/gameLogic";

const emptyBoard = () => Array(9).fill(null);

/**
 * PUBLIC_INTERFACE
 * Main Tic-Tac-Toe game container:
 * - round state
 * - status (turn/win/draw)
 * - score tracking across rounds
 * - a11y announcements
 */
export function Game() {
  const [squares, setSquares] = useState(() => emptyBoard());
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  const nextPlayer = xIsNext ? "X" : "O";
  const status = useMemo(
    () => getGameStatus(squares, nextPlayer),
    [squares, nextPlayer]
  );

  const gameOver = status.kind === "win" || status.kind === "draw";
  const statusLiveRef = useRef(null);

  // Announce status changes for screen readers.
  useEffect(() => {
    const node = statusLiveRef.current;
    if (!node) return;
    // Trigger re-announce with a minimal delay (helps some SRs).
    node.textContent = "";
    const t = window.setTimeout(() => {
      node.textContent = status.text;
    }, 30);
    return () => window.clearTimeout(t);
  }, [status.text]);

  // When a round ends, increment scores once.
  const scoredRef = useRef(false);
  useEffect(() => {
    if (!gameOver) {
      scoredRef.current = false;
      return;
    }
    if (scoredRef.current) return;
    scoredRef.current = true;

    setScores((prev) => {
      if (status.kind === "win" && status.winner) {
        return { ...prev, [status.winner]: prev[status.winner] + 1 };
      }
      if (status.kind === "draw") {
        return { ...prev, draws: prev.draws + 1 };
      }
      return prev;
    });
  }, [gameOver, status.kind, status.winner]);

  const handlePlay = (index) => {
    if (gameOver) return;
    setSquares((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = nextPlayer;
      return next;
    });
    setXIsNext((v) => !v);
  };

  const restartRound = () => {
    setSquares(emptyBoard());
    setXIsNext(true);
  };

  const resetScores = () => {
    setSquares(emptyBoard());
    setXIsNext(true);
    setScores({ X: 0, O: 0, draws: 0 });
  };

  return (
    <div className="ttt-app">
      <div className="ttt-shell">
        <header className="ttt-header">
          <div>
            <h1 className="ttt-title">Tic‑Tac‑Toe</h1>
            <p className="ttt-subtitle">
              Ocean Professional edition — keyboard friendly, responsive, and
              animated.
            </p>
          </div>

          <div className="ttt-statuswrap">
            <div
              className={[
                "ttt-status",
                status.kind === "win" ? "is-win" : "",
                status.kind === "draw" ? "is-draw" : "",
              ].join(" ")}
              aria-label="Game status"
            >
              <span className="status-dot" aria-hidden="true" />
              <span className="status-text">{status.text}</span>
            </div>
            <div className="sr-only" aria-live="polite" ref={statusLiveRef} />
          </div>
        </header>

        <main className="ttt-main">
          <Scoreboard scores={scores} />

          <section className="ttt-board-card ttt-card" aria-label="Game board">
            <Board
              squares={squares}
              onPlay={handlePlay}
              disabled={gameOver}
              winningLine={status.line}
            />
            <div className="ttt-hint" aria-hidden="true">
              Tip: Use Tab to focus a cell, then Enter/Space to play.
            </div>
          </section>

          <Controls
            onRestartRound={restartRound}
            onResetScores={resetScores}
            disableRestart={squares.every((s) => s === null)}
          />
        </main>

        <footer className="ttt-footer">
          <span>Built with React • No backend required</span>
        </footer>
      </div>
    </div>
  );
}
