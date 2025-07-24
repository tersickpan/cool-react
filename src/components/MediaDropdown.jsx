import { useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { setMediaType } from "../store/mediaDataSlice";
import {
  setSortMode,
  setBaseKeys,
  setSelectedBaseKey,
  setEntryKeys,
  setSelectedEntryKey,
} from "../store/mediaEditorSlice";

import SectionCard from "./base/SectionCard";
import BaseLabel from "./base/BaseLabel";
import BaseDropdown from "./base/BaseDropdown";

export default function MediaDropdown() {
  const dispatch = useDispatch();
  const location = useLocation();
  const mediaJson = useSelector((state) => state.mediaData.mediaJson);
  const mediaType = useSelector((state) => state.mediaData.mediaType);

  const mediaOptions = [
    { label: "📸 Pictures", value: "pictures" },
    { label: "🎥 Videos", value: "videos" },
  ];

  const handleChange = ({ value }) => {
    if (value) {
      const keys = Object.keys(mediaJson[value]);
      const allKeysByBase = [...new Set(keys.map((k) => k.split("-")[0]))];
      dispatch(setBaseKeys(allKeysByBase));
      if (location.pathname === 'xviewx') {
        console.log("location: ", location);
        dispatch(setSelectedBaseKey(keys[0]))
        dispatch(setSelectedEntryKey(keys[0]))
      }
      //dispatch(setEntryKeys(keys));
    }

    dispatch(setSelectedEntryKey(""));
    dispatch(setSelectedBaseKey(""));
    dispatch(setSortMode("default"));
    dispatch(setMediaType(value));
  };

  return (
    <SectionCard>
      <BaseLabel>Choose media type📸:</BaseLabel>
      <BaseDropdown
        value={mediaType}
        options={mediaOptions}
        onChange={(e) => handleChange(e.target)}
        defaultOpt="Select a media"
      ></BaseDropdown>
    </SectionCard>
  );
}
