import React from "react";
import { IoClose } from "react-icons/io5";

function MainModal({ modalOpen, setModalOpen, children }) {
  if (!modalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={() => setModalOpen(false)}
    >
      <div
        className="relative w-full max-w-md bg-dry text-white rounded-2xl shadow-2xl border border-gray-700 px-6 py-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-white text-2xl hover:text-red-500 transition"
          onClick={() => setModalOpen(false)}
          title="Close"
          aria-label="Close"
        >
          <IoClose />
        </button>

        {children}
      </div>
    </div>
  );
}

export default MainModal;
