import { fetchMainPage, fetchNewSelectedCategory } from '../../services/fetchMainPage';
import apiDataProcessor from '../../services/apiDataProcessor';

export const LOADING = 'LOADING';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

function loading() {
  return { type: LOADING };
}

function success(data) {
  const processing = data.meals || data.drinks;
  let list = [];
  const doze = 12;
  const um = 1;
  const lengthLimit = processing.length > doze ? doze : processing.length;
  for (let i = 0; i < lengthLimit; i += um) {
    list.push(processing[i]);
  }
  list = list.map((recipe) => (apiDataProcessor(recipe)));
  return { type: SUCCESS, list };
}

function error(failed) {
  return { type: ERROR, error: failed };
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

export function newCategorySelectedThunk(category, foodOrDrink, currentCategory) {
  return (dispatch) => {
    dispatch(loading());
    return fetchNewSelectedCategory(category, foodOrDrink, currentCategory).then(
      (r) => dispatch(success(r)),
      (fail) => dispatch(error(fail)),
    );
  };
}
