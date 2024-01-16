import Players from "./components/Players/Players";
import Board from "./components/Board/Board";
import GameLog from "./components/GameLog/GameLog";
import { useState } from "react";

function App() {
  console.log("App ", new Date().toLocaleTimeString());
  const [activePlayer, setActivePlayer] = useState("X");
  const [logTurns, setLogTurns] = useState([]);
  function togglePlayer(rowIdx, colIdx) {
    setActivePlayer((curPlayer) => (curPlayer === "X" ? "O" : "X"));
    setLogTurns((curLog) => {
      const newLog = [...curLog];
      let curPlayer = "X";
      curPlayer = newLog.length > 0 && newLog[0].curPlayer === "X" ? "O" : "X";
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
