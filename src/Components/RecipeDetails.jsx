import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Clipboard from 'react-clipboard.js';
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
  const [copied, setCopied] = useState('');
  const { pathname } = history.location;
  const ids = pathname.split('/')[2];
  const NINE = 9;
  const TWENTY_NINE = 29;
  const FOURTY_NINE = 49;

  const THIRTY_SIX = 36;
  const TWENTY_ONE = 21;
  const FIFTY_ONE = 51;

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

  const handleIngredients = (recipe, initial, middle, end) => {
    const ingredients = Object.values(recipe).slice(initial, middle);
    const measures = Object.values(recipe).slice(middle, end);
    return ingredients
      .filter((recipes) => recipes !== null && recipes !== '')
      .map((ingredient, index) => (
        <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          { `${ingredient} - ${measures[index]}` }
        </li>
      ));
  };

  const handleCopy = () => {
    const TWO = 2000;
    setCopied('Link copiado!');
    setInterval(() => setCopied(''), TWO);
  };

  const renderRecipe = () => {
    if (pathname === `/comidas/${ids}` && recipeDetailFood.length >= 1) {
      return recipeDetailFood.map((food, index) => (
        <div key={ index }>
          <img
            alt="product"
            data-testid="recipe-photo"
            src={ food.strMealThumb }
          />
          <h1 data-testid="recipe-title">{ food.strMeal }</h1>
          <Clipboard
            data-clipboard-text={ window.location.href }
            onClick={ handleCopy }
            type="button"
            data-testid="share-btn"
          >
            Share

          </Clipboard>

          {copied}
          <button type="button" data-testid="favorite-btn">Favorite</button>
          <p data-testid="recipe-category">{ recipeDetailFood[0].strCategory }</p>
          {
            handleIngredients(food, NINE, TWENTY_NINE, FOURTY_NINE)
          }
          <p data-testid="instructions">{ food.strInstructions }</p>
          <video data-testid="video" width="750" height="500" controls>
            <source src={ food.strYoutube } type="video/mp4" />
            <track src={ food.strYoutube } kind="captions" />
          </video>
          <div>
            {
              DrinkRecommendation && DrinkRecommendation.length && DrinkRecommendation
                .filter((_, indexs) => indexs < six)
                .map((drinks, indx) => (
                  <Link
                    onClick={ () => setIds(drinks.idDrink) }
                    to={ `/bebidas/${drinks.idDrink}` }
                    key={ indx }
                  >
                    <div
                      data-testid={ `${indx}-recomendation-card` }
                      key="index"
                    >
                      <img
                        src={ drinks.strDrinkThumb }
                        data-testid={ `${indx}-card-img` }
                        alt={ drinks.strDrink }
                      />
                      <p
                        data-testid={ `${indx}-recomendation-title` }
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
      ));
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
          <Clipboard
            data-clipboard-text={ window.location.href }
            onClick={ handleCopy }
            type="button"
            data-testid="share-btn"
          >
            Share
          </Clipboard>
          { copied }
          <button type="button" data-testid="favorite-btn">Favorite</button>
          <p data-testid="recipe-category">{drink.strAlcoholic}</p>
          {
            handleIngredients(drink, TWENTY_ONE, THIRTY_SIX, FIFTY_ONE)
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
