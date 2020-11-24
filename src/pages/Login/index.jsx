import React, { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useAuth();
  const { push } = useHistory();

  const handleSubmit = useCallback((formEvent) => {
    formEvent.preventDefault();

    const validUserData = { email, password };

    signIn(validUserData);

    push('/comidas');
  }, [email, password, push, signIn]);

  const handleEmailChange = useCallback(({ target }) => {
    const emailTyped = target.value;

    setEmail(emailTyped);
  }, []);

  const handlePasswordChange = useCallback(({ target }) => {
    const passwordTyped = target.value;

    setPassword(passwordTyped);
  }, []);

  const userDataIsValid = useMemo(() => {
    const emailRegex = /\w+@(\w+\.)+\w+$/i;
    const emailIsValid = emailRegex.test(email);

    const MIN_PW_LENGTH = 6;
    const passwordIsValid = password.length > MIN_PW_LENGTH;

    return (emailIsValid && passwordIsValid);
  }, [email, password]);

  return (
    <div className="login-page">
      <form onSubmit={ handleSubmit }>
        <h1>Faça seu login</h1>

        <input
          placeholder="Seu E-mail"
          name="email"
          data-testid="email-input"
          value={ email }
          onChange={ handleEmailChange }
        />

        <input
          data-testid="password-input"
          type="password"
          name="password"
          placeholder="Sua senha"
          value={ password }
          onChange={ handlePasswordChange }
        />

        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !userDataIsValid }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
