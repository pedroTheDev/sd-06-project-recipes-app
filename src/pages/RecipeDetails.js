import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import splitPathname from '../utils/splitPathname';
import fetchRecipeDetails from '../services/fetchRecipeDetails';
import apiDataProcessor from '../services/apiDataProcessor';

function RecipeDetails({ location: { pathname } }) {
  const [path, id] = splitPathname(pathname);
  const [recipe, setRecipe] = useState('');

  useEffect(() => {
    async function request() {
      const data = await fetchRecipeDetails(id, path);
      const requestType = data.meals || data.drinks;
      const treatedRecipe = requestType.map((r) => apiDataProcessor(r));
      setRecipe(treatedRecipe);
    }
    request();
  }, []);

  return (
    <main>
      <img data-testid="recipe-photo" alt="recipe image" />
      <h1 data-testid="recipe-title">teste</h1>
      <div>
        <button data-testid="share-btn" type="button">
          share
        </button>
        <button data-testid="favorite-btn" type="button">
          Fav
        </button>
      </div>
      <p data-testid="recipe-category">teste</p>
      <ul>
        <li data-testid={ `${0}-ingredient-name-and-measure` }>ing. 1</li>
      </ul>
      <p data-testid="instructions">teste</p>
      <video data-testid="video" />
      <div>
        Recomendadas
        <div data-testid={ `${0}-recomendation-card` } />
      </div>

      <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>

    </main>
  );
}

RecipeDetails.propTypes = {
  pathname: PropTypes.string.isRequired,
  location: PropTypes.shape.isRequired,
};

export default RecipeDetails;
