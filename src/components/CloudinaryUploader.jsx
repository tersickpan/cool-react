import { useState } from "react";

export default function CloudinaryUploader() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadedUrl("");
    setError("");
  };

  const uploadMedia = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setUploading(true);
    setError("");
    setProgress(0);

    try {
      // Step 1: Get signature + timestamp from backend
      const sigRes = await fetch("/api/get-signature");
      if (!sigRes.ok) throw new Error("Failed to get signature");
      const { signature, timestamp } = await sigRes.json();

      // Step 2: Upload to Cloudinary
      const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", url);

      // Track upload progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setProgress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const resData = JSON.parse(xhr.responseText);
          setUploadedUrl(resData.secure_url);
        } else {
          setError("Upload failed. Please try again.");
        }
        setUploading(false);
      };

      xhr.onerror = () => {
        setError("Upload failed due to a network error.");
        setUploading(false);
      };

      xhr.send(formData);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-[#111] text-white rounded-lg shadow-lg w-full max-w-md mx-auto">
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4 w-full text-sm"
      />

      <button
        onClick={uploadMedia}
        disabled={uploading}
        className="px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 disabled:opacity-50 transition-all"
      >
        {uploading ? "Uploading..." : "Upload to Cloudinary"}
      </button>

      {uploading && (
        <div className="w-full bg-gray-700 rounded mt-3">
          <div
            className="bg-pink-500 text-xs leading-none py-1 text-center text-white rounded"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}

      {error && <p className="text-red-400 mt-3">{error}</p>}

      {uploadedUrl && (
        <div className="mt-4 text-center">
          <p className="text-green-400">Upload successful! 🎉</p>
          <img
            src={uploadedUrl}
            alt="Uploaded media"
            className="mt-2 max-h-64 mx-auto rounded-lg shadow-md"
          />
          <a
            href={uploadedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 text-pink-400 hover:underline"
          >
            View File
          </a>
        </div>
      )}
    </div>
  );
}
