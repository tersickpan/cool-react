import { useState } from "react";

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
import BaseModal from "./base/BaseModal.jsx";
import SocialEdits from "./base/SocialEdits.jsx";
import {
  updateSingleEntryVolume,
  updateSingleEntrySocial,
} from "../utils/supabase.js";
import deleteSingleMedia from "../utils/deleteSingleMedia.js";

export default function EditExist() {
  const [mediaType, setMediaType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [baseKeys, setBaseKeys] = useState([]);
  const [entryKeys, setEntryKeys] = useState([]);
  const [selectedBaseKey, setSelectedBaseKey] = useState("");
  const [selectedEntryKey, setSelectedEntryKey] = useState("");
  const [currentBaddieArr, setCurrentBaddieArr] = useState([]);
  const [currentUrl, setCurrentUrl] = useState("");
  const [currentVolume, setCurrentVolume] = useState(0.07);
  const [currentSocials, setCurrentSocials] = useState({});

  const handleSelectedEntryKey = ({ value }) => {
    setSelectedEntryKey(value);

    if (!value) return;

    const entry = currentBaddieArr.find((e) => e.public_id === value);
    setCurrentUrl(entry.url);
    setCurrentSocials(entry.socials);
    if (entry.volume) setCurrentVolume(entry.volume);
  };

  const handleEdit = async () => {
    if (!selectedBaseKey || !selectedEntryKey || !currentUrl) {
      alert("Missing fields bruh");
      return;
    }

    if (!isValidUrl(currentUrl)) {
      alert("Invalid URL!");
      return;
    }

    const tasks = [];
    // always update socials
    tasks.push(updateSingleEntrySocial(selectedEntryKey, currentSocials));

    // only update volume for videos
    if (mediaType === "videos") {
      tasks.push(
        updateSingleEntryVolume(
          mediaType,
          selectedEntryKey,
          Number(currentVolume)
        )
      );
    }

    try {
      const results = await Promise.allSettled(tasks);
      const failures = results.filter((r) => r.status === "rejected");

      if (failures.length === 0) {
        alert(`Edited ${selectedEntryKey} successfully!`);
      } else {
        const msgs = failures
          .map((f) => f.reason?.message || String(f.reason))
          .join("; ");
        alert(`Edit partially failed: ${msgs}`);
      }
    } catch (err) {
      alert("Edit failed: " + err.message);
    }
  };

  const handleDelete = () => {
    if (!selectedBaseKey || !selectedEntryKey || !currentUrl) {
      alert("Delete failed: Missing fields");
      setIsModalOpen(false);
      return;
    }
    deleteSingleMedia(mediaType, selectedEntryKey);
    setIsModalOpen(false);
  };

  const handleResetStates = () => {
    setEntryKeys([]);
    setSelectedBaseKey("");
    setSelectedEntryKey("");
    setCurrentUrl("");
    setCurrentVolume(0);
  };

  return (
    <>
      <BaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <p className="text-center">
          Sure you want to remove {selectedEntryKey || "this"} 😢?
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <button
            className="bg-pink-500 hover:bg-pink-400 text-white px-4 py-2 rounded-xl"
            onClick={handleDelete}
          >
            Yes
          </button>
          <button
            className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-xl"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </BaseModal>
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
              <BaseKeyDropdown
                mediaType={mediaType}
                baseKeys={baseKeys}
                selectedBaseKey={selectedBaseKey}
                setSelectedBaseKey={setSelectedBaseKey}
                setEntryKeys={setEntryKeys}
                setCurrentBaddieArr={setCurrentBaddieArr}
              />
              <EntryKeyDropdown
                disabled={!selectedBaseKey}
                handleSelectedEntryKey={handleSelectedEntryKey}
                entryKeys={entryKeys}
                selectedEntryKey={selectedEntryKey}
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
              <>
                <BaseLabel>Socials</BaseLabel>
                <SocialEdits
                  options={currentSocials}
                  disabled={!selectedEntryKey}
                />
              </>
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
          <div className="mt-6 flex justify-start gap-4">
            <BaseButton onClick={handleEdit}>Edit babe</BaseButton>
            <BaseButton onClick={() => setIsModalOpen(true)}>
              Delete Babe
            </BaseButton>
          </div>
        </>
      )}
    </>
  );
}
