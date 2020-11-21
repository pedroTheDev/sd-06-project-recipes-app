async function fetchRecipe(url) {
  const response = await fetch(url);
  const recipe = await response.json();
  return recipe;
}

export default fetchRecipe;
