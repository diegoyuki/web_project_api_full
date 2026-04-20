import editButton from "../../../../images/EditButton.png";
import addButton from "../../../../images/AddButton.png";

export default function User({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  name,
  about,
  avatar,
}) {
  return (
    <section className="user">
      <div className="profile__avatar-container">
        <img
          src={avatar}
          alt="Avatar"
          className="profile__avatar"
        />

        <button
          className="user__avatar-edit-button button"
          type="button"
          onClick={onEditAvatar}
        >
          <img src={editButton} alt="Editar avatar" />
        </button>
      </div>

      <div className="user__info">
        <div className="user__name-container">
          <h2 className="user__name">{name}</h2>

          <button
            className="user__edit_button button"
            type="button"
            onClick={onEditProfile}
          >
            <img src={editButton} alt="Editar perfil" />
          </button>
        </div>

        <p className="user__bio">{about}</p>
      </div>

      <button
        className="profile__add-button button"
        type="button"
        onClick={onAddPlace}
      >
        <img src={addButton} alt="Agregar tarjeta" />
      </button>
    </section>
  );
}