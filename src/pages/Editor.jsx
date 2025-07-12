import { useSelector } from "react-redux";

import EmojiSpinner from "../components/base/EmojiSpinner";
import NavBar from "../components/NavBar";

function Editor() {
  const loading = useSelector((state) => state.generalState.loading);

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
      <h1 className="text-3xl text-pink-400 font-bold">
        💅 Smart Media JSON Editor
      </h1>
      <NavBar />
      <EmojiSpinner visible={loading} />
    </div>
  );
}

export default Editor;
