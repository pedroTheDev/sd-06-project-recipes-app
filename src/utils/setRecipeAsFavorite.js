import setMockedLocalStorage from '../setup/localStorage';

export default function setRecipeAsFavorite(id, recipe) {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const idAsNumber = Number(id);
  const mappedRecipes = favoriteRecipes.map((savedRecipe) => savedRecipe.id);
  const isSaved = mappedRecipes.includes(idAsNumber);
  let newFavoriteRecipes = [];
  if (isSaved) {
    newFavoriteRecipes = mappedRecipes.filter((recipeId) => !(recipeId === idAsNumber));
    console.log('already saved');
  } else {
    console.log('not saved yet');
    newFavoriteRecipes = [...mappedRecipes, idAsNumber];
  }
  console.log(newFavoriteRecipes);
}
