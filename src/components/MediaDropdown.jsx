import { useSelector, useDispatch } from "react-redux";
import { setMediaType } from "../store/mediaDataSlice";
import {
  setSelectedBaseKey,
  setSelectedEntryKey,
} from "../store/mediaEditorSlice";

import SectionCard from "./base/SectionCard";
import BaseLabel from "./base/BaseLabel";
import BaseDropdown from "./base/BaseDropdown";

export default function MediaDropdown() {
  const dispatch = useDispatch();
  const mediaType = useSelector((state) => state.mediaData.mediaType);

  const mediaOptions = [
    { label: "📸 Pictures", value: "pictures" },
    { label: "🎥 Videos", value: "videos" },
  ];

  const handleChange = ({ value }) => {
    dispatch(setSelectedEntryKey(""));
    dispatch(setSelectedBaseKey(""));
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
