import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RecipesAppContext from '../context/RecipesAppContext';
import { saveState } from '../services/localStorage';
import '../styles/Login.css';
import 'font-awesome/css/font-awesome.min.css';

function Login() {
  const {
    setEmail,
    setPassword,
    email,
    password,
  } = useContext(RecipesAppContext);

  const isEmail = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { value } = e.target;
    if (emailRegex.test(value)) {
      setEmail(value);
    } else {
      setEmail('');
    }
  };

  const isPassword = (e) => {
    const { value } = e.target;
    const minimumLength = 6;
    if (value.length > minimumLength) {
      setPassword(value);
    } else {
      setPassword('');
    }
  };

  const saveToken = () => {
    saveState('mealsToken', 1);
    saveState('cocktailsToken', 1);
    saveState('user', { email });
  };

  return (
    <div className="total-login">
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <h1>Trybe Food</h1>
      <div className="div-form">
        <form>
          <h2>Login</h2>
          <div className="textbox">
            <FontAwesomeIcon icon={faUser} />
            <input
              type="email"
              placeholder="Login"
              data-testid="email-input"
              onChange={ isEmail }
            />
          </div>
          <div className="textbox">
            <FontAwesomeIcon icon={faLock} />
            <input
              placeholder="Password"
              type="password"
              data-testid="password-input"
              onChange={ isPassword }
            />
          </div>
        </form>
        <div className="div-span-senha">
          <span className="span-senha">Esqueci a senha</span>
        </div>
        <Link to="/comidas">
          <button
            className="login-button"
            type="button"
            data-testid="login-submit-btn"
            disabled={ !email || !password }
            onClick={ saveToken }
          >
            Entrar
          </button>
        </Link>
      </div>
      <span className="span-botton">Gostou do nosso app? Saiba mais!</span>
    </div>
  );
}

export default Login;
