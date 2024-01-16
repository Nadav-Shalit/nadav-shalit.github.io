import Player from "./Player";
export default function Players({
  activePlayer,
  playersNames,
  onUpdatePlayers,
}) {
  // console.log("Players.jsx", { activePlayer });
  function updatePlayerName(sym, name) {
    playersNames[sym] = name;
    console.log({ playersNames });
    onUpdatePlayers(playersNames);
  }

  return (
    <ol id="players" className="highlight-player">
      {Object.keys(playersNames).map((k, idx) => (
        <Player
          key={k}
          idx={idx}
          symbol={k}
          activePlayer={activePlayer}
          onUpdatePlayerName={(s, name) => updatePlayerName(s, name)}
        ></Player>
      ))}
    </ol>
  );
}
