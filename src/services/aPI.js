export async function searchDrinkIngredients(ingredient) {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

  const response = await fetch(`${URL}${ingredient}`);
  const json = response.json();
  console.log(json);
  return json;
}

export async function searchDrinkName(name) {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const response = await fetch(`${URL}${name}`);
  const json = response.json();
  console.log(json);
  return json;
}

export async function searchDrinkFirstLetter(letter) {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

  const response = await fetch(`${URL}${letter}`);
  const json = response.json();
  return json;
}

export async function searchFoodIngredients(ingredient) {
  const URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

  const response = await fetch(`${URL}${ingredient}`);
  const json = response.json();
  console.log(json);
  return json;
}

export async function searchFoodName(name) {
  const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  const response = await fetch(`${URL}${name}`);
  const json = response.json();
  console.log(json);
  return json;
}
