import "./App.css";
import Header from "./componenets/Header/Header";
import Taxonomies from "./componenets/Api-Data/Taxonomies/Taxonomies.jsx";
import SideBar from "./componenets/SideBar.jsx";
import { useState } from "react";

function App() {
  const menuArr = ["Taxonomies"];
  const [menuTab, setMeueTab] = useState("");
  function handleNavigate(menuItem) {
    setMeueTab(menuItem);
  }
  return (
    <>
      <Header></Header>
      <main className="h-screen my-4 flex gap-2">
        <aside className="px-8 py-16 bg-slate-900 text-cyan-50 rounded-r-lg w-1/3 md:w-72">
          <SideBar
            data={menuArr}
            navigate={handleNavigate}
            menuTab={menuTab}
          ></SideBar>
        </aside>
        <div className="w-2/3">
          {menuTab === "Taxonomies" && <Taxonomies />}
        </div>
      </main>
    </>
  );
}

export default App;
