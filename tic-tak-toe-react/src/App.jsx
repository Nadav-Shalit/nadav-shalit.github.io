import Players from "./components/Players/Players";
import Board from "./components/Board/Board";
import GameLog from "./components/GameLog/GameLog";
import { useState } from "react";

function getActivePlayer(curTurnLog) {
  const curPlayer =
    curTurnLog.length > 0 && curTurnLog[0].curPlayer === "X" ? "O" : "X";
  return curPlayer;
}
function App() {
  console.log("App ", new Date().toLocaleTimeString());
  const [logTurns, setLogTurns] = useState([]);
  const activePlayer = getActivePlayer(logTurns);
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

  return (
    <main>
      <div id="game-container">
        <Players activePlayer={activePlayer}></Players>
        <Board
          activePlayer={activePlayer}
          turnsInfo={logTurns}
          togglePlayer={togglePlayer}
        ></Board>
      </div>
      <GameLog logData={logTurns}></GameLog>
    </main>
  );
}

export default App;
