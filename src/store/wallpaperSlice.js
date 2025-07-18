import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currPicsArr: [],
  currVidsArr: [],
  picIndex: 0,
  vidIndex: 0,
  leftUrl: "",
  middleUrl: "",
  rightUrl: "",
  videoVolume: 0,
};

const wallpaperSlice = createSlice({
  name: "wallpaper",
  initialState,
  reducers: {
    setCurrPicsArr: (state, action) => {
      state.currPicsArr = action.payload;
    },
    setCurrVidsArr: (state, action) => {
      state.currVidsArr = action.payload;
    },
    setPicIndex: (state, action) => {
      state.picIndex = action.payload;
    },
    setVidIndex: (state, action) => {
      state.vidIndex = action.payload;
    },
    setLeftUrl: (state, action) => {
      state.leftUrl = action.payload;
    },
    setMiddleUrl: (state, action) => {
      state.middleUrl = action.payload;
    },
    setRightUrl: (state, action) => {
      state.rightUrl = action.payload;
    },
    setVideoVolume: (state, action) => {
      state.videoVolume = action.payload;
    },
  },
});

export const {
  setCurrPicsArr,
  setCurrVidsArr,
  setPicIndex,
  setVidIndex,
  setLeftUrl,
  setMiddleUrl,
  setRightUrl,
  setVideoVolume,
} = wallpaperSlice.actions;

export default wallpaperSlice.reducer;
