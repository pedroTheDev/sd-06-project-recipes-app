import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import splitPathname from '../utils/splitPathname';
import fetchRecipeDetails from '../services/fetchRecipeDetails';
import apiDataProcessor from '../services/apiDataProcessor';
import { processRecipeObject } from '../utils/processRecipeObject';
import recomendationsThunk from '../redux/actions/pageDetailsFetcher';
import invertPathName from '../utils/invertPathName';

function RecipeDetails({ location: { pathname }, recommendations }) {
  const [path, id] = splitPathname(pathname);
  const [recipe, setRecipe] = useState([]);
  const { image,
    name,
    category,
    ingredients = [],
    measures = [],
    instructions,
    video,
    isAlcoholic,
  } = recipe;
  const dispatch = useDispatch();

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
    const newPath = invertPathName(path);
    dispatch(recomendationsThunk(`/${newPath}`));
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
      <p data-testid="recipe-category">
        { isAlcoholic === 'Alcoholic'
          ? isAlcoholic
          : category}
      </p>
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
        <h4>Recommendations</h4>
        <div className="recommendation-container">
          {recommendations.map((recommendation, index) => (
            <div
              data-testid={ `${index}-recomendation-card` }
              key={ recommendation.name }
              className="recommendation-card"
            >
              <img src={ recommendation.image } alt={ recommendation.name } />
              <h4>{recommendation.name}</h4>
            </div>

          ))}
        </div>
      </div>

      <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>

    </main>
  );
}

// teste

RecipeDetails.propTypes = {
  pathname: PropTypes.string.isRequired,
  location: PropTypes.shape.isRequired,
  recommendations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  recommendations: state.recommendationsReducer.recommendations,
});

export default connect(mapStateToProps, null)(RecipeDetails);

// export default RecipeDetails;
