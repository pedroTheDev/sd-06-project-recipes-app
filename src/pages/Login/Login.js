import React, { useState } from 'react';
import { setValueUser, cocktailsToken, mealsToken } from '../../services/localStorage';

function Login() {
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [user1, setUser] = useState('');

  const verifyAndSetEmail = (param) => {
    const emailFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(param);
    setUser(param);
    return setEmail(emailFormat);
  };

  const verifyAndSetPassword = (param) => {
    const minPasswordLength = 6;
    let verify = false;
    if (param.length >= minPasswordLength) {
      verify = true;
    }
    return setPassword(verify);
  };

  const handlePath = () => {
    window.location.replace('http://localhost:3000/comidas');
  };

  const handleRedirect = () => {
    setValueUser('user', user1);
    mealsToken(1);
    cocktailsToken(1);
    handlePath();
  };

  return (
    <div>
      <form>
        <div className="form-group">
          <label
            htmlFor="email"
          >
            Email
          <input
              className="form-control"
              type="email"
              data-testid="email-input"
              placeholder="Digite seu email"
              id="password"
              onChange={({ target }) => verifyAndSetEmail(target.value)}
              required="required"
              value={user1}
            />
          </label>
        </div>
        <div className="form-group">
          <label
            htmlFor="senha"
          >
            Senha
          <input
              className="form-control"
              type="password"
              data-testid="password-input"
              placeholder="Digite sua senha"
              id="senha"
              onChange={({ target }) => verifyAndSetPassword(target.value)}
              required="required"
            />
          </label>
        </div>
        <button
          type="button"
          data-testid="login-submit-btn"
          className="btn btn-primary"
          disabled={!email + !password}
          onClick={() => handleRedirect()}
        >
          Entrar
        </button>
      </form >
    </div>
  );
}

export default Login;
