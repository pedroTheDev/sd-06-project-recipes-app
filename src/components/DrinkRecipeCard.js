import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function DrinkRecipeCard({ drinkInfo, index }) {
  const { idDrink, strDrink, strDrinkThumb } = drinkInfo;

  return (
    <Link to={ `bebidas/detalhes/${idDrink}` }>
      <div className="recipe-card" data-testid={ `${index}-recipe-card` }>
        <img
          src={ strDrinkThumb }
          className="thumbnail"
          alt={ strDrink }
          data-testid={ `${index}-card-img` }
        />
        <p className="recipe-card-name" data-testid={ `${index}-card-name` }>
          {strDrink}
        </p>
      </div>
    </Link>
  );
}

DrinkRecipeCard.propTypes = {
  drinkInfo: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default DrinkRecipeCard;
