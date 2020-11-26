import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../style/RecipesList.css';

function DrinkCard({ drink, index }) {
  return (
    <Link
      to={ `/bebidas/${drink.idDrink}` }
      className="recipe-card"
      data-testid={ `${index}-recipe-card` }
    >
      <div data-testid={ `${index}-card-img` }>
        <img
          className="recipe-img"
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
        />
      </div>
      <h3 data-testid={ `${index}-card-name` } className="recipe-name">
        {drink.strDrink}
      </h3>
    </Link>
  );
}

DrinkCard.propTypes = {
  drink: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

export default DrinkCard;
