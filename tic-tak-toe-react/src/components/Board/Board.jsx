const boardInit = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
import BoardButton from "./BoardButton.jsx";
export default function Board({ activePlayer, togglePlayer }) {
  let gameBoard = boardInit;

  function handleClick(rowIdx, colIdx) {
    gameBoard[rowIdx][colIdx] = activePlayer;
    togglePlayer(rowIdx, colIdx);
    checkWin();
  }
  function checkWin() {
    const resArr = [gameBoard].map((innerArr) => [innerArr].map((val) => val));
    // console.log("gameBoard:26", gameBoard);
    // console.log("resArr", resArr);
  }
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIdx) => (
        <li key={rowIdx}>
          <ol>
            {row.map((btnVal, colIdx) => (
              <BoardButton
                key={[rowIdx, colIdx].join(",")}
                click={() => handleClick(rowIdx, colIdx)}
                rowIdx={rowIdx}
                colIdx={colIdx}
                symbol={btnVal}
                PlayerSymbol={activePlayer}
              />
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
