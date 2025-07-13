import { useSelector, useDispatch } from "react-redux";
import { setMediaType } from "../store/mediaDataSlice";

import SectionCard from "./base/SectionCard";
import BaseLabel from "./base/BaseLabel";
import BaseDropdown from "./base/BaseDropdown";

export default function MediaDropdown() {
  const dispatch = useDispatch();
  const mediaType = useSelector((state) => state.mediaData.mediaType);

  const mediaOptions = [
    { label: "Select a media", value: "" },
    { label: "📸 Pictures", value: "pictures" },
    { label: "🎥 Videos", value: "videos" },
  ];

  return (
    <SectionCard>
      <BaseLabel>Choose media type📸:</BaseLabel>
      <BaseDropdown
        value={mediaType}
        options={mediaOptions}
        onChange={(e) => dispatch(setMediaType(e.target.value))}
      ></BaseDropdown>
    </SectionCard>
  );
}
