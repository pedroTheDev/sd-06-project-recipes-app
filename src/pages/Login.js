import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions/LoginActions';

function Login(props) {
  // const [passWord, setPassword] = useState('');
  // const [email, setEmail] = useState('');
  // const [isDisable, setIsDisable] = useState(true);
  const [state, setState] = useState({
    password: '',
    email: '',
    isDisable: true,
  });
  const { password, email } = state;

  // const mealEndPoint = 'https://www.themealdb.com/api.php';

  // const fetch = async (endPoint) => {
  //   const APIdata = await fetch(endPoint);
  //   const response = await APIdata.json();
  //   console.log('response', response);
  // };

  // useEffect(() => {
  //   async function fetchApi() {
  //     fetch(mealEndPoint);
  //   }
  //   fetchApi();
  // },
  // []);

  const validateLogin = () => {
    const NUM_PASSWORD = 6;

    setState({
      ...state,
      isDisable:
      !((/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        .test(email))
      && password.length > NUM_PASSWORD),
    });
  };

  useEffect(() => validateLogin(), [state.email, state.password]);

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const setLocalStorageData = () => {
    localStorage.setItem('mealToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email: state.email }));
  };

  const handleSubmit = () => {
    const {
      dispatchEmail, history,
    } = props;
    dispatchEmail(email);
    setLocalStorageData();
    history.push('/jogo');
  };

  const render = () => {
    const { isDisable } = state;
    return (
      <div>
        <form>
          <label htmlFor="input-gravatar-email">
            <input
              type="text"
              placeholder="email"
              name="email"
              value={ email }
              data-testid="email-input"
              onChange={ (e) => handleChange(e) }
            />
          </label>
          <label htmlFor="input-player-name">
            <input
              type="text"
              placeholder="Senha"
              name="password"
              value={ password }
              data-testid="password-input"
              onChange={ (e) => handleChange(e) }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ isDisable }
            onClick={ () => handleSubmit() }
          >
            Entrar
          </button>
          {/* <Link to="/configuracoes">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Configurações
            </button>
          </Link> */}
        </form>
      </div>
    );
  };

  return render();
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (email) => dispatch(addEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
