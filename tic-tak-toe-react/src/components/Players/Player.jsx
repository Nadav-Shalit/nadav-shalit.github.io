import { useState } from "react";

export default function Player({ activePlayer, idx, symbol }) {
  const [playerName, setPlayerName] = useState(`Player ${idx + 1}`);
  const [isEditMode, setIsEditMode] = useState(false);
  console.log("Player.jsx", { activePlayer, symbol });
  function handleClick() {
    setIsEditMode((editMode) => !editMode);
  }
  function handleInput(e) {
    // console.log({ target: e.target, val: e.target.value });
    setPlayerName(e.target.value);
  }
  return (
    <li key={idx} className={activePlayer === symbol ? "active" : ""}>
      <span className="player">
        {isEditMode ? (
          <input
            placeholder={playerName}
            value={playerName}
            onInput={handleInput}
            type="text"
            required
          ></input>
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{isEditMode ? "Save" : "Edit"}</button>
    </li>
  );
}
