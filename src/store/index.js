import { configureStore } from "@reduxjs/toolkit";
import mediaEditorReducer from "./mediaEditorSlice";
import mediaDataReducer from "./mediaDataSlice";
import generalStateReducer from "./generalStateSlice";
import wallpaperReducer from "./wallpaperSlice";
import mediaPreviewReducer from "./mediaPreviewSlice";

const store = configureStore({
  reducer: {
    generalState: generalStateReducer,
    mediaData: mediaDataReducer,
    mediaEditor: mediaEditorReducer,
    wallpaper: wallpaperReducer,
    mediaPreview: mediaPreviewReducer,
  },
});

export default store;
