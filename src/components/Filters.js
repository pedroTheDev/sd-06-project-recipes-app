import React, { useState, useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import { requestIngredients, requestName, requestFirstLetter } from '../services/requestsAPI';

function Filters() {
  const [radioValue, setRadioValue] = useState('');

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
    if (radioValue === 'ingredients') {
      const resultIngredients = await requestIngredients(valueInput);
      return resultIngredients;
    }
    if (radioValue === 'name') {
      const resultName = await requestName(valueInput);
      console.log(resultName);
      return resultName;
    }
    if (radioValue === 'firstLetter') {
      const resultFirstLetter = await requestFirstLetter(valueInput);
      return resultFirstLetter;
    }
    return null;
  }

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
