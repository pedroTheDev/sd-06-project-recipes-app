import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { requestDetailsDrinks, requestFoods } from '../services/requestsAPI';
import FoodRecomendCard from '../components/FoodRecomendCard';
import '../style/FoodAndDrinkDetails.css';

function DrinkDetails() {
  const url = document.URL;
  const splitedURL = url.split('/');
  const [drinkDetails, setDrinkDetails] = useState([]);
  const [ingredients, setIngredients] = useState('');
  const [apiResult, setApiResult] = useState([]);

  console.log(drinkDetails.meals);

  useEffect(() => {
    async function fetchData() {
      const resultsDetails = await requestDetailsDrinks(splitedURL[4]);
      setDrinkDetails(resultsDetails);

      const drink = resultsDetails.drinks[0];
      const keysDrink = Object.keys(drink);

      const filterDrink = keysDrink.filter((key) => key.toLowerCase().includes('ingredient'));

      const filterMeasure = keysDrink.filter((key) => key.toLowerCase().includes('measure'));

      const allIngredients = filterDrink
        .map((item, index) => ({ ingredient: drink[item], measure: drink[filterMeasure[index]] }));
      setIngredients(allIngredients);

      const response = await requestFoods();
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
        src={drinkDetails.drinks && drinkDetails.drinks[0].strDrinkThumb}
        alt="Meal"
      />
      <h3 data-testid="recipe-title">{drinkDetails.drinks && drinkDetails.drinks[0].strDrink}</h3>
      <h4 data-testid="recipe-category">{drinkDetails.drinks && drinkDetails.drinks[0].strCategory}</h4>
      <h4>{drinkDetails.drinks && drinkDetails.drinks[0].strAlcoholic}</h4>
      <div id="ingredients-div">
        {ingredients && ingredients.map((item, index) => (<p data-testid={`${index}-ingredient-name-and-measure`}>{`${index + 1} ${item.ingredient} - ${item.measure}`}</p>))}
      </div>
      <p data-testid="instructions">{drinkDetails.drinks && drinkDetails.drinks[0].strInstructions}</p>
      <video data-testid="video" width="750" height="500" controls>
        <source src={drinkDetails.drinks && drinkDetails.drinks[0].strYoutube} type="video/mp4" />
        <track src="" kind="captions" />
      </video>
      <div>
        { apiResult.meals && apiResult.meals.slice(12, 18).map((element, idx) => (
          <FoodRecomendCard element={element} idx={idx} key={element.idMeal} />)) }
      </div>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favorito</button>
      <Link to={`/bebidas/${drinkDetails.drinks && drinkDetails.drinks[0].idDrink}/in-progress`}>
        <button type="button" className="start-btn" data-testid="start-recipe-btn" hidden={localStorage.getItem('hiddenButton')} onClick={handleClick}>Iniciar Receita</button>
      </Link>
    </div>
  );
}

export default DrinkDetails;
