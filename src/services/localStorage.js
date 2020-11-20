export function mealsToken(token) {
  const temp = localStorage.getItem('meals_token');
  localStorage.setItem('meals_token', token);
  return temp;
}

export function cocktailsToken(token) {
  const temp = localStorage.getItem('cocktails_token');
  localStorage.setItem('cocktails_token', token);
  return temp;
}

export function user(email) {
  const obj = { email };
  const temp = JSON.parse(localStorage.getItem('email'));
  localStorage.setItem('email', JSON.stringify(obj));
  return temp;
}

export function doneRecipes(object) {
  const obj = {
    id: object.id,
    type: object.type,
    area: object.strArea,
    category: object.strCategory,
    alcoholicOrNot: object.alcoholic,
    name: object.name,
    image: object.image,
    doneDate: object.doneDate,
    tags: object.tags,
  };
  const temp = JSON.parse(localStorage.getItem('done_recipes'));
  localStorage.setItem('done_recipes', JSON.stringify(obj));
  return temp;
}

export function favoriteRecipes(object) {
  const obj = {
    id: object.id,
    type: object.type,
    area: object.strArea,
    category: object.strCategory,
    alcoholicOrNot: object.alcoholic,
    name: object.name,
    image: object.image,
  };
  const temp = JSON.parse(localStorage.getItem('favorite_recipes'));
  localStorage.setItem('favorite_recipes', JSON.stringify(obj));
  return temp;
}

export function createRecipesProgress() {
  const obj = {
    cocktails: {},
    meals: {},
  };
  localStorage.setItem('in_progress_recipes', JSON.stringify(obj));
}

export function getInProgressRecipes() {
  const temp = JSON.parse(localStorage.getItem('in_progress_recipes'));
  return temp;
}

export function addCocktailIngredient(cocktailID, ingredientID) {
  let obj = JSON.parse(localStorage.getItem('in_progress_recipes'));
  if (!obj.cocktails[cocktailID]) {
    const temp = { [cocktailID]: [ingredientID] };
    obj = {
      cocktails: { ...obj.cocktails, ...temp },
      meals: { ...obj.meals },
    };
  } else {
    obj.cocktails[cocktailID].push(ingredientID);
  }
  localStorage.setItem('in_progress_recipes', JSON.stringify(obj));
}

export function addMealIngredient(mealID, ingredientID) {
  let obj = JSON.parse(localStorage.getItem('in_progress_recipes'));
  if (!obj.meals[mealID]) {
    const temp = { [mealID]: [ingredientID] };
    obj = {
      cocktails: { ...obj.cocktails },
      meals: { ...obj.meals, ...temp },
    };
  } else {
    obj.meals[mealID].push(ingredientID);
  }
  localStorage.setItem('in_progress_recipes', JSON.stringify(obj));
}
