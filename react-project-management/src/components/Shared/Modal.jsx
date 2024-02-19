import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import CustomButton from "./CustomButton.jsx";

const Modal = forwardRef(function Modal({ children, buttonCaption }, refProp) {
  const dialogRef = useRef();
  useImperativeHandle(refProp, () => {
    return {
      open() {
        dialogRef.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog
      ref={dialogRef}
      className="backdrop:bg-cyan-900/90  pb-5 border-cyan-200 rounded border-2"
    >
      {children}
      <form method="dialog" className="flex justify-center">
        <CustomButton type="submit">{buttonCaption}</CustomButton>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default Modal;
