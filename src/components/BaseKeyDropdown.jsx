import BaseLabel from "./base/BaseLabel";
import BaseDropdown from "./base/BaseDropdown";
import { fetchEntryKeys, fetchSingleRandomEntry } from "../utils/supabase.js";
import { useEffect } from "react";

export default function BaseKeyDropdown({
  disabled,
  defaultOpt = "Select a baddie",
  setCurrentBaddieForPreview = false,
  baseKeys = [],
  selectedBaseKey = "",
  mediaType = "",
  setSelectedBaseKey = () => {},
  setEntryKeys = () => {},
  setCurrentUrl = () => {},
  setCurrentVolume = () => {},
  setCurrentBaddie = () => {},
  setCurrentBaddieArr = () => {},
  setLastEntryIndex = () => {},
}) {
  const handleBaseKeyChange = ({ value }) => {
    setSelectedBaseKey(value);
    setCurrentUrl("");
    setCurrentVolume(0);
  };

  useEffect(() => {
    if (!selectedBaseKey) {
      setEntryKeys([]);
      return;
    }

    if (setCurrentBaddieForPreview) {
      fetchSingleRandomEntry(mediaType, selectedBaseKey)
        .then((entry) => {
          setCurrentBaddie(entry);
          setLastEntryIndex(entry.lastEntryIndex);
        })
        .catch((err) => {
          console.error(
            "Failed to fetch single random entry from Supabase",
            err
          );
        });
      return;
    } else {
      setCurrentBaddie(null);
    }

    fetchEntryKeys(mediaType, selectedBaseKey)
      .then((keys) => {
        setCurrentBaddieArr(keys);
        const options = [...new Set(keys.map((key) => key.public_id))];
        setEntryKeys(options);
      })
      .catch((err) => {
        console.error("Failed to fetch entry keys from Supabase", err);
      });
  }, [selectedBaseKey]);

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
