const { func, element } = require("prop-types");

export function discardEmptyEntries(array) {
  const processedArray = array.filter((element) => {
    return element !== '' && element !== ' '
  });
  return processedArray;
}

export function processRecipeObject(obj) {
  let { ingredients, measures } = obj;
  ingredients = discardEmptyEntries(ingredients);
  measures = discardEmptyEntries(measures);
  return {...obj, ingredients, measures};
}
