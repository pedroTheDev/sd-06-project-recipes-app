import React, { useState } from 'react';
import Proptypes from 'prop-types';
import fetchMeal from '../../services/mealAPI';

function Detail({ id }) {
  const [recipes, setRecipes] = useState({});

  const fetchIngredients = async () => {
    const recipesByIdApi = await fetchMeal('lookupIngredient', id);
    setRecipes(recipesByIdApi);
  };

  return (
    <div>
      <div className="recipe-image-container">
        <img
          data-testid="recipe-photo"
          src="requisicao-api"
          alt="Recipe photo"
        />
      </div>
      <div className="title-container">
        <h1 data-testid="recipe-title">Titulo receita</h1>
        <button
          type="button"
          data-testid="share-btn"
        >
          Compartilhar
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          Favoritar
        </button>
        <p data-testid="recipe-category">Categoria</p>
      </div>
      <div className="ingredients-container">
        <h3>Ingredientes</h3>
        <ul>
          <li data-testid="${index}-ingredient-name-and-measure">Limão</li>
        </ul>
      </div>
      <div className="instructions-container">
        <h3>Instruções</h3>
        <p data-testid="instructions">Modo de fazer</p>
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

Detail.Proptypes = {
  id: Proptypes.number.isRequired,
};

export default Detail;
