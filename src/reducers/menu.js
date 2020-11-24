import { DRINKS, MEALS, CURRENT_ID, FAVORITE_FOOD, FAVORITE_DRINK,
  RECIPE_FOOD, RECIPE_DRINK } from '../actions';

const INITIAL_STATE = {
  meals: [],
  drinks: [],
  currentID: '',
  doneRecipesFood: [],
  doneRecipesDrink: [],
  favFood: {
    isFavoriteFood: false,
    favoriteFood: [],
  },
  favDrink: {
    isFavoriteDrink: false,
    favoriteDrink: [],
  },
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case DRINKS:
    return {
      ...state, drinks: action.drink,
    };
  case RECIPE_FOOD:
    return {
      ...state,
      doneRecipesFood: state.doneRecipesFood.concat(action.recipe),
    };
  case RECIPE_DRINK:
    return {
      ...state,
      doneRecipesDrink: state.doneRecipesDrink.concat(action.recipe),
    };
  case MEALS:
    return {
      ...state, meals: action.meal,
    };
  case CURRENT_ID:
    return {
      ...state, currentID: action.id,
    };
  case FAVORITE_FOOD:
    return {
      ...state,
      favFood: {
        isFavoriteFood: action.fav,
        favoriteFood: state.favFood.favoriteFood.concat(action.food),
      },
    };
  case FAVORITE_DRINK:
    return {
      ...state,
      favDrink: {
        isFavoriteDrink: action.fav,
        favoriteDrink: state.favDrink.favoriteDrink.concat(action.drink),
      },
    };
  default:
    return state;
  }
}
