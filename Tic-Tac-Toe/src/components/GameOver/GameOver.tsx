type GameOverProps = {
  winner: string | null;
  onRematch: () => void;
};

export const GameOver = ({ winner, onRematch }: GameOverProps) => {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>It's a draw!</p>}

      <p>
        <button onClick={onRematch}>Rematch!</button>
      </p>
    </div>
  );
};
