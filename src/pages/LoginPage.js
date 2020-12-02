import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import blackLogo from '../style/blackLogo.png';
// import foodBackground from '../style/food.jpg';

function LoginPage() {
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [user, setUser] = useState('');

  function handleEmail(e) {
    const typedEmail = e;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(typedEmail);
    setUser(typedEmail);
    return setEmail(regex);
  }

  function handlePassword(e) {
    const typedPassword = e;
    const minLength = 6;
    let validPass = false;
    if (typedPassword.length > minLength) {
      validPass = true;
    }
    return setPassword(validPass);
  }

  function handleClick() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: user }));
  }

  return (
    <div className="login-div-container">
      <main className="login-div">
        <img src={ blackLogo } alt="food, drink and fun" className="logo" />
        <input
          type="email"
          data-testid="email-input"
          required
          placeholder="Digite seu email"
          onChange={ ({ target }) => handleEmail(target.value) }
          className="login-input"
        />
        <input
          type="password"
          data-testid="password-input"
          required
          minLength="6"
          placeholder="Digite sua senha"
          onChange={ ({ target }) => handlePassword(target.value) }
          className="login-input"
        />
        <div className="login-button-div">
          <Link to="/comidas">
            <button
              type="button"
              data-testid="login-submit-btn"
              disabled={ !email + !password }
              onClick={ handleClick }
              className="login-button"
            >
              Entrar
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
