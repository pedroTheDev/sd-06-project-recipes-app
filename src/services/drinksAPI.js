const URL_BASE = 'https://www.thecocktaildb.com/api/json/v1/1/';

// // type { g=glasses , c=categories, i=ingredients a=alcoholic}
export async function getAllDrinkTypesApi(type) {
  const response = await fetch(`${URL_BASE}list.php?${type}=list`);
  const result = await response.json();
  return result.drinks;
}

// Lista de receitas de Bebidas
export async function getRecipeDrinksMealsApi() {
  const response = await fetch(`${URL_BASE}search.php?s=`);
  const result = await response.json();
  return result.drinks;
}

export default { getAllDrinkTypesApi, getRecipeDrinksMealsApi };
