import React from 'react';
import propTypes from 'prop-types';
import DrinkDetail from '../pages/Detail/DrinkDetail';

function IngredientCard({ index, image, name }) {
  return (
    <div
      className="card-container"
      data-testid={ `${index}-ingredient-card` }
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ image }
        alt={ name }
      />
      <h3 data-testid={ `${index}-card-name` }>{ name }</h3>
    </div>
  );
}

DrinkDetail.propTypes = {
  index: propTypes.number.isRequired,
  image: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
};

export default IngredientCard;
