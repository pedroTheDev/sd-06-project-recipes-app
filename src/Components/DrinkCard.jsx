import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function DrinkCard({ drink, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ drink.strDrinkThumb }
        alt="drink-pic"
        height="30px"
      />
      <p data-testid={ `${index}-card-name` }>{ drink.strDrink }</p>
      <Link to={ `/bebidas/${drink.idDrink}` }>
        <button type="button">Detalhes</button>
      </Link>
    </div>
  );
}

DrinkCard.propTypes = {
  drink: PropTypes.objectOf({
    strDrinkThumb: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
