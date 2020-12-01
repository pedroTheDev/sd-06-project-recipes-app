import React, { useContext } from 'react';
import PropTypes from 'prop-types';

function DoneCards(props) {
  const { id, type, area, category, alcoholicOrNot, name, image, doneDate, tags } = props.recipe;

  return (
      <div data-testid={ `${id}-recipe-card` }>
        <h2 data-testid={ `${id}-horizontal-name` }>{ name }</h2>
        <p data-testid={ `${id}-horizontal-top-text`}>{ category }</p>
        <p data-testid={ `${id}-horizontal-done-date` }>{ doneDate }</p>
        <img
          src={ image }
          alt={ `${name} photograph` }
          data-testid={ `${id}-horizontal-image` }
        />
        <div>
          {tags && tags.map(tag => <p data-testid={`${id}-${tag}-horizontal-tag`}>{ tag }</p>)}
        </div>
        <button data-testid={`${id}-horizontal-share-btn`} type="button">Share</button>
      </div>
  );
}

DoneCards.propTypes = {
  element: PropTypes.objectOf.isRequired,
  idx: PropTypes.number.isRequired,
  strDrink: PropTypes.string.isRequired,
  strDrinkThumb: PropTypes.string.isRequired,
};

export default DoneCards;