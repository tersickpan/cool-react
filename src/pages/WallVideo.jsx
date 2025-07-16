import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import BaseImagePreview from "../components/base/BaseImagePreview";
import BaseVideoPreview from "../components/base/BaseVideoPreview";
import shuffleArray from "../utils/shuffleArray";

function WallVideo() {
  const mediaJson = useSelector((state) => state.mediaData.mediaJson);

  const [picsArray, setPicsArray] = useState([]);
  const [vidsArray, setVidsArray] = useState([]);

  const [picsIndex, setPicsIndex] = useState(0);
  const [vidIndex, setVidIndex] = useState(0);

  const [leftImgUrl, setLeftImgUrl] = useState("");
  const [middleVidUrl, setMiddleVidUrl] = useState("");
  const [rightImgUrl, setRightImgUrl] = useState("");

  const updateMedia = (picIdx, vidIdx) => {
    setLeftImgUrl(picsArray[picIdx % picsArray.length]?.url);
    setMiddleVidUrl(vidsArray[vidIdx % vidsArray.length]?.url);
    setRightImgUrl(picsArray[(picIdx + 1) % picsArray.length]?.url);
  };

  useEffect(() => {
    const pics = Object.values(mediaJson.pictures || {});
    const vids = Object.values(mediaJson.videos || {});

    shuffleArray(pics);
    shuffleArray(vids);

    setPicsArray(pics);
    setVidsArray(vids);
    setPicsIndex(0);
    setVidIndex(0);

    if (pics.length > 0 && vids.length > 0) {
      updateMedia(0, 0);
    }
  }, [mediaJson]);

  const handleVideoEnd = () => {
    // Next picture index (move by 2)
    const nextPicsIndex = picsIndex + 2;
    setPicsIndex(nextPicsIndex);

    // Next video index
    const nextVidIndex = vidIndex + 1;
    setVidIndex(nextVidIndex);

    if (nextVidIndex >= vidsArray.length) {
      // Re-shuffle videos
      const newVids = [...vidsArray];
      shuffleArray(newVids);
      setVidsArray(newVids);
      setVidIndex(0);
      updateMedia(nextPicsIndex, 0);
    } else if (nextPicsIndex >= picsArray.length) {
      // Re-shuffle pictures
      const newPics = [...picsArray];
      shuffleArray(newPics);
      setPicsArray(newPics);
      setPicsIndex(0);
      updateMedia(0, nextVidIndex);
    } else {
      updateMedia(nextPicsIndex, nextVidIndex);
    }
  };

  return (
    <div className="grid md:grid-cols-3">
      <BaseImagePreview
        src={leftImgUrl}
        className="max-w-none w-full h-screen p-0 rounded-none shadow-none object-cover"
      />
      <BaseVideoPreview
        src={middleVidUrl}
        className="max-w-none w-full h-screen p-0 rounded-none shadow-none object-cover"
        onEnded={handleVideoEnd}
        muted
        loop={false}
      />
      <BaseImagePreview
        src={rightImgUrl}
        className="max-w-none w-full h-screen p-0 rounded-none shadow-none object-cover"
      />
    </div>
  );
}

export default WallVideo;
