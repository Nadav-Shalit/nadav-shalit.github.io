import { useState } from "react";

export default function Player({
  activePlayer,
  idx,
  symbol,
  onUpdatePlayerName,
}) {
  const [playerName, setPlayerName] = useState(`Player ${idx + 1}`);
  const [isEditMode, setIsEditMode] = useState(false);
  // console.log("Player.jsx", { activePlayer, symbol });
  function onInputFocus(e) {
    e.target.select();
  }
  function handleNameClick() {
    handleButtonClick();
  }
  function handleButtonClick() {
    setIsEditMode((editMode) => {
      return !editMode;
    });
  }
  function handleInput(e) {
    // console.log({ target: e.target, val: e.target.value });
    setPlayerName(e.target.value);
    onUpdatePlayerName(symbol, e.target.value);
  }
  return (
    <li className={activePlayer === symbol ? "active" : ""}>
      <span className="player-symbol">{symbol}</span>
      <span className="player">
        {isEditMode ? (
          <span>
            <input
              placeholder={playerName}
              value={playerName}
              // onLoad={onInputLoad}
              onFocus={onInputFocus}
              onInput={handleInput}
              type="text"
              required
            ></input>
          </span>
        ) : (
          <span className="player-name" onClick={handleNameClick}>
            {playerName}
          </span>
        )}
      </span>

      <button disabled={!playerName} onClick={handleButtonClick}>
        {isEditMode ? "Save" : "Edit"}
      </button>
      {!playerName && <h5>Required!</h5>}
    </li>
  );
}
