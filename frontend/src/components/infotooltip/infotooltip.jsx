import React from "react";
import Popup from "../Main/componentes/popup/popup";
import "../../blocks/infotooltip.css";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  if (!isOpen) return null;

  return (
    <Popup onClose={onClose}>
      <div className="infotooltip">
        <div className={`infotooltip__icon ${isSuccess ? "infotooltip__icon_success" : "infotooltip__icon_error"}`} />
        <p className="infotooltip__text">
          {isSuccess
            ? "¡Correcto! Ya estás registrado."
            : "Ups, algo salió mal. Inténtalo de nuevo."}
        </p>
      </div>
    </Popup>
  );
}

export default InfoTooltip;