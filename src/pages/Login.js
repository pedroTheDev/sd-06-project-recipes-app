import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleChanges = this.handleChanges.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

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

  
  validateInputs() {
    const { email, password } = this.state;
    const EMAIL_REGEX = RegExp(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/).test(email);
    const PASS_VALIDATION = 7;
    this.setState({
      isValid: EMAIL_REGEX && password.length >= PASS_VALIDATION,
    });
  }
  
  handleSubmit() {
    const { email } = this.state;
    const { history } = this.props;
    const user = {
      email
    }
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(user));
    history.push('/comidas');
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
          onClick={this.handleSubmit}
          disabled={!isValid}
        >
          Entrar
        </button>
      </section>
    );
  }
}

export default Login;
