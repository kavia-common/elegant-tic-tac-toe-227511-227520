/**
 * Game-logic utilities for Tic-Tac-Toe.
 * Kept in a separate module to facilitate future unit tests.
 */

/**
 * @typedef {"X"|"O"|null} PlayerMark
 */

/**
 * All winning line index triplets for a 3x3 board.
 * @type {number[][]}
 */
export const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

/**
 * PUBLIC_INTERFACE
 * Calculate the winner for a given board state.
 * @param {PlayerMark[]} squares - Flat array of length 9.
 * @returns {{ winner: "X"|"O"|null, line: number[]|null }}
 */
export function calculateWinner(squares) {
  for (const [a, b, c] of WIN_LINES) {
    const v = squares[a];
    if (v && v === squares[b] && v === squares[c]) {
      return { winner: v, line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}

/**
 * PUBLIC_INTERFACE
 * Check if the board is full and there is no winner.
 * @param {PlayerMark[]} squares
 * @returns {boolean}
 */
export function isDraw(squares) {
  const { winner } = calculateWinner(squares);
  if (winner) return false;
  return squares.every((s) => s !== null);
}

/**
 * PUBLIC_INTERFACE
 * Derive a simple status label for screen readers and UI.
 * @param {PlayerMark[]} squares
 * @param {"X"|"O"} nextPlayer
 * @returns {{ kind: "turn"|"win"|"draw", text: string, winner: "X"|"O"|null, line: number[]|null }}
 */
export function getGameStatus(squares, nextPlayer) {
  const { winner, line } = calculateWinner(squares);
  if (winner) {
    return { kind: "win", text: `${winner} wins!`, winner, line };
  }
  if (isDraw(squares)) {
    return { kind: "draw", text: "It's a draw.", winner: null, line: null };
  }
  return { kind: "turn", text: `Turn: ${nextPlayer}`, winner: null, line: null };
}
