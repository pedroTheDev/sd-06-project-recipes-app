import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../Css/IngredientCard.css';

function IngredientsCard({ cards }) {
  const location = useLocation();
  const inicio = 0;
  const fim = 12;

  return (
    cards && cards.slice(inicio, fim)
      .map((item, index) => (
        <Link
          to={ `${location.pathname}/${item.id}` }
          key={ item.id }
          className="link-card"
        >
          <div
            data-testid={ `${index}-ingredient-card` }
            className="ingredient-card"
          >
            <div className="img-container">
              <img
                className="card-img"
                alt="Ingredient Card"
                data-testid={ `${index}-card-img` }
                src={ item.strThumb }
              />
            </div>
            <p
              data-testid={ `${index}-card-name` }
              className="card-name"
            >
              {item.strName}
            </p>
          </div>
        </Link>
      ))
  );
}

IngredientsCard.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    strThumb: PropTypes.string.isRequired,
    strName: PropTypes.string.isRequired,
  })).isRequired,
};

export default IngredientsCard;
