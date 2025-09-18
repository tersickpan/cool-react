import { useState, useRef, useImperativeHandle, forwardRef } from "react";
import axios from "axios";

import getUploadSign from "../utils/getUploadSign";

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

  const handleUpload = async ({ baseKey, entryKey }) => {
    if (!files.length) return;

    const resourceType = files[0].type.startsWith("video") ? "video" : "image";
    const folder = `baddies/${baseKey}`;

    // 🔹 Upload all files in parallel
    const uploads = Array.from(files).map(async (file, idx) => {
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

      // Let Cloudinary handle public_id automatically
      return axios
        .post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
          }/auto/upload`,
          formData,
          {
            onUploadProgress: (evt) => {
              const percent = Math.round((evt.loaded * 100) / evt.total);
              setProgress((prev) => ({ ...prev, [idx]: percent }));
            },
          }
        )
        .then((res) => res.data);
    });

    await Promise.all(uploads);
  };

  useImperativeHandle(ref, () => ({
    handleUpload,
  }));

  return (
    <div className="p-4">
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

      {/* Progress bars */}
      <div className="mt-4">
        {totalFiles > 0 && (
          <div>
            <div className="text-sm text-white mb-1">
              {avgProgress === 100
                ? "Upload Complete"
                : `Uploading ${totalFiles} files...`}
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full transition-all duration-200 ${
                  avgProgress === 100 ? "bg-green-500" : "bg-pink-500"
                }`}
                style={{ width: `${avgProgress}%` }}
              />
            </div>
            <div className="text-xs text-gray-300 mt-1">
              {avgProgress ? `${avgProgress}%` : "Waiting..."}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default MultiMediaUploader;
