import { useSelector, useDispatch } from "react-redux";
import { setSelectedEntryKey } from "../store/mediaEditorSlice";

import BaseLabel from "./base/BaseLabel";
import BaseDropdown from "./base/BaseDropdown";

export default function EntryKeyDropdown({ disabled }) {
  const dispatch = useDispatch();
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
        onChange={(e) => dispatch(setSelectedEntryKey(e.target.value))}
        disabled={disabled}
      ></BaseDropdown>
    </>
  );
}
