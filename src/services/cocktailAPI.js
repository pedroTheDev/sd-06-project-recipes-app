const COCKTAIL_API = 'https://www.thecocktaildb.com/api/json/v1/1/';

// Endpoints
const filterByIngredientEndpoint = 'filter.php?i=';
const filterByCategoryEndpoint = 'filter.php?c=';
const searchByNameEndpoint = 'search.php?s=';
const searchByFirstLetterEndpoint = 'search.php?f=';
const listCategoriesEndpoint = 'list.php?c=list';
const requestRecipeEndpoint = 'lookup.php?i=';
const randomRequestEndpoint = 'random.php';

export async function filterByIngredient(key) {
  const url = `${COCKTAIL_API}${filterByIngredientEndpoint}${key}`;
  const result = await fetch(url);
  const data = await result.json();
  return data;
}

export async function searchByName(key) {
  const url = `${COCKTAIL_API}${searchByNameEndpoint}${key}`;
  const result = await fetch(url);
  const data = await result.json();
  return data;
}

export async function searchByFirstLetter(key) {
  const url = `${COCKTAIL_API}${searchByFirstLetterEndpoint}${key}`;
  const result = await fetch(url);
  const data = await result.json();
  return data;
}

export async function listCategories() {
  const url = `${COCKTAIL_API}${listCategoriesEndpoint}`;
  const result = await fetch(url);
  const data = await result.json();
  return data;
}

export async function requestRecipe(key) {
  const url = `${COCKTAIL_API}${requestRecipeEndpoint}${key}`;
  const result = await fetch(url);
  const data = await result.json();
  return data;
}

export async function randomRequest() {
  const url = `${COCKTAIL_API}${randomRequestEndpoint}`;
  const result = await fetch(url);
  const data = await result.json();
  return data;
}

export async function filterByCategory(key) {
  const url = `${COCKTAIL_API}${filterByCategoryEndpoint}${key}`;
  const result = await fetch(url);
  const data = await result.json();
  return data;
}
