export default function BaseDropdown({ label, value, onChange, options = [], disabled = false }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-zinc-400">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="bg-zinc-800 border border-pink-400 rounded-xl px-3 py-2 text-white disabled:opacity-40"
      >
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value || opt}>{opt.label || opt}</option>
        ))}
      </select>
    </div>
  )
}