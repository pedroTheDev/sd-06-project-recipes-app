import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState({
    email: '',
    password: 0,
  });

  const inputValues = () => {
    const { email, password } = user;
    const regexp = /^[a-zA-Z0-9.!#$%&_-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    let disabledBtn = true;
    const six = 6;

    if (regexp.test(email) && password.length >= six) disabledBtn = false;

    setDisabled(disabledBtn);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setUser({
      ...user,
      [name]: value,
    });

    inputValues();
  };

  const setUserOnLocalStorage = () => {
    const { email } = user;

    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  const handleClick = () => {
    setUserOnLocalStorage();
  };

  return (
    <section>
      <form>
        <label htmlFor="email-input">Email</label>
        <input id="email-input" name="email" type="text" data-testid="email-input" onChange={handleChange} />
        <label htmlFor="password-input">Senha</label>
        <input id="password-input" name="password" type="password" data-testid="password-input" onChange={handleChange} />
        <Link to="/comidas">
          <button
            disabled={disabled}
            type="button"
            data-testid="login-submit-btn"
            onClick={handleClick}
          >
            Login
          </button>
        </Link>
      </form>
    </section>
  );
};

export default Login;
