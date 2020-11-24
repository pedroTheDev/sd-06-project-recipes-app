const URL_BASE = 'https://www.thecocktaildb.com/api/json/v1/1/';

// // type { g=glasses , c=categories, i=ingredients a=alcoholic}
export async function getAllDrinkTypesApi(type) {
  const response = await fetch(`${URL_BASE}list.php?${type}=list`);
  const result = await response.json();
  return result.drinks;
}

export async function getFilteredDrinksApi(type, value) {
  if (type === 'ingredients') {
    const response = await fetch(`${URL_BASE}filter.php?i=${value}`);
    const result = await response.json();
    console.log(result.drinks);
    return result.drinks;
  }
  if (type === 'name') {
    const response = await fetch(`${URL_BASE}search.php?s=${value}`);
    const result = await response.json();
    console.log(result.drinks);
    return result.drinks;
  }
  if (type === 'first') {
    const response = await fetch(`${URL_BASE}search.php?f=${value}`);
    const result = await response.json();
    console.log(result.drinks);
    return result.drinks;
  }
  return [];
}

export default { getAllDrinkTypesApi, getFilteredDrinksApi };
