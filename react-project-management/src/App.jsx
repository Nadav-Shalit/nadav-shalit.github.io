import { useState } from "react";
import AddEditProject from "./components/AddEditProject/AddEditProject.jsx";
import NoProjects from "./components/NoProjects/NoProjects.jsx";
import SideBar from "./components/SideBar/SideBar.jsx";

function App() {
  const [projectsState, setProjectsState] = useState({
    seletedProjectId: undefined,
    projects: [],
  });

  function handleAddNewProject() {
    setProjectsState((curState) => {
      const newState = { ...curState };
      newState.seletedProjectId = null;
      return newState;
    });
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar onCreateProject={handleAddNewProject} />
      {projectsState.seletedProjectId === undefined ? (
        <NoProjects onCreateProject={handleAddNewProject} />
      ) : projectsState.seletedProjectId === null ? (
        <AddEditProject />
      ) : (
        <></>
      )}
    </main>
  );
}

export default App;
