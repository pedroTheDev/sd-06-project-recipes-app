// import triviaAPI from '../services/triviaAPI';

export const USER_INFO = 'USER_INFO';

export const UserInfo = (email, password) => ({
  type: USER_INFO,
  email,
  password,
});
