import setMockedLocalStorage from '../setup/localStorage';
import formatFavToStorage from './formatFavToStorage';

export default function setRecipeAsFavorite(id, recipe, type) {
  const formatedRecipe = {...recipe, type: type.slice(0, -1)};
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const mappedIdRecipes = favoriteRecipes.map((savedRecipe) => savedRecipe.id);
  const isSaved = mappedIdRecipes.includes(id);
  if (isSaved) {
    const newFavoriteRecipes = favoriteRecipes.filter((recipe) => (
      !(recipe.id === id)
    ));
    const favsToStorage = formatFavToStorage(newFavoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favsToStorage));
  } else {
    favoriteRecipes.push(formatedRecipe);
    const favsToStorage = formatFavToStorage(favoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favsToStorage));
  }
}
