import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MealsContext from '../context/MealsContext';

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
    <div>
      <form>
        <label htmlFor="email-input">
          Email:
          <input
            type="email"
            name="email-input"
            id="email-input"
            data-testid="email-input"
            onChange={handleChangeWithValidation}
          />
        </label>
        <label htmlFor="password-input">
          Senha:
          <input
            type="password"
            name="password-input"
            id="password-input"
            data-testid="password-input"
            onChange={handleChangeWithValidation}
          />
        </label>
        <Link to="/comidas">
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={disable}
            onClick={handleClick}
          >
            ENTRAR
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
