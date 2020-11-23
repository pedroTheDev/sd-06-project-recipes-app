export const urlDrink = 'https://www.thecocktaildb.com/api/json/v1/1/';

async function randomRequestApiDrink(urlParameter = '') {
  const url = `${urlDrink}${urlParameter}`;
  const objDrink = await fetch(url).then((apiDrink) => apiDrink.json());
  const arrayDrink = objDrink.drinks;
  // console.log('arrayDrink', arrayDrink);
  return arrayDrink;
}

export async function requestApiDrinkFilterIngredient(ingredient) {
  return randomRequestApiDrink(`filter.php?i=${ingredient}`);
}

export async function requestApiDrinkFilterName(name) {
  return randomRequestApiDrink(`search.php?s=${name}`);
}

export async function requestApiDrinkFilterFirstLetter(firstLetter) {
  return randomRequestApiDrink(`search.php?f=${firstLetter}`);
}

export async function requestApiDrinkDetails(id) {
  return randomRequestApiDrink(`lookup.php?i=${id}`);
}

export async function requestApiDrinkListIngredients() {
  return randomRequestApiDrink('list.php?i=list');
}
