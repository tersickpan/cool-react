import { useState, useRef, useImperativeHandle, forwardRef } from "react";
import axios from "axios";

import EmojiSpinner from "./base/EmojiSpinner";
import getUploadSign from "../utils/getUploadSign";
import { insertSingleMediaUpload } from "../utils/supabase";

const MultiMediaUploader = forwardRef(function MultiMediaUploader(
  {
    mediaType = "pictures", // "pictures" or "videos"
    label = "Drop Them Goods 💅",
    files = [],
    setFiles = () => {},
  },
  ref
) {
  const fileInputRef = useRef(null);
  const [progress, setProgress] = useState({});

  // ⬇️ Add these lines here, before return
  const totalFiles = Array.from(files).length;
  const sumProgress = Object.values(progress).reduce((a, b) => a + b, 0);
  const avgProgress = totalFiles ? Math.round(sumProgress / totalFiles) : 0;

  const handleDrop = (e) => {
    e.preventDefault();
    setFiles(e.target.files);
    setProgress({});
  };

  const handleUpload = async ({ baseKey, lastEntryIndex }) => {
    if (!files.length) return;

    const resourceType = mediaType === "videos" ? "video" : "image";
    const folder = `baddies/${baseKey}`;

    try {
      for (let idx = 0; idx < files.length; idx++) {
        const file = files[idx];
        const entryKey = `${baseKey}-${String(lastEntryIndex + idx).padStart(
          2,
          "0"
        )}`;
        const volume = file.volume || 0.07; // Default volume for videos

        // 🔹 Ask backend signature
        const { signature, timestamp } = await getUploadSign({
          folder,
          entryKey,
        });
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
        formData.append("public_id", entryKey);
        formData.append("display_name", entryKey);
        formData.append("asset_folder", folder);
        formData.append("resource_type", resourceType);

        // Upload to Cloudinary
        let cloudinaryRes;
        cloudinaryRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
          }/auto/upload`,
          formData,
          {
            onUploadProgress: (evt) => {
              const percent = Math.round((evt.loaded * 100) / evt.total);
              // Map Cloudinary progress to 0-50%
              setProgress((prev) => ({
                ...prev,
                [idx]: Math.round(percent * 0.5),
              }));
            },
          }
        );

        const { public_id, secure_url } = cloudinaryRes.data;

        // Insert to Supabase
        setProgress((prev) => ({
          ...prev,
          [idx]: 75,
        }));

        await insertSingleMediaUpload({
          mediaType,
          base_key: baseKey,
          public_id,
          url: secure_url,
          timestamp: new Date(timestamp * 1000).toISOString(),
          volume: resourceType === "video" ? volume : undefined,
        });

        setProgress((prev) => ({
          ...prev,
          [idx]: 100,
        }));
      }
    } catch (err) {
      // Cancel the rest of the transfer
      setProgress((prev) => ({
        ...prev,
        error: `Upload failed: ${err.message}`,
      }));
      // Optionally, you can break or return here
      return;
    }
  };

  useImperativeHandle(ref, () => ({
    handleUpload,
  }));

  return (
    <div className="p-4">
      {/* Spinner overlay during upload */}
      <EmojiSpinner
        visible={avgProgress > 0 && avgProgress < 100}
        progress={avgProgress}
      />

      <div
        className="relative border-2 border-dashed border-pink-500 p-6 rounded-2xl text-center text-white cursor-pointer hover:border-pink-400 transition-all bg-zinc-900 max-w-md mx-auto"
        onClick={() => fileInputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <p className="mb-4 text-pink-300 font-semibold">{label}</p>

        <div className="text-sm text-zinc-400">
          {totalFiles > 0
            ? Array.from(files).map((file) => (
                <p key={file.name}>{file.name}</p>
              ))
            : "Click or drop a file here"}
        </div>

        {files && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent trigger of file input
              setFiles([]);
              setProgress({});
            }}
            className="absolute top-2 right-2 text-pink-400 hover:text-pink-300 transition"
            title="Remove file"
          >
            ❌
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={mediaType === "videos" ? "video/*" : "image/*"}
          className="hidden"
          multiple
          onChange={(e) => {
            setFiles(e.target.files);
            setProgress({});
          }}
        />
      </div>
    </div>
  );
});

export default MultiMediaUploader;
