import { useRef, useState } from "react";

export default function BaseFileUploader({
  onFileSelect,
  label = "Drop Them Goods 💅",
  mediaType = "pictures", // Default to pictures, can be overridden
}) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [fileLabel, setFileLabel] = useState("");

  const resetFile = () => {
    setPreview(null);
    onFileSelect(null);
    setFileLabel("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFile = (file) => {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onFileSelect(file);
    setFileLabel(file.name);
  };

  const handleFileChange = (e) => handleFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div
      className="relative border-2 border-dashed border-pink-500 p-6 rounded-2xl text-center text-white cursor-pointer hover:border-pink-400 transition-all bg-zinc-900 max-w-md mx-auto"
      onClick={() => fileInputRef.current.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <p className="mb-4 text-pink-300 font-semibold">{label}</p>

      <div className="text-sm text-zinc-400">
        {fileLabel || "Click or drop a file here"}
      </div>

      {preview && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent trigger of file input
            resetFile();
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
        onChange={handleFileChange}
      />
    </div>
  );
}
