import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../style/RecipesList.css';

function MealsCard({ food, index }) {
  return (
    <Link to={ `/comidas/${food.idMeal}` }>
      <div className="recipe-card" data-testid={ `${index}-recipe-card` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ food.strMealThumb }
          alt={ food.strMeal }
          className="recipe-img"
        />
        <h3 className="recipe-name" data-testid={ `${index}-card-name` }>
          {food.strMeal}
        </h3>
      </div>
    </Link>
  );
}

MealsCard.propTypes = {
  food: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

export default MealsCard;
