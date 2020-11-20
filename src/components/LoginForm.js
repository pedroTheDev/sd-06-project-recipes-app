import React from 'react';
import PropTypes from 'prop-types';

function LoginForm({ handleChanges }) {
  return (
    <form>
      <label htmlFor="email-input">
        Email:
        <input
          id="email-input"
          type="email"
          data-testid="email-input"
          name="email"
          onChange={ (e) => handleChanges(e) }
        />
      </label>
      <label htmlFor="password-input">
        Senha:
        <input
          id="password-input"
          type="password"
          data-testid="password-input"
          name="password"
          onChange={ (e) => handleChanges(e) }
        />
      </label>
    </form>
  );
}

LoginForm.propTypes = {
  handleChanges: PropTypes.func.isRequired,
};

export default LoginForm;
