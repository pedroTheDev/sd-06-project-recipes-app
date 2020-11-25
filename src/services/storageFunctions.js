function handleFavorite(favoriteObj) {
  let localArray = JSON.parse(localStorage.getItem('favoriteRecipes'));
  let favorites = JSON.parse(localStorage.getItem('favorites'));
  if (localArray === null) localArray = [];
  const index = localArray.map(obj => obj.id).indexOf(favoriteObj.id);
  if (index !== -1) localArray.splice(index, 1);
  if (index === -1) localArray.push(favoriteObj);
  localStorage.setItem('favoriteRecipes', JSON.stringify(localArray));

  if (favorites === null) favorites = [];
  const favIndex = favorites.map(fav => fav).indexOf(favoriteObj.id);
  if (favIndex !== -1) favorites.splice(favIndex, 1);
  if (favIndex === -1) favorites.push(favoriteObj.id);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

export default handleFavorite;
