import type { Turn, PlayerSymbol } from "../../App.js";

type GameBoardProps = {
  onSelectSquare: (row: number, col: number) => void;
  turns: Turn[];
};

const initialGameBoard: PlayerSymbol[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export const GameBoard = ({ onSelectSquare, turns }: GameBoardProps) => {
  let gameBoard: PlayerSymbol[][] = initialGameBoard.map((row) => [...row]);

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)}>
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
