import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Context from '../context/Context';

export default function Login() {
  const {
    login, setLogin, disabled, setDisabled,
  } = useContext(Context);

  const inputValidate = () => {
    const validEmail = (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/).test(login.email);
    // const validPassword = login.senha > 6 ? ;
    console.log(login.password.length);
    if (validEmail && login.password.length > 5) {
      console.log('aqui');
      return setDisabled(false);
    }
    return setDisabled(true);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setLogin({ ...login, [name]: value });
    inputValidate();
  };

  const handleSubmit = () => {
    const user = {
      email: login.email,
    };
    console.log('aaaaaa');
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(user));
    setLogin({ ...login, redirect: true });
  };
  return (
    <div>
      {login.redirect ? <Redirect to="/comidas" /> : null}
      <label>
        E-mail
        <input
          type="email"
          name="email"
          data-testid="email-input"
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label>
        Senha
        <input
          type="password"
          name="password"
          data-testid="password-input"
          onChange={(e) => handleChange(e)}
        />
      </label>
      <button
        type="button"
        disabled={disabled}
        data-testid="login-submit-btn"
        onClick={() => handleSubmit()}
      >
        Entrar
      </button>
    </div>
  );
}
