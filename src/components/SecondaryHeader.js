import React from 'react';
import propTypes from 'prop-types';
import { shareIcon, whiteHeartIcon /* blackHeartIcon */ } from '../images';

function SecondaryHeader({ name, img, category }) {
  return (
    <div className="header-container">
      <header>
        <img
          data-testid="recipe-photo"
          alt={ name }
          src={ img }
        />
        <h1 data-testid="recipe-title">{ name }</h1>
        <button
          type="button"
          data-testid="share-btn"
          src={ shareIcon }
        >
          <img src={ shareIcon } alt="Share recipe" />
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
          src={ whiteHeartIcon }
        >
          <img
            src={ whiteHeartIcon }
            alt="Share recipe"
            data-testid="favorite-btn"
          />
        </button>
        <p data-testid="recipe-category">{ category }</p>
      </header>
    </div>
  );
}

SecondaryHeader.propTypes = {
  name: propTypes.string.isRequired,
  img: propTypes.string.isRequired,
  category: propTypes.string.isRequired,
};

export default SecondaryHeader;
