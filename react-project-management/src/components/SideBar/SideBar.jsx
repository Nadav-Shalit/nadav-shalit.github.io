export default function SideBarI() {
  return (
    <aside className="px-8 py-16 bg-slate-900 text-cyan-50 rounded-r-lg w-1/3 md:w-72">
      <h2 className="mb-8 font-bold tracking-wider uppercase md:text-lg text-cyan-400">
        Projects List
      </h2>
      <div>
        <button className="bg-cyan-700 hover:bg-cyan-600 px-3 py-1 rounded text-cyan-300 hover:text-cyan-100 font-semibold text-xs md:text-base">
          + Add new project
        </button>
      </div>
      <ul></ul>
    </aside>
  );
}
