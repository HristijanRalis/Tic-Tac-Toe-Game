import { useState } from "react";
import { Player } from "./components/Player/Player";
import { GameBoard } from "./components/GameBoard/GameBoard";
import { Log } from "./components/Log/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations.json";
import { GameOver } from "./components/GameOver/GameOver";
export type PlayerSymbol = "X" | "O" | null;

// Turn values
export type Turn = {
  square: { row: number; col: number };
  player: "X" | "O";
};

// Actual active player
function deriveActivePlayer(gameTurns: Turn[]): "X" | "O" {
  let currenPlayer: "X" | "O" = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currenPlayer = "O";
  }

  return currenPlayer;
}

// Board values
const initialGameBoard: PlayerSymbol[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// App
function App() {
  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  const [gameTurns, setGameTurns] = useState<Turn[]>([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard: PlayerSymbol[][] = initialGameBoard.map((row) => [...row]);

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner = null;

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol =
      gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol =
      gameBoard[combinations[2].row][combinations[2].column];

    if (
      firstSquareSymbol &&
      secondSquareSymbol === thirdSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  // Handle selected square
  function handleSelectSquare(row: number, col: number) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const newTurn: Turn = { square: { row, col }, player: currentPlayer };
      return [newTurn, ...prevTurns];
    });
  }

  // Handle Restart
  function handleRestart() {
    setGameTurns([]);
  }

  // Handle changing name of the player
  function handlerPlayerNameChange(symbol: "X" | "O", newName: string) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <header>
        <h1>Tic-Tac-Toe</h1>
      </header>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {/* Player Component */}
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlerPlayerNameChange}
          />

          {/* Player Component */}

          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlerPlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          // Showing Game Over modal

          <GameOver winner={winner} onRematch={handleRestart} />
        )}

        {/* Displaying Game Board */}

        <GameBoard board={gameBoard} onSelectSquare={handleSelectSquare} />

        {/* Display game turns of players */}

        <Log turns={gameTurns} />
      </div>
    </main>
  );
}

export default App;
