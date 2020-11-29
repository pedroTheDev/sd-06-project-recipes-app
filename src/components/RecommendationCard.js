import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecommendationCard({ recommendation, index }) {
  const handleMealRecommendation = () => {
    const two = 2;
    if (index < two) {
      return (
        <div data-testid={ `${index}-recomendation-card` }>
          <Link to={ `/comidas/${recommendation.idMeal}` }>
            <div className="recommendation-card">
              <img
                alt={ recommendation.strMeal }
                src={ recommendation.strMealThumb }
                className="recipe-thumb"
                height="250"
              />
              <h2
                className="recipe-name"
              >
                {recommendation.strMeal}
              </h2>
            </div>
          </Link>
        </div>
      );
    }
  };

  const handleDrinkRecommendation = () => {
    const two = 2;
    if (index < two) {
      return (
        <div data-testid={ `${index}-recomendation-card` }>
          <Link to={ `/bebidas/${recommendation.idDrink}` }>
            <div className="recommendation-card">
              <img
                alt={ recommendation.strDrink }
                src={ recommendation.strDrinkThumb }
                className="recipe-thumb"
                height="250"
              />
              <h2
                className="recipe-name"
              >
                {recommendation.strDrink}
              </h2>
            </div>
          </Link>
        </div>
      );
    }
  };

  return (
    <div className="recommendation-container">
      {
        recommendation.idMeal ? handleMealRecommendation() : handleDrinkRecommendation()
      }
    </div>
  );
}

RecommendationCard.propTypes = {
  recommendation: propTypes.shape({
    strMeal: propTypes.string.isRequired,
    strMealThumb: propTypes.string.isRequired,
    idMeal: propTypes.number.isRequired,
    strDrink: propTypes.string.isRequired,
    strDrinkThumb: propTypes.string.isRequired,
    idDrink: propTypes.number.isRequired,
  }).isRequired,
  index: propTypes.number.isRequired,
};

export default RecommendationCard;
