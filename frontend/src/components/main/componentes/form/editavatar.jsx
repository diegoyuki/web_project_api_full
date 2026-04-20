import { useRef } from "react";

export default function EditAvatar({ onUpdateAvatar }) {

  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <form className="edit-avatar-form" onSubmit={handleSubmit}>
      <input
        className="form-validator__input"
        placeholder="Enlace del avatar"
        type="url"
        ref={avatarRef}
        required
      />

      <button className="edit-avatar-form__submit" type="submit">
        Guardar
      </button>
    </form>
  );
}

