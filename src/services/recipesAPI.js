const getRecipesInformation = async (endpoint) => {
  const firstWantedIndex = 0;
  const lastWantedIndex = 12;
  const recipesInformation = await fetch(endpoint);
  const recipesInformationJason = await recipesInformation.json();
  const firstTwelveRecipes = { recipes: [] };

  if (endpoint.match(/themealdb/i)) {
    if (recipesInformationJason.meals) {
      if (recipesInformationJason.meals.length > lastWantedIndex) {
        firstTwelveRecipes.recipes = [...recipesInformationJason.meals.slice(
          firstWantedIndex, lastWantedIndex,
        )];
      } else {
        firstTwelveRecipes.recipes = [...recipesInformationJason.meals];
      }
    }
  } else if (recipesInformationJason.drinks) {
    if (recipesInformationJason.drinks.length > lastWantedIndex) {
      firstTwelveRecipes.recipes = [...recipesInformationJason.drinks.slice(
        firstWantedIndex, lastWantedIndex,
      )];
    } else {
      firstTwelveRecipes.recipes = [...recipesInformationJason.drinks];
    }
  }

  return firstTwelveRecipes;
};

export default getRecipesInformation;
