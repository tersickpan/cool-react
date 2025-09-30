import {
  setBaseKeys,
  setEntryKeys,
  setSelectedBaseKey,
  setSelectedEntryKey,
} from "./mediaEditorSlice";

export const refreshMediaJson = () => (dispatch, getState) => {
  const state = getState();

  const mediaJson = state.mediaData.mediaJson;
  const mediaType = state.mediaData.mediaType;
  const selectedBaseKey = state.mediaEditor.selectedBaseKey;
  const selectedEntryKey = state.mediaEditor.selectedEntryKey;
  const baseKeys = state.mediaEditor.baseKeys;
  const entryKeys = state.mediaEditor.entryKeys;

  console.log("Refreshing mediaJson with current state:", {
    mediaJson,
    mediaType,
    selectedBaseKey,
    selectedEntryKey,
    baseKeys,
    entryKeys,
  });

  // Update baseKeys based on the current mediaJson and mediaType
  const keys = Object.keys(mediaJson[mediaType]);
  const allKeysByBase = [...new Set(keys.map((k) => k.split("-")[0]))];
  dispatch(setBaseKeys(allKeysByBase));

  // Update entryKeys based on the selectedBaseKey
  const options = keys.filter((k) => k.startsWith(selectedBaseKey + "-"));
  dispatch(setEntryKeys(options));

  // Reset selected keys
  dispatch(setSelectedEntryKey(""));
  dispatch(setSelectedBaseKey(""));
};
