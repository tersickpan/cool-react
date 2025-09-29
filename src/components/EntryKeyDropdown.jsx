import BaseLabel from "./base/BaseLabel";
import BaseDropdown from "./base/BaseDropdown";

export default function EntryKeyDropdown({
  disabled,
  defaultOpt = "Which one?",
  handleSelectedEntryKey,
  entryKeys = [],
  selectedEntryKey = "",
}) {
  return (
    <>
      <BaseLabel>Them goods🥵:</BaseLabel>
      <BaseDropdown
        value={selectedEntryKey}
        options={entryKeys}
        onChange={(e) => handleSelectedEntryKey(e.target)}
        disabled={disabled}
        defaultOpt={defaultOpt}
      ></BaseDropdown>
    </>
  );
}
