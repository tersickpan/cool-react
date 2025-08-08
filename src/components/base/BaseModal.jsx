import React, { useEffect } from "react";

function BaseModal({ isOpen, onClose, children }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-md bg-black/30 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative max-w-md w-full bg-zinc-900 border border-pink-500 text-white rounded-2xl p-6 shadow-lg shadow-pink-500/30 transition-transform duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-pink-400 hover:text-pink-200 text-xl"
        >
          ❌
        </button>
      </div>
    </div>
  );
}

export default BaseModal;
