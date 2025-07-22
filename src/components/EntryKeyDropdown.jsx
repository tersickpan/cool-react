import { useSelector } from "react-redux";

import BaseLabel from "./base/BaseLabel";
import BaseDropdown from "./base/BaseDropdown";

export default function EntryKeyDropdown({ disabled, handleSelectedEntryKey }) {
  const entryKeys = useSelector((state) => state.mediaEditor.entryKeys);
  const selectedEntryKey = useSelector(
    (state) => state.mediaEditor.selectedEntryKey
  );

  return (
    <>
      <BaseLabel>Them goods🥵:</BaseLabel>
      <BaseDropdown
        value={selectedEntryKey}
        options={entryKeys}
        onChange={(e) => handleSelectedEntryKey(e.target)}
        disabled={disabled}
        defaultOpt="Which one?"
      ></BaseDropdown>
    </>
  );
}
