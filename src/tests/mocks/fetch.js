import meals from './meals';
import mealCategories from './mealCategories';
import drinks from './drinks';

const mockFetch = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
      return Promise.resolve(mealCategories);
    }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
      return Promise.resolve(drinks);
    }

    return Promise.resolve(meals);
  },
});

export default mockFetch;
