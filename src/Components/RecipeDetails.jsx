import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipeContext from '../hooks/RecipeContext';
import recipeRequest from '../services/recipeRequest';

const RecipeDetails = () => {
  const six = 6;
  const history = useHistory();
  const {
    foodRecommendation,
    setFoodRecommendation,
    DrinkRecommendation,
    setIds,
    setDrinkRecommendation } = useContext(RecipeContext);
  const [recipeDetailFood, setRecipeDetailFood] = useState([]);
  const [recipeDetailDrink, setRecipeDetailDrink] = useState('foi');
  const { pathname } = history.location;
  const ids = pathname.split('/')[2];

  const getAPI = async () => {
    const food = await recipeRequest(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ids}`);
    const recipeFood = await food.meals;
    const drink = await recipeRequest(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ids}`);
    const recipeDrink = await drink.drinks;
    setRecipeDetailFood(recipeFood);
    setRecipeDetailDrink(recipeDrink);
  };

  const getRecommendation = async () => {
    const foods = await recipeRequest('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const foodsData = await foods.meals;
    const drinks = await recipeRequest('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const drinksData = await drinks.drinks;
    setFoodRecommendation(foodsData);
    setDrinkRecommendation(drinksData);
  };

  useEffect(() => {
    getAPI();
    getRecommendation();
  }, []);

  const handleIngredientsFood = () => {
    const NINE = 9;
    const TWENTY_NINE = 29;
    const FOURTY_NINE = 49;
    const ingredients = Object.values(recipeDetailFood[0]).slice(NINE, TWENTY_NINE);
    const measures = Object.values(recipeDetailFood[0]).slice(TWENTY_NINE, FOURTY_NINE);
    return ingredients.filter((food) => food !== '').map((ingredient, index) => (
      <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
        { `${ingredient} - ${measures[index]}` }
      </li>
    ));
  };

  const handleIngredientsDrinks = () => {
    const THIRTY_SIX = 36;
    const TWENTY_ONE = 21;
    const FIFTY_ONE = 51;
    const ingredients = Object.values(recipeDetailDrink[0]).slice(TWENTY_ONE, THIRTY_SIX);
    const measures = Object.values(recipeDetailDrink[0]).slice(THIRTY_SIX, FIFTY_ONE);
    return ingredients
      .filter((drink) => drink !== null && drink !== '').map((ingredient, index) => (
        <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          { `${ingredient} - ${measures[index]}` }
        </li>
      ));
  };

  const renderRecipe = () => {
    if (pathname === `/comidas/${ids}` && recipeDetailFood.length >= 1) {
      return (
        <div>
          <img
            alt="product"
            data-testid="recipe-photo"
            src={ recipeDetailFood[0].strMealThumb }
          />
          <h1 data-testid="recipe-title">{ recipeDetailFood[0].strMeal }</h1>
          <button type="button" data-testid="share-btn">Share</button>
          <button type="button" data-testid="favorite-btn">Favorite</button>
          <p data-testid="recipe-category">{ recipeDetailFood[0].strCategory }</p>
          {
            handleIngredientsFood()
          }
          <p data-testid="instructions">{ recipeDetailFood[0].strInstructions }</p>
          <video data-testid="video" width="750" height="500" controls>
            <source src={ recipeDetailFood[0].strYoutube } type="video/mp4" />
            <track src={ recipeDetailFood[0].strYoutube } kind="captions" />
          </video>
          <div>
            {
              DrinkRecommendation && DrinkRecommendation.length && DrinkRecommendation
                .filter((_, index) => index < six)
                .map((drinks, index) => (
                  <Link
                    onClick={ () => setIds(drinks.idDrink) }
                    to={ `/bebidas/${drinks.idDrink}` }
                    key={ index }
                  >
                    <div
                      data-testid={ `${index}-recomendation-card` }
                      key="index"
                    >
                      <img
                        src={ drinks.strDrinkThumb }
                        data-testid={ `${index}-card-img` }
                        alt={ drinks.strDrink }
                      />
                      <p
                        data-testid={ `${index}-recomendation-title` }
                      >
                        { drinks.strDrink}
                      </p>
                    </div>
                  </Link>
                ))
            }
          </div>
          <button
            type="button"
            data-testid="start-recipe-btn"
            style={ { position: 'fixed', bottom: 0 } }
            onClick={ () => history.push(`${pathname}/in-progress`) }
          >
            Start Recipe
          </button>
        </div>
      );
    }
    if (recipeDetailDrink[0].strDrink) {
      return recipeDetailDrink.map((drink) => (
        <div key="1">
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
          <div>
            {
              foodRecommendation && foodRecommendation.length && foodRecommendation
                .filter((_, index) => index < six)
                .map((meals, index) => (
                  <Link
                    onClick={ () => setIds(meals.idMeal) }
                    to={ `/comidas/${meals.idMeal}` }
                    key={ index }
                  >
                    <div
                      data-testid={ `${index}-recomendation-card` }
                      key="index"
                    >
                      <img
                        src={ meals.strMealThumb }
                        data-testid={ `${index}-card-img` }
                        alt={ meals.strMeal }
                      />
                      <p data-testid={ `${index}-card-name` }>{ meals.strMeal}</p>
                    </div>
                  </Link>
                ))
            }
          </div>
          <button
            type="button"
            data-testid="start-recipe-btn"
            style={ { position: 'fixed', bottom: 0 } }
            onClick={ () => history.push(`${pathname}/in-progress`) }
          >
            Start Recipe
          </button>
        </div>
      ));
    }
  };
  return (
    <div>
      { renderRecipe() }
    </div>
  );
};

export default RecipeDetails;
