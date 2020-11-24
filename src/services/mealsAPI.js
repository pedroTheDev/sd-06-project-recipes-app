const URL_BASE = 'https://www.themealdb.com/api/json/v1/1/';

// type { a=areas , c=categories, i=ingredients }
export async function getAllRecipeTypesApi(type) {
  const response = await fetch(`${URL_BASE}list.php?${type}=list`);
  const result = await response.json();
  return result.meals;
}

export async function getFilteredRecipesApi(type, value) {
  if (type === 'ingredients') {
    const response = await fetch(`${URL_BASE}filter.php?i=${value}`);
    const result = await response.json();
    console.log(result.meals);
    return result.meals;
  }
  if (type === 'name') {
    const response = await fetch(`${URL_BASE}search.php?s=${value}`);
    const result = await response.json();
    console.log(result.meals);
    return result.meals;
  }
  if (type === 'first') {
    const response = await fetch(`${URL_BASE}search.php?f=${value}`);
    const result = await response.json();
    console.log(result.meals);
    return result.meals;
  }
  return [];
}

export default { getAllRecipeTypesApi, getFilteredRecipesApi };
