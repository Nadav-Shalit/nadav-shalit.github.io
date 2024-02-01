import Player from "./components/Player.jsx";
import TimerChallenge from "./components/TimerChallenge.jsx";

function App() {
  const GAME_CONFIG = [
    { "New Born": 1 },
    { "Kids staff": 5 },
    { "Getting serious": 10 },
    { "Grown ups": 15 },
    { Masters: 17 },
    { God: Math.floor(Math.random() * 50) + 18 },
  ];
  return (
    <>
      <Player />
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
            ></TimerChallenge>
          );
        })}
      </div>
    </>
  );
}

export default App;
