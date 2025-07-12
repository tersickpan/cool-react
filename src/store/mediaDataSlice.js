import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mediaType: "",
  mediaJson: {},
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
  },
});

export const { setMediaType, setMediaJson } = mediaDataSlice.actions;

export default mediaDataSlice.reducer;
