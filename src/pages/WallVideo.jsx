import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";

import BaseImagePreview from "../components/base/BaseImagePreview";
import BaseVideoPreview from "../components/base/BaseVideoPreview";
import shuffleArray from "../utils/shuffleArray";

function WallVideo() {
  const mediaJson = useSelector((state) => state.mediaData.mediaJson);

  const [picsArray, setPicsArray] = useState([]);
  const [picsIndex, setPicsIndex] = useState(0);
  const intervalRef = useRef(null);

  const [leftImgUrl, setLeftImgUrl] = useState("");
  const [middleImgUrl, setMiddleImgUrl] = useState("");
  const [rightImgUrl, setRightImgUrl] = useState("");

  // Update media source based on current index
  const setMediaSource = (arr, index) => {
    setLeftImgUrl(arr[index]?.url || "");
    setMiddleImgUrl(arr[index + 1]?.url || "");
    setRightImgUrl(arr[index + 2]?.url || "");
  };

  useEffect(() => {
    const pics = Object.values(mediaJson.pictures);
    shuffleArray(pics);
    setPicsArray(pics);
    setPicsIndex(0);
    setMediaSource(pics, 0);

    // Setup interval
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setPicsIndex((prev) => {
        const nextIndex = prev + 3;
        if (nextIndex >= pics.length) {
          shuffleArray(pics);
          setPicsArray([...pics]); // trigger re-render
          setMediaSource(pics, 0);
          return 0;
        } else {
          setMediaSource(pics, nextIndex);
          return nextIndex;
        }
      });
    }, 15000);

    return () => clearInterval(intervalRef.current); // cleanup
  }, [mediaJson]);

  return (
    <div className="grid md:grid-cols-3">
      <BaseImagePreview
        src={leftImgUrl}
        fullscreen
      />
      <BaseImagePreview
        src={middleImgUrl}
        fullscreen
      />
      <BaseImagePreview
        src={rightImgUrl}
        fullscreen
      />
    </div>
  );
}

export default WallVideo;
