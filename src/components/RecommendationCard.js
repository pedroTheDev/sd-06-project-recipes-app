import React from 'react';
import propTypes from 'prop-types';
import '../pages/Detail/detail.css';

function RecommendationCard({ recommendation, index }) {
  const handleMealRecommendation = () => {
    const two = 2;
    if (index < two) {
      return (
        <div
          className="recommendation-card"
          data-testid={ `${index}-recomendation-card` }
        >
          <img
            alt={ recommendation.strMeal }
            src={ recommendation.strMealThumb }
            className="recipe-thumb"
            height="250"
          />
          <h3
            data-testid={ `${index}-recomendation-title` }
            className="recipe-name"
          >
            {recommendation.strMeal}
          </h3>
        </div>
      );
    }
  };

  const handleDrinkRecommendation = () => {
    const two = 2;
    if (index < two) {
      return (
        <div
          data-testid={ `${index}-recomendation-card` }
          className="recommendation-card"
        >
          <img
            alt={ recommendation.strDrink }
            src={ recommendation.strDrinkThumb }
            className="recipe-thumb"
            height="250"
          />
          <h2
            data-testid={ `${index}-recomendation-title` }
            className="recipe-name"
          >
            {recommendation.strDrink}
          </h2>
        </div>
      );
    }
  };

  return (
    <div>
      {
        recommendation.strMeal ? handleMealRecommendation() : handleDrinkRecommendation()
      }
    </div>
  );
}

RecommendationCard.propTypes = {
  recommendation: propTypes.shape({
    strMeal: propTypes.string.isRequired,
    strMealThumb: propTypes.string.isRequired,
    strDrink: propTypes.string.isRequired,
    strDrinkThumb: propTypes.string.isRequired,
  }).isRequired,
  index: propTypes.number.isRequired,
};

export default RecommendationCard;
