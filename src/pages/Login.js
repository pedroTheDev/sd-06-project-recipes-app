import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';

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
    <div>
      <label htmlFor="email-input">
        Email:
      </label>
      <input
        type="email"
        data-testid="email-input"
        name="email-input"
        id="email-input"
        onChange={validateInputs}
      />
      <label htmlFor="password-input">
        Password:
        <input
          type="password"
          data-testid="password-input"
          name="password-input"
          id="password-input"
          onChange={validateInputs}
        />
      </label>
      <Link to="/comidas">
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={btnDisable}
          onClick={handleClick}
        >
          Entrar
        </button>
      </Link>
    </div>
  );
}

export default Login;
