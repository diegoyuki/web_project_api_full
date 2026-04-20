import { useState } from "react";

export default function NewCard({ onAddPlaceSubmit }) {

  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlaceSubmit({
      name,
      link
    });
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>

      <input
        className="add-form__input"
        placeholder="Título"
        minLength="2"
        maxLength="30"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        className="add-form__input"
        placeholder="Enlace de la imagen"
        type="url"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        required
      />

      <button className="modal__save" type="submit">
        Crear
      </button>

    </form>
  );
}
