import { useState } from "react";

import NavBar from "../components/NavBar";
import AddNew from "../components/AddNew";
import EditExist from "../components/EditExist";
import LastUpdated from "../components/LastUpdated";

function Editor() {
  const [currentMode, setCurrentMode] = useState("");

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 space-y-6">
      <h1 className="text-3xl text-pink-400 font-bold">
        💅 Smart Media JSON Editor
      </h1>
      <NavBar
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
      />
      {currentMode === "add" && <AddNew />}
      {currentMode === "edit" && <EditExist />}
      {currentMode === "last" && <LastUpdated />}
    </div>
  );
}

export default Editor;
