import { fetchMainPage, fetchNewSelectedCategory } from '../../services/fetchMainPage';
import apiDataProcessor from '../../services/apiDataProcessor';
import fetchMealAPI from '../../services/apiDataProcessor';
import { fetchDrinkAPI } from '../../services/searchAPI';

export const LOADING = 'LOADING';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

function loading() {
  return { type: LOADING };
}

export function success(data) {
  const processing = data.meals || data.drinks;
  let list = [];
  if (processing) {
    const maxLength = 12;
    const increment = 1;
    const zero = 0;
    const lengthLimit = processing.length > maxLength ? maxLength : processing.length;
    for (let i = zero; i < lengthLimit; i += increment) {
      list.push(processing[i]);
    }
    list = list.map((recipe) => (apiDataProcessor(recipe)));
  } else {
    list = null;
  }
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

export function redirectToIngredientThunk(ingredient, option, pathname) {
  if (pathname) {
    return (dispatch) => {
      dispatch(loading());
      return fetchMealAPI(option, ingredient).then(
        (r) => dispatch(success(r)),
        (fail) => dispatch(error(fail)),
      );
    };
  }

  return (dispatch) => {
    dispatch(loading());
    return fetchDrinkAPI(option, ingredient).then(
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
