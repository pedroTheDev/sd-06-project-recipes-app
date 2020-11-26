import { ADD_RECIPES, CHANGE_FETCH, SEND_DATA } from '../actions/searchRecipes';

const initialState = {
  recipes: {

    meals: [],
    drinks: [],
  },
  isFetchin: false,
  data: {
    inputText: '',
    radioSearchSelection: 'ingredients',
  },

};

export default function searchRecipesReducer(state = initialState, action) {
  switch (action.type) {
  case ADD_RECIPES:
    console.log(action.recipes, 'action recipes');
    return {
      ...state, recipes: action.recipes,
    };
  case CHANGE_FETCH:
    return {
      ...state, isFetchin: action.fetch,
    };
  case SEND_DATA:
    return {
      ...state, data: action.data,
    };
  default:
    return state;
  }
}
