import React, { useState } from 'react';

function SearchInput() {
  const [inputText, setInputText] = useState('');
  const [radionSearchType, setRadioSearchType] = useState('');

  const fetchAPI = async (endpoint) => {
    const apiResponse = await (await fetch(endpoint)).json();
    return apiResponse;
  };

  const checkInputlength = (fetchApi, firstLetter) => (inputText.length > 1
    ? alert('Sua busca deve conter somente 1 (um) caracter') : fetchApi(firstLetter));

  const fetchData = () => {
    const ingredients = `https://www.themealdb.com/api/json/v1/1/search.php?i=${inputText}`;
    const name = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`;
    const firstLetter = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputText}`;

    const ingredientTypes = {
      ingredients: () => fetchAPI(ingredients),
      name: () => fetchAPI(name),
      firstLetter: () => checkInputlength(fetchAPI, firstLetter),
    };

    return ingredientTypes[radionSearchType];
  };

  const handleSubmitSearch = () => {
    fetchData();
  };

  const renderSearchInput = () => (
    <input
      onChange={ (event) => setInputText(event.target.value) }
      value={ inputText }
      placeholder="buscar receita"
      data-testId="search-input"
      type="text"
    />
  );

  const renderIngredientSearchRadio = () => (
    <label htmlFor="ingredients">
      <input
        type="radio"
        value="ingredients"
        id="ingredients"
        name="radio-search-button"
        data-testid="ingredient-search-radio"
        onChange={ (event) => setRadioSearchType(event.target.value) }
      />
      ingredientes
    </label>
  );

  const renderNameSearchRadio = () => (
    <label htmlFor="name">
      <input
        type="radio"
        value="name"
        id="name"
        name="radio-search-button"
        data-testid="name-search-radio"
        onChange={ (event) => setRadioSearchType(event.target.value) }
      />
      nome
    </label>
  );

  const renderFirstLetterSearchRadio = () => (
    <label htmlFor="first-letter">
      <input
        type="radio"
        value="first-letter"
        name="radio-search-button"
        id="first-letter"
        data-testid="first-letter-search-radio"
        onChange={ (event) => setRadioSearchType(event.target.value) }
      />
      primeira letra

    </label>
  );

  const renderRadioButtons = () => (
    <>
      {renderIngredientSearchRadio()}
      {renderNameSearchRadio()}
      {renderFirstLetterSearchRadio()}
    </>
  );

  const renderSubmitButton = () => (
    <button
      type="button"
      data-testid="exec-search-btn"
      onClick={ () => handleSubmitSearch() }
    >
      buscar
    </button>
  );

  return (
    <>
      {renderSearchInput()}
      {renderRadioButtons()}
      {renderSubmitButton()}
    </>);
}

export default SearchInput;
