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
      className={`flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-2xl shadow transition-all duration-200
        ${disabled ? "opacity-50 cursor-not-allowed hover:bg-pink-500" : ""}
        ${className}`}
      {...props}
    >
      {icon && <span className="text-xl">{icon}</span>}
      <span>{children}</span>
    </button>
  )
}
