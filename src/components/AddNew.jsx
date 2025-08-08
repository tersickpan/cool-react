import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedBaseKey, setEntryKeys } from "../store/mediaEditorSlice";
import { setNewUrl, setNewVolume } from "../store/mediaPreviewSlice.js";

import BaseLabel from "./base/BaseLabel";
import BaseInput from "./base/BaseInput";
import SectionCard from "./base/SectionCard";
import BaseKeyDropdown from "./BaseKeyDropdown";
import MediaDropdown from "./MediaDropdown";
import BaseButton from "./base/BaseButton";
import isValidUrl from "../utils/isValidUrl";
import BaseImagePreview from "./base/BaseImagePreview";
import BaseVideoPreview from "./base/BaseVideoPreview";
import BaseFileUploader from "./base/BaseFileUploader";

export default function AddNew() {
  const dispatch = useDispatch();
  const mediaType = useSelector((state) => state.mediaData.mediaType);
  const selectedBaseKey = useSelector(
    (state) => state.mediaEditor.selectedBaseKey
  );
  const entryKeys = useSelector((state) => state.mediaEditor.entryKeys);
  const currentBaddie = useSelector(
    (state) => state.mediaPreview.currentBaddie
  );
  const newUrl = useSelector((state) => state.mediaPreview.newUrl);
  const newVolume = useSelector((state) => state.mediaPreview.newVolume);

  const [newBaddie, setNewBaddie] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleNewBaddie = (value) => {
    setNewBaddie(value);

    if (value.trim() !== "" && selectedBaseKey !== "") {
      dispatch(setSelectedBaseKey(""));
      dispatch(setEntryKeys([]));
    }
  };

  const onNewFileSelected = (file) => {
    if (!file) {
      setUploadedFile(null);
      dispatch(setNewUrl(""));
      return;
    }
    setUploadedFile(file);
    dispatch(setNewUrl(URL.createObjectURL(file)));
  };

  const handleAdd = () => {
    if ((!newBaddie && !selectedBaseKey) || !newUrl) {
      alert("Missing fields bruh");
      return;
    }

    if (uploadedFile !== null) {
      // If a file is uploaded, do some error checking and upload to cloud
    }

    if (!isValidUrl(newUrl)) {
      alert("Invalid URL!");
      return;
    }

    const key = newBaddie
      ? `${newBaddie}-01`
      : `${selectedBaseKey}-${String(entryKeys.length + 1).padStart(2, "0")}`;

    console.log({
      baseKey: key,
      url: newUrl,
      ...(mediaType === "videos" && { volume: newVolume }),
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
              <BaseFileUploader
                onFileSelect={onNewFileSelected}
                vidVolume={newVolume}
                mediaType={mediaType}
              />
              <BaseLabel>New Baddie🤤</BaseLabel>
              <BaseInput
                value={newBaddie}
                onChange={(e) => handleNewBaddie(e.target.value)}
              />
              <BaseKeyDropdown
                disabled={newBaddie}
                setCurrentBaddieForPreview={true}
              />
              <BaseLabel>URL</BaseLabel>
              <BaseInput
                value={newUrl}
                onChange={(e) => dispatch(setNewUrl(e.target.value))}
              />
              {mediaType === "videos" && (
                <>
                  <BaseLabel>Volume</BaseLabel>
                  <BaseInput
                    type="number"
                    value={newVolume}
                    onChange={(e) => dispatch(setNewVolume(e.target.value))}
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
                  <>
                    <BaseImagePreview src={currentBaddie.url} />
                    {newUrl && <BaseImagePreview src={newUrl} />}
                  </>
                )}
                {mediaType === "videos" && (
                  <>
                    <BaseVideoPreview
                      src={currentBaddie.url}
                      volume={currentBaddie.volume}
                    />
                    {newUrl && (
                      <BaseVideoPreview
                        src={newUrl}
                        volume={newVolume}
                      />
                    )}
                  </>
                )}
              </div>
            </SectionCard>
          </div>
          <BaseButton onClick={handleAdd}>Add wuhuu</BaseButton>
        </>
      )}
    </>
  );
}
