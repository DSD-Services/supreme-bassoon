"use client";

import { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  handleClose: () => void;
  children: ReactNode;
}

export default function Modal({ handleClose, children }: ModalProps) {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setModalRoot(document.getElementById("modal-root"));

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-gray-900/50"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      onClick={handleClose}
    >
      <div
        className="relative z-50 rounded-lg bg-white p-5 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          onClick={handleClose}
          className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
        >
          Close
        </button>
      </div>
    </div>,
    modalRoot,
  );
}
