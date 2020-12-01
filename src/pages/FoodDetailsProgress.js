import React, { useState, useEffect } from 'react';
import { requestDetailsFood } from '../services/requestsAPI';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FoodDetailsProgress() {
  const url = document.URL;
  const actualId = url.split('/')[4];
  const [foodDetails, setFoodDetails] = useState([]);
  const [ingredients, setIngredients] = useState('');
  const [favoriteFood, setFavoriteFood] = useState(false);
  const [spanHidden, setSpanHidden] = useState(true);

  // const { location } = props;
  // const { state } = location;
  // const { foodDetailsData: foodDetails, ingredientsData: ingredients } = state;
  // console.log(foodDetails, ingredients, 'foodDetailssssss');

  useEffect(() => {
    async function fetchData() {
      const resultsDetails = await requestDetailsFood(actualId);
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
        })).filter((item) => item.ingredient !== '' && item.ingredient !== null);
      setIngredients(allIngredients);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const meuLocal = localStorage.getItem('favoriteRecipes');
    console.log('local2', meuLocal);
    if (meuLocal !== null) {
      const meuLocalArray = JSON.parse(meuLocal);
      console.log(meuLocalArray);
      // const idAtual = actualId[4];
      const findId = meuLocalArray.find((element) => element.id === actualId);
      console.log(findId);
      if (findId !== undefined) {
        setFavoriteFood(true);
      }
    }
  }, []);

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
      const arrayDoStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      console.log(arrayDoStorage);

      const novoArray = arrayDoStorage.filter((element) => element.id !== actualId);
      console.log(novoArray);

      localStorage.setItem('favoriteRecipes', JSON.stringify(novoArray));
    }
  }

  function copyToClipBoard(text) {
    const textSplice = text.split('/in-progress');
    const finalText = textSplice.join('');
    navigator.clipboard.writeText(finalText);
    setSpanHidden(false);
  }

  // function handleProgress(e) {
  // console.log(e.target);
  // // localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: {},
  // //   meals: {},
  // // }));

  // // const localStorageRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  // // console.log(localStorageRecipes);
  // // if (localStorageRecipes.meals[foodDetails.idMeal] !== e.target.value) {
  // //   console.log('entrou');
  // //   localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: {},
  // //     meals: { [foodDetails.idMeal]: [e.target.value] },
  // //   }));
  // // }
  // }

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
        src={ favoriteFood ? blackHeartIcon : whiteHeartIcon }
      >
        <img src={ favoriteFood ? blackHeartIcon : whiteHeartIcon } alt="favorite" />
      </button>

      <h4 data-testid="recipe-category">
        {foodDetails.meals && foodDetails.meals[0].strCategory}
      </h4>

      <div id="ingredients-div">
        {ingredients && ingredients
          .map((item, index) => (
            <div key={ index } data-testid={ `${index}-ingredient-step` }>
              <input
                type="checkbox"
                id={ item.ingredient }
                key={ item.ingredient }
                name={ item.ingredient }
                value={ item.ingredient }
                // onChange={ (e) => handleProgress(e) }
              />
              <label htmlFor={ item.ingredient }>
                {
                  `${index + 1} - ${item.ingredient}: ${item.measure}`
                }
              </label>
            </div>
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

      <button type="button" data-testid="finish-recipe-btn">Finalizar receita</button>
    </div>
  );
}

export default FoodDetailsProgress;
