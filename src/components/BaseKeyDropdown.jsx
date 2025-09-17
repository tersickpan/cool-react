import { useSelector, useDispatch } from "react-redux";
import { setSelectedBaseKey, setEntryKeys } from "../store/mediaEditorSlice";
import { setCurrentBaddie } from "../store/mediaPreviewSlice.js";

import BaseLabel from "./base/BaseLabel";
import BaseDropdown from "./base/BaseDropdown";
import getRandomEntry from "../utils/getRandomEntry";

export default function BaseKeyDropdown({
  disabled,
  defaultOpt = "Select a baddie",
  setCurrentBaddieForPreview = false,
}) {
  const dispatch = useDispatch();
  const selectedBaseKey = useSelector(
    (state) => state.mediaEditor.selectedBaseKey
  );
  const baseKeys = useSelector((state) => state.mediaEditor.baseKeys);
  const mediaType = useSelector((state) => state.mediaData.mediaType);
  const mediaJson = useSelector((state) => state.mediaData.mediaJson);

  const handleBaseKeyChange = ({ value }) => {
    dispatch(setSelectedBaseKey(value));

    if (setCurrentBaddieForPreview) {
      if (value) {
        dispatch(setCurrentBaddie(getRandomEntry(mediaJson[mediaType], value)));
      } else {
        dispatch(setCurrentBaddie(null));
      }
    }

    if (value) {
      const keys = Object.keys(mediaJson[mediaType]);
      const options = keys.filter((k) => k.startsWith(value + "-"));

      dispatch(setEntryKeys(options));
    } else {
      dispatch(setEntryKeys([]));
    }
  };

  return (
    <>
      <BaseLabel>Which Baddie💋:</BaseLabel>
      <BaseDropdown
        value={selectedBaseKey}
        options={baseKeys}
        onChange={(e) => handleBaseKeyChange(e.target)}
        disabled={disabled}
        defaultOpt={defaultOpt}
      ></BaseDropdown>
    </>
  );
}
