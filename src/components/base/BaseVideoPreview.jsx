import { useEffect, useRef } from "react";

export default function BaseVideoPreview({
  src,
  volume = 0.07,
  muted = true,
  loop = true,
  className = "",
  wallpaper = false,
  ...props
}) {
  const videoRef = useRef(null);

  const containerClass = wallpaper
    ? "w-full h-full flex items-center justify-center"
    : "max-w-md mx-auto";

  const videoClass = wallpaper
    ? "w-full h-full object-contain"
    : "w-full rounded-2xl shadow-xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg max-h-80 sm:max-h-96 md:max-h-[32rem]";

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

  if (!src) return;

  return (
    <div className={`${containerClass} ${className}`}>
      <video
        ref={videoRef}
        src={src}
        controls
        autoPlay={muted}
        loop={loop}
        muted={muted}
        className={videoClass}
        volume={volume}
        {...props}
      />
    </div>
  );
}
