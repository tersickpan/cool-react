import { useSelector } from "react-redux";

import EmojiSpinner from "../components/base/EmojiSpinner";
import NavBar from "../components/NavBar";
import AddNew from "../components/AddNew";

function Editor() {
  const loading = useSelector((state) => state.generalState.loading);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 space-y-6">
      <EmojiSpinner visible={loading} />
      <h1 className="text-3xl text-pink-400 font-bold">
        💅 Smart Media JSON Editor
      </h1>
      <NavBar />
      <AddNew />
    </div>
  );
}

export default Editor;
