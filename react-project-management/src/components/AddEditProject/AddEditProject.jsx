import { useRef } from "react";
import Modal from "../Shared/Modal.jsx";
import CustomInput from "../Shared/CustomInput";
export default function AddEditProject({ onSave, onCancel }) {
  const modalRef = useRef();
  const projectTitleRef = useRef();
  const projectDescRef = useRef();
  const projectDueDateRef = useRef();

  function handleSave() {
    const title = projectTitleRef.current.value;
    const desc = projectDescRef.current.value;
    const dueDate = projectDueDateRef.current.value;
    console.log("handleSave");
    if (
      title.trim().length === 0 ||
      desc.trim().length === 0 ||
      dueDate.trim().length === 0
    ) {
      modalRef.current.open();
      return;
    }

    onSave({ title, desc, dueDate });
  }
  return (
    <>
      <Modal ref={modalRef} buttonCaption="Close">
        {console.log("line 29")}
        <h2 className="text-center py-2 text-cyan-100 bg-cyan-800 font-bold">
          Create New Project {new Date().toLocaleTimeString()}
        </h2>
        <p className="p-3 mb-3 text-cyan-800">
          Invaid new project values, please verfiy input
        </p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex justify-end items-center gap-4">
          <li>
            <button
              onClick={onCancel}
              className="text-cyan-700 hover:text-cyan-950 hover:underline"
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              onClick={handleSave}
              className="rounded px-4 py-2 bg-cyan-700 text-cyan-50 hover:bg-cyan-950 "
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <CustomInput type="text" label="Title" ref={projectTitleRef} />
          <CustomInput label="Desc" textarea ref={projectDescRef} />
          <CustomInput type="date" label="Due Date" ref={projectDueDateRef} />
        </div>
      </div>
    </>
  );
}
