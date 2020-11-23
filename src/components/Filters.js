import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import DrinksDetails from '../pages/DrinksDetails';
import {
  requestIngredients,
  requestName,
  requestFirstLetter,
  requestDrinksIngredients,
  requestDrinksName,
  requestDrinksFirstLetter,
} from '../services/requestsAPI';

function Filters() {
  const [radioValue, setRadioValue] = useState('');
  const { resultsFoodsAndDrinks, setResultsFoodsAndDrinks } = useContext(RecipesContext);

  const { valueInput } = useContext(RecipesContext);

  function handleRadio({ target }) {
    const targetValue = target.value;
    if (targetValue === 'ingredients') {
      return setRadioValue(targetValue);
    }
    if (targetValue === 'name') {
      return setRadioValue(targetValue);
    }
    if (targetValue === 'firstLetter') {
      return setRadioValue(targetValue);
    }
    return null;
  }

  async function handleClick() {
    const url = document.URL;
    const splitedURL = url.split('/');
    if (splitedURL[3] === 'comidas') {
      if (radioValue === 'ingredients') {
        const resultIngredients = await requestIngredients(valueInput);
        console.log(resultIngredients);
        return setResultsFoodsAndDrinks(resultIngredients);
      }
      if (radioValue === 'name') {
        const resultName = await requestName(valueInput);
        console.log(resultName);
        return setResultsFoodsAndDrinks(resultName);
      }
      if (radioValue === 'firstLetter' && valueInput.length === 1) {
        const resultFirstLetter = await requestFirstLetter(valueInput);
        console.log(resultFirstLetter);
        return setResultsFoodsAndDrinks(resultFirstLetter);
      }
      if (radioValue === 'firstLetter' && valueInput.length > 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
      }
    }

    if (splitedURL[3] === 'bebidas') {
      if (radioValue === 'ingredients') {
        const resultDrinksIngredients = await requestDrinksIngredients(valueInput);
        console.log(resultDrinksIngredients);
        return setResultsFoodsAndDrinks(resultDrinksIngredients);
      }
      if (radioValue === 'name') {
        const resultDrinksName = await requestDrinksName(valueInput);
        console.log(resultDrinksName);
        return setResultsFoodsAndDrinks(resultDrinksName);
      }
      if (radioValue === 'firstLetter' && valueInput.length === 1) {
        const resultDrinksFirstLetter = await requestDrinksFirstLetter(valueInput);
        console.log(resultDrinksFirstLetter);
        return setResultsFoodsAndDrinks(resultDrinksFirstLetter);
      }
      if (radioValue === 'firstLetter' && valueInput.length > 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
      }
    }
    console.log(resultsFoodsAndDrinks);
    return null;
  }

  function handleResults(info) {
    const idDrinks = info.idDrink;
    console.log(idDrinks);
    if (resultsFoodsAndDrinks.length === 1) {
      console.log('entrou');
      return (<Redirect to={`/bebidas/:${idDrinks}`} />);
    }
    return null;
  }

  useEffect(() => {
    handleResults(resultsFoodsAndDrinks);
  }, [resultsFoodsAndDrinks]);

  return (
    <div>

      <label htmlFor="ingredients">
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          name="radios"
          id="ingredients"
          value="ingredients"
          onClick={(e) => handleRadio(e)}
        />
        Ingredientes
      </label>

      <label htmlFor="name">
        <input
          data-testid="name-search-radio"
          type="radio"
          name="radios"
          id="name"
          value="name"
          onClick={(e) => handleRadio(e)}
        />
        Nome
      </label>

      <label htmlFor="firstLetter">
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          name="radios"
          id="firstLetter"
          value="firstLetter"
          onClick={(e) => handleRadio(e)}
        />
        Primeira letra
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={() => handleClick()}
      >
        Buscar
      </button>

    </div>
  );
}

export default Filters;
