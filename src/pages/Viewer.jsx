import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedEntryKey } from "../store/mediaEditorSlice.js";

import MediaDropdown from "../components/MediaDropdown.jsx";
import SortModeDropdown from "../components/SortModeDropdown.jsx";
import EntryKeyDropdown from "../components/EntryKeyDropdown.jsx";
import SectionCard from "../components/base/SectionCard.jsx";
import BaseImagePreview from "../components/base/BaseImagePreview.jsx";
import BaseVideoPreview from "../components/base/BaseVideoPreview.jsx";

export default function Viewer() {
  const dispatch = useDispatch();
  const mediaType = useSelector((state) => state.mediaData.mediaType);
  const mediaJson = useSelector((state) => state.mediaData.mediaJson);

  const [currentUrl, setCurrentUrl] = useState("");
  const [currentVolume, setCurrentVolume] = useState(0.07);

  const handleSelectedEntryKey = ({ value }) => {
    if (!value) return;

    dispatch(setSelectedEntryKey(value));
    const baddie = mediaJson[mediaType][value];

    setCurrentUrl(baddie.url);
    if (baddie.volume) setCurrentVolume(baddie.volume);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 space-y-6">
      <h1 className="text-3xl text-pink-400 font-bold">
        🎬 Viewer Mode Activated
      </h1>
      <MediaDropdown />
      {mediaType && (
        <div className="grid md:grid-cols-2 gap-6">
          <SectionCard>
            <SortModeDropdown />
            <EntryKeyDropdown handleSelectedEntryKey={handleSelectedEntryKey} />
          </SectionCard>
          <SectionCard>
            {/* {mediaType === "pictures" && <BaseImagePreview src={currentUrl} />}
            {mediaType === "videos" && (
              <BaseVideoPreview
                src={currentUrl}
                volume={currentVolume}
              />
            )} */}
          </SectionCard>
        </div>
      )}
    </div>
  );
}
