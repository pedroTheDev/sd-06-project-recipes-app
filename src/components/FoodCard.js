import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Card(props) {
  const { element, idx } = props;
  const { strMeal, strMealThumb } = element;
  return (
    <Link
      className="foodCard-link"
      to={ {
        pathname: `/comidas/${element.idMeal}`,
        state: {
          dataRecipes: element,
        },
      } }
    >
      <div data-testid={ `${idx}-recipe-card` } className="foodCard">
        <h2 data-testid={ `${idx}-card-name` } className="foodCard-title">{ strMeal }</h2>
        <img
          src={ strMealThumb }
          alt={ `${strMeal} photograph` }
          data-testid={ `${idx}-card-img` }
          className="foodCard-img"
        />
      </div>
    </Link>
  );
}

Card.propTypes = {
  element: PropTypes.objectOf.isRequired,
  idx: PropTypes.number.isRequired,
  strMeal: PropTypes.string.isRequired,
  strMealThumb: PropTypes.string.isRequired,
};

export default Card;
