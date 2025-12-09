import { GameBoard } from "./components/GameBoard/GameBoard";
import { Player } from "./components/Player/Player";

function App() {
  return (
    <main>
      <h1>Tic-Tac-Toe</h1>
      <div id="game-container">
        {/* PLAYERS  */}
        <ol id="players">
          <Player initialName="Player 1" symbol="X" />
          <Player initialName="Player 2" symbol="0" />
        </ol>
        {/* GAME BOARD */}
        <GameBoard />
      </div>
    </main>
  );
}

export default App;
