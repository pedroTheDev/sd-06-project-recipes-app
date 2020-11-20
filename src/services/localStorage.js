export function mealsToken(token) {
  const temp = localStorage.getItem('mealsToken');
  localStorage.setItem('mealsToken', token);
  return temp;
}

export function cocktailsToken(token) {
  const temp = localStorage.getItem('cocktailsToken');
  localStorage.setItem('cocktailsToken', token);
  return temp;
}

// export function getValue(key) {
//   return JSON.parse(localStorage.getItem(key));
// }
  
export function setValueUser(key, value) {
  return localStorage.setItem(key, JSON.stringify({ email: value }));
}

// export function user(email) {
//   const obj = { email };
//   const temp = JSON.parse(localStorage.getItem('user'));
//   localStorage.setItem('user', { email: JSON.stringify(obj) });
//   console.log(JSON.parse(localStorage.getItem('user')))
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
