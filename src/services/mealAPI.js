const MEAL_API = 'https://www.themealdb.com/api/json/v1/1/';

// Endpoints
const filterByIngredientEndpoint = 'filter.php?i=';
const searchByNameEndpoint = 'search.php?s=';
const searchByFirstLetterEndpoint = 'search.php?f=';
const listCategoriesEndpoint = 'list.php?c=list';
const requestRecipeEndpoint = 'lookup.php?i=';
const randomRequestEndpoint = 'random.php';

export default async function mealAPI(type, key = '') {
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
    case 'listCategories':
      url = `${MEAL_API}${listCategoriesEndpoint}`;
      break;
    case 'recipe':
      url = `${MEAL_API}${requestRecipeEndpoint}${key}`;
      break;
    case 'random':
      url = `${MEAL_API}${randomRequestEndpoint}`;
      break;
    default:
      return null;
  }

  const data = await fetch(url);
  return data;
}
