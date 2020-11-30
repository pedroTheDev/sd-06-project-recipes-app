export function mealsToken(token) {
  const temp = localStorage.getItem('mealsToken');
  localStorage.setItem('mealsToken', token);
  return temp;
}

export function cocktailsToken(token) {
  const temp = localStorage.getItem('cocktailsToken');
  localStorage.setItem('cocktailsToken', token);
  return temp;
}

export function getValue(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setValue(value) {
  return localStorage.setItem(JSON.stringify({ user: { email: value } }));
}

export function setValueUser(key, value) {
  return localStorage.setItem(key, JSON.stringify({ email: value }));
}

export function addDoneRecipe(object) {
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
  temp.push(obj);
  localStorage.setItem('done_recipes', JSON.stringify(temp));
}

export function getDoneRecipes() {
  const temp = JSON.parse(localStorage.getItem('done_recipes'));
  return temp;
}

export function addFavoriteRecipe(object) {
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
  temp.push(obj);
  localStorage.setItem('favorite_recipes', JSON.stringify(temp));
}

export function setFavoriteRecipes(key, value) {
  return localStorage.setItem(key, JSON.stringify({ favoriteRecipes: value }));
}

export function getFavoriteRecipes() {
  const temp = JSON.parse(localStorage.getItem('favorite_recipes'));
  return temp;
}

export function createRecipesProgress() {
  let obj = {
    cocktails: {},
    meals: {},
  };
  obj = JSON.parse(localStorage.getItem(''));
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
