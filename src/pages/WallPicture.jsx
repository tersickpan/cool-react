import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import BaseImagePreview from "../components/base/BaseImagePreview";
import shuffleArray from "../utils/shuffleArray";

function WallPicture() {
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
    <>
      {/* Extra small screens: only middle image */}
      <div className="sm:hidden w-full h-screen flex items-center justify-center bg-zinc-950">
        <BaseImagePreview
          src={middleImgUrl}
          wallpaper
        />
      </div>
      {/* Phone screens: 3 images in a row */}
      <div className="hidden sm:flex lg:hidden flex-col bg-zinc-950 h-screen w-full">
        <div className="flex-1 flex">
          <BaseImagePreview
            src={leftImgUrl}
            wallpaper
          />
        </div>
        <div className="flex-1 flex">
          <BaseImagePreview
            src={middleImgUrl}
            wallpaper
          />
        </div>
        <div className="flex-1 flex">
          <BaseImagePreview
            src={rightImgUrl}
            wallpaper
          />
        </div>
      </div>
      {/* Desktop: 3 images in columns */}
      <div className="hidden lg:grid md:grid-cols-3 bg-zinc-950 min-h-screen w-full">
        <BaseImagePreview
          src={leftImgUrl}
          wallpaper
        />
        <BaseImagePreview
          src={middleImgUrl}
          wallpaper
        />
        <BaseImagePreview
          src={rightImgUrl}
          wallpaper
        />
      </div>
    </>
  );
}

export default WallPicture;
