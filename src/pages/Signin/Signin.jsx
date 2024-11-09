import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import './Signin.css';

const Signin = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Preencha todos os campos!");
      return;
    }

    const res = login(email, password);
    if (res) {
      navigate("/");
    } else {
      setError("E-mail ou senha incorretos!");
    }
  };

  return (
    <div className="signin">
      <div className="signin__content">
        <h1 className="signin__logo"><Link to="/">Sports</Link></h1>
        {error ? (
          <p className="app-layout__error-message">{error}</p>
        ) : (
          <p className="app-layout__welcome-message">Seja bem-vindo ao Sports!</p>
        )}
        <form id="signinForm" onSubmit={handleSubmit}>
          <div className="signin__input-group">
            <label htmlFor="email" className="signin__label">E-mail:</label>
            <input
              className="signin__input-field"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="signin__input-group">
            <label htmlFor="password" className="signin__label">Senha:</label>
            <input
              className="signin__input-field"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button type="submit" className="signin__button">Entrar</button>
          <div className="signin__signup-link">
            <Link to="/signup">Não tem uma conta? Crie uma!</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
