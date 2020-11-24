import React from 'react';
import PropTypes from 'prop-types';
import '../style/RecipesList.css';

function DrinksCard({ drink, index }) {
  return (
    <div className="drink-card" data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ drink.strDrinkThumb }
        alt={ drink.strDrink }
        className="drink-img"
      />
      <h3 className="drink-name" data-testid={ `${index}-card-name` }>
        {drink.strDrink}
      </h3>
    </div>
  );
}

DrinksCard.propTypes = {
  drink: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

export default DrinksCard;
