import { useState, useContext } from "react";
import Popup from "./componentes/popup/popup.jsx";
import ImagePopup from "./componentes/ImagePopup/ImagePopup.jsx";
import NewCard from "./componentes/form/newcard.jsx";
import EditProfile from "./componentes/form/editprofile.jsx";
import EditAvatar from "./componentes/form/editavatar.jsx";
import ConfirmDelete from "./componentes/form/confirmdelete.jsx";
import Card from "./componentes/card/card.jsx";
import User from "./componentes/user/user.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function Main({
  cards,
  onCardLike,
  onCardDelete,
  onAddPlaceSubmit
}) {

  const { currentUser, handleUpdateUser, handleUpdateAvatar } =
    useContext(CurrentUserContext);

  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  function closeAllPopups() {
    setPopup(null);
    setSelectedCard(null);
  }

  return (
    <main className="main">

      <User
        name={currentUser.name}
        about={currentUser.about}
        avatar={currentUser.avatar}

        onEditProfile={() =>
          setPopup({
            title: "Editar perfil",
            children: (
              <EditProfile
                onUpdateUser={(data) => {
                  handleUpdateUser(data);
                  closeAllPopups();
                }}
              />
            ),
          })
        }

        onEditAvatar={() =>
          setPopup({
            title: "Editar avatar",
            children: (
              <EditAvatar
                onUpdateAvatar={(data) => {
                  handleUpdateAvatar(data);
                  closeAllPopups();
                }}
              />
            ),
          })
        }

        onAddPlace={() =>
          setPopup({
            title: "Nuevo lugar",
            children: (
              <NewCard
                onAddPlaceSubmit={(data) => {
                  onAddPlaceSubmit(data);
                  closeAllPopups();
                }}
              />
            ),
          })
        }
      />

      <ul className="gallery">
        {cards.map((card) => (
          <Card
            key={card._id || card.link}
            card={card}
            onImageClick={setSelectedCard}
            onCardLike={onCardLike}
            onCardDelete={(card) =>
              setPopup({
                title: "¿Estás seguro?",
                children: (
                  <ConfirmDelete
                    onConfirm={() => {
                      onCardDelete(card);
                      closeAllPopups();
                    }}
                  />
                ),
              })
            }
          />
        ))}
      </ul>

      {popup && (
        <Popup title={popup.title} onClose={closeAllPopups}>
          {popup.children}
        </Popup>
      )}

      {selectedCard && (
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      )}

    </main>
  );
}