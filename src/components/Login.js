import React from 'react';

function Login() {
  return (
    <div>
      <input type="email" data-testid="email-input" />
      <input type="password" data-testid="password-input" />
      <button type="button" data-testid="login-submit-btn">Entrar</button>
    </div>
  );
}

export default Login;
