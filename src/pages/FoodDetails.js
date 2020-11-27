import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { requestDetailsFood, requestDrinks } from '../services/requestsAPI';
import DrinkRecomendCard from '../components/DrinkRecomendCard';
import '../style/FoodAndDrinkDetails.css';

function FoodDetails() {
  const url = document.URL;
  const splitedURL = url.split('/');
  const [foodDetails, setFoodDetails] = useState([]);
  const [ingredients, setIngredients] = useState('');
  const [apiResult, setApiResult] = useState([]);
  const [spanHidden, setSpanHidden] = useState(true);
  const [favoriteFood, setFavoriteFood] = useState('non-favorite');
  const zero = 0;
  const six = 6;

  useEffect(() => {
    const teste = foodDetails;
    async function fetchData() {
      const resultsDetails = await requestDetailsFood(splitedURL[4]);
      const meal = resultsDetails.meals[0];
      setFoodDetails(meal);
      console.log(meal);
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
    console.log('teste', teste);
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
    const input = document.body.appendChild(document.createElement('input'));
    input.value = text;
    input.focus();
    input.select();
    document.execCommand('copy');
    input.parentNode.removeChild(input);
    setSpanHidden(false);
  }

  function handleFavoriteFood() {
    if (favoriteFood === 'non-favorite') {
      setFavoriteFood('favorite');
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
      localStorage.setItem('Favorite-Food', JSON.stringify(favoriteObj));
      console.log('Favorite', favoriteObj);
      // console.log(foodDetails);
      console.log('entrou1', favoriteFood);
    }
    if (favoriteFood === 'favorite') {
      setFavoriteFood('non-favorite');
      console.log('entrou2', favoriteFood);
    }
  }

  return (
    <div>

      <img
        data-testid="recipe-photo"
        width="100px"
        src={ foodDetails.meals && foodDetails.meals[0].strMealThumb }
        alt="Meal"
      />

      <h3 data-testid="recipe-title">
        {foodDetails.meals && foodDetails.meals[0].strMeal}
      </h3>

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
        {foodDetails.meals && foodDetails.meals[0].strInstructions}
      </p>

      <video data-testid="video" width="750" height="500" controls>
        <source
          src={ foodDetails.meals && foodDetails.meals[0].strYoutube }
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

      <button
        type="button"
        data-testid="share-btn"
        className="share-btn"
        onClick={ () => copyToClipBoard(document.URL) }
      >
        Compartilhar
      </button>

      <button
        type="button"
        data-testid="favorite-btn"
        className={ favoriteFood }
        onClick={ handleFavoriteFood }
      >
        Favorito
      </button>

      <Link
        to={ `/comidas/${foodDetails.meals && foodDetails.meals[0].idMeal}/in-progress` }
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
      <span hidden={ spanHidden }>Link copiado!</span>
    </div>
  );
}

export default FoodDetails;
