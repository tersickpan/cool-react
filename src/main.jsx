import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Editor from "./pages/Editor.jsx";
import Viewer from "./pages/Viewer.jsx";
import WallPicture from "./pages/WallPicture.jsx";
import WallVideo from "./pages/WallVideo.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<App />}
        />
        <Route
          path="/editor"
          element={<Editor />}
        />
        <Route
          path="/xviewx"
          element={<Viewer />}
        />
        <Route
          path="/wallpic"
          element={<WallPicture />}
        />
        <Route
          path="/wallvid"
          element={<WallVideo />}
        />
        <Route
          path="*"
          element={<App />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
