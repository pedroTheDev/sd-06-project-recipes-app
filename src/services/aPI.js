export async function searchFood(food, radioButton) {
  const URL = 'https://www.themealdb.com/api/json/v1/1/';
  let endpoint = '';
  if (radioButton === 'ingrediente') endpoint = `filter.php?i=${food}`;
  else if (radioButton === 'nome') endpoint = `search.php?s=${food}`;
  else if (radioButton === 'primeira-letra') endpoint = `search.php?f=${food}`;

  const response = await fetch(`${URL}${endpoint}`);
  const json = response.json();

  return json;
}

export async function searchDrink(drink, radioButton) {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/';
  let endpoint = '';
  if (radioButton === 'ingrediente') endpoint = `filter.php?i=${drink}`;
  else if (radioButton === 'nome') endpoint = `search.php?s=${drink}`;
  else if (radioButton === 'primeira-letra') endpoint = `search.php?f=${drink}`;

  const response = await fetch(`${URL}${endpoint}`);
  const json = response.json();

  return json;
}

export async function showAllFoodsCategories() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/categories.php';

  const response = await fetch(`${URL}`);
  const json = response.json();

  return json;
}

// export async function showAllDrinksCategories() {
//   const URL = 'https://www.themealdb.com/api/json/v1/1/categories.php';

//   const response = await fetch(`${URL}`);
//   const json = response.json();

//   return json;
// }
