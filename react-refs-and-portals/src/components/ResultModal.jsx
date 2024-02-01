import { forwardRef, useRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";
import { getScore } from "../assets/utils.js";

const ResultModal = forwardRef(function ResultModal(
  { result, targetTime, reset },
  refProp
) {
  const dialogInnerRef = useRef();
  const isLost = result <= 0;
  const secondLeft = result > 0 ? (result / 1000).toFixed(2) : null;
  const score = getScore(result, targetTime);
  //   console.log({ result, isLost, winScore: secondLeft, targetTime, score });
  useImperativeHandle(refProp, () => {
    return {
      showRefModal() {
        dialogInnerRef.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog className="result-modal" ref={dialogInnerRef}>
      <h2>You {isLost ? "lost" : `won with score ${score}`}</h2>
      <p>
        Target time {targetTime} second{targetTime > 1 && "s"}
      </p>
      {!!secondLeft && (
        <p>
          Stoppd with <strong>{secondLeft}</strong> second
          {secondLeft > 1 && "s"} left
        </p>
      )}
      <form method="dialog" onClose={reset}>
        <button onClick={reset}>Close</button>
      </form>
    </dialog>,
    document.querySelector("#modal")
  );
});

export default ResultModal;
