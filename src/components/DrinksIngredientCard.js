import React from 'react';
import propTypes from 'prop-types';

function DrinksIngredientCard({ ingredient, index }) {
  const imageUrl = `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png`;
  console.log(imageUrl);
  return (
    <div
      className="card-container"
      data-testid={ `${index}-ingredient-card` }
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ imageUrl }
        alt="Ingrediente"
      />
      <h3
        data-testid={ `${index}-card-name` }
      >
        {ingredient.strIngredient1}
      </h3>
    </div>
  );
}

DrinksIngredientCard.propTypes = {
  ingredient: propTypes.shape({
    strIngredient1: propTypes.string.isRequired,
  }).isRequired,
  index: propTypes.number.isRequired,
};

export default DrinksIngredientCard;
