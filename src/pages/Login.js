import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import MealsContext from '../context/MealsContext';
import './Login.css';

function Login() {
  const {
    disable,
    setDisable,
    setUser,
  } = useContext(MealsContext);

  function handleChangeWithValidation() {
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
    const passwordLength = 6;
    if (password.length > passwordLength && regex.test(email)) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }

  const handleClick = () => {
    const email = document.getElementById('email-input').value;
    setUser({ email });
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
  };

  return (
    <div className="login-container">
      <h1 className="login-title">PROJECT TRYBE - RECIPE APP</h1>
      <form className="form-container">
        <input
          className="input-form-login"
          placeholder="Enter e-mail"
          type="email"
          name="email-input"
          id="email-input"
          data-testid="email-input"
          onChange={ handleChangeWithValidation }
        />
        <input
          className="input-form-login"
          placeholder="Enter password"
          type="password"
          name="password-input"
          id="password-input"
          data-testid="password-input"
          onChange={ handleChangeWithValidation }
        />
        <Link to="/comidas">
          <Button
            variant={ disable ? 'secondary' : 'success' }
            type="button"
            data-testid="login-submit-btn"
            disabled={ disable }
            onClick={ handleClick }
          >
            ENTRAR
          </Button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
