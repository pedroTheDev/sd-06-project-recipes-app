import React from 'react';
import PropTypes from 'prop-types';

export default function FoodCard({ food }) {
  return (
    <div>
      <img src={ food.strMealThumb } alt="food-pic" height="30px" />
      <p>{ food.strMeal }</p>
    </div>
  );
}

FoodCard.propTypes = {
  food: PropTypes.objectOf({
    strMealThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
  }).isRequired,
};
