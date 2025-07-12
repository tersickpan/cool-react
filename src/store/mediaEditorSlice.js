import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentMode: "",
  baseKeys: [],
  selectedBaseKey: "",
  entryKeys: [],
  selectedEntryKey: "",
  sortMode: "default", // "default" | "newest" | "oldest"
  loading: false,
  error: null,
};

const mediaEditorSlice = createSlice({
  name: "mediaEditor",
  initialState,
  reducers: {
    setCurrentMode: (state, action) => {
      state.currentMode = action.payload;
    },
    setBaseKeys: (state, action) => {
      state.baseKeys = action.payload;
    },
    setSelectedBaseKey: (state, action) => {
      state.selectedBaseKey = action.payload;
    },
    setEntryKeys: (state, action) => {
      state.entryKeys = action.payload;
    },
    setSelectedEntryKey: (state, action) => {
      state.selectedEntryKey = action.payload;
    },
    setSortMode: (state, action) => {
      state.sortMode = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCurrentMode,
  setBaseKeys,
  setSelectedBaseKey,
  setEntryKeys,
  setSelectedEntryKey,
  setSortMode,
  setLoading,
  setError,
} = mediaEditorSlice.actions;

export default mediaEditorSlice.reducer;
