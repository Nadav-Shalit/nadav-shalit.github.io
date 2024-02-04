export default function ProjectInfo({ projectData }) {
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
            // onClick={handleEdit}
            className="rounded px-4 py-2 bg-cyan-700 text-cyan-50 hover:bg-cyan-950 "
          >
            Edit
          </button>
        </li>
      </menu>
      <div className="flex flex-col gap-2">
        <p>
          <label className="font-bold px-2">Title</label>
          <span>{projectData.title}</span>
        </p>
        <p>
          <label className="font-bold px-2">Desc</label>
          <span>{projectData.desc}</span>
        </p>
        <p>
          <label className="font-bold px-2">Due Date</label>
          <span>{projectData.dueDate}</span>
        </p>
      </div>
    </div>
  );
}
