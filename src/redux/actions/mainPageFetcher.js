import fetchMainPage from '../../services/fetchMainPage';

export const LOADING = 'LOADING';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

function loading() {
  return { type: LOADING };
}

function success(data) {
  return { type: SUCCESS, data };
}

function error(error) {
  return { type: ERROR, error };
}

export function fetcherThunk(foodOrDrink) {
  return (dispatch) => {
    dispatch(loading());
    return fetchMainPage(foodOrDrink).then(
      (r) => dispatch(success(r)),
      (fail) => dispatch(error(fail)),
    );
  };
}