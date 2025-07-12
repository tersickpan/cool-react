export default function EmojiSpinner({ emoji = "⏳", text = "Loading them goods..." }) {
  return (
    <div className="flex flex-col items-center text-zinc-400 animate-pulse">
      <div className="text-4xl mb-2">{emoji}</div>
      <div>{text}</div>
    </div>
  )
}