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

  console.log(foodDetails.meals);

  useEffect(() => {
    async function fetchData() {
      const resultsDetails = await requestDetailsFood(splitedURL[4]);
      setFoodDetails(resultsDetails);
      const meal = resultsDetails.meals[0];
      const keysMeal = Object.keys(meal);
      const filterMeal = keysMeal.filter((key) => key.toLowerCase().includes('ingredient'));
      const filterMeasure = keysMeal.filter((key) => key.toLowerCase().includes('measure'));
      const allIngredients = filterMeal
        .map((item, index) => ({ ingredient: meal[item], measure: meal[filterMeasure[index]] }));
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
    localStorage.setItem('hiddenButton', true);
  }

  return (
    <div>
      <img
        data-testid="recipe-photo"
        width="100px"
        src={foodDetails.meals && foodDetails.meals[0].strMealThumb}
        alt="Meal"
      />
      <h3 data-testid="recipe-title">{foodDetails.meals && foodDetails.meals[0].strMeal}</h3>
      <h4 data-testid="recipe-category">{foodDetails.meals && foodDetails.meals[0].strCategory}</h4>
      <div id="ingredients-div">
        {ingredients && ingredients.map((item, index) => (<p data-testid={`${index}-ingredient-name-and-measure`}>{`${index + 1} ${item.ingredient} - ${item.measure}`}</p>))}
      </div>
      <p data-testid="instructions">{foodDetails.meals && foodDetails.meals[0].strInstructions}</p>
      <video data-testid="video" width="750" height="500" controls>
        <source src={foodDetails.meals && foodDetails.meals[0].strYoutube} type="video/mp4" />
        <track src="" kind="captions" />
      </video>
      <div>
        { apiResult.drinks && apiResult.drinks.slice(12, 18).map((element, idx) => (
          <DrinkRecomendCard element={element} idx={idx} key={element.idDrink} />)) }
      </div>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favorito</button>
      <Link to={`/comidas/${foodDetails.meals && foodDetails.meals[0].idMeal}/in-progress`}>
        <button type="button" className="start-btn" data-testid="start-recipe-btn" hidden={localStorage.getItem('hiddenButton')} onClick={handleClick}>Iniciar Receita</button>
      </Link>
    </div>
  );
}

export default FoodDetails;
