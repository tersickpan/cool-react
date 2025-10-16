import { useState, useEffect } from "react";

import { fetchAllMedia } from "../utils/supabase";
import EmojiSpinner from "./base/EmojiSpinner";

export default function MediaJsonFetcher({
  setMediaJson = () => {},
  children,
}) {
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [progress, setProgress] = useState(0);

  // Moved loadMediaJson here, with progress
  async function loadMediaJsonWithProgress() {
    setProgress(5);
    const pictures = await fetchAllMedia({ mediaType: "pictures" });
    setProgress(50);
    const videos = await fetchAllMedia({ mediaType: "videos" });
    setProgress(95);
    const media = { pictures, videos };
    setProgress(100);
    return media;
  }

  useEffect(() => {
    if (isDataFetched) return;

    loadMediaJsonWithProgress()
      .then((data) => {
        setMediaJson(data);
        setIsDataFetched(true);
      })
      .catch((err) => {
        console.error("Failed to fetch data from Supabase", err);
      });
  }, [isDataFetched]);

  if (!isDataFetched) return <EmojiSpinner progress={progress} />;
  return children;
}
