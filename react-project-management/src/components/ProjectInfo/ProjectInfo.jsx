import CustomButton from "../Shared/CustomButton.jsx";

export default function ProjectInfo({
  projectData,
  onCancel,
  onDelete,
  selectedProjectId,
}) {
  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-cyan-300">
        <menu className=" flex  justify-end  gap-1">
          {/* <li>
            <button
              onClick={onCancel}
              className="text-cyan-700 hover:text-cyan-950 hover:underline"
            >
              Cancel
            </button>
          </li> */}
          {/* <li>
            <CustomButton
              // onClick={handleEdit}
              className="rounded px-4 py-2 bg-cyan-700 text-cyan-50 hover:bg-cyan-950 "
            >
              Edit
            </CustomButton>
          </li> */}
          <li>
            <CustomButton onClick={() => onDelete(selectedProjectId)}>
              Delete
            </CustomButton>
          </li>
        </menu>
        <div className=" flex items-center justify-between">
          <h1 className="text-3xl font-bold text-cyan-600 mb-2">
            {projectData.title}
          </h1>
        </div>
        <p className="text-blue-400 mb-4">{projectData.dueDate}</p>
        <p className="text-cyan-600 whitespace-pre-wrap">{projectData.desc}</p>
      </header>
      TASKS
    </div>
  );
}
