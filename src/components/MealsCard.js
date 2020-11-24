import React from 'react';
import PropTypes from 'prop-types';
import '../style/RecipesList.css';

function MealsCard({ food, index }) {
  return (
    <div className="food-card" data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ food.strMealThumb }
        alt={ food.strMeal }
        className="food-img"
      />
      <h3 className="food-name" data-testid={ `${index}-card-name` }>
        {food.strMeal}
      </h3>
    </div>
  );
}

MealsCard.propTypes = {
  food: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

export default MealsCard;
