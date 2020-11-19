import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleChanges = this.handleChanges.bind(this);

    this.state = {
      email: '',
      password: '',
      isValid: false,
    };
  }

  handleChanges({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => {
      this.validateInputs();
    });
  }

  handleClick() {
    localStorage.setItem('mealsToken', 1);
  }

  validateInputs() {
    const { email, password } = this.state;
    const EMAIL_REGEX = RegExp(/^[\w-.]+@(([\w-]+.)+[\w-]{2,4})$/g).test(email);
    const PASS_VALIDATION = 6;
    this.setState({
      isValid: EMAIL_REGEX && password.length >= PASS_VALIDATION,
    });
  }

  render() {
    const { isValid } = this.state;

    return (
      <section>
        <h1>Login</h1>
        <LoginForm
          handleChanges={this.handleChanges}
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          onClick={console.log('oi')}
          disabled={!isValid}
        >
          Entrar
        </button>
      </section>
    );
  }
}

export default Login;
