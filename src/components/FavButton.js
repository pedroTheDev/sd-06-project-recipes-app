import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import setRecipeAsFavorite from '../utils/setRecipeAsFavorite';
import checkFavoriteRecipe from '../utils/checkFavoriteRecipe';

function FavButton({ recipe, type }) {
  const { id } = recipe;
  const [isFavorite, setIsFavorite] = useState(false);
  function saveRecipe() {
    setIsFavorite(!isFavorite);
    setRecipeAsFavorite(id, recipe, type);
  }

  useEffect(() => {
    setIsFavorite(checkFavoriteRecipe(id));
  }, [recipe]);

  return (
    <button type="button" onClick={ saveRecipe }>
      <img
        type="button"
        alt="shareIcon"
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        data-testid="favorite-btn"
      />
    </button>
  );
}

FavButton.propTypes = {
  type: PropTypes.string.isRequired,
  recipe: PropTypes.shape.isRequired,
};

export default FavButton;
