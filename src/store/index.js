import { configureStore } from "@reduxjs/toolkit";
import mediaEditorReducer from "./mediaEditorSlice";
import mediaDataReducer from "./mediaDataSlice";
import generalStateReducer from "./generalStateSlice";
import wallpaperReducer from "./wallpaperSlice";

const store = configureStore({
  reducer: {
    generalState: generalStateReducer,
    mediaData: mediaDataReducer,
    mediaEditor: mediaEditorReducer,
    wallpaper: wallpaperReducer,
  },
});

export default store;
