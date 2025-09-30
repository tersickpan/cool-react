import { useSelector, useDispatch } from "react-redux";
import { setMediaType } from "../store/mediaDataSlice";
import { setSortMode } from "../store/mediaEditorSlice";
import { setAllPreviewCleared } from "../store/mediaPreviewSlice";

import SectionCard from "./base/SectionCard";
import BaseLabel from "./base/BaseLabel";
import BaseDropdown from "./base/BaseDropdown";
import { fetchBaseKeys } from "../utils/supabase";
import { useEffect } from "react";

export default function MediaDropdown({
  setBaseKeys = () => {},
  setSelectedBaseKey = () => {},
  setSelectedEntryKey = () => {},
}) {
  const dispatch = useDispatch();
  const mediaType = useSelector((state) => state.mediaData.mediaType);

  const mediaOptions = [
    { label: "📸 Pictures", value: "pictures" },
    { label: "🎥 Videos", value: "videos" },
  ];

  const handleChange = ({ value }) => {
    dispatch(setMediaType(value));
    dispatch(setAllPreviewCleared());
    setSelectedEntryKey("");
    setSelectedBaseKey("");
    dispatch(setSortMode("default"));
  };

  useEffect(() => {
    if (!mediaType) return;

    fetchBaseKeys(mediaType)
      .then((keys) => {
        const options = [...new Set(keys.map((key) => key.base_key))];
        setBaseKeys(options);
      })
      .catch((err) => {
        console.error("Failed to fetch base keys from Supabase", err);
      });
  }, [mediaType]);

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
