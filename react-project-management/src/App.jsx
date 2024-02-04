import { useState } from "react";
import AddEditProject from "./components/AddEditProject/AddEditProject.jsx";
import NoProjects from "./components/NoProjects/NoProjects.jsx";
import SideBar from "./components/SideBar/SideBar.jsx";
import ProjectInfo from "./components/ProjectInfo/ProjectInfo.jsx";

function App() {
  const [projectsState, setProjectsState] = useState({
    seletedProjectId: undefined,
    projects: [],
  });

  const projectData =
    !!projectsState.projects.length && projectsState.seletedProjectId >= 0
      ? projectsState.projects[projectsState.seletedProjectId]
      : null;
  console.log(projectData);
  function handleAddNewProject() {
    setProjectsState((curState) => {
      const newState = { ...curState };
      newState.seletedProjectId = null;
      return newState;
    });
  }
  function handleSubmitNewProject(newProjectData) {
    setProjectsState((curState) => {
      const newState = { ...curState };
      newState.projects = [...newState.projects, newProjectData];
      newState.seletedProjectId = newState.projects.length - 1;

      return newState;
    });
  }

  console.log(projectsState);
  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar
        onCreateProject={handleAddNewProject}
        projectList={projectsState.projects}
      />
      {projectsState.seletedProjectId === undefined ? (
        <NoProjects onCreateProject={handleAddNewProject} />
      ) : projectsState.seletedProjectId === null ? (
        <AddEditProject onSave={handleSubmitNewProject} />
      ) : (
        { projectData } && <ProjectInfo projectData={projectData}></ProjectInfo>
      )}
    </main>
  );
}

export default App;
