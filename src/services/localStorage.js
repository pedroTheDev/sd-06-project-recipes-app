export function mealsToken(token) {
  const temp = localStorage.getItem('meals_token');
  localStorage.setItem('meals_token', token);
  return temp;
}

export function cocktailsToken(token) {
  const temp = localStorage.getItem('cocktails_token');
  localStorage.setItem('cocktails_token', token);
  return temp;
}

export function getValue(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setValue(value) {
  return localStorage.setItem(JSON.stringify({ user: { email: value } }));
}

// export function user(email) {
//   const obj = { email };
//   const temp = JSON.parse(localStorage.getItem('email'));
//   localStorage.setItem('email', JSON.stringify(obj));
//   return temp;
// }

export function doneRecipes(object) {
  const obj = {
    id: object.id,
    type: object.type,
    area: object.strArea,
    category: object.strCategory,
    alcoholicOrNot: object.alcoholic,
    name: object.name,
    image: object.image,
    doneDate: object.doneDate,
    tags: object.tags,
  };
  const temp = JSON.parse(localStorage.getItem('done_recipes'));
  localStorage.setItem('done_recipes', JSON.stringify(obj));
  return temp;
}

export function favoriteRecipes(object) {
  const obj = {
    id: object.id,
    type: object.type,
    area: object.strArea,
    category: object.strCategory,
    alcoholicOrNot: object.alcoholic,
    name: object.name,
    image: object.image,
  };
  const temp = JSON.parse(localStorage.getItem('favorite_recipes'));
  localStorage.setItem('favorite_recipes', JSON.stringify(obj));
  return temp;
}

export function addCocktailIngredient(cocktailID, ingredientID) {
  let obj = {
    cocktails: {},
    meals: {},
  };
  obj = JSON.parse(localStorage.getItem(''));

}
