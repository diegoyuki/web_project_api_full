import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../blocks/header.css";

const Header = ({ email, onLogout }) => {

  const location = useLocation();

  return (
    <header className="header">

      <h1>
        <span className="big">Around</span>
        <span className="small">the U.S.</span>
      </h1>

      <div className="header__auth">

        {location.pathname === "/" && (
          <>
            <span className="header__email">{email}</span>
            <button className="header__link" onClick={onLogout}>
              Cerrar sesión
            </button>
          </>
        )}

        {location.pathname === "/signin" && (
          <Link className="header__link" to="/signup">
            Regístrate
          </Link>
        )}

        {location.pathname === "/signup" && (
          <Link className="header__link" to="/signin">
            Iniciar sesión
          </Link>
        )}

      </div>

    </header>
  );
};

export default Header;
