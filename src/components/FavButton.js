import React from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavButton({ isFav }) {
  function saveRecipe() {
    console.log('teste');
  }

  return (
    <button type="button" onClick={ saveRecipe }>
      <img
        type="button"
        alt="shareIcon"
        src={ !isFav ? whiteHeartIcon : blackHeartIcon }
        data-testid="favorite-btn"
      />
    </button>
  );
}

FavButton.propTypes = {
  isFav: PropTypes.bool.isRequired,
};

export default FavButton;
