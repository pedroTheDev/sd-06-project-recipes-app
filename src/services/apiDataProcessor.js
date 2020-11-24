function ingredientMapper(recipe, type) {
  const ingredients = [];
  const recipeValues = Object.entries(recipe);
  const um = 1;
  for (let i = 0; i < recipeValues.length; i += um) {
    if (recipeValues[i][0].includes(type)) ingredients.push(recipeValues[i][1]);
  }
  return ingredients;
}

const apiDataProcessor = (recipe) => {
  const {
    idMeal, strMeal, strArea, strCategory, strInstructions, strMealThumb,
    strSource, strYoutube, strTags, idDrink, strDrink, strDrinkThumb,
  } = recipe;

  if (idMeal) {
    return ({
      id: idMeal,
      area: strArea,
      category: strCategory,
      name: strMeal,
      image: strMealThumb,
      source: strSource,
      instructions: strInstructions,
      ingredients: ingredientMapper(recipe, 'strIngredient'),
      measures: ingredientMapper(recipe, 'strMeasure'),
      tags: strTags,
      video: strYoutube,
    });
  }
  return ({
    id: idDrink,
    category: strCategory,
    name: strDrink,
    image: strDrinkThumb,
    instructions: strInstructions,
    ingredients: ingredientMapper(recipe, 'strIngredient'),
    measures: ingredientMapper(recipe, 'strMeasure'),
    tags: strTags,
    video: strYoutube,
  });
};

export default apiDataProcessor;
