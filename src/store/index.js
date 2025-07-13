import { configureStore } from "@reduxjs/toolkit";
import mediaEditorReducer from "./mediaEditorSlice";
import mediaDataReducer from "./mediaDataSlice";
import generalStateReducer from "./generalStateSlice";

const store = configureStore({
  reducer: {
    generalState: generalStateReducer,
    mediaData: mediaDataReducer,
    mediaEditor: mediaEditorReducer,
  },
});

export default store;
