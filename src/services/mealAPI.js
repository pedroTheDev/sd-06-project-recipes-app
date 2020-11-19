const MEAL_API = 'https://www.themealdb.com/api/json/v1/1/';

// Endpoints
const filterByIngredientEndpoint = 'filter.php?i=';
const searchByNameEndpoint = 'search.php?s=';
const searchByFirstLetterEndpoint = 'search.php?f=';

export default async function mealAPI(type, key) {
  let url = '';
  switch (type) {
    case 'ingredient':
      url = `${MEAL_API}${filterByIngredientEndpoint}${key}`;
      break;
    case 'search':
      url = `${MEAL_API}${searchByNameEndpoint}${key}`;
      break;
    case 'firstLetter':
      url = `${MEAL_API}${searchByFirstLetterEndpoint}${key}`;
      break;
    default:
      return null;
  }

  const data = await fetch(url);
  return data;
}
