import React, { useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../styles/images/whiteHeartIcon.svg';
import blackHeartIcon from '../styles/images/blackHeartIcon.svg';
import { saveState, loadState } from '../services/localStorage';

function FavoriteHeart({ id, detailsDrink, foodOrDrink }) {
  const favoriteRecipe = 'favoriteRecipes';
  const responseFavoriteStorage = loadState(favoriteRecipe, [])
    .some((element) => element.id === id);
  const [favoriteButton, setFavoriteButton] = useState(responseFavoriteStorage);

  const favoriteMark = () => {
    if (favoriteButton === false) {
      setFavoriteButton(true);
    } else {
      setFavoriteButton(false);
    }
  };

  const saveFavoriteRecipe = () => {
    const { idDrink, strCategory, strDrink, strDrinkThumb, strAlcoholic } = detailsDrink;
    const loadFavoriteRecipe = loadState(favoriteRecipe, []);

    const response = loadFavoriteRecipe.filter((element) => element.id !== idDrink);
    if (loadFavoriteRecipe.length > response.length) {
      saveState(favoriteRecipe, response);
    } else {
      const payload = {
        id: idDrink,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      };
      saveState(favoriteRecipe, [...loadFavoriteRecipe, payload]);
    }
    console.log(detailsDrink);
    favoriteMark();
  };

  return (
    favoriteButton ? (
      <button type="button" onClick={ saveFavoriteRecipe }>
        <img
          data-testid="favorite-btn"
          src={ blackHeartIcon }
          alt="img-button-fav"
        />
      </button>
    ) : (
      <button type="button" onClick={ saveFavoriteRecipe }>
        <img
          data-testid="favorite-btn"
          src={ whiteHeartIcon }
          alt="img-button-fav"
        />
      </button>
    )
  );
}

// FavoriteHeart.propTypes = {
//   id: PropTypes.string.isRequired,
//   detailsDrink: PropTypes.shape.isRequired,
// };

export default FavoriteHeart;
