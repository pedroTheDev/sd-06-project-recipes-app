import React from 'react';
import PropTypes from 'prop-types';
import './RecipeCard.css';

function RecipeCard({ cards }) {
  return (
    cards && cards.slice(0, 12)
      .map((item, index) => (
        <div
          data-testid={`${index}-recipe-card`}
          className="recipe-card"
          key={item.id}
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
      )));
}

RecipeCard.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    strThumb: PropTypes.string.isRequired,
    strName: PropTypes.string.isRequired,
  })).isRequired,
};

export default RecipeCard;
