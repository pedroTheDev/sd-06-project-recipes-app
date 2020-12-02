import React from 'react';
import propTypes from 'prop-types';

function IngredientCard({ ingredient, index }) {
  const imageUrl = `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`;
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
        {ingredient.strIngredient}
      </h3>
    </div>
  );
}

IngredientCard.propTypes = {
  ingredient: propTypes.shape({
    strIngredient: propTypes.string.isRequired,
  }).isRequired,
  index: propTypes.number.isRequired,
};

export default IngredientCard;
