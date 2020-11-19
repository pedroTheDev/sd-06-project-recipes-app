import React, { useState, useContext } from 'react';
import Context from '../context/Context';

export default function Login({ history }) {
  const [valid, setValid] = useState(true);
  const { email, setEmail } = useContext(Context);
  const [pass, setPass] = useState('');

  const validadeLogin = () => {
    const emailInput = document.getElementById('input-email');
    const password = document.getElementById('input-password');
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const six = 6;
    if (regex.test(emailInput.value) === true && password.value.length > six) {
      setValid(false);
    } else {
      setValid(true);
    }
  }
  
  const handleEmail = ({ target }) => {
    setEmail(target.value);
    validadeLogin();
  };

  const handlePass = ({ target }) => {
    setPass(target.value);
    validadeLogin();
  };

  const handleClick = (e) => {
    e.preventDefault();
    history.push('/comidas');
    // const item = { mealsToken: 1, cocktailsToken: 1, user: { email }};
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: email }));
  }

  return (
    <div>
      <label htmlFor="input-email">
        <input
          type="email"
          id="input-email"
          data-testid="email-input"
          onChange={ handleEmail }
          value={ email }
        />
      </label>
      <label htmlFor="input-password">
        <input
          type="password"
          id="input-password"
          data-testid="password-input"
          onChange={ handlePass }
          value={ pass }
        />
      </label>
      <button 
        disabled={ valid } 
        type="submit" 
        data-testid="login-submit-btn"
        onClick={ handleClick }
      >
        Entrar
      </button>
    </div>
  );
}
