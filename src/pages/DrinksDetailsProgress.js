import React, { useContext, useEffect, useState } from 'react';
import { requestDetailsDrinks } from '../services/requestsAPI';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function DrinksDetailsProgress() {
  const url = document.URL;
  const actualId = url.split('/')[4];
  const { resultsFoodsAndDrinks } = useContext(RecipesContext);
  console.log(resultsFoodsAndDrinks);
  const [drinkDetails, setDrinkDetails] = useState([]);
  const [ingredients, setIngredients] = useState('');
  const [spanHidden, setSpanHidden] = useState(true);
  const [favoriteDrink, setFavoriteDrink] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const resultsDetails = await requestDetailsDrinks(actualId);
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
        })).filter((item) => item.ingredient !== '' && item.ingredient !== null);
      console.log(allIngredients);
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
        setFavoriteDrink(true);
      }
    }
  }, []);

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
      if (favoriteDrink === true) {
        setFavoriteDrink(false);
        const arrayDoStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
        console.log(arrayDoStorage);
        const novoArray = arrayDoStorage.filter((element) => element.id !== actualId);
        console.log(novoArray);
        localStorage.setItem('favoriteRecipes', JSON.stringify(novoArray));
      }
    }
  }

  function handleCheckboxChange(e) {
    localStorage.setItem('inProgressRecipes', {
      cocktails: {},
      meals: {},
    });
    console.log(e.target.value);
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
            <div key={ index } data-testid={ `${index}-ingredient-step` }>
              <label htmlFor={ item.ingredient }>
                <input
                  type="checkbox"
                  id={ item.ingredient }
                  key={ index }
                  onChange={ (e) => handleCheckboxChange(e) }
                  value={ item.ingredient }
                />
                {
                  `${index + 1} - ${item.ingredient}: ${item.measure}`
                }
              </label>
            </div>
          ))}
      </div>

      <p
        data-testid="instructions"
      >
        {drinkDetails.strInstructions}
      </p>

      <span hidden={ spanHidden }>Link copiado!</span>
      <button type="button" data-testid="finish-recipe-btn">Finalizar receita</button>
    </div>
  );
}

export default DrinksDetailsProgress;
