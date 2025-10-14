import BaseButton from "./base/BaseButton";

const modes = [
  { label: "✨ Add New Baddie", value: "add", icon: "➕" },
  { label: "🛠 Edit Media", value: "edit", icon: "✏️" },
  { label: "📅 Last Updated", value: "last", icon: "🕒" },
];

export default function NavBar({ currentMode, setCurrentMode }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {modes.map((mode) => (
        <BaseButton
          key={mode.value}
          icon={mode.icon}
          onClick={() => setCurrentMode(mode.value)}
          className={`font-semibold
            ${
              currentMode === mode.value
                ? "bg-pink-950 text-zinc-300 border-pink-950 hover:bg-pink-950 hover:text-zinc-300 hover:scale-100"
                : "border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-zinc-900 hover:scale-105"
            }
            `}
        >
          {mode.label}
        </BaseButton>
      ))}
    </div>
  );
}
