export default function BaseButton({
  children,
  onClick,
  type = "button",
  className = "",
  icon = null,
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-4 py-2 rounded-2xl shadow transition-all duration-200
        text-pink-400 bg-x-gray-700 border-2 hover:bg-pink-600 hover:text-black
        ${disabled ? "opacity-50 cursor-not-allowed hover:bg-pink-500" : ""}
        ${className}`}
      {...props}
    >
      {icon && <span className="text-xl">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
