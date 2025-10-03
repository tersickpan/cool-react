import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
import {
  fetchSingleEntry,
  updateSingleEntryVolume,
} from "../utils/supabase.js";
import deleteSingleMedia from "../utils/deleteSingleMedia.js";

export default function EditExist() {
  const mediaType = useSelector((state) => state.mediaData.mediaType);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [baseKeys, setBaseKeys] = useState([]);
  const [entryKeys, setEntryKeys] = useState([]);
  const [selectedBaseKey, setSelectedBaseKey] = useState("");
  const [selectedEntryKey, setSelectedEntryKey] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [currentVolume, setCurrentVolume] = useState(0.07);

  const handleSelectedEntryKey = ({ value }) => {
    setSelectedEntryKey(value);
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

    // Function: edit volume in Supabase
    updateSingleEntryVolume(mediaType, selectedEntryKey, currentVolume)
      .then(() => {
        alert(`Edited ${selectedEntryKey} successfully!`);
      })
      .catch((err) => {
        alert("Edit failed: " + err.message);
      });
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

  useEffect(() => {
    if (!selectedEntryKey) {
      setCurrentUrl("");
      setCurrentVolume(0);
      return;
    }

    fetchSingleEntry(mediaType, selectedEntryKey)
      .then((entry) => {
        setCurrentUrl(entry.url);
        if (entry.volume) setCurrentVolume(entry.volume);
      })
      .catch((err) => {
        console.error("Failed to fetch single entry from Supabase", err);
      });
  }, [selectedEntryKey]);

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
        setBaseKeys={setBaseKeys}
        handleResetStates={handleResetStates}
      />
      {mediaType && (
        <>
          <div className="grid md:grid-cols-3 gap-6">
            <SectionCard className="col-span-1">
              <BaseKeyDropdown
                baseKeys={baseKeys}
                selectedBaseKey={selectedBaseKey}
                setSelectedBaseKey={setSelectedBaseKey}
                setEntryKeys={setEntryKeys}
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
