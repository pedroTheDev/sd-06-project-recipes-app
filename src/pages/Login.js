import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <Link to="/comidas">
        <button type="button">OK</button>
      </Link>
    </div>
  );
}

export default Login;
