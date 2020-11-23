import React from 'react';
import PropTypes from 'prop-types';

function ComidaCard({ food, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ food.strMealThumb }
        alt={ food.strMeal }
      />
      <h3 data-testid={ `${index}-card-name` }>{ food.strMeal }</h3>
    </div>
  );
}

ComidaCard.propTypes = {
  food: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

export default ComidaCard;
