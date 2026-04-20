import React, { useEffect } from "react";

export default function ImagePopup({ card, onClose }) {
  if (!card) return null;

  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="modal-image-preview" onClick={onClose}>
      <div
        className="modal-image-preview__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-image-preview__close"
          type="button"
          onClick={onClose}
        >
          ×
        </button>

        <img
          src={card.link}
          alt={card.name}
          className="modal-image-preview__img"
        />

        <p className="modal-image-preview__caption">
          {card.name}
        </p>
      </div>
    </div>
  );
}



