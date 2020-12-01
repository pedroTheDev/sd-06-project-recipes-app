import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function DrinkCard({ drink, index }) {
  return (
    <div className="col-6 mb-3">
      <Link to={ `/bebidas/${drink.idDrink}` }>
        <div
          className="card shadow-sm rounded"
          data-testid={ `${index}-recipe-card` }
        >
          <img
            data-testid={ `${index}-card-img` }
            className="card-img-top"
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
          />
          <div className="card-body">
            <h3 data-testid={ `${index}-card-name` } className="card-title mb-0">
              {drink.strDrink}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
}

DrinkCard.propTypes = {
  drink: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

export default DrinkCard;
