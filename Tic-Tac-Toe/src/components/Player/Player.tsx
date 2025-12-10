import { useState } from "react";

type PlayerProps = {
  initialName: string;
  symbol: "X" | "O";
  isActive: boolean;
  onChangeName: (symbol: "X" | "O", newName: string) => void;
};

export const Player = ({
  initialName,
  symbol,
  isActive,
  onChangeName,
}: PlayerProps) => {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((editing) => {
      if (editing) {
        onChangeName(symbol, playerName);
      }

      return !editing;
    });
  }
  let editPlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editPlayerName = (
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        required
      />
    );
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editPlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button type="button" onClick={handleEditClick}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
};
