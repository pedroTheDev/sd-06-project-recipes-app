const url = 'https://www.themealdb.com/api/json/v1/1';
const drinksUrl = 'https://www.thecocktaildb.com/api/json/v1/1';

export async function requestIngredients(info) {
  const resolve = await fetch(`${url}/filter.php?i=${info}`);
  const result = await resolve.json();
  return result;
}

export async function requestName(info) {
  const resolve = await fetch(`${url}/search.php?s=${info}`);
  const result = await resolve.json();
  return result;
}

export async function requestFirstLetter(info) {
  const resolve = await fetch(`${url}/search.php?f=${info}`);
  const result = await resolve.json();
  return result;
}

export async function requestDrinksIngredients(info) {
  const resolve = await fetch(`${drinksUrl}/filter.php?i=${info}`);
  const result = await resolve.json();
  return result;
}

export async function requestDrinksName(info) {
  const resolve = await fetch(`${drinksUrl}/search.php?s=${info}`);
  const result = await resolve.json();
  return result;
}

export async function requestDrinksFirstLetter(info) {
  const resolve = await fetch(`${drinksUrl}/search.php?f=${info}`);
  const result = await resolve.json();
  return result;
}
