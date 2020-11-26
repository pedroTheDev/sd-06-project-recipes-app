export const ADD_RECIPES = 'ADD_RECIPES';
export const CHANGE_FETCH = 'CHANGE_FETCH';
export const SEND_DATA = 'SEND_DATA';

export const addRecipes = (recipes) => ({
  type: ADD_RECIPES,
  recipes,
});

export const changeIsFetchin = (isFetchin) => ({
  type: CHANGE_FETCH,
  fetch: isFetchin,
});

export const sendData = (data) => ({
  type: SEND_DATA,
  data,
});
