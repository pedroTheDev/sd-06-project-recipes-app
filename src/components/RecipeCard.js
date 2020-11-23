import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './RecipeCard.css';

function RecipeCard({ cards }) {
  const location = useLocation();

  return (
    cards && cards.slice(0, 12)
      .map((item, index) => (
        <Link
          to={`${location.pathname}/${item.id}`}
          key={item.id}
          className="link-card"
        >
          <div
            data-testid={`${index}-recipe-card`}
            className="recipe-card"
          >
            <div className="img-container">
              <img
                className="card-img"
                alt="Recipe Card"
                data-testid={`${index}-card-img`}
                src={item.strThumb}
              />
            </div>
            <p
              data-testid={`${index}-card-name`}
              className="card-name"
            >
              {item.strName}
            </p>
          </div>
        </Link>
      )));
}

RecipeCard.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    strThumb: PropTypes.string.isRequired,
    strName: PropTypes.string.isRequired,
  })).isRequired,
};

export default RecipeCard;
