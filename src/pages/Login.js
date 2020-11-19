import React from 'react';

function Login() {
  return (
    <>
      <input type="email" data-testid="email-input" />
      <input type="password" data-testid="password-input" />
      <input type="submit" data-testid="login-submit-btn" />
    </>
  );
}

export default Login;
