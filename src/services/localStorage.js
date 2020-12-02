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

export function treatRecipe(recipe) {
  let treatedRecipe = {};
  if ('idMeal' in recipe) {
    treatedRecipe = {
      id: recipe.idMeal,
      type: 'meal',
      area: recipe.strArea,
      category: recipe.strCategory,
      name: recipe.strMeal,
      image: recipe.strMealThumb,
      instructions: recipe.strInstructions,
      tags: recipe.strTags,
      video: recipe.strYoutube,
      source: recipe.strSource,
    };
  } else if ('idDrink' in recipe) {
    treatedRecipe = {
      id: recipe.idDrink,
      type: 'drink',
      category: recipe.strCategory,
      alcoholic: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
      tags: recipe.strTags,
      video: recipe.strVideo,
      glass: recipe.strGlass,
      instructions: recipe.strInstructions,
    };
  }

  return treatedRecipe;
}

export function convertTreatedRecipe(recipe) {
  let convertedRecipe = {};
  if (recipe.type === 'meal') {
    convertedRecipe = {
      idMeal: recipe.id,
      strArea: recipe.area,
      strCategory: recipe.category,
      strMeal: recipe.name,
      strMealThumb: recipe.image,
      strInstructions: recipe.instructions,
      strTags: recipe.tags,
      strYoutube: recipe.strYoutube,
      strSource: recipe.source,
    };
  } else if (recipe.type === 'drink') {
    convertedRecipe = {
      idDrink: recipe.id,
      strCategory: recipe.category,
      strAlcoholic: recipe.alcoholic,
      strDrink: recipe.name,
      strDrinkThumb: recipe.image,
      strTags: recipe.tags,
      strVideo: recipe.video,
      strGlass: recipe.glass,
      strInstructions: recipe.instructions,
    };
  }

  return convertedRecipe;
}

export function getDoneRecipes() {
  const recipes = JSON.parse(localStorage.getItem('done_recipes'));
  return recipes;
}

export function addDoneRecipe(recipe) {
  const two = 2;
  const today = new Date();
  const day = String(today.getDate()).padStart(two, '0');
  const month = String(today.getMonth() + 1).padStart(two, '0');
  const year = today.getFullYear();
  const date = `${day}/${month}/${year}`;
  recipe = treatRecipe(recipe);
  recipe.doneDate = date;
  const temp = getDoneRecipes();
  temp.push(recipe);
  localStorage.setItem('done_recipes', JSON.stringify(temp));
}

function createFavoriteRecipesDatabase() {
  const recipes = [];
  localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
}

function updateFavoriteRecipes(recipes) {
  localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
}

function checkFavoriteRecipesDatabase() {
  const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!recipes) createFavoriteRecipesDatabase();
}

export function getFavoriteRecipes() {
  checkFavoriteRecipesDatabase();
  const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  return recipes;
}

export function recipeIsFavorite(recipe) {
  checkFavoriteRecipesDatabase();
  const recipes = getFavoriteRecipes();
  if (!('type' in recipe)) recipe = treatRecipe(recipe);
  const match = recipes.find((item) => item.id === recipe.id);
  if (match) return true;
  return false;
}

export function favoriteRecipe(recipe) {
  checkFavoriteRecipesDatabase();
  if (!('type' in recipe)) recipe = treatRecipe(recipe);
  if (recipe.type === 'drink') recipe.category = recipe.alcoholic;
  const temp = getFavoriteRecipes();
  let recipeIndex;
  if (!temp.length < 1) recipeIndex = temp.findIndex((item) => item.id === recipe.id);
  const minusOne = -1;
  if (recipeIndex > minusOne) temp.splice(recipeIndex, 1);
  else temp.push(recipe);
  updateFavoriteRecipes(temp);
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
