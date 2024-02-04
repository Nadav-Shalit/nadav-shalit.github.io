import CustomInput from "../Shared/CustomInput";
import { useRef } from "react";
export default function AddEditProject({ onSave }) {
  const projectTitleRef = useRef();
  const projectDescRef = useRef();
  const projectDueDateRef = useRef();

  function handleSave() {
    const title = projectTitleRef.current.value;
    const desc = projectDescRef.current.value;
    const dueDate = projectDueDateRef.current.value;

    // Valid TBD

    onSave({ title, desc, dueDate });
  }
  return (
    <div className="w-[35rem] mt-16">
      <menu className="flex justify-end items-center gap-4">
        <li>
          <button className="text-cyan-700 hover:text-cyan-950 hover:underline">
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
  );
}
