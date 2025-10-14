import { useDispatch } from "react-redux";
import { setSortMode } from "../store/mediaEditorSlice";

import SectionCard from "./base/SectionCard";
import BaseLabel from "./base/BaseLabel";
import BaseDropdown from "./base/BaseDropdown";
import { fetchBaseKeys } from "../utils/supabase";
import { useEffect } from "react";

export default function MediaDropdown({
  mediaType = "",
  setMediaType = () => {},
  setBaseKeys = () => {},
  handleResetStates = () => {},
}) {
  const dispatch = useDispatch();

  const mediaOptions = [
    { label: "📸 Pictures", value: "pictures" },
    { label: "🎥 Videos", value: "videos" },
  ];

  const handleChange = ({ value }) => {
    setMediaType(value);
    handleResetStates();
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
