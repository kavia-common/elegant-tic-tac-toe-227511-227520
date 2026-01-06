import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders tic-tac-toe title", () => {
  render(<App />);
  expect(screen.getByText(/tic‑tac‑toe/i)).toBeInTheDocument();
});

test("renders preference toggles", () => {
  render(<App />);
  expect(screen.getByText(/sound/i)).toBeInTheDocument();
  expect(screen.getByText(/celebrations/i)).toBeInTheDocument();
});
