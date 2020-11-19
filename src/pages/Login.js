import React, { useContext } from 'react';
import LoginContext from '../context/LoginContext';

const Login = () => {
  const {
    email, setEmail, password, setPassword,
  } = useContext(LoginContext);

  const infoVerifier = () => {
    const validateEmailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    const testEmail = validateEmailRegex.test(email);
    const testPassword = password.length >= 6;
    if (testEmail && testPassword) {
      return false;
    }
    return true;
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
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={infoVerifier()}
      >
        Entrar
      </button>
    </form>
  );
};

export default Login;
