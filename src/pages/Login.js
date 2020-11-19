import React from 'react';
import SearchBar from '../components/SearchBar';

function Login() {
  return (
    <div>
      <input type="email" data-testid="email-input" />
      <input type="password" data-testid="password-input" />
      <button type="button" data-testid="login-submit-btn">
        Login
      </button>
      <SearchBar />
    </div>
  );
}

export default Login;
