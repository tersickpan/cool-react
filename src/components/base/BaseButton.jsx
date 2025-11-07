export default function BaseButton({
  children,
  onClick,
  type = "button",
  className = "",
  icon = null,
  disabled = false,
  // optional toggle props (backwards compatible)
  toggled = false,
  onToggle = null,
  ...props
}) {
  const handleClick = (e) => {
    if (disabled) return;
    if (typeof onToggle === "function") {
      try {
        onToggle(!toggled);
      } catch (err) {
        // swallow to avoid breaking parent handlers
      }
    }
    if (typeof onClick === "function") onClick(e);
  };

  const baseClasses = `flex items-center gap-2 px-4 py-2 rounded-2xl shadow transition-all duration-200 ${className}`;
  const enabledClasses = disabled
    ? "opacity-50 cursor-not-allowed hover:bg-pink-500"
    : "border-2 hover:bg-pink-600 hover:text-black";
  const normalVisual = "text-pink-400 bg-x-gray-700";
  const toggledVisual = "text-black bg-pink-600 border-2";

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      aria-pressed={toggled}
      className={`${baseClasses} ${
        toggled ? toggledVisual : normalVisual
      } ${enabledClasses}`}
      {...props}
    >
      {icon && <span className="text-xl">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
