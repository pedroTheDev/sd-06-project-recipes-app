const urlFood = 'https://www.themealdb.com/api/json/v1/1/';

async function randomRequestApiFood(urlParameter) {
  const url = `${urlFood}${urlParameter}`;
  const objFilter = await fetch(url).then((apiFood) => apiFood.json());
  const arrayFilterFoods = objFilter.meals;
  console.log('arrayFilterFoods', arrayFilterFoods);
  return arrayFilterFoods;
}

export async function requestApiFoodIngredient(ingredient) {
  return randomRequestApiFood(`filter.php?i=${ingredient}`);
}
// https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast

export async function requestApiFoodName(name) {
  return randomRequestApiFood(`search.php?s=${name}`);
}
// https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

export async function requestApiFoodFirstLetter(firstLetter) {
  return randomRequestApiFood(`search.php?f=${firstLetter}`);
}

export async function requestApiFoodDetails(id) {
  return randomRequestApiFood(`lookup.php?i=${id}`);
}
