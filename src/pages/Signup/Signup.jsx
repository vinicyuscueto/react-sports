import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Popup from '../../components/Popup/Popup';
import './Signup.css';

const Signup = () => {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

  const validatePassword = (password) => password.length >= 8;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Preencha todos os campos!");
      return;
    }

    if (!validateEmail(email)) {
      setError("E-mail inválido!");
      return;
    }

    if (!validatePassword(password)) {
      setError("A senha deve possuir ao menos 8 caracteres!");
      return;
    }

    const res = register(email, password);
    if (res) {
      setShowPopup(true);
    } else {
      setError("E-mail já cadastrado!");
    }
  };

  return (
    <div className="signup">
      <div className="signup__content">
        <Popup show={showPopup} redirect={() => navigate("/signin")} type="signup" />
        <h1 className="signup__logo"><Link to="/">Sports</Link></h1>
        {error ? (
          <p className="app-layout__error-message">{error}</p>
        ) : (
          <p className="app-layout__welcome-message">Seja bem-vindo ao Sports!</p>
        )}
        <form id="signinForm" onSubmit={handleSubmit}>
          <div className="signup__input-group">
            <label htmlFor="email" className="signup__label">E-mail:</label>
            <input
              className="signup__input-field"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="signup__input-group">
            <label htmlFor="password" className="signup__label">Senha:</label>
            <input
              className="signup__input-field"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button type="submit" className="signup__button">Cadastrar</button>
          <div className="signup__signin-link">
            <Link to="/signin" className="signup-link">Já tem uma conta? Entre agora!</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
