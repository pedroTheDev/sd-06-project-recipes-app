const INITAL_STATE = { email: '' };

function userLogin(state = INITAL_STATE, { type, email }) {
  switch (type) {
  case 'ADD_LOGIN':
    return { ...state, email };
  default:
    return state;
  }
}

export default userLogin;
