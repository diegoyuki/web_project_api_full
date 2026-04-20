export default function ConfirmDelete({ onConfirm }) {
  return (
    <button
      className="popup__confirm-button"
      type="button"
      onClick={onConfirm}
    >
      Sí
    </button>
  );
}



