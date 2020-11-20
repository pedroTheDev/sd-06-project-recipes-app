import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import addLogin from '../actions';

class Login extends Component {
  constructor() {
    super();

    this.handleInput = this.handleInput.bind(this);
    this.sendToLocalStorage = this.sendToLocalStorage.bind(this);
    this.sendToRedux = this.sendToRedux.bind(this);

    this.state = {
      email: '',
      password: '',
      isValid: true,
    };
  }

  handleInput({ target: { name, value } }) {
    this.setState(({
      [name]: value,
    }), () => {
      const { email, password } = this.state;
      const TWO = 2;
      const SIX = 6;
      const verifyStr = email.split('@');
      const emailIsValid = verifyStr.length === TWO && verifyStr[1].endsWith('.com');

      if (emailIsValid && password.length > SIX) {
        this.setState({ isValid: false });
      } else {
        this.setState({ isValid: true });
      }
    });
  }

  sendToLocalStorage() {
    const { email } = this.state;
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
  }

  sendToRedux() {
    const { sendLogin, history } = this.props;
    const { email } = this.state;
    sendLogin(email);
    this.sendToLocalStorage();
    history.push('/comidas');
  }

  render() {
    const { email, password, isValid } = this.state;
    return (
      <div>
        <input
          name="email"
          data-testid="email-input"
          type="email"
          placeholder="Email"
          value={ email }
          onChange={ this.handleInput }
        />
        <input
          name="password"
          data-testid="password-input"
          type="password"
          placeholder="Password"
          value={ password }
          onChange={ this.handleInput }
        />
        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ isValid }
          onClick={ this.sendToRedux }
        >
          Submit
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendLogin: (email) => dispatch(addLogin(email)),
});

Login.propTypes = {
  sendLogin: PropTypes.func.isRequired,
  history: PropTypes.objectOf().isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
