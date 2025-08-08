import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentBaddie: {},
  newUrl: "",
  newVolume: 0.07,
  currentUrl: "",
  currentVolume: 0.07,
};

const mediaPreviewSlice = createSlice({
  name: "mediaPreview",
  initialState,
  reducers: {
    setCurrentBaddie: (state, action) => {
      state.currentBaddie = action.payload;
    },
    setNewUrl: (state, action) => {
      state.newUrl = action.payload;
    },
    setNewVolume: (state, action) => {
      state.newVolume = action.payload;
    },
    setCurrentUrl: (state, action) => {
      state.currentUrl = action.payload;
    },
    setCurrentVolume: (state, action) => {
      state.currentVolume = action.payload;
    },
    setAllPreviewCleared: (state) => {
      state.currentBaddie = {};
      state.newUrl = "";
      state.newVolume = 0.07;
      state.currentUrl = "";
      state.currentVolume = 0.07;
    },
  },
});

export const {
  setCurrentBaddie,
  setNewUrl,
  setNewVolume,
  setCurrentUrl,
  setCurrentVolume,
  setAllPreviewCleared,
} = mediaPreviewSlice.actions;

export default mediaPreviewSlice.reducer;
