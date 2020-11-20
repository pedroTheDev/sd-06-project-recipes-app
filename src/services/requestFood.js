const urlFood = 'https://www.themealdb.com/api/json/v1/1/';

async function randomRequestApiFood(urlParameter = '') {
  const url = `${urlFood}${urlParameter}`;
  const objFood = await fetch(url).then((apiFood) => apiFood.json());
  const arrayFood = objFood.meals;
  // console.log('arrayFood', arrayFood);
  return arrayFood;
}

export async function requestApiFoodFilterIngredient(ingredient) {
  return randomRequestApiFood(`filter.php?i=${ingredient}`);
}

export async function requestApiFoodFilterName(name) {
  return randomRequestApiFood(`search.php?s=${name}`);
}

export async function requestApiFoodFilterFirstLetter(firstLetter) {
  return randomRequestApiFood(`search.php?f=${firstLetter}`);
}

export async function requestApiFoodFilterArea(area) {
  return randomRequestApiFood(`filter.php?a=${area}`);
}

export async function requestApiFoodDetails(id) {
  return randomRequestApiFood(`lookup.php?i=${id}`);
}

export async function requestApiFoodListIngredients() {
  return randomRequestApiFood('list.php?i=list');
}

export async function requestApiFoodListArea() {
  return randomRequestApiFood('list.php?a=list');
}
