export default function BaseImagePreview({
  src,
  alt = "image preview",
  wallpaper = false,
  className = "",
}) {
  if (!src) return;

  const containerClass = wallpaper
    ? "w-full h-full flex items-center justify-center"
    : "max-w-md mx-auto";

  const imageClass = wallpaper
    ? "w-full h-full object-cover"
    : "rounded-2xl shadow-xl object-contain max-w-full max-h-full";

  return (
    <div className={`${containerClass} ${className}`}>
      <img
        src={src}
        alt={alt}
        className={imageClass}
      />
    </div>
  );
}
