import { useState, useRef } from "react";
import { useSelector } from "react-redux";

import BaseLabel from "./base/BaseLabel";
import BaseInput from "./base/BaseInput";
import SectionCard from "./base/SectionCard";
import BaseKeyDropdown from "./BaseKeyDropdown";
import MediaDropdown from "./MediaDropdown";
import BaseButton from "./base/BaseButton";
import BaseImagePreview from "./base/BaseImagePreview";
import BaseVideoPreview from "./base/BaseVideoPreview";
import MultiMediaUploader from "./MultiMediaUploader.jsx";

export default function AddNew() {
  const mediaType = useSelector((state) => state.mediaData.mediaType);
  const currentBaddie = useSelector(
    (state) => state.mediaPreview.currentBaddie
  );

  const uploaderRef = useRef(null);
  const [newBaddie, setNewBaddie] = useState("");
  const [previewFiles, setPreviewFiles] = useState([]);
  const [baseKeys, setBaseKeys] = useState([]);
  const [entryKeys, setEntryKeys] = useState([]);
  const [selectedBaseKey, setSelectedBaseKey] = useState("");
  const [newVolume, setNewVolume] = useState(0.07);

  const handleNewBaddie = (value) => {
    setNewBaddie(value);

    if (value.trim() !== "" && selectedBaseKey !== "") {
      setSelectedBaseKey("");
      setEntryKeys([]);
    }
  };

  const handleAdd = () => {
    if (!newBaddie && !selectedBaseKey) {
      alert("Missing fields bruh");
      return;
    }

    if (!previewFiles || previewFiles.length === 0) {
      alert("No files to upload");
      return;
    }

    if (uploaderRef.current) {
      uploaderRef.current.handleUpload({
        baseKey: newBaddie ? newBaddie : selectedBaseKey,
        lastEntryIndex: newBaddie ? 1 : entryKeys.length + 1,
      });
    }
  };

  return (
    <>
      <MediaDropdown
        setBaseKeys={setBaseKeys}
        setSelectedBaseKey={setSelectedBaseKey}
      />
      {mediaType && (
        <>
          <div className="grid md:grid-cols-3 gap-6">
            <SectionCard className="col-span-1">
              <MultiMediaUploader
                ref={uploaderRef}
                mediaType={mediaType}
                files={previewFiles}
                setFiles={setPreviewFiles}
              />
              {mediaType === "videos" && (
                <>
                  <BaseLabel>Volume</BaseLabel>
                  <BaseInput
                    type="number"
                    value={newVolume}
                    onChange={(e) => setNewVolume(e.target.value)}
                    min={0}
                    max={1}
                    step={0.01}
                  />
                </>
              )}
            </SectionCard>
            {previewFiles && (
              <SectionCard className="col-span-1 gap-2">
                <BaseLabel>New Baddie🤤</BaseLabel>
                <BaseInput
                  value={newBaddie}
                  onChange={(e) => handleNewBaddie(e.target.value)}
                />
                {mediaType === "pictures"
                  ? Array.from(previewFiles).map((file) => (
                      <BaseImagePreview
                        key={file.name}
                        src={URL.createObjectURL(file)}
                      />
                    ))
                  : Array.from(previewFiles).map((file) => (
                      <BaseVideoPreview
                        key={file.name}
                        src={URL.createObjectURL(file)}
                        volume={newVolume}
                      />
                    ))}
              </SectionCard>
            )}
            {currentBaddie && (
              <SectionCard className="col-span-auto gap-2">
                <BaseKeyDropdown
                  disabled={newBaddie}
                  setCurrentBaddieForPreview={true}
                  baseKeys={baseKeys}
                  setBaseKeys={setBaseKeys}
                  selectedBaseKey={selectedBaseKey}
                  setSelectedBaseKey={setSelectedBaseKey}
                  setEntryKeys={setEntryKeys}
                />
                {mediaType === "pictures" ? (
                  <BaseImagePreview src={currentBaddie?.url} />
                ) : (
                  <BaseVideoPreview
                    src={currentBaddie.url}
                    volume={currentBaddie.volume}
                  />
                )}
              </SectionCard>
            )}
          </div>
          <BaseButton onClick={handleAdd}>Add wuhuu</BaseButton>
        </>
      )}
    </>
  );
}
