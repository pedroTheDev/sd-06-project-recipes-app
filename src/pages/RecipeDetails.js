import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import splitPathname from '../utils/splitPathname';
import fetchRecipeDetails from '../services/fetchRecipeDetails';
import apiDataProcessor from '../services/apiDataProcessor';
import { processRecipeObject } from '../utils/processRecipeObject';

function RecipeDetails({ location: { pathname } }) {
  const [path, id] = splitPathname(pathname);
  const [recipe, setRecipe] = useState([]);
  const { image,
    name,
    category,
    ingredients = [],
    measures = [],
    instructions,
    video,
  } = recipe;

  useEffect(() => {
    async function request() {
      const data = await fetchRecipeDetails(id, path);
      const requestType = data.meals || data.drinks;
      const treatedRecipe = apiDataProcessor(requestType[0]);
      const processedRecipeObject = processRecipeObject(treatedRecipe);
      setRecipe(processedRecipeObject);
    }
    request();
  }, []);

  useEffect(() => {

  });

  return (
    <main>
      <img data-testid="recipe-photo" src={ image } alt={ name } />
      <h1 data-testid="recipe-title">{ name }</h1>
      <div>
        <button data-testid="share-btn" type="button">
          share
        </button>
        <button data-testid="favorite-btn" type="button">
          Fav
        </button>
      </div>
      <p data-testid="recipe-category">{ category }</p>
      <ul>
        { ingredients.map((ingredient, index) => (
          <li key={ ingredient } data-testid={ `${index}-ingredient-name-and-measure` }>
            { `${ingredient} - ${measures[index]}` }
          </li>
        )) }
      </ul>
      <h4>Instructions</h4>
      <p data-testid="instructions">{ instructions }</p>
      <h4>Video</h4>
      { path === 'comidas'
        ? <iframe data-testid="video" src={ video } title="Recipe Video" />
        : null}
      <div>
        <h4>Recomendations</h4>
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
