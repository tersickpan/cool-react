import { useEffect, useState } from "react";

export default function SocialEdits({
  options = {},
  placeholder = "Insert link here",
  disabled = false,
  selectWidthClass = "w-40",
  className = "",
}) {
  const [selectSocial, setSelectSocial] = useState("");
  const [inputSocial, setInputSocial] = useState("");

  useEffect(() => {
    setSelectSocial("");
    setInputSocial("");
  }, [options]);

  const handleSelectChange = (e) => {
    const key = e.target.value;
    setSelectSocial(key);
    setInputSocial(options?.[key] || "");
  };

  const handleInputChange = (value) => {
    setInputSocial(value);
    options[selectSocial] = value;
  };

  return (
    <div
      className={`flex items-center border border-zinc-700 rounded-xl overflow-hidden bg-zinc-900 focus-within:ring-2 focus-within:ring-indigo-500 ${className}`}
    >
      <select
        className={`appearance-none ${selectWidthClass} px-3 py-2 bg-zinc-800 text-sm text-white outline-none border rounded-l-xl border-pink-400 disabled:opacity-40`}
        value={selectSocial}
        onChange={handleSelectChange}
        disabled={disabled}
        aria-label="Select social"
      >
        <option value="">-- Select --</option>
        {Object.entries(options).map(([key]) => (
          <option
            key={key}
            value={key}
          >
            {key ? key.charAt(0).toUpperCase() + key.slice(1) : key}
          </option>
        ))}
      </select>

      <input
        className="flex-1 px-3 py-2 text-sm text-white bg-zinc-800 border border-zinc-600 rounded-r-xl"
        type="text"
        value={inputSocial}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled || selectSocial === ""}
        aria-label="Input value"
      />
    </div>
  );
}
