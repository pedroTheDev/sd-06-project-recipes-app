import React, { useState } from 'react';

function Login() {
  const [buttonDisable, setButtonDisable] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const checkButton = () => {
    const inputPassword = document.getElementById('password-input').value;
    const inputEmail = document.getElementById('email-input').value;
    const regex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    setButtonDisable(inputPassword.length > 6 && regex.test(inputEmail));
    setUserEmail(inputEmail);
    console.log(userEmail);
  };

  return (
    <div>
      <label htmlFor="email-input">
        Email:
        <input
          type="text"
          data-testid="email-input"
          id="email-input"
          onChange={checkButton}
        />
      </label>
      <label htmlFor="password-input">
        Password:
        <input
          type="password"
          data-testid="password-input"
          id="password-input"
          onChange={checkButton}
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={!buttonDisable}
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
