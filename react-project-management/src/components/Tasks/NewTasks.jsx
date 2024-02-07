import { useState } from "react";
import CustomButton from "../Shared/CustomButton";

export default function NewTasks({ onAddTask }) {
  const [newTask, setNewTask] = useState("");
  function handleAddTaskClick() {
    if (!!newTask.trim()) {
      onAddTask(newTask);
      setNewTask("");
    }
  }
  function handleOnInput(e) {
    setNewTask(e.target.value);
  }
  return (
    <div className="flex items-center gap-4">
      <input
        className="w-64 px-2 py-1 rounded-sm bg-cyan-100 focus:outline-none focus:border-blue-600 "
        type="text"
        onInput={handleOnInput}
        value={newTask}
      />
      <CustomButton onClick={handleAddTaskClick}>Add task</CustomButton>
    </div>
  );
}
