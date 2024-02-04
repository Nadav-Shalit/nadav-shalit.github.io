import AddEditProject from "./components/AddEditProject/AddEditProject.jsx";
import SideBar from "./components/SideBar/SideBar.jsx";

function App() {
  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar />
      <AddEditProject />
    </main>
  );
}

export default App;
