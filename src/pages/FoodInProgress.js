import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import HeaderContext from '../context/HeaderContext';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import likeIcon from '../images/whiteHeartIcon.svg';

const FoodInProgress = ({ match: { params: { id } } }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { setTitle } = useContext(HeaderContext);
  const { recipeObject } = useContext(RecipesContext);
  const { recipeTitle,
    setRecipeTitle,
    recipeImage,
    setRecipeImage,
    recipeCategory,
    setRecipeCategory,
    recipeIngredients,
    setRecipeIngredients,
    recipeInstructions,
    setRecipeInstructions,
  } = recipeObject;

  const ingredientsMount = (jsonRecipe) => {
    const initalIndex = 0;
    const halfIndex = 2;
    const ingredients = Object.entries(jsonRecipe.meals[0])
      .filter((item) => item[0].includes('Ingredient') || item[0].includes('Measure'))
      .filter((ar) => ar[1] !== null && ar[1] !== ' ' && ar[1] !== '')
      .map((ar2) => ar2[1]);
    const ingredientsMeasures = [];
    for (let i = initalIndex; i < ingredients.length / halfIndex; i += 1) {
      ingredientsMeasures
        .push(`${ingredients[i]} - ${ingredients[i + ingredients.length / halfIndex]}`);
    }
    setRecipeIngredients(ingredientsMeasures);
  };

  const fetchRecipe = async () => {
    const path = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const getRecipe = await fetch(path);
    const jsonRecipe = await getRecipe.json();
    setRecipeTitle(jsonRecipe.meals[0].strMeal);
    setRecipeCategory(jsonRecipe.meals[0].strCategory);
    setRecipeImage(jsonRecipe.meals[0].strMealThumb);
    setRecipeInstructions(jsonRecipe.meals[0].strInstructions);
    ingredientsMount(jsonRecipe);
    setIsLoading(false);
  };

  useEffect(() => {
    setTitle('Food In Progress');
    fetchRecipe();
  }, []);

  return (
    <div>
      <img data-testid="recipe-photo" src={ recipeImage } alt={ recipeTitle } />
      <h1 data-testid="recipe-title">{recipeTitle}</h1>
      <div>
        <img src={ shareIcon } alt="share" data-testid="share-btn" />
        <img src={ likeIcon } alt="like" data-testid="favorite-btn" />
      </div>
      <h3 data-testid="recipe-category">{recipeCategory}</h3>
      <ul>
        { !isLoading && recipeIngredients.map((item, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-step` }>
            <input
              type="checkbox"
              name={ item }
              id={ item }
            />
            <label htmlFor={ item }>{item}</label>
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{recipeInstructions}</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar receita
      </button>
    </div>
  );
};

FoodInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default FoodInProgress;
