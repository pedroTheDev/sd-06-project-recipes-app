import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [user, setUser] = useState('');

  function verifyAndSetEmail(param) {
    const emailFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(param);
    setUser(param);
    return setEmail(emailFormat);
  }

  function verifyAndSetPassword(param) {
    const minPasswordLength = 6;
    let verify = false;
    if (param.length >= minPasswordLength) {
      verify = true;
    }
    return setPassword(verify);
  }

  return (
    <div>
      <h1>Bem-vindo chef!</h1>
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
              onChange={ ({ target }) => verifyAndSetEmail(target.value) }
              required="required"
              value={ user }
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
              onChange={ ({ target }) => verifyAndSetPassword(target.value) }
              required="required"
            />
          </label>
        </div>
        <button
          type="button"
          data-testid="login-submit-btn"
          className="btn btn-primary"
          disabled={ !email + !password }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
