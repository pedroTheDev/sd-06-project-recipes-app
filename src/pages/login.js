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
    const { history } = this.props;
    this.setState(({
      [name]: value,
    }), () => {
      const { email, password } = this.state;
      const emailIsValid = /^((?!.)[\w-_.]*[^.])(@\w+)(.\w+(.\w+)?[^.\W])$/.test(email);

      if (emailIsValid && password.length >= 6) {
        console.log(emailIsValid);
        this.setState({ isValid: false });
        history.push('/comidas');
      } else {
        this.setState({ isValid: true });
      }
    });
  }

  sendToLocalStorage() {
    const { email } = this.state;
    localStorage.setItem('user', JSON.stringify({ email }));
  }

  sendToRedux() {
    const { sendLogin } = this.props;
    const { email } = this.state;
    sendLogin(email);
  }

  // /^((?!.)[\w-_.]*[^.])(@\w+)(.\w+(.\w+)?[^.\W])$/

  render() {
    const { email, password, isValid } = this.state;
    return (
      <div>
        <input
          name="email"
          data-test-id="email-input"
          type="email"
          placeholder="Email"
          value={ email }
          onChange={ this.handleInput }
        />
        <input
          name="password"
          data-test-id="password-input"
          type="password"
          placeholder="Password"
          value={ password }
          onChange={ this.handleInput }
        />
        <button
          data-test-id="login-submit-btn"
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
