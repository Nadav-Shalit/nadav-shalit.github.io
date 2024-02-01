import { useRef, useState } from "react";
import ResultModal from "./ResultModal.jsx";

export default function TimerChallenge({ title, targetTime }) {
  const [timeRemaing, setTimeRemaing] = useState(targetTime * 1000);
  const timerRef = useRef();
  const modalRef = useRef();
  const isTimerActive = timeRemaing > 0 && timeRemaing < targetTime * 1000;

  if (timeRemaing <= 0) {
    handleStop();
  }
  function resetTimeRemaing() {
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
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 && "s"}
        </p>
        <p>
          <button onClick={isTimerActive ? handleStop : handleStart}>
            {isTimerActive ? "Stop" : "Start"}
          </button>
        </p>
        <p className={isTimerActive ? "active" : "undefined"}>
          {isTimerActive ? "Running..." : "Ready?"}
        </p>
      </section>
    </>
  );
}
