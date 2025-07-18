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
    : "rounded-2xl shadow-xl object-contain max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg max-h-80 sm:max-h-96 md:max-h-[32rem]";

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
