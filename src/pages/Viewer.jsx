import { useState } from "react";

import SocialLinks from "../components/base/SocialLinks.jsx";
import MediaDropdown from "../components/MediaDropdown.jsx";
import SortModeDropdown from "../components/SortModeDropdown.jsx";
import BaseKeyDropdown from "../components/BaseKeyDropdown.jsx";
import EntryKeyDropdown from "../components/EntryKeyDropdown.jsx";
import SectionCard from "../components/base/SectionCard.jsx";
import BaseImagePreview from "../components/base/BaseImagePreview.jsx";
import BaseVideoPreview from "../components/base/BaseVideoPreview.jsx";
import BaseButton from "../components/base/BaseButton.jsx";

export default function Viewer() {
  const [sortMode, setSortMode] = useState("default");
  const [mediaType, setMediaType] = useState("");
  const [baseKeys, setBaseKeys] = useState([]);
  const [entryKeys, setEntryKeys] = useState([]);
  const [selectedBaseKey, setSelectedBaseKey] = useState("");
  const [selectedEntryKey, setSelectedEntryKey] = useState("");
  const [currentBaddieArr, setCurrentBaddieArr] = useState([]);
  const [currentUrl, setCurrentUrl] = useState("");
  const [currentVolume, setCurrentVolume] = useState(0.07);
  const [currentSocials, setCurrentSocials] = useState({});

  const handleSelectedEntryKey = ({ value }) => {
    if (!value) return;

    setSelectedEntryKey(value);

    const entry = currentBaddieArr.find((e) => e.public_id === value);
    setCurrentUrl(entry.url);
    if (entry.volume) setCurrentVolume(entry.volume);
    if (entry.socials) setCurrentSocials(entry.socials);
  };

  const handleNavButtonClick = (direction) => {
    const currentIndex = entryKeys.indexOf(selectedEntryKey);
    let newIndex;

    if (direction === "next") {
      newIndex = (currentIndex + 1) % entryKeys.length;
    } else {
      newIndex = (currentIndex - 1 + entryKeys.length) % entryKeys.length;
    }

    const newEntryKey = entryKeys[newIndex];
    handleSelectedEntryKey({ value: newEntryKey });
  };

  const handleResetStates = () => {
    setSortMode("default");
    setEntryKeys([]);
    setCurrentBaddieArr([]);
    setSelectedBaseKey("");
    setSelectedEntryKey("");
    setCurrentUrl("");
    setCurrentVolume(0);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 space-y-6">
      <h1 className="text-3xl text-pink-400 font-bold">
        🎬 Viewer Mode Activated
      </h1>
      <MediaDropdown
        mediaType={mediaType}
        setMediaType={setMediaType}
        setBaseKeys={setBaseKeys}
        handleResetStates={handleResetStates}
      />
      {mediaType && (
        <div className="grid md:grid-cols-2 gap-6">
          <SectionCard>
            <SortModeDropdown
              sortMode={sortMode}
              setSortMode={setSortMode}
              handleResetStates={handleResetStates}
              mediaType={mediaType}
              setCurrentBaddieArr={setCurrentBaddieArr}
              setEntryKeys={setEntryKeys}
            />
            <BaseKeyDropdown
              mediaType={mediaType}
              baseKeys={baseKeys}
              selectedBaseKey={selectedBaseKey}
              setSelectedBaseKey={setSelectedBaseKey}
              setEntryKeys={setEntryKeys}
              disabled={sortMode !== "default"}
              setCurrentBaddieArr={setCurrentBaddieArr}
            />
            <EntryKeyDropdown
              disabled={!selectedBaseKey & (sortMode === "default")}
              handleSelectedEntryKey={handleSelectedEntryKey}
              entryKeys={entryKeys}
              selectedEntryKey={selectedEntryKey}
            />
            <div className="grid md:grid-cols-2 p-10 gap-10">
              <BaseButton
                key={"prev"}
                disabled={entryKeys.length === 0}
                icon={"◀️"}
                onClick={() => handleNavButtonClick("prev")}
              >
                Prev
              </BaseButton>
              <BaseButton
                key={"next"}
                disabled={entryKeys.length === 0}
                icon={"▶️"}
                onClick={() => handleNavButtonClick("next")}
              >
                Next
              </BaseButton>
            </div>
          </SectionCard>
          <SectionCard>
            <SocialLinks socials={currentSocials} />
            {mediaType === "pictures" && <BaseImagePreview src={currentUrl} />}
            {mediaType === "videos" && (
              <BaseVideoPreview
                src={currentUrl}
                volume={currentVolume}
              />
            )}
          </SectionCard>
        </div>
      )}
    </div>
  );
}
