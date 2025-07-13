import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMediaJson, setIsJsonLoaded } from "../store/mediaDataSlice";
import { loadMediaJson } from "../utils/loadMediaJson";
import EmojiSpinner from "./base/EmojiSpinner";

export default function RequireJsonLoader({ children }) {
  const dispatch = useDispatch();
  const isJsonLoaded = useSelector((state) => state.mediaData.isJsonLoaded);

  useEffect(() => {
    if (isJsonLoaded) return;

    loadMediaJson()
      .then((data) => {
        dispatch(setMediaJson(data)); // ✅ data = { pictures: {}, videos: {} }
        dispatch(setIsJsonLoaded(true));
      })
      .catch((err) => {
        console.error("Failed to load media.json from Cloudinary", err);
      });
  }, [isJsonLoaded]);

  if (!isJsonLoaded) return <EmojiSpinner />;

  return children;
}
