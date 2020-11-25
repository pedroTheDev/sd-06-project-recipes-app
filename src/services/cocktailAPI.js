const COCKTAIL_API = 'https://www.thecocktaildb.com/api/json/v1/1/';

// Endpoints
const listCategoriesEndpoint = 'list.php?c=list';
const requestRecipeEndpoint = 'lookup.php?i=';
const randomRequestEndpoint = 'random.php';

const endpoints = {
  ingredient: 'filter.php?i=',
  name: 'search.php?s=',
  firstLetter: 'search.php?f=',
};

export async function fetchDrink(type, key) {
  const url = `${COCKTAIL_API}${endpoints[type]}${key}`;
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
