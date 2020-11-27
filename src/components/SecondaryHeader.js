import React from 'react';
import propTypes from 'prop-types';

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
        >
          Compartilhar
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          Favoritar
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
