export default function BaseImagePreview({
  src,
  alt = "image preview",
  fullscreen = false,
  className = "",
}) {
  if (!src) return;

  const containerClass = fullscreen
    ? "w-full h-screen p-0 rounded-none shadow-none"
    : "max-w-md mx-auto";

  return (
    <div className={`${containerClass} ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`rounded-2xl shadow-xl w-full ${
          fullscreen ? "object-cover" : "object-contain"
        }`}
      />
    </div>
  );
}
