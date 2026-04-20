import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Header from "./header/header";
import Main from "./Main/Main";
import Footer from "./footer/footer";

import Login from "./login/login";
import Register from "./Register/Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./infotooltip/infotooltip";

import CurrentUserContext from "../contexts/CurrentUserContext";

import api from "../utils/api";
import { register, authorize, getContent } from "../utils/auth";

function App() {

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      getContent(token)
        .then((data) => {
          setEmail(data.data.email);
          setLoggedIn(true);
        })
        .catch(() => setLoggedIn(false));
    }
  }, []);

  useEffect(() => {
    if (!loggedIn) return;

    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch(console.log);

    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch(console.log);

  }, [loggedIn]);

  function handleLogin(email, password) {
    authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          setEmail(email);
          navigate("/");
        }
      })
      .catch(() => {
      setIsSuccess(false);
      setIsInfoTooltipOpen(true);
    });
  }

  function handleRegister(email, password) {
    register(email, password)
      .then(() => {
        setIsSuccess(true);
        setIsInfoTooltipOpen(true);
        navigate("/signin");
      })
      .catch(() => {
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/signin");
  }

  function closeAllPopups() {
    setIsInfoTooltipOpen(false);
  }

  function handleUpdateUser(data) {
    api.updateUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
      })
      .catch(console.log);
  }

  function handleUpdateAvatar(data) {
    api.updateAvatar(data)
      .then((newUser) => {
        setCurrentUser(newUser);
      })
      .catch(console.log);
  }

function handleCardLike(card) {
  const isLiked = card.likes.some(
    (user) => user._id === currentUser._id
  );

  const request = isLiked
    ? api.unlikeCard(card._id)
    : api.likeCard(card._id);

  request
    .then((newCard) => {
      setCards((state) =>
        state.map((c) =>
          c._id === card._id ? newCard : c
        )
      );
    })
    .catch(console.log);
}

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((c) => c._id !== card._id)
        );
      })
      .catch(console.log);
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addCard({ name, link })
      .then((newCard) => {
        setCards((prevCards) => [newCard, ...prevCards]);
      })
      .catch(console.log);
  }

  if (loggedIn && !currentUser) {
    return null;
  }

  return (
    <>
      <Routes>

        <Route
          path="/signin"
          element={
            <>
              <Header />
              <Login onLogin={handleLogin} />
            </>
          }
        />

        <Route
          path="/signup"
          element={
            <>
              <Header />
              <Register onRegister={handleRegister} />
            </>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <CurrentUserContext.Provider
                value={{
                  currentUser,
                  handleUpdateUser,
                  handleUpdateAvatar
                }}
              >
                <div className="page">
                  <Header email={email} onLogout={handleLogout} />
                  <Main
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                  />
                  <Footer />
                </div>
              </CurrentUserContext.Provider>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/signin" />} />

      </Routes>

      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isSuccess={isSuccess}
      />
    </>
  );
}

export default App;