import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import splitPathname from '../utils/splitPathname';
import recomendationsThunk from '../redux/actions/pageDetailsFetcher';
import invertPathName from '../utils/invertPathName';
import ShareButton from '../components/ShareButton';
import FavButton from '../components/FavButton';
import recipeDetailsProcessing from '../utils/recipeDetailsProcessing';

function RecipeDetails(
  { location: { pathname }, recommendations },
) {
  const [path, id] = splitPathname(pathname);
  const [recipe, setRecipe] = useState([]);
  const [disableButton, setdisableButton] = useState('visible');
  const [wasStarted, setWasStarted] = useState(false);
  const [wasCopied, setWasCopied] = useState(false);

  const history = useHistory();
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
    recipeDetailsProcessing(id, path, setRecipe);
    const newPath = invertPathName(path);
    dispatch(recomendationsThunk(`/${newPath}`));
  }, []);

  useEffect(() => {
    let savedRecipes = [];
    savedRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (savedRecipes) {
      savedRecipes.forEach((savedRecipe) => {
        if (savedRecipe.id === recipe.id) {
          setdisableButton('hidden');
          return true;
        }
      });
    }
  }, [recipe]);

  useEffect(() => {
    const conditionalKey = path === 'comidas' ? 'meals' : 'cocktails';
    const storedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storedRecipes) {
      const inProgressIds = Object.keys(storedRecipes[conditionalKey]);
      setWasStarted(inProgressIds.includes(recipe.id));
    }
  }, [recipe]);

  return (
    <main>
      <img
        data-testid="recipe-photo"
        src={ image }
        alt={ name }
        className="main-photo"
      />
      <h1 data-testid="recipe-title">{ name }</h1>
      <div>
        <ShareButton setMessage={ setWasCopied } />
        <FavButton />
      </div>
      {wasCopied && 'Link copiado!'}
      <p data-testid="recipe-category">
        { isAlcoholic === 'Alcoholic'
          ? isAlcoholic
          : category}
      </p>
      <ul>
        { ingredients.map((ingredient, index) => (
          <li
            key={ ingredient }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
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
        <div className="recomendation-container">
          {recommendations.map((recommendation, index) => (
            <div
              data-testid={ `${index}-recomendation-card` }
              key={ recommendation.name }
              className="recomendation-card"
            >
              <img src={ recommendation.image } alt={ recommendation.name } />
              <h4 data-testid={ `${index}-recomendation-title` }>
                {recommendation.name}
              </h4>
            </div>

          ))}
        </div>
      </div>

      <button
        type="button"
        data-testid="start-recipe-btn"
        className={ `start-recipe-btn ${disableButton}` }
        onClick={ () => history.push(`/${path}/${id}/in-progress`) }
      >
        {wasStarted ? 'Continuar Receita' : 'Iniciar Receita'}
      </button>
    </main>
  );
}

RecipeDetails.propTypes = {
  pathname: PropTypes.string.isRequired,
  location: PropTypes.shape.isRequired,
  recommendations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  recommendations: state.recommendationsReducer.recommendations,
});

export default connect(mapStateToProps)(RecipeDetails);

// export default RecipeDetails;
