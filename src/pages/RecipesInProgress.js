import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipesInProgress() {
  const location = useLocation().pathname;
  const [recipeInProgress, setRecipeInProgress] = useState([]);
  const [isFetching, setFetching] = useState(true);
  const [ingredientDone, setIngredientDone] = useState(false);
  const [idRecipe, setIdRecipe] = useState('');
  const recipeInProgressLocal = Object.values(JSON.parse(localStorage.getItem('inProgressRecipes')));

  const fetchRecipesInProgress = async () => {
    const splitUrl = location.split('/');
    const id = splitUrl[2];
    setIdRecipe(id);
    if(location.includes('comidas')) {
      const apiRequest =  await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const apiResponse = await apiRequest.json();
      setRecipeInProgress(apiResponse.meals[0]);
    } else {
      const apiRequest =  await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${id}`);
      const apiResponse = await apiRequest.json();
      setRecipeInProgress(apiResponse.drinks[0]);
    }
  }

  const renderLoading = () => {
    return (<h1>Loading...</h1>)
  };

  useEffect(() => {
    setFetching(true);
    fetchRecipesInProgress();
    setFetching(false);
  }, []);

  const handleClick = () => {
    console.log(recipeInProgressLocal);
    console.log(idRecipe);
    console.log(recipeInProgressLocal[0][idRecipe]);
  }

  const handleIngredients = (index) => {
    const ingredientMade = document.querySelector("[id=" + index + "-ingredient-step]");
    console.log(ingredientMade);

    // if (ingredientDone) {
    //   ingredientMade.style = { "text-decoration": 'line-through' }
    //   setIngredientDone(false);
    // } else {
    //   ingredientMade.style = { "text-decoration": 'none' }
    //   setIngredientDone(true);
    // }
  }

  // const handleIngredients = (event) => {
  //   const ingredientMade = event.target;
  //   console.log(ingredientMade);
  //   ingredientMade.style = { "text-decoration": 'line-through' };
  // }

  const renderFood = () => (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipeInProgress.strMealThumb }
        alt="recipe-meal"
        width='200px'
      />
      <h2 data-testid="recipe-title">{ recipeInProgress.strMeal }</h2>
      <img
        data-testid="share-btn"
        src={ shareIcon }
        alt="share icon"
        //onClick={ handleShareIcon } // tratar
        aria-hidden="true"
      />
      <img
        data-testid="favorite-btn"
        src={ blackHeartIcon }
        alt="favorite icon"
        //onClick={ handleShareIcon } // tratar
        aria-hidden="true"
      />
      <h3 data-testid="recipe-category" >{ recipeInProgress.strCategory }</h3>
      { recipeInProgressLocal[0][idRecipe].map((recipe, index) => (
        <div>
          {/* <label data-testid={ `${index}-ingredient-step` }>{ `${recipe.ingredient} - ${recipe.measure}` } */}
            <input
              type="checkbox"
              onChange={ handleIngredients }
            />
          {/* </label> */}
          <h5
            // className={ ingredientDone ? "ingredient-done" : "ingredient-not-done" }
            id={ `${index}-ingredient-step` }
            data-testid={ `${index}-ingredient-step` }
          >
            { `${recipe.ingredient} - ${recipe.measure}` }
          </h5>
        </div>
      ))}
      <span data-testid="instructions">{ recipeInProgress.strInstructions }</span>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={handleClick}
      >
        Finalizar Receita
      </button>
    </div>
  )

  return (
    <div>
      {/* {isFetching ? renderLoading() : ( location.includes('comidas') && renderFood() ) } */}
      {isFetching ? renderLoading() : renderFood() }
    </div>
  )
}

export default RecipesInProgress;
