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
  function getProjectData() {
    return !!projectsState.projects.length &&
      projectsState.seletedProjectId >= 0
      ? projectsState.projects[projectsState.seletedProjectId]
      : null;
  }
  function handleSetSelectedProject(projectId = undefined) {
    // console.log("handleSetSelectedProject", { projectId });
    setProjectsState((curState) => {
      const newState = { ...curState };
      newState.seletedProjectId = projectId;
      return newState;
    });
  }
  function handleSubmitNewProject(newProjectData) {
    // console.log("handleSubmitNewProject");
    setProjectsState((curState) => {
      const newState = { ...curState };
      newState.projects = [...newState.projects, newProjectData];
      newState.seletedProjectId = newState.projects.length - 1;

      return newState;
    });
  }
  function handleDeleteProject() {
    setProjectsState((curState) => {
      const newState = { ...curState };
      let projects = [...newState.projects];
      projects.splice(curState.seletedProjectId, 1);
      newState.projects = projects;
      newState.seletedProjectId = undefined;

      return newState;
    });
  }

  // console.log(projectsState);
  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar
        onCreateProject={() => handleSetSelectedProject(null)}
        onSelect={(idx) => handleSetSelectedProject(idx)}
        projectList={projectsState.projects}
        selectedProjectId={projectsState.seletedProjectId}
      />
      {projectsState.seletedProjectId === undefined && (
        <NoProjects onCreateProject={() => handleSetSelectedProject(null)} />
      )}
      {projectsState.seletedProjectId === null && (
        <AddEditProject
          onSave={handleSubmitNewProject}
          onCancel={() => handleSetSelectedProject()}
        />
      )}
      {getProjectData() && (
        <ProjectInfo
          projectData={getProjectData()}
          onCancel={() => handleSetSelectedProject()}
          onDelete={handleDeleteProject}
        ></ProjectInfo>
      )}
    </main>
  );
}

export default App;
