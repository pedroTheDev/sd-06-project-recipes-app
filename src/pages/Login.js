import React, { useContext } from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEnvelope, faKey, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

// Context
import RecipesContext from '../context/RecipesContext';

// CSS
import '../styles/login.css';

// Logo
import Logo from '../images/logo.png';

// Bottom img
import LoginBottomImg from '../images/login-bottom-img.png';

export default function Login(props) {
  const {
    login,
    setLogin,
    isValid,
    setValid,
  } = useContext(RecipesContext);

  function validadeInputs() {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const magicNumber = 6;
    if (regex.test(login.email) && login.password.length >= magicNumber) {
      return setValid(false);
    }
    return setValid(true);
  }

  const handleInput = ({ target: { value, name } }) => {
    setLogin({ ...login, [name]: value });
    validadeInputs();
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: login.email }));
    props.history.push('/comidas');
  };

  return (
    <main>
      <section>
        <div className="img-container">
          <img src={ Logo } alt="Logo" />
        </div>

        <div className="login-container">

          <div className="input-container">
            <FontAwesomeIcon className="icon" icon={ faEnvelope } size="2x" />
            <input
              className="input-login"
              type="email"
              name="email"
              data-testid="email-input"
              placeholder=""
              onChange={ handleInput }
            />
          </div>

          <div className="input-container">
            <FontAwesomeIcon className="icon" icon={ faKey } size="2x" />
            <input
              className="input-login"
              type="password"
              name="password"
              data-testid="password-input"
              onChange={ handleInput }
            />
          </div>

          <div
            className="login-btn-container"
          >
            <FontAwesomeIcon className="signIn-icon" icon={ faSignInAlt } size="2x" />
            <button
              type="button"
              data-testid="login-submit-btn"
              disabled={ isValid }
              onClick={ handleClick }
            >
              LOGIN
            </button>
          </div>

          <img className="bottom-img" src={ LoginBottomImg } alt="login-bottom-img" />
        </div>
      </section>
    </main>
  );
}

Login.propTypes = {
  history: PropTypes.func.isRequired,
};
