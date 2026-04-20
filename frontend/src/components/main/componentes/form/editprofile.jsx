import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function EditProfile({ onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setAbout(currentUser.about);
    }
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, about });
  }

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <input
        className="edit-form__input"
        placeholder="Nombre"
        minLength="2"
        maxLength="40"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        className="edit-form__input"
        placeholder="Acerca de mí"
        minLength="2"
        maxLength="200"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        required
      />

      <button className="edit-form__submit" type="submit">
        Guardar
      </button>
    </form>
  );
}