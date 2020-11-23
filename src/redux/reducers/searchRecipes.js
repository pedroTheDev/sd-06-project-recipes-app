import { ADD_RECIPES } from '../actions/searchRecipes';

const initialState = {
  recipes: { type: '', results: [''] },
};

export default function searchRecipesReducer(state = initialState, action) {
  switch (action.type) {
  case ADD_RECIPES:
    return {
      ...state, recipes: action.recipes,
    };
  default:
    return state;
  }
}
