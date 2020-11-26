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
  const [buttonText, setButtonText] = useState('Iniciar Receita');
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

  // useEffect(() => {
  //   if (buttonText === 'Iniciar Receita') {
  //     setButtonText('Continuar Receita');
  //   } setButtonText('Iniciar Receita');
  // }, [buttonText]);

  function handleClick() {
    localStorage.setItem('iniciou?', true);
    console.log(buttonText);
    if (localStorage.getItem('hiddenButtonDrink') === true) {
      console.log('entrou');
      setButtonText('Continuar Receita');
      // localStorage.setItem('hiddenButtonDrink', false);
    } setButtonText('Iniciar Receita');
  }

  // function ttt() {
  //   if (localStorage.getItem('hiddenButtonDrink') === true) {
  //     setButtonText('Iniciar Receita');
  //   } setButtonText('Continuar Receita');
  // }

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
      <div>
        { apiResult.meals && apiResult.meals.slice(12, 18).map((element, idx) => (
          <FoodRecomendCard element={element} idx={idx} key={element.idMeal} />)) }
      </div>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favorito</button>
      <Link to={`/bebidas/${drinkDetails.drinks && drinkDetails.drinks[0].idDrink}/in-progress`}>
        <button type="button" className="start-btn" data-testid="start-recipe-btn" hidden={localStorage.getItem('hiddenButtonDrink')} onClick={handleClick}>{buttonText}</button>
      </Link>
    </div>
  );
}

export default DrinkDetails;
