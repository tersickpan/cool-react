import { configureStore } from "@reduxjs/toolkit";
import mediaDataReducer from "./mediaDataSlice";
import wallpaperReducer from "./wallpaperSlice";

const store = configureStore({
  reducer: {
    mediaData: mediaDataReducer,
    wallpaper: wallpaperReducer,
  },
});

export default store;
