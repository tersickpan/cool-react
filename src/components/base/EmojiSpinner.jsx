import { useEffect, useState } from "react";

const emojiOptions = [
  "💅",
  "✨",
  "🎀",
  "🦄",
  "👠",
  "💄",
  "👑",
  "🌈",
  "🔥",
  "💖",
];

export default function EmojiSpinner({ visible = true }) {
  const [currentEmoji, setCurrentEmoji] = useState("💅");

  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      const next =
        emojiOptions[Math.floor(Math.random() * emojiOptions.length)];
      setCurrentEmoji(next);
    }, 300);

    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/75 flex justify-center items-center z-[9999]">
      <div className="relative w-[100px] h-[100px]">
        <div className="w-full h-full border-[6px] border-dashed border-pink-400 rounded-full animate-spin-slow" />
        <div className="absolute text-4xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
          {currentEmoji}
        </div>
      </div>
    </div>
  );
}
