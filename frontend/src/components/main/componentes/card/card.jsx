import { useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

import likeInactive from "../../../../images/heartbutton.svg";
import likeActive from "../../../../images/heartactive.png";
import deleteIcon from "../../../../images/delete.svg";

export default function Card({ card, onImageClick, onCardLike, onCardDelete }) {
  const { name, link, likes = [] } = card;

  const { currentUser } = useContext(CurrentUserContext);

 const isLiked = likes.some(
  (user) => user._id === currentUser?._id
);

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleImageClick() {
    onImageClick(card);
  }

  return (
    <article className="gallery__item">
      <button
        className="card__delete-button"
        type="button"
        onClick={handleDeleteClick}
      >
        <img src={deleteIcon} alt="Eliminar tarjeta" />
      </button>

      <img
        className="gallery__image"
        src={link}
        alt={name}
        onClick={handleImageClick}
      />

      <div className="gallery__info">
        <h2 className="gallery__title">{name}</h2>

        <button
          className="gallery__button_like"
          type="button"
          onClick={handleLikeClick}
        >
          <img
            src={isLiked ? likeActive : likeInactive}
            alt="Like"
          />
        </button>
      </div>
    </article>
  );
}