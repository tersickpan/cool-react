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
    dispatch(setVideoVolume(currVidsArr[vidIndex]?.volume || 0.07));
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
    <div className="grid md:grid-cols-3">
      <BaseImagePreview
        src={leftUrl}
        fullscreen
      />
      <BaseVideoPreview
        src={middleUrl}
        volume={videoVolume}
        loop={false}
        onEnded={handleOnEnded}
      />
      <BaseImagePreview
        src={rightUrl}
        fullscreen
      />
    </div>
  );
}

export default WallVideo;
