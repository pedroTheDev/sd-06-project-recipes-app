import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { requestDetailsDrinks, requestFoods } from '../services/requestsAPI';
import FoodRecomendCard from '../components/FoodRecomendCard';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function DrinkDetails() {
  const url = document.URL;
  const splitedURL = url.split('/');
  const [drinkDetails, setDrinkDetails] = useState([]);
  const [ingredients, setIngredients] = useState('');
  const [apiResult, setApiResult] = useState([]);
  const [buttonText, setButtonText] = useState('Iniciar Receita');
  const [spanHidden, setSpanHidden] = useState(true);
  const [favoriteDrink, setFavoriteDrink] = useState(false);
  const zero = 0;
  const six = 6;

  useEffect(() => {
    async function fetchData() {
      const resultsDetails = await requestDetailsDrinks(splitedURL[4]);
      const drink = resultsDetails.drinks[0];
      setDrinkDetails(drink);
      const keysDrink = Object.keys(drink);
      const filterDrink = keysDrink
        .filter((key) => key.toLowerCase().includes('ingredient'));
      const filterMeasure = keysDrink.filter((key) => key
        .toLowerCase().includes('measure'));
      const allIngredients = filterDrink
        .map((item, index) => ({
          ingredient: drink[item], measure: drink[filterMeasure[index]],
        }));
      setIngredients(allIngredients);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await requestFoods();
      setApiResult(response);
    }
    fetchData();
  }, []);

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

  function copyToClipBoard(text) {
    navigator.clipboard.writeText(text);
    setSpanHidden(false);
  }

  function handleFavoriteDrink() {
    setFavoriteDrink(!favoriteDrink);
    if (favoriteDrink === false) {
      const favoriteObj = [
        {
          id: drinkDetails.idDrink,
          type: 'bebida',
          area: '',
          category: drinkDetails.strCategory,
          alcoholicOrNot: drinkDetails.strAlcoholic,
          name: drinkDetails.strDrink,
          image: drinkDetails.strDrinkThumb,
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

    // const favoriteObj = [
    //   {
    //     id: drinkDetails.idDrink,
    //     type: 'bebida',
    //     area: '',
    //     category: drinkDetails.strCategory,
    //     alcoholicOrNot: drinkDetails.strAlcoholic,
    //     name: drinkDetails.strDrink,
    //     image: drinkDetails.strDrinkThumb,
    //   },
    // ];
    // if (localStorage.getItem('favoriteRecipes') === null) {
    //   localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteObj));
    //   } else {
    //     localStorage.setItem(
    //       'favoriteRecipes',
    //       JSON.stringify([
    //         ...JSON.parse(localStorage.getItem('favoriteRecipes')),
    //         favoriteObj,
    //       ]),
    //     );
    // }
    // if (favoriteDrink === true) {
    //   setFavoriteDrink(false);
    //   const arrayDoStorage = localStorage.getItem('favoriteRecipes');
    //   const novoArray = arrayDoStorage.filter((element) => element.idDrink !== idDrink)
    //   localStorage.setItem('favoriteRecipes', novoArray)
    // }
  }

  return (
    <div>

      <img
        data-testid="recipe-photo"
        width="100px"
        src={ drinkDetails.strDrinkThumb }
        alt="Drink"
      />

      <h3 data-testid="recipe-title">
        {
          drinkDetails.strDrink
        }
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
        className={ whiteHeartIcon }
        onClick={ handleFavoriteDrink }
        src={ favoriteDrink ? blackHeartIcon : whiteHeartIcon }
      >
        <img alt="bla" src={ favoriteDrink ? blackHeartIcon : whiteHeartIcon } />
      </button>
      <h4 data-testid="recipe-category">
        {
          drinkDetails.strCategory
        }
      </h4>

      <h4>
        {
          drinkDetails.strAlcoholic
        }
      </h4>

      <div id="ingredients-div">
        {ingredients && ingredients
          .map((item, index) => (
            <p
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              {
                item.ingredient && item.measure
                  ? `${index + 1} ${item.ingredient} - ${item.measure}`
                  : null
              }
            </p>
          ))}
      </div>

      <p
        data-testid="instructions"
      >
        {drinkDetails.strInstructions}
      </p>

      <div>
        { apiResult.meals && apiResult.meals.slice(zero, six).map((element, idx) => (
          <FoodRecomendCard element={ element } idx={ idx } key={ element.idMeal } />)) }
      </div>

      <Link
        to={ `/bebidas/${drinkDetails.idDrink}/in-progress` }
      >
        <button
          type="button"
          className="start-btn"
          data-testid="start-recipe-btn"
          hidden={ localStorage.getItem('hiddenButtonDrink') }
          onClick={ handleClick }
        >
          {buttonText}
        </button>
      </Link>

      <span hidden={ spanHidden }>Link copiado!</span>
    </div>
  );
}

export default DrinkDetails;
