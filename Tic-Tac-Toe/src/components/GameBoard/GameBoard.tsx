import type { PlayerSymbol, Turn } from "../../App.js";

type GameBoardProps = {
  onSelectSquare: (row: number, col: number) => void;
  board: PlayerSymbol[][];
};

export const GameBoard = ({ onSelectSquare, board }: GameBoardProps) => {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};
