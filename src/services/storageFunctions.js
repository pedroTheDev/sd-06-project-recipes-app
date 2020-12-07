function handleFavorite(favoriteObj) {
  let localArray = JSON.parse(localStorage.getItem('favoriteRecipes'));
  let favorites = JSON.parse(localStorage.getItem('favorites'));
  const magicNumber = -1;
  if (localArray === null) localArray = [];
  const index = localArray.map((obj) => obj.id).indexOf(favoriteObj.id);
  if (index !== magicNumber) localArray.splice(index, 1);
  if (index === magicNumber) localArray.push(favoriteObj);
  localStorage.setItem('favoriteRecipes', JSON.stringify(localArray));
}

export default handleFavorite;
