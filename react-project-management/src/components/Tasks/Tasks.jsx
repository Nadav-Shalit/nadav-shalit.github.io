import CustomButton from "../Shared/CustomButton.jsx";
import NewTasks from "./NewTasks.jsx";

export default function Tasks({ onAddTask, onDeleteTask, tasksList }) {
  return (
    <section>
      <h2 className="text-2xl font mb-4 text-cyan-700">Tasks</h2>
      <NewTasks onAddTask={onAddTask}></NewTasks>
      {tasksList.length === 0 && (
        <p className="text-cyan-800 my-4">No tasks created</p>
      )}
      {tasksList.length > 0 && (
        <ul className="mt-8 p-4 rounded-md bg-cyan-100">
          {tasksList.map((tsk, idx) => {
            return (
              <li key={idx} className="flex justify-between my-4">
                <span>
                  {idx}-{tsk}
                </span>
                <button className="px-3 " onClick={() => onDeleteTask(idx)}>
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
