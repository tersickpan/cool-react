export default function BaseInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  ...props
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-zinc-400">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-zinc-800 border border-zinc-600 rounded-xl px-3 py-2 text-white mb-3"
        {...props}
      />
    </div>
  );
}
