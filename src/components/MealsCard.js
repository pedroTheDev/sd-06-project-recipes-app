import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function RecipesCard({ food, index }) {
  return (
    <div className="col-6 mb-3">
      <Link to={ `/comidas/${food.idMeal}` }>
        <div
          className="card shadow-sm rounded"
          data-testid={ `${index}-recipe-card` }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ food.strMealThumb }
            alt={ food.strMeal }
            className="card-img-top"
          />
          <div className="card-body">
            <h3 className="card-title mb-0" data-testid={ `${index}-card-name` }>
              {food.strMeal}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
}

RecipesCard.propTypes = {
  food: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipesCard;
