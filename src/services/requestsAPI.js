const url = 'https://www.themealdb.com/api/json/v1/1';

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
