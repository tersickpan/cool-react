import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedEntryKey } from "../store/mediaEditorSlice";
import { refreshMediaJson } from "../store/refreshMediaJson.js";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      ...(mediaType === "videos" && { volume: currentVolume }),
      timestamp: new Date().toISOString(),
    });
  };

  const handleDelete = () => {
    if (!selectedBaseKey || !selectedEntryKey || !currentUrl) {
      alert("Delete failed: Missing fields");
      setIsModalOpen(false);
      return;
    }
    delete mediaJson[mediaType][selectedEntryKey];
    alert(`Deleted ${selectedEntryKey} successfully!`);
    dispatch(refreshMediaJson());
    setIsModalOpen(false);
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
