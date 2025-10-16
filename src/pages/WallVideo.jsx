import { useEffect, useState } from "react";

import MediaJsonFetcher from "../components/MediaJsonFetcher";
import BaseImagePreview from "../components/base/BaseImagePreview";
import BaseVideoPreview from "../components/base/BaseVideoPreview";
import shuffleArray from "../utils/shuffleArray";

function WallVideo() {
  const [currPicsArr, setCurrPicsArr] = useState([]);
  const [currVidsArr, setCurrVidsArr] = useState([]);
  const [picIndex, setPicIndex] = useState(0);
  const [vidIndex, setVidIndex] = useState(0);
  const [leftUrl, setLeftUrl] = useState("");
  const [middleUrl, setMiddleUrl] = useState("");
  const [rightUrl, setRightUrl] = useState("");
  const [videoVolume, setVideoVolume] = useState(0);

  const [mediaJson, setMediaJson] = useState({ pictures: {}, videos: {} });

  const setMediaSource = () => {
    setLeftUrl(currPicsArr[picIndex]?.url || "");
    setMiddleUrl(currVidsArr[vidIndex]?.url || "");
    setRightUrl(currPicsArr[picIndex + 1]?.url || "");
    setVideoVolume(currVidsArr[vidIndex]?.volume || 0.07);
  };

  const handleOnEnded = () => {
    const nextPicIndex = picIndex + 2;
    if (nextPicIndex >= currPicsArr.length) {
      const arr = [...currPicsArr];
      shuffleArray(arr);
      setCurrPicsArr(arr);
      setPicIndex(0);
    } else {
      setPicIndex(nextPicIndex);
    }

    const nextVidIndex = vidIndex + 1;
    if (nextVidIndex >= currVidsArr.length) {
      const arr = [...currVidsArr];
      shuffleArray(arr);
      setCurrVidsArr(arr);
      setVidIndex(0);
    } else {
      setVidIndex(nextVidIndex);
    }

    setMediaSource();
  };

  useEffect(() => {
    const pics = Object.values(mediaJson.pictures);
    const vids = Object.values(mediaJson.videos);
    shuffleArray(pics);
    shuffleArray(vids);
    setCurrPicsArr(pics);
    setCurrVidsArr(vids);
    setPicIndex(0);
    setVidIndex(0);
    setMediaSource();
  }, [mediaJson]);

  useEffect(() => {
    setMediaSource();
  }, [currPicsArr, currVidsArr, picIndex, vidIndex]);

  return (
    <MediaJsonFetcher setMediaJson={setMediaJson}>
      {/* Extra small screens: only video */}
      <div className="sm:hidden w-full h-screen flex items-center justify-center bg-zinc-950">
        <BaseVideoPreview
          src={middleUrl}
          volume={videoVolume}
          loop={false}
          onEnded={handleOnEnded}
          wallpaper
        />
      </div>
      {/* Small and up: grid layout */}
      <div className="hidden sm:grid md:grid-cols-3 bg-zinc-950 min-h-screen w-full">
        <BaseImagePreview
          src={leftUrl}
          wallpaper
        />
        <BaseVideoPreview
          src={middleUrl}
          volume={videoVolume}
          loop={false}
          onEnded={handleOnEnded}
          wallpaper
        />
        <BaseImagePreview
          src={rightUrl}
          wallpaper
        />
      </div>
    </MediaJsonFetcher>
  );
}

export default WallVideo;
