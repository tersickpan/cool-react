import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedEntryKey } from "../store/mediaEditorSlice";

import BaseLabel from "./base/BaseLabel";
import BaseInput from "./base/BaseInput";
import SectionCard from "./base/SectionCard";
import BaseKeyDropdown from "./BaseKeyDropdown";
import EntryKeyDropdown from "./EntryKeyDropdown";
import MediaDropdown from "./MediaDropdown";
import BaseButton from "./base/BaseButton";
import isValidUrl from "../utils/isValidUrl";
import BaseImagePreview from "./base/BaseImagePreview";
import BaseVideoPreview from "./base/BaseVideoPreview";

export default function EditExist() {
  const dispatch = useDispatch();
  const mediaJson = useSelector((state) => state.mediaData.mediaJson);
  const mediaType = useSelector((state) => state.mediaData.mediaType);
  const selectedBaseKey = useSelector(
    (state) => state.mediaEditor.selectedBaseKey
  );
  const selectedEntryKey = useSelector(
    (state) => state.mediaEditor.selectedEntryKey
  );

  const [currentUrl, setCurrentUrl] = useState("");
  const [currentVolume, setCurrentVolume] = useState(0.07);

  const handleSelectedEntryKey = ({ value }) => {
    if (!value) return;

    dispatch(setSelectedEntryKey(value));
    const baddie = mediaJson[mediaType][value];

    setCurrentUrl(baddie.url);
    if (baddie.volume) setCurrentVolume(baddie.volume);
  };

  const handleEdit = () => {
    if (!selectedBaseKey || !selectedEntryKey || !currentUrl) {
      alert("Missing fields bruh");
      return;
    }

    if (!isValidUrl(currentUrl)) {
      alert("Invalid URL!");
      return;
    }

    console.log({
      baseKey: selectedEntryKey,
      url: currentUrl,
      ...(mediaType === "videos" && { volume: parseFloat(currentVolume) }),
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <>
      <MediaDropdown />
      {mediaType && (
        <>
          <div className="grid md:grid-cols-3 gap-6">
            <SectionCard className="col-span-1">
              <BaseKeyDropdown />
              <EntryKeyDropdown
                disabled={!selectedBaseKey}
                handleSelectedEntryKey={handleSelectedEntryKey}
              />
              <BaseLabel>URL</BaseLabel>
              <BaseInput
                value={currentUrl}
                onChange={(e) => setCurrentUrl(e.target.value)}
              />
              {mediaType === "videos" && (
                <>
                  <BaseLabel>Volume</BaseLabel>
                  <BaseInput
                    type="number"
                    value={currentVolume}
                    onChange={(e) => setCurrentVolume(e.target.value)}
                    min={0}
                    max={1}
                    step={0.01}
                  />
                </>
              )}
            </SectionCard>
            <SectionCard className="col-span-2">
              <div className="grid md:grid-cols-2 gap-6">
                {mediaType === "pictures" && (
                  <BaseImagePreview src={currentUrl} />
                )}
                {mediaType === "videos" && (
                  <BaseVideoPreview
                    src={currentUrl}
                    volume={currentVolume}
                  />
                )}
              </div>
            </SectionCard>
          </div>
          <BaseButton onClick={handleEdit}>Edit babe</BaseButton>
        </>
      )}
    </>
  );
}
