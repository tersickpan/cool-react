import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  setCurrPicsArr,
  setCurrVidsArr,
  setPicIndex,
  setVidIndex,
  setLeftUrl,
  setMiddleUrl,
  setRightUrl,
  setVideoVolume,
} from "../store/wallpaperSlice";

import BaseImagePreview from "../components/base/BaseImagePreview";
import BaseVideoPreview from "../components/base/BaseVideoPreview";
import shuffleArray from "../utils/shuffleArray";

function WallVideo() {
  const dispatch = useDispatch();
  const mediaJson = useSelector((state) => state.mediaData.mediaJson);
  const currPicsArr = useSelector((state) => state.wallpaper.currPicsArr);
  const currVidsArr = useSelector((state) => state.wallpaper.currVidsArr);
  const picIndex = useSelector((state) => state.wallpaper.picIndex);
  const vidIndex = useSelector((state) => state.wallpaper.vidIndex);
  const leftUrl = useSelector((state) => state.wallpaper.leftUrl);
  const middleUrl = useSelector((state) => state.wallpaper.middleUrl);
  const rightUrl = useSelector((state) => state.wallpaper.rightUrl);
  const videoVolume = useSelector((state) => state.wallpaper.videoVolume);

  const setMediaSource = () => {
    dispatch(setLeftUrl(currPicsArr[picIndex]?.url || ""));
    dispatch(setMiddleUrl(currVidsArr[vidIndex]?.url || ""));
    dispatch(setRightUrl(currPicsArr[picIndex + 1]?.url || ""));
    const rawVolume = currVidsArr[vidIndex]?.volume;
    const parsedVolume = rawVolume !== undefined ? parseFloat(rawVolume) : 0.07;
    dispatch(setVideoVolume(isNaN(parsedVolume) ? 0.07 : parsedVolume));
  };

  const handleOnEnded = () => {
    const nextPicIndex = picIndex + 2;
    if (nextPicIndex >= currPicsArr.length) {
      const arr = [...currPicsArr];
      shuffleArray(arr);
      dispatch(setCurrPicsArr(arr));
      dispatch(setPicIndex(0));
    } else {
      dispatch(setPicIndex(nextPicIndex));
    }

    const nextVidIndex = vidIndex + 1;
    if (nextVidIndex >= currVidsArr.length) {
      const arr = [...currVidsArr];
      shuffleArray(arr);
      dispatch(setCurrVidsArr(arr));
      dispatch(setVidIndex(0));
    } else {
      dispatch(setVidIndex(nextVidIndex));
    }

    setMediaSource();
  };

  useEffect(() => {
    const pics = Object.values(mediaJson.pictures);
    const vids = Object.values(mediaJson.videos);
    shuffleArray(pics);
    shuffleArray(vids);
    dispatch(setCurrPicsArr(pics));
    dispatch(setCurrVidsArr(vids));
    dispatch(setPicIndex(0));
    dispatch(setVidIndex(0));
    setMediaSource();
  }, [mediaJson]);

  useEffect(() => {
    setMediaSource();
  }, [currPicsArr, currVidsArr, picIndex, vidIndex]);

  return (
    <>
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
    </>
  );
}

export default WallVideo;
