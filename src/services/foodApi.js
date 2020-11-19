const baseURL = 'https://www.themealdb.com/api/json/v1';
// const searchBase = 'search.php?';

const NAME_KEY = 'search.php?s'; // search bar
const FIRST_LETTER_KEY = 'search.php?f'; // search bar
const FILTER_INGREDIENTS_KEY = 'filter.php?i'; // search bar
const FILTER_CATEGORIES_KEY = 'filter.php?c';

// const ID_KEY = 'lookup.php?i';
// const INGREDIENTS_KEY = 'i';
// const AREA_KEY = 'f';

const CATEGORIES_KEY_VALUE = 'list.php?c=list';
// const AREA_KEY_VALUE = 'list.php?a=list';
// const INGREDIENTS_KEY_VALUE = 'list.php?i=list';

export const searchOptions = {
  name: NAME_KEY,
  first_letter: FIRST_LETTER_KEY,
  ingredients: FILTER_INGREDIENTS_KEY,
};

export async function fetchMealsSearch({ option, value, token }) {
  const searchKey = searchOptions[option];
  const urlToFetch = `${baseURL}/${token}/${searchKey}=${value}`;

  const data = await fetch(urlToFetch);
  const { meals } = await data.json();

  return meals;
}

export async function fetchFoodsCategories(token) {
  const urlToFetch = `${baseURL}/${token}/${CATEGORIES_KEY_VALUE}`;

  const data = await fetch(urlToFetch);
  const { meals } = await data.json();

  const CATEGORY_LIMIT = 5;
  const categories = meals
    .filter((_, index) => index < CATEGORY_LIMIT)
    .map((category) => category.strCategory);

  return categories;
}

export async function fetchMealsByCategory(category, token) {
  const urlToFetch = `${baseURL}/${token}/${FILTER_CATEGORIES_KEY}=${category}`;

  const data = await fetch(urlToFetch);
  const { meals } = await data.json();

  return meals;
}
