import React from 'react';
import PropTypes from 'prop-types';

function BebidaCard({ drink, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ drink.strDrinkThumb }
        alt={ drink.strDrink }
      />
      <h3 data-testid={ `${index}-card-name` }>{ drink.strDrink }</h3>
    </div>
  );
}

BebidaCard.propTypes = {
  drink: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

export default BebidaCard;
