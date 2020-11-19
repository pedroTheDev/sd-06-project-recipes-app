import React, { useState } from 'react';
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
  console.log('isDisable', state.isDisable, 'password', state.password, 'email', state.email);
  const { password, email } = state;

  // const mealEndPoint = 'https://www.themealdb.com/api.php';
  // const cocktailsEndPoint = 'https://www.thecocktaildb.com/api.php';

  // const fetch = async (endPoint) => {
  //   const APIdata = await fetch(endPoint);
  //   const response = await APIdata.json();
  //   console.log(response);
  // };

  // useEffect(() => {
  //   const fetchApi = async () => {
  //     await fetch(mealEndPoint);
  //   };
  //   fetchApi();
  // },
  // []);
  const validateLogin = () => {
    const NUM_PASSWORD = 6;

    // setState({
    //   ...state,
    //   isDisable:
    //   !((/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    //     .test(email))
    //   && password.length > NUM_PASSWORD),
    // });
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    console.log('emailTest', validEmail);
    console.log('passwordTest', password.length > NUM_PASSWORD);
    setState({ isDisabled: !(password.length > NUM_PASSWORD && validEmail) });
  };

  const handleChange = ({ target }) => {
    setState({ ...state, [state[target.name]]: target.value });
    validateLogin();
  };

  const sendEmail = () => {
    const {
      dispatchEmail, history,
    } = props;
    dispatchEmail(email);
    history.push('/jogo');
  };

  const render = () => {
    const { isDisable } = state;
    return (
      <div>
        <form>
          <label htmlFor="input-gravatar-email">
            <input
              type="email"
              placeholder="email"
              name="email"
              value={email}
              data-testid="email-input"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="input-player-name">
            <input
              type="password"
              placeholder="Senha"
              name="password"
              value={password}
              data-testid="password-input"
              onChange={handleChange}
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={isDisable}
            onClick={sendEmail}
          >
            Jogar
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
