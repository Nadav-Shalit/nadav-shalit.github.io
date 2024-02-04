import CustomInput from "../Shared/CustomInput";
export default function AddEditProject({ onCreateProject }) {
  return (
    <div className="w-[35rem] mt-16">
      <menu className="flex justify-end items-center gap-4">
        <li>
          <button className="text-cyan-700 hover:text-cyan-950 hover:underline">
            Cancel
          </button>
        </li>
        <li>
          <button className="rounded px-4 py-2 bg-cyan-700 text-cyan-50 hover:bg-cyan-950 ">
            Save
          </button>
        </li>
      </menu>
      <div>
        <CustomInput label="Title" />
        <CustomInput label="Desc" textarea />
        <CustomInput label="Due Date" />
      </div>
    </div>
  );
}
