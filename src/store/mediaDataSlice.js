import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mediaType: "",
  mediaJson: {
    pictures: {},
    videos: {},
  },
  isJsonLoaded: false,
};

const mediaDataSlice = createSlice({
  name: "mediaData",
  initialState,
  reducers: {
    setMediaType: (state, action) => {
      state.mediaType = action.payload;
    },
    setMediaJson: (state, action) => {
      state.mediaJson = action.payload;
    },
    setIsJsonLoaded: (state, action) => {
      state.isJsonLoaded = action.payload;
    },
  },
});

export const { setMediaType, setMediaJson, setIsJsonLoaded } =
  mediaDataSlice.actions;

export default mediaDataSlice.reducer;
