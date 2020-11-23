import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LoginContext from '../context/LoginContext';

const Login = () => {
  const {
    email, setEmail, password, setPassword,
  } = useContext(LoginContext);

  const infoVerifier = () => {
    const minimumPasswordLength = 6;
    const validateEmailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    const testEmail = validateEmailRegex.test(email);
    const testPassword = password.length >= minimumPasswordLength;
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
    <form>
      <input
        type="email"
        data-testid="email-input"
        placeholder="email"
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
        required
      />
      <input
        type="password"
        data-testid="password-input"
        placeholder="senha"
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
        required
      />
      <Link to="/comidas">
        <button
          type="submit"
          data-testid="login-submit-btn"
          onClick={handleClick}
          disabled={infoVerifier()}
        >
          Entrar
        </button>
      </Link>
    </form>
  );
};

export default Login;
