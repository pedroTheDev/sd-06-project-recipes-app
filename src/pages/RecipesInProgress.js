import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipesInProgress() {
  const location = useLocation().pathname;
  const [recipeInProgress, setRecipeInProgress] = useState([]);
  const [isFetching, setFetching] = useState(true);
  const [idRecipe, setIdRecipe] = useState('');
  // const recipeInProgressLocal = Object.values(
  //   JSON.parse(localStorage.getItem('inProgressRecipes')),
  // );
  // const recipeInProgressKeys = Object.keys(
  //   JSON.parse(localStorage.getItem('inProgressRecipes')),
  // );
  let allCheckedIngredients = [];
  if (localStorage.getItem('checkedIngredients')) {
    allCheckedIngredients = JSON.parse(localStorage.getItem('checkedIngredients'));
  }

  const fetchRecipesInProgress = async () => {
    const splitUrl = location.split('/');
    const id = splitUrl[2];
    setIdRecipe(id);
    if (location.includes('comidas')) {
      const apiRequest = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const apiResponse = await apiRequest.json();
      setRecipeInProgress(apiResponse.meals[0]);
      // if (recipeInProgressKeys[0] === 'meals') {
      //   setRecipeNumber(0);
      // } else {
      //   setRecipeNumber(1);
      // }
    } else {
      const apiRequest = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const apiResponse = await apiRequest.json();
      setRecipeInProgress(apiResponse.drinks[0]);
      // if (recipeInProgressKeys[0] === 'cocktails') {
      //   setRecipeNumber(0);
      // } else {
      //   setRecipeNumber(1);
      // }
    }
  };

  const renderLoading = () => <h1>Loading...</h1>;

  useEffect(() => {
    setFetching(true);
    fetchRecipesInProgress();
    setFetching(false);
  }, []);

  const handleClick = () => {
    // console.log(recipeInProgressLocal);
    // console.log(idRecipe);
    // console.log(recipeInProgressLocal[0]);
  };

  const handleIngredients = (index) => {
    const ingredientMade = document.getElementById(`${index}-ingredient`);

    if (ingredientMade.style.cssText === 'text-decoration: line-through;') {
      ingredientMade.style = 'text-decoration: none';
      allCheckedIngredients.forEach((ingredient, i) => {
        if (ingredient === ingredientMade.innerHTML) {
          allCheckedIngredients.splice(i, 1);
          localStorage.setItem('checkedIngredients',
            JSON.stringify(allCheckedIngredients));
        }
      });
    } else {
      ingredientMade.style = 'text-decoration: line-through';
      allCheckedIngredients.push(ingredientMade.innerHTML);
      localStorage.setItem('checkedIngredients', JSON.stringify(allCheckedIngredients));
    }
  };

  const renderIngredients = (recipeData) => {
    const arrayIngredients = [];
    const maxIngredients = 20;

    for (let index = 1; index <= maxIngredients; index += 1) {
      if (recipeData[`strIngredient${index}`] !== ''
      && recipeData[`strIngredient${index}`] !== null
      && recipeData[`strIngredient${index}`] !== undefined
      ) {
        arrayIngredients.push({
          ingredient: recipeData[`strIngredient${index}`],
          measure: recipeData[`strMeasure${index}`],
        });
      }
    }
    return arrayIngredients;
  };

  const allIngredients = renderIngredients(recipeInProgress);

  const renderFood = () => (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipeInProgress.strMealThumb }
        alt="recipe-meal"
        width="200px"
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
      <h3 data-testid="recipe-category">{ recipeInProgress.strCategory }</h3>
      {allIngredients.map((ingredient, index) => (
        <div
          key={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          {/* {allCheckedIngredients.forEach((checkedIngredient) => (
            checkedIngredient.includes(ingredient.ingredient) ? isChecked = true : !isChecked
          ))} */}
          <input
            type="checkbox"
            id="checkbox"
            onChange={ () => handleIngredients(index) }
          />
          <p id={ `${index}-ingredient` }>
            {`${ingredient.ingredient}: ${(ingredient.measure === null)
              ? 'a gosto'
              : ingredient.measure}`}
          </p>
        </div>
      ))}
      <span data-testid="instructions">{ recipeInProgress.strInstructions }</span>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ handleClick }
      >
        Finalizar Receita
      </button>
    </div>
  );

  return (
    <div>
      {isFetching ? renderLoading() : renderFood() }
    </div>
  );
}

export default RecipesInProgress;
