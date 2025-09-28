import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMediaJson, setIsJsonLoaded } from "../store/mediaDataSlice";
import { fetchAllMedia } from "../utils/supabase";
import EmojiSpinner from "./base/EmojiSpinner";

export default function RequireJsonLoader({ children }) {
  const dispatch = useDispatch();
  const isJsonLoaded = useSelector((state) => state.mediaData.isJsonLoaded);
  const [progress, setProgress] = useState(0);

  // Moved loadMediaJson here, with progress
  async function loadMediaJsonWithProgress() {
    setProgress(5);
    const pictures = await fetchAllMedia("pictures");
    setProgress(50);
    const videos = await fetchAllMedia("videos");
    setProgress(95);
    const media = { pictures, videos };
    setProgress(100);
    return media;
  }

  useEffect(() => {
    if (isJsonLoaded) return;

    loadMediaJsonWithProgress()
      .then((data) => {
        dispatch(setMediaJson(data));
        dispatch(setIsJsonLoaded(true));
      })
      .catch((err) => {
        console.error("Failed to fetch data from Supabase", err);
      });
  }, [isJsonLoaded]);

  if (!isJsonLoaded) return <EmojiSpinner progress={progress} />;

  return children;
}
