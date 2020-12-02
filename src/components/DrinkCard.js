import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Card(props) {
  const { element, idx } = props;
  const { strDrink, strDrinkThumb } = element;
  return (
    <Link
      to={ `/bebidas/${element.idDrink}` }
      className="drinkCard-link"
    >
      <div data-testid={ `${idx}-recipe-card` } className="drinkCard">
        <h2 data-testid={ `${idx}-card-name` } className="drinkCard-title">{ strDrink }</h2>
        <img
          src={ strDrinkThumb }
          alt={ `${strDrink} photograph` }
          data-testid={ `${idx}-card-img` }
          className="drinkCard-img"
        />
      </div>
    </Link>
  );
}

Card.propTypes = {
  element: PropTypes.objectOf.isRequired,
  idx: PropTypes.number.isRequired,
  strDrink: PropTypes.string.isRequired,
  strDrinkThumb: PropTypes.string.isRequired,
};

export default Card;
