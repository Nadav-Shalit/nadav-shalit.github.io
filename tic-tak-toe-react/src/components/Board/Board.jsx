import BoardButton from "./BoardButton.jsx";
export default function Board({ activePlayer, togglePlayer, board, winner }) {
  function handleClick(rowIdx, colIdx) {
    togglePlayer(rowIdx, colIdx);
  }

  return (
    <ol id="game-board">
      {board.map((row, rowIdx) => (
        <li key={rowIdx}>
          <ol>
            {row.map((btnVal, colIdx) => (
              <BoardButton
                key={[rowIdx, colIdx].join(",")}
                click={() => handleClick(rowIdx, colIdx)}
                rowIdx={rowIdx}
                colIdx={colIdx}
                symbol={btnVal}
                winner={winner}
                PlayerSymbol={activePlayer}
              />
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
