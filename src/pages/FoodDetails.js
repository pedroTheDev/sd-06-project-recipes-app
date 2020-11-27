import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { requestDetailsFood, requestDrinks } from '../services/requestsAPI';
import DrinkRecomendCard from '../components/DrinkRecomendCard';
import '../style/FoodAndDrinkDetails.css';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FoodDetails() {
  const url = document.URL;
  const splitedURL = url.split('/');
  const [foodDetails, setFoodDetails] = useState([]);
  const [ingredients, setIngredients] = useState('');
  const [apiResult, setApiResult] = useState([]);
  const [spanHidden, setSpanHidden] = useState(true);
  const [favoriteFood, setFavoriteFood] = useState(false);
  const zero = 0;
  const six = 6;

  useEffect(() => {
    async function fetchData() {
      const resultsDetails = await requestDetailsFood(splitedURL[4]);
      const meal = resultsDetails.meals[0];
      setFoodDetails(meal);
      const keysMeal = Object.keys(meal);
      const filterMeal = keysMeal
        .filter((key) => key.toLowerCase().includes('ingredient'));
      const filterMeasure = keysMeal
        .filter((key) => key.toLowerCase().includes('measure'));
      const allIngredients = filterMeal
        .map((item, index) => ({
          ingredient: meal[item], measure: meal[filterMeasure[index]],
        }));
      setIngredients(allIngredients);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await requestDrinks();
      setApiResult(response);
    }
    fetchData();
  }, []);

  function handleClick() {
    localStorage.setItem('hiddenButtonFood', true);
  }

  function copyToClipBoard(text) {
    navigator.clipboard.writeText(text);
    setSpanHidden(false);
  }

  function handleFavoriteFood() {
    if (favoriteFood === false) {
      console.log('entrou');
      setFavoriteFood(true);
      const favoriteObj = [
        {
          id: foodDetails.idMeal,
          type: 'comida',
          area: foodDetails.strArea,
          category: foodDetails.strCategory,
          alcoholicOrNot: '',
          name: foodDetails.strMeal,
          image: foodDetails.strMealThumb,
        },
      ];
      if (localStorage.getItem('favoriteRecipes') === null) {
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteObj));
      } else {
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify([
            ...JSON.parse(localStorage.getItem('favoriteRecipes')),
            favoriteObj,
          ]),
        );
      }
    }
    if (favoriteFood === true) {
      setFavoriteFood(false);
      console.log('entrou2', favoriteFood);
    }
  }

  return (
    <div>

      <img
        data-testid="recipe-photo"
        width="100px"
        src={ foodDetails.strMealThumb }
        alt="Meal"
      />

      <h3 data-testid="recipe-title">
        {foodDetails.strMeal}
      </h3>

      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => copyToClipBoard(document.URL) }
      >
        <img src={ shareIcon } alt="Share" />
      </button>

      <span hidden={ spanHidden }>Link copiado!</span>

      <button
        aria-label="favorite-button"
        type="button"
        data-testid="favorite-btn"
        onClick={ handleFavoriteFood }
        src={ favoriteFood ? whiteHeartIcon : blackHeartIcon }
      />

      <h4 data-testid="recipe-category">
        {foodDetails.meals && foodDetails.meals[0].strCategory}
      </h4>

      <div id="ingredients-div">
        {ingredients && ingredients.map((item, index) => (
          <p data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
            {`${index + 1} ${item.ingredient} - ${item.measure}`}
          </p>
        ))}
      </div>

      <p data-testid="instructions">
        {foodDetails.strInstructions}
      </p>

      <video data-testid="video" width="750" height="500" controls>
        <source
          src={ foodDetails.strYoutube }
          type="video/mp4"
        />
        <track src="" kind="captions" />
      </video>

      <div>
        { apiResult.drinks && apiResult.drinks.slice(zero, six).map((element, idx) => (
          <DrinkRecomendCard
            element={ element }
            idx={ idx }
            key={ element.idDrink }
          />
        )) }
      </div>

      <Link
        to={ `/comidas/${foodDetails.idMeal}/in-progress` }
      >
        <button
          type="button"
          className="start-btn"
          data-testid="start-recipe-btn"
          hidden={ localStorage.getItem('hiddenButtonFood') }
          onClick={ handleClick }
        >
          Iniciar Receita
        </button>
      </Link>

      <Link
        to={ `/comidas/${foodDetails.meals && foodDetails.meals[0].idMeal}/in-progress` }
      >
        <button
          type="button"
          className="start-btn"
          data-testid="start-recipe-btn"
          hidden={ !localStorage.getItem('hiddenButtonFood') }
          onClick={ handleClick }
        >
          Continuar Receita
        </button>
      </Link>
      <br />
      <br />
      <br />
    </div>
  );
}

export default FoodDetails;
