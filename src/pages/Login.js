import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [isValid, setIsValid] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleValidateFields = () => {
    const minLength = 5;
    const validateFields = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    && password.length > minLength;
    return validateFields;
  };

  const handleChangeEmail = ({ target: { value } }) => {
    setEmail(value);
  };

  const handleChangePassword = ({ target: { value } }) => {
    setPassword(value);
    if (handleValidateFields()) setIsValid(true);
  };

  const setLocalStorage = () => {
    const user = { email };
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify(user));
  };

  return (
    <>
      <input
        type="email"
        name="email"
        data-testid="email-input"
        onChange={handleChangeEmail}
      />
      <input
        type="password"
        name="password"
        data-testid="password-input"
        onChange={handleChangePassword}
      />
      <Link to="/comidas">
        <input
          type="submit"
          data-testid="login-submit-btn"
          disabled={!isValid}
          onClick={setLocalStorage}
        />
      </Link>
    </>
  );
}

export default Login;
