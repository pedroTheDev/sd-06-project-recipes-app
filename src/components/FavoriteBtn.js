import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteBtn({ id, type, recipe }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorite !== null) {
      const alreadyFavorite = favorite.some(({ id: recipeId }) => recipeId === id);
      setIsFavorite(alreadyFavorite);
    }
  }, [isFavorite]);

  const addFavorite = () => {
    const currentFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteData = {
      id: recipe.idMeal,
      type,
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    };
    if (currentFavorite !== null) {
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...currentFavorite, favoriteData]));
    } else {
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([favoriteData]));
    }

    setIsFavorite(true);
  };

  const removeFavorite = () => {
    const currentFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorite = currentFavorite.filter((item) => item.id !== id);

    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));

    setIsFavorite(false);
  };

  if (isFavorite) {
    return (
      <button type="button" onClick={ () => removeFavorite() }>
        <img
          alt="Set this recipe as favorite"
          data-testid="favorite-btn"
          src={ blackHeartIcon }
        />
      </button>
    );
  }

  return (
    <button type="button" onClick={ () => addFavorite() }>
      <img
        alt="Set this recipe as favorite"
        data-testid="favorite-btn"
        src={ whiteHeartIcon }
      />
    </button>
  );
}

export default FavoriteBtn;

FavoriteBtn.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  recipe: PropTypes.shape({
    idMeal: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }),
}.isRequired;
