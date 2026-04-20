import React from "react";
import "../../../../blocks/modal.css";

export default function Popup({ title, children, onClose }) {
  return (
    <div className="modal">
      <div className="modal__container">
        <button
          className="modal__close button"
          type="button"
          onClick={onClose}
        >
          ×
        </button>

        {title && <h2 className="edit-form__title">{title}</h2>}
        {children}
      </div>
    </div>
  );
}
