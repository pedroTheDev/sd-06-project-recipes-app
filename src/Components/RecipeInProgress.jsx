import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import RecipeContext from '../hooks/RecipeContext';
import recipeRequest from '../services/recipeRequest';

const RecipeInProgress = () => {
  const history = useHistory();
  const { pathname } = history.location;
  const id = pathname.split('/')[2];
  const [recipeDetailDrink, setRecipeDetailDrink] = useState([]);
  const [recipeDetailFood, setRecipeDetailFood] = useState([]);
  const [disable, setDisable] = useState(true);
  // const { inProgressRecipes, setInProgressRecipes } = useContext(RecipeContext);
  const getAPI = async () => {
    const food = await recipeRequest(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const recipeFood = await food.meals;
    const drink = await recipeRequest(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const recipeDrink = await drink.drinks;
    setRecipeDetailDrink(recipeDrink);
    setRecipeDetailFood(recipeFood);
  };

  useEffect(() => {
    getAPI();
  }, []);

  const handleCheckbox = () => {
    /* if (target.checked === true) {
      const progress = {
        ...inProgressRecipes,
        meals: { ...inProgressRecipes.meals, [id]: [target.id] },
      };
      setInProgressRecipes(progress);
      localStorage.inProgressRecipes = JSON.stringify(progress);
    }
    */
    const items = document.getElementsByClassName('checks');
    const arr = Array.from(items);
    if (arr.every((item) => item.checked === true)) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  const handleIngredientsFood = () => {
    const NINE = 9;
    const TWENTY_NINE = 29;
    const FOURTY_NINE = 49;
    const ingredients = Object.values(recipeDetailFood[0]).slice(NINE, TWENTY_NINE);
    const measures = Object.values(recipeDetailFood[0]).slice(TWENTY_NINE, FOURTY_NINE);
    return ingredients
      .filter((food) => food !== null && food !== '').map((ingredient, index) => (
        <div
          key={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          <label htmlFor={ ingredient }>
            <input
              className="checks"
              type="checkbox"
              id={ ingredient }
              onChange={ handleCheckbox }
            />
            { `${ingredient} - ${measures[index]}` }
          </label>
        </div>
      ));
  };

  const handleIngredientsDrinks = () => {
    const THIRTY_SIX = 36;
    const TWENTY_ONE = 21;
    const FIFTY_ONE = 51;
    const ingredients = Object.values(recipeDetailDrink[0]).slice(TWENTY_ONE, THIRTY_SIX);
    const measures = Object.values(recipeDetailDrink[0]).slice(THIRTY_SIX, FIFTY_ONE);
    console.log(ingredients, measures);
    return ingredients
      .filter((drink) => drink !== null && drink !== '').map((ingredient, index) => (
        <div
          key={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          <label htmlFor={ ingredient }>
            <input
              className="checks"
              type="checkbox"
              id={ ingredient }
              onChange={ handleCheckbox }
            />
            { `${ingredient} - ${measures[index]}` }
          </label>
        </div>
      ));
  };

  if (pathname === `/comidas/${id}/in-progress`) {
    return recipeDetailFood.map((food) => (
      <div key="1">
        <img
          alt="product"
          data-testid="recipe-photo"
          src={ food.strMealThumb }
        />
        <h1 data-testid="recipe-title">{ food.strMeal }</h1>
        <button type="button" data-testid="share-btn">Share</button>
        <button type="button" data-testid="favorite-btn">Favorite</button>
        <p data-testid="recipe-category">{ food.strCategory }</p>
        {
          handleIngredientsFood()
        }
        <p data-testid="instructions">{ food.strInstructions }</p>
        <Link to="/receitas-feitas">
          <button
            data-testid="finish-recipe-btn"
            type="button"
            disabled={ disable }
          >
            Finalizar
          </button>
        </Link>
      </div>
    ));
  }
  return recipeDetailDrink.map((drink) => (
    <div key="2">
      <img
        alt="product"
        data-testid="recipe-photo"
        src={ drink.strDrinkThumb }
      />
      <h1 data-testid="recipe-title">{ drink.strDrink }</h1>
      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      <p data-testid="recipe-category">{drink.strAlcoholic}</p>
      {
        handleIngredientsDrinks()
      }
      <p data-testid="instructions">{ drink.strInstructions }</p>
      <Link to="/receitas-feitas">
        <button
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ disable }
        >
          Finalizar
        </button>
      </Link>
    </div>
  ));
};

export default RecipeInProgress;
