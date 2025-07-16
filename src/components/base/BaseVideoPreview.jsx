export default function BaseVideoPreview({
  src,
  volume = 1.0,
  muted = true,
  loop = true,
  className = "",
  ...props
}) {
  if (!src) return;

  return (
    <div className={`max-w-md mx-auto ${className}`}>
      <video
        src={src}
        controls
        autoPlay
        loop={loop}
        muted={muted}
        volume={volume}
        className="rounded-2xl shadow-xl w-full"
        {...props}
      />
    </div>
  );
}
