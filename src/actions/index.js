export const USER_INFO = 'USER_INFO';
export const DRINKS = 'DRINKS';
export const MEALS = 'MEALS';
export const CURRENT_ID = 'CURRENT_ID';
export const FAVORITE_FOOD = 'FAVORITE_FOOD';
export const FAVORITE_DRINK = 'FAVORITE_DRINK';
export const RECIPE_FOOD = 'RECIPE_FOOD';
export const RECIPE_DRINK = 'RECIPE_DRINK';

export const UserInfo = (email, password) => ({
  type: USER_INFO,
  email,
  password,
});

export const comida = (meal) => ({
  type: MEALS,
  meal,
});

export const doneRecipesFood = (recipe) => ({
  type: RECIPE_FOOD,
  recipe,
});

export const doneRecipesDrink = (recipe) => ({
  type: RECIPE_DRINK,
  recipe,
});

export const bebida = (drink) => ({
  type: DRINKS,
  drink,
});

export const currentID = (id) => ({
  type: CURRENT_ID,
  id,
});

export const favRecipeFood = (fav, food) => ({
  type: FAVORITE_FOOD,
  fav,
  food,
});

export const favRecipeDrink = (fav, drink) => ({
  type: FAVORITE_FOOD,
  fav,
  drink,
});
