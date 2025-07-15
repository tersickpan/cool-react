export default function BaseVideoPreview({ src, volume = 1.0, muted = true }) {
  if (!src) return;

  return (
    <div className="max-w-md mx-auto">
      <video
        src={src}
        controls
        autoPlay
        loop
        muted={muted}
        volume={volume}
        className="rounded-2xl shadow-xl w-full"
      />
    </div>
  );
}
