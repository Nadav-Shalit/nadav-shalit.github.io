export default function GameOver({ winner, onRematch }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winner != "drow" && <p>{winner} is the winner!</p>}
      {winner === "drow" && <p>No winner - {winner}!</p>}
      <p>
        <button onClick={onRematch}>Rematch ?</button>
      </p>
    </div>
  );
}
