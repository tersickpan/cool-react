import { useSelector, useDispatch } from "react-redux";
import { setSelectedBaseKey } from "../store/mediaEditorSlice";

import BaseLabel from "./base/BaseLabel";
import BaseDropdown from "./base/BaseDropdown";

export default function BaseKeyDropdown({ disabled }) {
  const dispatch = useDispatch();
  const selectedBaseKey = useSelector(
    (state) => state.mediaEditor.selectedBaseKey
  );
  const baseKeys = useSelector((state) => state.mediaEditor.baseKeys);

  return (
    <>
      <BaseLabel>Which Baddie💋:</BaseLabel>
      <BaseDropdown
        value={selectedBaseKey}
        options={baseKeys}
        onChange={(e) => dispatch(setSelectedBaseKey(e.target.value))}
        disabled={disabled}
      ></BaseDropdown>
    </>
  );
}
