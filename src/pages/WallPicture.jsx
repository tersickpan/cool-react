import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import BaseImagePreview from "../components/base/BaseImagePreview";
import shuffleArray from "../utils/shuffleArray";

function WallPicture() {
  const mediaJson = useSelector((state) => state.mediaData.mediaJson);

  const [picsArray, setPicsArray] = useState([]);
  const [picsIndex, setPicsIndex] = useState(0);
  const picsIndexRef = useRef(picsIndex);
  const [leftImgUrl, setLeftImgUrl] = useState("");
  const [middleImgUrl, setMiddleImgUrl] = useState("");
  const [rightImgUrl, setRightImgUrl] = useState("");

  function setMediaSource() {
    setLeftImgUrl(picsArray[picsIndex]?.url);
    setMiddleImgUrl(picsArray[picsIndex + 1]?.url);
    setRightImgUrl(picsArray[picsIndex + 2]?.url);
  }

  useEffect(() => {
    const pics = Object.values(mediaJson.pictures);
    shuffleArray(pics);
    setPicsArray(pics);
    console.log(picsArray);

    setMediaSource();
  }, [mediaJson]);

  useEffect(() => {
    picsIndexRef.current = picsIndex;
  }, [picsIndex]);

  setInterval(() => {
    setPicsIndex(picsIndex + 3);

    if (picsIndex >= picsArray.length) {
      setPicsIndex(0);
      shuffleArray(picsIndex);
    }

    setMediaSource();
  }, 15000);

  return (
    <div className="grid md:grid-cols-3">
      <BaseImagePreview src={leftImgUrl} />
      <BaseImagePreview src={middleImgUrl} />
      <BaseImagePreview src={rightImgUrl} />
    </div>
  );
}

export default WallPicture;
