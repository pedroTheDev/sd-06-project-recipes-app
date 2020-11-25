import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function FoodCard({ food, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        src={ food.strMealThumb }
        data-testid={ `${index}-card-img` }
        alt="food-pic"
        height="30px"
      />
      <p data-testid={ `${index}-card-name` }>{ food.strMeal }</p>
      <Link to={ `/comidas/${food.idMeal}` }>
        <button type="button">Detalhes</button>
      </Link>
    </div>
  );
}

FoodCard.propTypes = {
  food: PropTypes.objectOf({
    strMealThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
