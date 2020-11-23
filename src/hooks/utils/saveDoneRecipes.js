function extractRecipeInfo(type, recipe) {
  if (type === 'Comidas') {
    const {
      idMeal: id,
      strArea: area,
      strMeal: name,
      strCategory: category,
      strMealThumb: image,
      strTags: tags,
    } = recipe;

    const alcoholicOrNot = '';

    return {
      id,
      area: (area || ''),
      name,
      category: (category || ''),
      image,
      tags: (tags || []),
      alcoholicOrNot,
      type: 'comida',
    };
  }

  const {
    idDrink: id,
    strDrink: name,
    strCategory: category,
    strDrinkThumb: image,
    strTags: tags,
    strAlcoholic: alcoholicOrNot,
  } = recipe;

  const area = '';

  return {
    id,
    area,
    name,
    category: (category || ''),
    image,
    tags: (tags || []),
    alcoholicOrNot,
    type: 'bebida',
  };
}

export default function saveDoneRecipe(type, recipe) {
  const previouslyDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

  const newRecipeInfoParsed = extractRecipeInfo(type, recipe);
  const doneDate = new Date();

  const recipeToAdd = { ...newRecipeInfoParsed, doneDate };

  const newDoneRecipes = [...previouslyDoneRecipes, recipeToAdd];

  localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));

  return newDoneRecipes;
}
