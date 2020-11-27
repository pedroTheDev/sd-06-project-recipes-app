import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipeContext from '../hooks/RecipeContext';
import Slider from 'react-slick';
import recipeRequest from '../services/recipeRequest';
import shareIcon from '../images/share.png';
import favIcon from '../images/favHeart.png';
import '../Style/RecipeDetails.css';
import '../Style/carousel.css';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

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

  // const settingsSlider = {
  //   dots: true,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 2,
  //   slidesToScroll: 1,
  // };

  const renderRecipe = () => {
    if (pathname === `/comidas/${ids}` && recipeDetailFood.length >= 1) {
      return recipeDetailFood.map((food, index) => (
        <div key={ index } className="details-container">
          <img
            alt="product"
            data-testid="recipe-photo"
            src={ food.strMealThumb }
          />
          <h1 data-testid="recipe-title">{ food.strMeal }</h1>
          <button type="button" data-testid="share-btn">Share</button>
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
          <div className="carousel scroller">
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
                      className="card"
                    >
                      <img
                        src={ drinks.strDrinkThumb }
                        data-testid={ `${indx}-card-img` }
                        alt={ drinks.strDrink }
                      />
                      <p
                        data-testid={ `${indx}-recomendation-title` }
                        className="carousel-item"
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
      return recipeDetailDrink.map((drink, index) => (
        <div key={ index } className="details-container">
          <img
            alt="product"
            data-testid="recipe-photo"
            src={ drink.strDrinkThumb }
          />
          <div className="details-nav">
            <button type="button" data-testid="favorite-btn"><img src={favIcon} alt="favorite" /></button>
            <div className="name-category">
              <p data-testid="recipe-title" style={{fontSize: 30 + 'px'}}>{ drink.strDrink }</p>
              <p data-testid="recipe-category">{drink.strAlcoholic}</p>
            </div>
            <button type="button" data-testid="share-btn"><img src={shareIcon} alt="share" /></button>
          </div>
          <div className="recipe-ingredients">
            INGREDIENTS
            {
              handleIngredients(drink, TWENTY_ONE, THIRTY_SIX, FIFTY_ONE)
            }
          </div>
          <div className="recipe-instructions">
            INSTRUCTIONS
            <p data-testid="instructions">{ drink.strInstructions }</p>
          </div>
          <div className="carousel scroller">
            <span class="btn prev"> Prev </span>
            <span class="btn next"> Next </span>
              {
                foodRecommendation && foodRecommendation.length && foodRecommendation
                  .filter((_, index) => index < six)
                  .map((meals, index) => (
                    <div
                          className="card"
                          data-testid={ `${index}-recomendation-card` }
                          key="index"
                        >
                      <Link
                        onClick={ () => setIds(meals.idMeal) }
                        to={ `/comidas/${meals.idMeal}` }
                        key={ index }
                      >
                        <img
                          src={ meals.strMealThumb }
                          data-testid={ `${index}-card-img` }
                          alt={ meals.strMeal }
                        />
                        <p className="carousel-item" data-testid={ `${index}-recomendation-title` }>{ meals.strMeal}</p>
                      </Link>
                    </div>
                  ))
                }
          </div>
                {/* </Slider> */}
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
