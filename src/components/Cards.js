import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Cards({ info, recipe, index }) {
  const { idMeal, strMeal, strMealThumb } = info;
  const { idDrink, strDrink, strDrinkThumb } = info;

  return (
    <Link to={ recipe === 'comidas' ? `/comidas/${idMeal}` : `/bebidas/${idDrink}` }>
      <div className="recipe-card" data-testid={ `${index}-recipe-card` }>
        <img
          src={ recipe === 'comidas' ? strMealThumb : strDrinkThumb }
          className="thumbnail"
          alt={ recipe === 'comidas' ? strMeal : strDrink }
          data-testid={ `${index}-card-img` }
        />
        <p
          className="recipe-card-name"
          data-testid={ `${index}-card-name` }
          data-testid={ `${index}-recomendation-title` }
        >
          { recipe === 'comidas' ? strMeal : strDrink }
        </p>
      </div>
    </Link>
  );
}

Cards.propTypes = {
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  recipe: PropTypes.string.isRequired,
};

export default Cards;
