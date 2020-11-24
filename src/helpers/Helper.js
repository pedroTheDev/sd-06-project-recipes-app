export async function fetchMealRecipe(id) {
  const dataJson = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await dataJson.json();
  return data;
}

export async function fetchCategories(type) {
  const api = (type === 'comidas')
    ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  const dataJson = await fetch(api);
  const data = await dataJson.json();

  const firstCategory = 0;
  const maxCategories = 5;

  const slicedResults = (type === 'comidas')
    ? data.meals.slice(firstCategory, maxCategories)
    : data.drinks.slice(firstCategory, maxCategories);

  return slicedResults;
}
