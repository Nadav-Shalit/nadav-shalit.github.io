import Players from "./components/Players/Players";
import Board from "./components/Board/Board";
import GameLog from "./components/GameLog/GameLog";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./GameOver.jsx";
const boardInit = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
let playersNames = {
  X: "Player 1",
  O: "Player 2",
};
function getActivePlayer(curTurnLog) {
  const curPlayer =
    curTurnLog.length > 0 && curTurnLog[0].curPlayer === "X" ? "O" : "X";
  return curPlayer;
}

function App() {
  const [gameTurns, setLogTurns] = useState([]);

  console.log("App ", new Date().toLocaleTimeString());
  let winner = null;
  let gameBoard = [...boardInit].map((arr) => [...arr].map((itm) => itm));
  const activePlayer = getActivePlayer(gameTurns);
  for (const turn of gameTurns) {
    gameBoard[turn.symbolIdx.rowIdx][turn.symbolIdx.colIdx] = turn.curPlayer;
  }
  IsWinnerCheck();
  function IsWinnerCheck() {
    for (const comb of WINNING_COMBINATIONS) {
      const fstSymbol = gameBoard[comb[0].row][comb[0].column];
      const sndSymbol = gameBoard[comb[1].row][comb[1].column];
      const trdSymbol = gameBoard[comb[2].row][comb[2].column];
      if (fstSymbol && fstSymbol === sndSymbol && fstSymbol === trdSymbol) {
        console.log("iswin", { playersNames });
        winner = `${playersNames[fstSymbol]} [${fstSymbol}]`;
      }
      if (!winner && gameTurns.length === 9) {
        winner = "drow";
      }
    }
  }
  function togglePlayer(rowIdx, colIdx) {
    setLogTurns((curLog) => {
      const newLog = [...curLog];
      const curPlayer = getActivePlayer(newLog);
      newLog.unshift({
        time: new Date(),
        symbolIdx: { rowIdx, colIdx },
        curPlayer,
      });
      return newLog;
    });
  }
  function handleRematch() {
    setLogTurns([]);
  }
  function updatePlayers(players) {
    console.log("App", { playersNames, players });
    playersNames = players;
  }
  return (
    <main>
      <div id="game-container">
        <Players
          playersNames={playersNames}
          onUpdatePlayers={(pl) => updatePlayers(pl)}
          activePlayer={activePlayer}
        ></Players>
        {winner && (
          <GameOver onRematch={handleRematch} winner={winner}></GameOver>
        )}
        <Board
          activePlayer={activePlayer}
          board={gameBoard}
          togglePlayer={togglePlayer}
          winner={winner}
        ></Board>
      </div>
      <GameLog logData={gameTurns}></GameLog>
    </main>
  );
}

export default App;
