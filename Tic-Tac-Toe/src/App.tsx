import { useState } from "react";
import { Player } from "./components/Player/Player";
import { GameBoard } from "./components/GameBoard/GameBoard";
import { Log } from "./components/Log/Log";

export type PlayerSymbol = "X" | "O" | null;

export type Turn = {
  square: { row: number; col: number };
  player: "X" | "O";
};

function App() {
  const [activePlayer, setActivePlayer] = useState<"X" | "O">("X");
  const [gameTurns, setGameTurns] = useState<Turn[]>([]);

  function handleSelectSquare(row: number, col: number) {
    setGameTurns((prevTurns) => {
      const currentPlayer: "X" | "O" =
        prevTurns.length > 0 && prevTurns[0].player === "X" ? "O" : "X";

      const newTurn: Turn = { square: { row, col }, player: currentPlayer };
      return [newTurn, ...prevTurns];
    });

    setActivePlayer((p) => (p === "X" ? "O" : "X"));
  }

  return (
    <main>
      <h1>Tic-Tac-Toe</h1>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>

        <GameBoard turns={gameTurns} onSelectSquare={handleSelectSquare} />

        <Log turns={gameTurns} />
      </div>
    </main>
  );
}

export default App;
