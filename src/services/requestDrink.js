const urlDrink = 'https://www.thecocktaildb.com/api/json/v1/1/';

async function randomRequestApiDrink(urlParameter) {
  const url = `${urlDrink}${urlParameter}`;
  const objFilter = await fetch(url).then((apiDrink) => apiDrink.json());
  const arrayFilterDrinks = objFilter.drinks;
  console.log('arrayFilterDrinks', arrayFilterDrinks);
  return arrayFilterDrinks;
}

export async function requestApiDrinkIngredient(ingredient) {
  return randomRequestApiDrink(`filter.php?i=${ingredient}`);
}

export async function requestApiDrinkName(name) {
  return randomRequestApiDrink(`search.php?s=${name}`);
}

export async function requestApiDrinkFirstLetter(firstLetter) {
  return randomRequestApiDrink(`search.php?f=${firstLetter}`);
}

export async function requestApiDrinkDetails(id) {
  return randomRequestApiDrink(`lookup.php?i=${id}`);
}
