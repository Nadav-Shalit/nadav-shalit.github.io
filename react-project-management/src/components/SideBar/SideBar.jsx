import CustomButton from "../Shared/CustomButton";

export default function SideBarI({
  onCreateProject,
  projectList,
  onSelect,
  selectedProjectId,
}) {
  return (
    <aside className="px-8 py-16 bg-slate-900 text-cyan-50 rounded-r-lg w-1/3 md:w-72">
      <h2 className="mb-8 font-bold tracking-wider uppercase md:text-lg text-cyan-400">
        Projects List
      </h2>
      <div>
        <CustomButton onClick={onCreateProject}>+ Add new project</CustomButton>
      </div>
      <ul className="mt-8">
        {projectList.map((proj, idx) => {
          let className = "w-full text-left px-2 py-1 rounded-sm my-1";
          className +=
            selectedProjectId === idx
              ? " text-cyan-200 bg-cyan-900 underline"
              : " text-cyan-400 hover:text-cyan-200 hover:bg-cyan-800";

          return (
            <li key={idx}>
              <button onClick={() => onSelect(idx)} className={className}>
                {proj.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
