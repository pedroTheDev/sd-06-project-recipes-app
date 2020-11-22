import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchRecipes from '../helpers/APIRequests';

function SearchInput({ pathname }) {
  const [inputText, setInputText] = useState('');
  const [radioSearchType, setRadioSearchType] = useState('');
  const [isFetchin, setIsFetchin] = useState(false);
  const [recipes, setRecipes] = useState('');

  useEffect(() => {
    async function fetchData() {
      const recipesAPI = await fetchRecipes(pathname, inputText, radioSearchType);
      setRecipes(recipesAPI);
      setIsFetchin(false);
    }
    if (isFetchin) {
      fetchData();
    }
  }, [isFetchin]);

  useEffect(() => {
  }, [recipes]);

  const handleSubmitSearch = () => {
    setIsFetchin(true);
  };

  const renderSearchInput = () => (
    <input
      onChange={ (event) => setInputText(event.target.value) }
      value={ inputText }
      placeholder="buscar receita"
      data-testid="search-input"
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
        value="firstLetter"
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

SearchInput.propTypes = {
  pathname: PropTypes.string.isRequired,
};
