const URL_BASE = 'https://www.themealdb.com/api/json/v1/1/';

// type { a=areas , c=categories, i=ingredients }
export async function getAllRecipeTypesApi(type) {
  const response = await fetch(`${URL_BASE}list.php?${type}=list`);
  const result = await response.json();
  return result.meals;
}

// Lista de receitas de comidas filtradas
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
    return result.meals;
  }
  if (type === 'first') {
    const response = await fetch(`${URL_BASE}search.php?f=${value}`);
    const result = await response.json();
    return result.meals;
  }
  return [];
}

// Lista de receitas de comidas
export async function getRecipesMealsApi() {
  const response = await fetch(`${URL_BASE}search.php?s=`);
  const result = await response.json();
  return result.meals;
}

// Lista de receitas de comidas por categoria
export async function getRecipesMealsByCategoryApi(category) {
  const response = await fetch(`${URL_BASE}filter.php?c=${category}`);
  const result = await response.json();
  return result.meals;
}

// Lista de receitas de comidas por categoria
export async function getRecipeMealByIdApi(id) {
  const response = await fetch(`${URL_BASE}lookup.php?i=${id}`);
  const result = await response.json();
  return result.meals;
}

// Lista de receitas de comidas por igredientes aleatorios
export async function getRecipesMealsByRandomIngredients() {
  const response = await fetch(`${URL_BASE}random.php`);
  const result = await response.json();
  return result.meals;
}

export default {
  getAllRecipeTypesApi,
  getRecipesMealsApi,
  getRecipesMealsByCategoryApi,
  getRecipeMealByIdApi,
  getFilteredRecipesApi,
  getRecipesMealsByRandomIngredients,
};
