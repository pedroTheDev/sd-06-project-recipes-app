import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import '../styles/login.css';

function Login() {
  const {
    setUser,
    setBtnDisable,
    btnDisable,
  } = useContext(ContextRecipes);

  const validateInputs = () => {
    const email = document.getElementById('email-input').value;
    const senha = document.getElementById('password-input').value;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
    const tamMinimSenha = 6;
    if (senha.length > tamMinimSenha && regex.test(email)) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  };

  const handleClick = () => {
    const email = document.getElementById('email-input').value;
    setUser({ email });
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
  };

  return (
    <div clssName="container">
      <div>
        <div className="name-login">
          <h2>Recives Group 15</h2>
        </div>
        <div className="login-box">
          <h1>Login</h1>
          <label htmlFor="email-input" className="textbox">
            <i className="fas fa-user" />
            Email:
            <input
              type="email"
              data-testid="email-input"
              name="email-input"
              id="email-input"
              onChange={ validateInputs }
            />
          </label>
          <label htmlFor="password-input" className="textbox">
            <i className="fas fa-user" />
            Password:
            <input
              type="password"
              data-testid="password-input"
              name="password-input"
              id="password-input"
              onChange={ validateInputs }
            />
          </label>
          <Link to="/comidas">
            <button
              type="button"
              className="btn"
              data-testid="login-submit-btn"
              disabled={ btnDisable }
              onClick={ handleClick }
            >
              Entrar
            </button>
          </Link>

        </div>

      </div>
    </div>
  );
}

export default Login;
