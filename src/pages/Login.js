import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  // const isValid = /^.{6,}$/.test(password); 
  const handleChange = ({target}) => {
    
  }

  return (
    <form>
      <h1>Login</h1>
      <label htmlFor="email">
        Email:
        <input type="email" data-testid="email-input" id="email" onChange={handleChange} />
      </label>
      <label htmlFor="password">
        Senha:
        <input type="password" data-testid="password-input" id="password" />
      </label>
      <button type="button" data-testid="login-submit-btn">Entrar</button>
    </form>
  );
}

export default Login;
