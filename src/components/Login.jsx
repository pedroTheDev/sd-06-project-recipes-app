import React, { useContext } from 'react';
import RecipesAppContext from '../hooks/RecipesAppContext';

function Login() {
  const { contextValue: { setEmail } } = useContext(RecipesAppContext);

  const isEmail = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { value } = e.target;
    if (emailRegex.test(value)) {
      setEmail(value);
    } else {
      setEmail('');
    }
  };

  return (
    <form>
      <input type="email" data-testid="email-input" onChange={isEmail} />
      <input type="password" data-testid="password-input" />
      <button type="button" data-testid="login-submit-btn">Entrar</button>
    </form>
  );
}

export default Login;
