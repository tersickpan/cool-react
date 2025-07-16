import { useSelector, useDispatch } from "react-redux";
import {
  setBaseKeys,
  setSelectedBaseKey,
  setEntryKeys,
} from "../store/mediaEditorSlice";

import BaseLabel from "./base/BaseLabel";
import BaseDropdown from "./base/BaseDropdown";
import { useEffect } from "react";

export default function BaseKeyDropdown({ disabled }) {
  const dispatch = useDispatch();
  const selectedBaseKey = useSelector(
    (state) => state.mediaEditor.selectedBaseKey
  );
  const baseKeys = useSelector((state) => state.mediaEditor.baseKeys);
  const mediaType = useSelector((state) => state.mediaData.mediaType);
  const mediaJson = useSelector((state) => state.mediaData.mediaJson);

  useEffect(() => {
    if (!mediaType) return;

    const keys = Object.keys(mediaJson[mediaType]);
    const allKeysByBase = [...new Set(keys.map((k) => k.split("-")[0]))];

    dispatch(setBaseKeys(allKeysByBase));
  }, [mediaType]);

  useEffect(() => {
    if (!selectedBaseKey) return;

    const keys = Object.keys(mediaJson[mediaType]);
    const options = keys.filter((k) => k.startsWith(selectedBaseKey + "-"));

    dispatch(setEntryKeys(options));
  }, [selectedBaseKey]);

  return (
    <>
      <BaseLabel>Which Baddie💋:</BaseLabel>
      <BaseDropdown
        value={selectedBaseKey}
        options={baseKeys}
        onChange={(e) => dispatch(setSelectedBaseKey(e.target.value))}
        disabled={disabled}
        defaultOpt="Select a baddie"
      ></BaseDropdown>
    </>
  );
}
