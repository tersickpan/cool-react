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
    : "w-full rounded-2xl shadow-xl max-w-full max-h-full";

  useEffect(() => {
    if (videoRef.current) {
      if (typeof volume === "number") {
        videoRef.current.volume = volume;
      } else {
        videoRef.current.volume = parseFloat(volume);
      }
    }
  }, [volume, src]);

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
        {...props}
      />
    </div>
  );
}
