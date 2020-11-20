const MEAL_API = 'https://www.themealdb.com/api/json/v1/1/';

// Endpoints
const filterByIngredientEndpoint = 'filter.php?i=';
const searchByNameEndpoint = 'search.php?s=';
const searchByFirstLetterEndpoint = 'search.php?f=';
const listCategoriesEndpoint = 'list.php?c=list';
const requestRecipeEndpoint = 'lookup.php?i=';
const randomRequestEndpoint = 'random.php';

export async function filterByIngredient(key) {
  const url = `${MEAL_API}${filterByIngredientEndpoint}${key}`;
  const result = await fetch(url);
  const data = await result.json();
  return data;
}

export async function searchByName(key) {
  const url = `${MEAL_API}${searchByNameEndpoint}${key}`;
  const result = await fetch(url);
  const data = await result.json();
  return data;
}

export async function searchByFirstLetter(key) {
  const url = `${MEAL_API}${searchByFirstLetterEndpoint}${key}`;
  const result = await fetch(url);
  const data = await result.json();
  return data;
}

export async function listCategories() {
  const url = `${MEAL_API}${listCategoriesEndpoint}`;
  const result = await fetch(url);
  const data = await result.json();
  return data;
}

export async function requestRecipe(key) {
  const url = `${MEAL_API}${requestRecipeEndpoint}${key}`;
  const result = await fetch(url);
  const data = await result.json();
  return data;
}

export async function randomRequest() {
  const url = `${MEAL_API}${randomRequestEndpoint}`;
  const result = await fetch(url);
  const data = await result.json();
  return data;
}
