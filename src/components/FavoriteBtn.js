import React from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteBtn({ isFavorite, changesFavorites }) {
  return (
    <button data-testid="favorite-btn" type="button" onClick={ changesFavorites }>
      { isFavorite
        ? <img src={ blackHeartIcon } alt="shareButton" />
        : <img src={ whiteHeartIcon } alt="shareButton" />}

    </button>

  );
}

FavoriteBtn.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  changesFavorites: PropTypes.func.isRequired,
};
export default FavoriteBtn;
