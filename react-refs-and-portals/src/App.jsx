import { useState } from "react";
import Player from "./components/Player.jsx";
import TimerChallenge from "./components/TimerChallenge.jsx";
const GAME_CONFIG = [
  { "New Born": 1, score: 0 },
  { "Kids staff": 5, score: 0 },
  { "Getting serious": 10, score: 0 },
  { "Grown ups": 15, score: 0 },
  { Masters: 17, score: 0 },
  { God: Math.floor(Math.random() * 50) + 18, score: 0 },
];
function App() {
  const [playerName, setPalyerName] = useState(null);

  const [levelsStatus, setLevelsStatus] = useState(getLevels());
  // console.log(levelPass);
  function hendleSubmit(playerName) {
    setPalyerName(playerName);
  }

  function setScore(level, score) {
    console.log({ level, score });
    setLevelsStatus((curLevels) => {
      let newLevels = { ...curLevels };
      newLevels[level] = score;
      return newLevels;
    });
  }

  function getLevels() {
    let levelsObj = {};
    GAME_CONFIG.map((itm) => {
      const keys = Object.keys(itm);
      const title = keys[0];
      const score = itm.score;
      levelsObj[title] = itm.score;
    });
    return levelsObj;
  }

  console.log(levelsStatus);
  return (
    <>
      <Player onSubmit={hendleSubmit} playerName={playerName} />
      {playerName && (
        <div id="challenges">
          {GAME_CONFIG.map((itm) => {
            const keys = Object.keys(itm);
            const title = keys[0];
            const targetTime = itm[keys[0]];
            return (
              <TimerChallenge
                key={title}
                title={title}
                targetTime={targetTime}
                setScore={(level, score) => setScore(level, score)}
              ></TimerChallenge>
            );
          })}
        </div>
      )}
    </>
  );
}

export default App;
