export default function BaseVideoPreview({
  src,
  volume = 1.0,
  muted = true,
  loop = true,
  className = "",
  wallpaper = false,
  ...props
}) {
  if (!src) return;

  const containerClass = wallpaper
    ? "w-full h-full flex items-center justify-center"
    : "max-w-md mx-auto";

  const videoClass = wallpaper
    ? "w-full h-full object-contain"
    : "w-full rounded-2xl shadow-xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg max-h-80 sm:max-h-96 md:max-h-[32rem]";

  return (
    <div className={`${containerClass} ${className}`}>
      <video
        src={src}
        controls
        autoPlay={muted}
        loop={loop}
        muted={muted}
        volume={volume}
        className={videoClass}
        {...props}
      />
    </div>
  );
}
