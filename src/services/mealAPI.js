const MEAL_API = 'https://www.themealdb.com/api/json/v1/1/';
// Endpoints
/* const listCategoriesEndpoint = 'list.php?c=list';
const randomRequestEndpoint = 'random.php'; */

const endpoints = {
  ingredient: 'filter.php?i=',
  name: 'search.php?s=',
  firstLetter: 'search.php?f=',
  lookupIngredient: 'lookup.php?i=',
};

async function fetchMeal(type, key) {
  key = key === 'firstLetter' ? key[0] : key;
  const url = `${MEAL_API}${endpoints[type]}${key}`;
  const result = await fetch(url);
  const data = await result.json();
  return data;
}

export default fetchMeal;
