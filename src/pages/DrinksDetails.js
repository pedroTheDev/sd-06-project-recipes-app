import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import HeaderContext from '../context/HeaderContext';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import likeIcon from '../images/whiteHeartIcon.svg';
import './DrinksDetails.css';

const DrinksDetails = (props) => {
  const { title, setTitle } = useContext(HeaderContext);
  const { recipeObject, recipesDone } = useContext(RecipesContext);
  const {
    recipeTitle,
    setRecipeTitle,
    recipeImage,
    setRecipeImage,
    recipeCategory,
    setRecipeCategory,
    recipeIngredients,
    setRecipeIngredients,
    recipeInstructions,
    setRecipeInstructions,
    recipeRecomendations,
    setRecipeRecomendations,
  } = recipeObject;
  const { match } = props;
  const { params } = match;
  const { id } = params;

  const ingredientsMount = (jsonRecipe) => {
    const initalIndex = 0;
    const halfIndex = 2;
    const ingredients = Object.entries(jsonRecipe.drinks[0])
      .filter((item) => item[0].includes('Ingredient') || item[0].includes('Measure'))
      .filter((ar) => ar[1] !== null && ar[1] !== '')
      .map((ar2) => ar2[1]);
    console.log(ingredients);
    const ingredientsMeasures = [];
    for (let i = initalIndex; i < ingredients.length / halfIndex; i += 1) {
      ingredientsMeasures.push(ingredients[i]
        .concat(' - ', `${ingredients[i + ingredients.length / halfIndex]} `));
    }
    setRecipeIngredients(ingredientsMeasures);
  };

  const fetchRecipe = async () => {
    const path = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const getRecipe = await fetch(path);
    const jsonRecipe = await getRecipe.json();
    console.log(jsonRecipe);
    setRecipeTitle(jsonRecipe.drinks[0].strDrink);
    setRecipeCategory(jsonRecipe.drinks[0].strAlcoholic);
    setRecipeImage(jsonRecipe.drinks[0].strDrinkThumb);
    setRecipeInstructions(jsonRecipe.drinks[0].strInstructions);
    ingredientsMount(jsonRecipe);
  };

  const fecthRecomendations = async () => {
    const path = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const getRecipe = await fetch(path);
    const jsonRecipe = await getRecipe.json();
    setRecipeRecomendations([jsonRecipe.meals[0], jsonRecipe.meals[1]]);
  };

  const buttonMount = () => {
    if (recipesDone.includes(id)) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    setTitle('Drink Details');
    fetchRecipe();
    fecthRecomendations();
  }, []);

  return (
    <div>
      <h1>
        { title }
      </h1>
      <img
        src={ recipeImage }
        alt={ recipeTitle }
        data-testid="recipe-photo"
        className="image-display"
      />
      <div>
        <p data-testid="recipe-title">{recipeTitle}</p>
        <div>
          <img src={ shareIcon } alt="share" data-testid="share-btn" />
          <img src={ likeIcon } alt="like" data-testid="favorite-btn" />
        </div>
      </div>
      <p data-testid="recipe-category">{recipeCategory}</p>

      <ul>
        {recipeIngredients.map((item, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {item}
          </li>
        ))}
      </ul>

      <h3 data-testid="instructions">{recipeInstructions}</h3>

      <div>
        {recipeRecomendations.map((item, index) => (
          <div
            key={ item.idMeal }
            data-testid={ `${index}-recomendation-card` }
          >
            {item.strMeal}
          </div>
        ))}
      </div>

      {
        buttonMount() && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
          >
            Iniciar Receita
          </button>
        )
      }
    </div>
  );
};

DrinksDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinksDetails;
