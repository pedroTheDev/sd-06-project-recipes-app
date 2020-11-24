import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../style/RecipesList.css';

function DrinkCard({ drink, index }) {
  return (
    <Link to={ `/bebidas/${drink.idDrink}` }>
      <div className="drink-card" data-testid={ `${index}-recipe-card` }>
        <img
          data-testid={ `${index}-card-img` }
          className="drink-img"
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
        />
        <h3 data-testid={ `${index}-card-name` } className="drink-name">
          {drink.strDrink}
        </h3>
      </div>
    </Link>
  );
}

export default DrinkCard;

DrinkCard.propTypes = {
  drink: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};
