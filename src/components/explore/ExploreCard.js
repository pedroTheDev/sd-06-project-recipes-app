import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

function ExploreCard({ name, index, type }) {
  const imgURL = (type === 'comidas')
    ? `https://www.themealdb.com/images/ingredients/${name}-Small.png`
    : `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`;

  return (
    <div data-testid={ `${index}-ingredient-card` }>
      <img
        src={ imgURL }
        alt={ name }
        data-testid={ `${index}-card-img` }
      />
      <h6 data-testid={ `${index}-card-name` }>{ name }</h6>
    </div>
  );
}

ExploreCard.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default ExploreCard;
