import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedBaseKey } from "../store/mediaEditorSlice";

import BaseLabel from "./base/BaseLabel";
import BaseInput from "./base/BaseInput";
import SectionCard from "./base/SectionCard";
import BaseKeyDropdown from "./BaseKeyDropdown";
import MediaDropdown from "./MediaDropdown";
import BaseButton from "./base/BaseButton";
import isValidUrl from "../utils/isValidUrl";
import BaseImagePreview from "./base/BaseImagePreview";
import BaseVideoPreview from "./base/BaseVideoPreview";

export default function AddNew() {
  const dispatch = useDispatch();
  const mediaType = useSelector((state) => state.mediaData.mediaType);
  const selectedBaseKey = useSelector(
    (state) => state.mediaEditor.selectedBaseKey
  );

  const [currentBaddie, setCurrentBaddie] = useState({});
  const [newBaddie, setNewBaddie] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newVolume, setNewVolume] = useState(0.07);

  const handleNewBaddie = (value) => {
    setNewBaddie(value);

    if (value.trim() !== "") {
      dispatch(setSelectedBaseKey(""));
    }
  };

  const handleAdd = () => {
    if ((!newBaddie && !selectedBaseKey) || !newUrl) {
      alert("Missing fields bruh");
      return;
    }

    if (!isValidUrl(newUrl)) {
      alert("Invalid URL!");
      return;
    }

    console.log({
      baseKey: newBaddie ? newBaddie : selectedBaseKey,
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
              <BaseLabel>New Baddie🤤</BaseLabel>
              <BaseInput
                value={newBaddie}
                onChange={(e) => handleNewBaddie(e.target.value)}
              />
              <BaseKeyDropdown
                disabled={newBaddie}
                setCurrentBaddieForPreview={setCurrentBaddie}
              />
              <BaseLabel>URL</BaseLabel>
              <BaseInput
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
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
            <SectionCard className="col-span-2">
              <div className="grid md:grid-cols-2 gap-6">
                {mediaType === "pictures" && (
                  <>
                    <BaseImagePreview src={currentBaddie.url} />
                    {newBaddie && <BaseImagePreview src={newUrl} />}
                  </>
                )}
                {mediaType === "videos" && (
                  <>
                    <BaseVideoPreview
                      src={currentBaddie.url}
                      volume={
                        currentBaddie.volume
                      }
                    />
                    {newBaddie && (
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
