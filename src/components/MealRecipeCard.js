import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function MealRecipeCard({ mealInfo, index }) {
  const { idMeal, strMeal, strMealThumb } = mealInfo;

  return (
    <Link to={ `comidas/detalhes/${idMeal}` }>
      <div className="recipe-card" data-testid={ `${index}-recipe-card` }>
        <img
          src={ strMealThumb }
          className="thumbnail"
          alt={ strMeal }
          data-testid={ `${index}-card-img` }
        />
        <p className="recipe-card-name" data-testid={ `${index}-card-name` }>
          {strMeal}
        </p>
      </div>
    </Link>
  );
}

MealRecipeCard.propTypes = {
  mealInfo: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired };

export default MealRecipeCard;
