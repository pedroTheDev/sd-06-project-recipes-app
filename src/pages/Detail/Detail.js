import React, { useState } from 'react';
// import Proptypes from 'prop-types';
import fetchMeal from '../../services/mealAPI';
import SecondaryHeader from '../../components/SecondaryHeader';

function Detail({
  match: {
    params: { id },
  },
}) {
  const [recipes, setRecipes] = useState({});

  const fetchIngredients = async () => {
    const recipesByIdApi = await fetchMeal('lookupIngredient', id);
    setRecipes(recipesByIdApi);
  };

  return (
    <div>
      <SecondaryHeader id={ id } />
      <div className="ingredients-container">
        <h3>Ingredientes</h3>
        {
          recipes.ingredientsAndMeasures.map((ingredient, index) => (
            <div key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              {ingredient}
            </div>
          ))
        }
      </div>
      <div className="instructions-container">
        <h3>Instruções</h3>
        <p data-testid="instructions">{recipes.instruction}</p>
      </div>
      <div className="container-reccomended">
        <img data-testid="${index}-recomendation-card" />
      </div>
      <button
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    </div>
  );
}

export default Detail;
