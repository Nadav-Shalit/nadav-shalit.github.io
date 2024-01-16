import Player from "./Player";
export default function Players({ activePlayer }) {
  // console.log("Players.jsx", { activePlayer });

  return (
    <ol id="players" className="highlight-player">
      {["X", "O"].map((sym, idx) => (
        <Player
          key={idx}
          idx={idx}
          symbol={sym}
          activePlayer={activePlayer}
        ></Player>
      ))}
    </ol>
  );
}
