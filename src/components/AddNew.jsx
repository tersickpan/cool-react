import { useState, useRef } from "react";

import BaseLabel from "./base/BaseLabel";
import BaseInput from "./base/BaseInput";
import SectionCard from "./base/SectionCard";
import BaseKeyDropdown from "./BaseKeyDropdown";
import MediaDropdown from "./MediaDropdown";
import BaseButton from "./base/BaseButton";
import BaseImagePreview from "./base/BaseImagePreview";
import BaseVideoPreview from "./base/BaseVideoPreview";
import MultiMediaUploader from "./MultiMediaUploader.jsx";
import BaseCarousel from "./base/BaseCarousel.jsx";
import SocialLinks from "./base/SocialLinks.jsx";
import SocialEdits from "./base/SocialEdits.jsx";

export default function AddNew() {
  const uploaderRef = useRef(null);
  const [mediaType, setMediaType] = useState("");
  const [currentBaddie, setCurrentBaddie] = useState(null);
  const [newBaddie, setNewBaddie] = useState("");
  const [previewFiles, setPreviewFiles] = useState([]);
  const [baseKeys, setBaseKeys] = useState([]);
  const [lastEntryIndex, setLastEntryIndex] = useState(0);
  const [selectedBaseKey, setSelectedBaseKey] = useState("");
  const [newVolume, setNewVolume] = useState(0.07);
  const [newSocials, setNewSocials] = useState({ tiktok: "", instagram: "" });
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleToggleNewBaddie = (value) => {
    setIsAddingNew(value);
    if (value) {
      setSelectedBaseKey("");
      setLastEntryIndex(0);
      setCurrentBaddie(null);
    } else {
      setNewBaddie("");
    }
    setNewSocials({ tiktok: "", instagram: "" });
  };

  const handleAdd = () => {
    if (!previewFiles || previewFiles.length === 0) {
      alert("No files to upload");
      return;
    }

    if (isAddingNew && !newBaddie) {
      alert("No intro for da new hottie!!!");
      return;
    }

    if (!isAddingNew && (!selectedBaseKey || lastEntryIndex === 0)) {
      alert("Select which queen you adding to!!!");
      return;
    }

    if (uploaderRef.current) {
      uploaderRef.current.handleUpload({
        baseKey: isAddingNew ? newBaddie : selectedBaseKey,
        lastEntryIndex: isAddingNew ? 1 : lastEntryIndex + 1,
        socials: newSocials,
        isUpdateSocials: isAddingNew,
      });
    }
  };

  const handleResetStates = () => {
    setNewBaddie("");
    setPreviewFiles([]);
    setLastEntryIndex(0);
    setSelectedBaseKey("");
    setCurrentBaddie(null);
  };

  return (
    <>
      <MediaDropdown
        mediaType={mediaType}
        setMediaType={setMediaType}
        setBaseKeys={setBaseKeys}
        handleResetStates={handleResetStates}
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
              <BaseButton
                toggled={isAddingNew}
                onToggle={(value) => handleToggleNewBaddie(value)}
              >
                {isAddingNew ? "New Hottie Around" : "New Baddie???"}
              </BaseButton>
              {isAddingNew && (
                <SocialEdits
                  options={newSocials}
                  disabled={!previewFiles}
                />
              )}
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
                {isAddingNew && (
                  <>
                    <BaseLabel>New Baddie🤤</BaseLabel>
                    <BaseInput
                      value={newBaddie}
                      onChange={(e) => setNewBaddie(e.target.value)}
                    />
                  </>
                )}
                <BaseCarousel
                  files={previewFiles}
                  mediaType={mediaType}
                  vidVolume={newVolume}
                />
              </SectionCard>
            )}

            {!isAddingNew && (
              <SectionCard className="col-span-auto gap-2">
                <BaseKeyDropdown
                  disabled={isAddingNew}
                  setCurrentBaddieForPreview={true}
                  mediaType={mediaType}
                  baseKeys={baseKeys}
                  setBaseKeys={setBaseKeys}
                  selectedBaseKey={selectedBaseKey}
                  setSelectedBaseKey={setSelectedBaseKey}
                  setCurrentBaddie={setCurrentBaddie}
                  setLastEntryIndex={setLastEntryIndex}
                />
                {currentBaddie && (
                  <>
                    <SocialLinks socials={currentBaddie.socials} />
                    {mediaType === "pictures" ? (
                      <BaseImagePreview src={currentBaddie?.url} />
                    ) : (
                      <BaseVideoPreview
                        src={currentBaddie.url}
                        volume={currentBaddie.volume}
                      />
                    )}
                  </>
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
