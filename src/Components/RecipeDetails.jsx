import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecipeContext from '../hooks/RecipeContext';
import recipeRequest from '../services/recipeRequest';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const RecipeDetails = () => {
  const six = 6;
  const history = useHistory();
  const {
    foodRecommendation,
    setFoodRecommendation,
    DrinkRecommendation,
    handleLikes,
    setIds,
    liked,
    setLiked,
    setDrinkRecommendation } = useContext(RecipeContext);
  const [recipeDetailFood, setRecipeDetailFood] = useState([]);
  const [recipeDetailDrink, setRecipeDetailDrink] = useState(undefined);
  const [copied, setCopied] = useState('');
  const { pathname } = history.location;
  const ids = pathname.split('/')[2];
  const kindof = pathname.split('/')[1];
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

  const usarNoUse = async () => {
    await getAPI();
    await getRecommendation();
    if (!localStorage.favoriteRecipes) {
      localStorage.favoriteRecipes = JSON.stringify([]);
    }
    const favoriteStorage = JSON.parse(localStorage.favoriteRecipes)
      .filter((item) => item.id === ids);
    if (favoriteStorage.length >= 1) {
      setLiked(blackHeartIcon);
    } else {
      setLiked(whiteHeartIcon);
    }
  };

  const inProgressCheck = () => {
    if (kindof === 'comidas') {
      if (!localStorage.inProgressRecipes) {
        localStorage.inProgressRecipes = JSON.stringify({
          cocktails: {}, meals: { [ids]: '' } });
      } else if (JSON.parse(localStorage.inProgressRecipes).meals[ids]) {
        // const reset = JSON.parse(localStorage.inProgressRecipes = )
        localStorage.inProgressRecipes = JSON.stringify(
          { ...JSON.parse(localStorage.inProgressRecipes),
            meals: { ...JSON.parse(localStorage.inProgressRecipes).meals },
          },
        );
      } else {
        localStorage.inProgressRecipes = JSON.stringify(
          { ...JSON.parse(localStorage.inProgressRecipes),
            meals: { ...JSON.parse(localStorage.inProgressRecipes).meals, [ids]: '' },
          },
        );
      }
    } else if (!localStorage.inProgressRecipes) {
      localStorage.inProgressRecipes = JSON.stringify({
        cocktails: { [ids]: '' }, meals: {} });
    } else if (JSON.parse(localStorage.inProgressRecipes).cocktails[ids]) {
      // const reset = JSON.parse(localStorage.inProgressRecipes = )
      localStorage.inProgressRecipes = JSON.stringify(
        { ...JSON.parse(localStorage.inProgressRecipes),
          cocktails: { ...JSON.parse(localStorage.inProgressRecipes).cocktails },
        },
      );
    } else {
      localStorage.inProgressRecipes = JSON.stringify(
        { ...JSON.parse(localStorage.inProgressRecipes),
          cocktails: { ...JSON.parse(localStorage.inProgressRecipes)
            .cocktails,
          [ids]: '' },
        },
      );
    }
  };
  useEffect(() => {
    usarNoUse();
    inProgressCheck();
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
    copy(window.location.href);
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
          <button
            onClick={ handleCopy }
            type="button"
            data-testid="share-btn"
          >
            Share

          </button>

          {copied}
          <div>
            <button
              onClick={ () => handleLikes(recipeDetailFood[0]) }
              type="button"
            >
              <img data-testid="favorite-btn" src={ liked } alt="favorite logo" />
            </button>
          </div>
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
                      key={ indx }
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
          {(JSON.parse(localStorage.inProgressRecipes).meals[ids] !== '') ? (
            <button
              type="button"
              style={ { position: 'fixed', bottom: 0 } }
              data-testid="start-recipe-btn"
              onClick={ () => history.push(`${pathname}/in-progress`) }
            >
              Continuar Receita
            </button>
          ) : (
            <button
              type="button"
              data-testid="start-recipe-btn"
              style={ { position: 'fixed', bottom: 0 } }
              onClick={ () => history.push(`${pathname}/in-progress`) }
            >
              Start Recipe
            </button>)}
        </div>
      ));
    }
    if (recipeDetailDrink !== undefined) {
      return recipeDetailDrink.map((drink, index) => (
        <div key={ index }>
          <img
            alt="product"
            data-testid="recipe-photo"
            src={ drink.strDrinkThumb }
          />
          <h1 data-testid="recipe-title">{ drink.strDrink }</h1>
          <button
            onClick={ handleCopy }
            type="button"
            data-testid="share-btn"
          >
            Share
          </button>
          { copied }
          <div>
            <button
              onClick={ () => handleLikes(recipeDetailFood, recipeDetailDrink[0]) }
              type="button"
            >
              <img data-testid="favorite-btn" src={ liked } alt="favorite logo" />
            </button>
          </div>
          <p data-testid="recipe-category">{drink.strAlcoholic}</p>
          {
            handleIngredients(drink, TWENTY_ONE, THIRTY_SIX, FIFTY_ONE)
          }
          <p data-testid="instructions">{ drink.strInstructions }</p>
          <div>
            {
              foodRecommendation && foodRecommendation.length && foodRecommendation
                .filter((_, indx) => indx < six)
                .map((meals, indexs) => (
                  <Link
                    onClick={ () => setIds(meals.idMeal) }
                    to={ `/comidas/${meals.idMeal}` }
                    key={ indexs }
                  >
                    <div
                      data-testid={ `${indexs}-recomendation-card` }
                      key="index"
                    >
                      <img
                        src={ meals.strMealThumb }
                        data-testid={ `${indexs}-card-img` }
                        alt={ meals.strMeal }
                      />
                      <p data-testid={ `${indexs}-card-name` }>{ meals.strMeal}</p>
                    </div>
                  </Link>
                ))
            }
          </div>
          {(JSON.parse(localStorage.inProgressRecipes).cocktails[ids] !== '') ? (
            <button
              type="button"
              style={ { position: 'fixed', bottom: 0 } }
              data-testid="start-recipe-btn"
              onClick={ () => history.push(`${pathname}/in-progress`) }
            >
              Continuar Receita
            </button>
          ) : (
            <button
              type="button"
              data-testid="start-recipe-btn"
              style={ { position: 'fixed', bottom: 0 } }
              onClick={ () => history.push(`${pathname}/in-progress`) }
            >
              Start Recipe
            </button>)}
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
