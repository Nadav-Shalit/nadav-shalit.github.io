import CustomButton from "../Shared/CustomButton";

export default function SideBarI({ onCreateProject }) {
  return (
    <aside className="px-8 py-16 bg-slate-900 text-cyan-50 rounded-r-lg w-1/3 md:w-72">
      <h2 className="mb-8 font-bold tracking-wider uppercase md:text-lg text-cyan-400">
        Projects List
      </h2>
      <div>
        <CustomButton onClick={onCreateProject}>+ Add new project</CustomButton>
      </div>
      <ul></ul>
    </aside>
  );
}
