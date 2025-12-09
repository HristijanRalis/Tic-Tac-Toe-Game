import { useState } from "react";

import { Player } from "./components/Player/Player";
import { GameBoard } from "./components/GameBoard/GameBoard";
import { Log } from "./components/Log/Log";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [gamesTurns, setGameTurns] = useState([]);

  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((currentActivePlayer) =>
      currentActivePlayer === "X" ? "O" : "X"
    );

    setGameTurns((prevTurns) => {
      let currentPlayer = "X";

      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = " O";
      }
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }
  return (
    <main>
      <h1>Tic-Tac-Toe</h1>
      <div id="game-container">
        {/* PLAYERS  */}
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
        {/* GAME BOARD */}
        <GameBoard onSelectSquare={handleSelectSquare} turns={gamesTurns} />

        <Log />
      </div>
    </main>
  );
}

export default App;
