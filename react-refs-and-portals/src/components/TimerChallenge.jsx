import { useRef, useState } from "react";
import ResultModal from "./ResultModal.jsx";
import { getScore } from "../assets/utils.js";

export default function TimerChallenge({ title, targetTime, setScore }) {
  const [timeRemaing, setTimeRemaing] = useState(targetTime * 1000);
  const [scoreState, setScoreState] = useState(0);

  const timerRef = useRef();
  const modalRef = useRef();
  const isTimerActive = timeRemaing > 0 && timeRemaing < targetTime * 1000;
  const isPass = scoreState > 90;
  if (timeRemaing <= 0) {
    handleStop();
  }
  function resetTimeRemaing() {
    setScore(title, scoreState);
    setTimeRemaing(targetTime * 1000);
  }
  function handleStart() {
    timerRef.current = setInterval(() => {
      setTimeRemaing((curTimeRemaing) => {
        return curTimeRemaing - 10;
      });
    }, 10);
  }
  function handleStop() {
    modalRef.current.showRefModal();
    clearInterval(timerRef.current);
    if (timeRemaing > 0) {
      setScoreState(getScore(timeRemaing, targetTime));
    }
  }

  return (
    <>
      <ResultModal
        key={targetTime}
        ref={modalRef}
        targetTime={targetTime}
        result={timeRemaing}
        reset={resetTimeRemaing}
      />
      <section className={"challenge " + (!!isPass ? "pass" : "")}>
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 && "s"}
        </p>
        <p>
          <button onClick={isTimerActive ? handleStop : handleStart}>
            {isTimerActive ? "Stop" : "Start"}
          </button>
        </p>
        <p>
          {!!scoreState ? "your last score" : ""}
          {!!scoreState && <strong> {scoreState} </strong>}
        </p>
        <p className={isTimerActive ? "active" : "undefined"}>
          {isTimerActive ? "Running..." : !!!isPass ? "Ready?" : ""}
        </p>
      </section>
    </>
  );
}
