import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import App from "./App.jsx";
import Editor from "./pages/Editor.jsx";
import Viewer from "./pages/Viewer.jsx";
import WallPicture from "./pages/WallPicture.jsx";
import WallVideo from "./pages/WallVideo.jsx";
import RequireJsonLoader from "./components/RequireJsonLoader.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<App />}
          />
          <Route
            path="/editor"
            element={
              <RequireJsonLoader>
                <Editor />
              </RequireJsonLoader>
            }
          />
          <Route
            path="/xviewx"
            element={
              <RequireJsonLoader>
                <Viewer />
              </RequireJsonLoader>
            }
          />
          <Route
            path="/wallpic"
            element={
              <RequireJsonLoader>
                <WallPicture />
              </RequireJsonLoader>
            }
          />
          <Route
            path="/wallvid"
            element={
              <RequireJsonLoader>
                <WallVideo />
              </RequireJsonLoader>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
