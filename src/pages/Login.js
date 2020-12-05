import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginContext from '../context/LoginContext';
import HeaderContext from '../context/HeaderContext';
import wallpaper from '../images/wallpaper.jpeg';
import './Login.css'

const Login = () => {
  const {
    email, setEmail, password, setPassword,
  } = useContext(LoginContext);

  const {
    setTitle,
  } = useContext(HeaderContext);

  useEffect(() => {
    setTitle('Login');
  }, []);

  const infoVerifier = () => {
    const minimumPasswordLength = 6;
    const validateEmailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    const testEmail = validateEmailRegex.test(email);
    const testPassword = password.length > minimumPasswordLength;
    if (testEmail && testPassword) {
      return false;
    }
    return true;
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  return (
    <div className="login-container">
      <h1 className="main-header">Login</h1>
      <div className="login-image-container">
        <img src={ wallpaper } alt="wallpaper" className="login-image pulse" />
      </div>
      <form className="login-form">
        <input
          type="email"
          data-testid="email-input"
          className="email-input"
          placeholder="Digite seu e-mail"
          value={ email }
          onChange={ ({ target: { value } }) => setEmail(value) }
          required
        />
        <input
          type="password"
          data-testid="password-input"
          className="password-input"
          placeholder="Digite sua senha"
          value={ password }
          onChange={ ({ target: { value } }) => setPassword(value) }
          required
        />
        <Link className="login-form" to="/comidas">
          <button
            type="submit"
            data-testid="login-submit-btn"
            className="login-submit-btn"
            onClick={ handleClick }
            disabled={ infoVerifier() }
          >
            Entrar
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
