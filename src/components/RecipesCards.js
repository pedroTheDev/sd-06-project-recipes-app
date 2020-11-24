import React from 'react';
import PropTypes from 'prop-types';
import '../style/RecipeCards.css';

function RecipesCards({ title, index, recipe }) {
  if (title === 'Comidas') {
    const { strMeal, strMealThumb } = recipe;
    return (
      <div
        data-testid={ `${index}-recipe-card` }
        className="card-recipe"
      >
        <img data-testid={ `${index}-card-img` } src={ strMealThumb } alt={ strMeal } />
        <h1 data-testid={ `${index}-card-name` }>{ strMeal }</h1>
      </div>
    );
  }
  const { strDrink, strDrinkThumb } = recipe;
  return (
    <div data-testid={ `${index}-recipe-card` } className="card-recipe">
      <img data-testid={ `${index}-card-img` } src={ strDrinkThumb } alt={ strDrink } />
      <h1 data-testid={ `${index}-card-name` }>{ strDrink }</h1>
    </div>
  );
}

RecipesCards.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
};

export default RecipesCards;
