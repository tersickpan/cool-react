import { useSelector, useDispatch } from "react-redux";
import { setBaseKeys, setEntryKeys, setSortMode } from "../store/mediaEditorSlice";

import BaseLabel from "./base/BaseLabel";
import BaseDropdown from "./base/BaseDropdown";
import sortByTimestamp from "../utils/sortByTimestamp";

export default function SortModeDropdown() {
  const dispatch = useDispatch();
  const mediaType = useSelector((state) => state.mediaData.mediaType);
  const mediaJson = useSelector((state) => state.mediaData.mediaJson);
  const sortMode = useSelector((state) => state.mediaEditor.sortMode);

  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
  ];

  const handleSortChange = ({ value }) => {
    dispatch(setSortMode(value));

    if (value === "default") {
      const keys = Object.keys(mediaJson[mediaType]);
      const allKeysByBase = [...new Set(keys.map((k) => k.split("-")[0]))];
      dispatch(setBaseKeys(allKeysByBase))
      //const options = Object.keys(mediaJson[mediaType]);
      //dispatch(setEntryKeys(options));
      return;
    }

    const sortedMediaJson = sortByTimestamp(
      mediaJson,
      value === "newest" ? "desc" : "asc"
    );
    const options = Object.keys(sortedMediaJson[mediaType]);
    dispatch(setEntryKeys(options));
  };

  return (
    <>
      <BaseLabel>Sort Mode:</BaseLabel>
      <BaseDropdown
        value={sortMode}
        options={sortOptions}
        onChange={(e) => handleSortChange(e.target)}
      />
    </>
  );
}
