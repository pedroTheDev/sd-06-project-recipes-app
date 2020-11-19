import React, { useContext } from 'react';
import RecipesAppContext from '../hooks/RecipesAppContext';

function Login() {
  const { contextValue: { setEmail, setPassword, email, password } } = useContext(RecipesAppContext);

  const isEmail = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { value } = e.target;
    if (emailRegex.test(value)) {
      setEmail(value);
    } else {
      setEmail('');
    }
  };

  const isPassword = (e) => {
    const { value } = e.target;
    if (value.length > 6) {
      setPassword(value)
    } else {
      setPassword('');
    }
  }

  return (
    <form>
      <h2>Login</h2>
      <input type="email" data-testid="email-input" onChange={isEmail} />
      <input type="password" data-testid="password-input" onChange={isPassword} />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={!email || !password}
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
