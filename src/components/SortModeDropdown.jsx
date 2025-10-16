import { useState } from "react";

import BaseLabel from "./base/BaseLabel";
import BaseDropdown from "./base/BaseDropdown";
import { fetchAllMedia } from "../utils/supabase";

export default function SortModeDropdown({
  sortMode = () => {},
  setSortMode = () => {},
  handleResetStates = () => {},
  mediaType = "",
  setCurrentBaddieArr = () => {},
  setEntryKeys = () => {},
}) {
  const [allMediaData, setAllMediaData] = useState({
    newest: {
      pictures: [],
      videos: [],
    },
    oldest: {
      pictures: [],
      videos: [],
    },
  });

  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
  ];

  const handleSortChange = async ({ value }) => {
    handleResetStates();
    setSortMode(value);

    if (value === "default") return;

    if (allMediaData[value][mediaType].length === 0) {
      console.log("Fetching: ", { mediaType, sortMode: value });

      await fetchAllMedia({
        mediaType,
        ascending: value === "oldest",
      }).then((res) => {
        setAllMediaData((prev) => ({
          ...prev,
          [value]: {
            ...prev[value],
            [mediaType]: res,
          },
        }));
        setCurrentBaddieArr(res);
        setEntryKeys(res.map((item) => item.public_id));
      });
    } else {
      setCurrentBaddieArr(allMediaData[value][mediaType]);
      setEntryKeys(
        allMediaData[value][mediaType].map((item) => item.public_id)
      );
    }
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
