import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Regístrate</h2>

      <form className="auth__form" onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Correo electrónico"
          className="auth__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="auth__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="auth__button auth__submit">
          Registrarse
        </button>

      </form>

      <p className="auth__text ">
        ¿Ya tienes cuenta? <Link to="/signin">Inicia sesión</Link>
      </p>
    </div>
  );
}

export default Register;