import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import fetchRecipesByUrl from '../helpers/APIRequests';
import findMatchInKeys from '../helpers/assets';
import { addRecipes } from '../redux/actions/searchRecipes';

function SearchRecipes({ pathname,
  dispatchRecipes, recipes, setShowMultipleResults }) {
  const [inputText, setInputText] = useState('');
  const [radioSearchSelection, setRadioSearchSelection] = useState('ingredients');
  const [isFetchin, setIsFetchin] = useState(false);
  const [showSingleResult, setShowSingleResult] = useState(false);

  const handleSucessAPIResponse = (recipesData) => {
    if (recipesData !== null && recipesData) {
      const type = Object.keys(recipesData).join('');
      console.log(recipesData);
      const recipesResults = recipesData[type];
      dispatchRecipes({ type, results: recipesResults });
    }
  };

  const handleNullAPIResponse = (recipesData) => {
    if (recipesData) {
      if (recipesData === null
         || recipesData.meals === null || recipesData.drinks === null) {
        dispatchRecipes({ type: 'notFound', results: [] });
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
    }
  };

  const handleFirstLetterError = (recipesData) => {
    if (!recipesData && recipesData !== null) {
      dispatchRecipes({ type: 'notFound', results: [] });
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  const handleAPIResponse = (recipesData) => {
    handleFirstLetterError(recipesData);
    handleNullAPIResponse(recipesData);
    handleSucessAPIResponse(recipesData);
  };

  useEffect(() => {
    async function fetchData() {
      setShowSingleResult(false);
      setShowMultipleResults(false);
      const recipesAPIData = (await fetchRecipesByUrl(
        pathname,
        inputText,
        radioSearchSelection,
      ));
      handleAPIResponse(recipesAPIData);
      setIsFetchin(false);
    }
    if (isFetchin) {
      fetchData();
    }
  }, [isFetchin]);

  const handleResults = () => {
    if (recipes.results !== null) {
      if (recipes.results.length > 1) setShowMultipleResults(true);
      if (recipes.results.length === 1) setShowSingleResult(true);
    }
  };

  useEffect(() => {
    if (recipes.type !== '') handleResults();
  }, [recipes]);

  const handleSubmitSearch = () => {
    setIsFetchin(true);
  };

  const renderSearchRecipeTextInput = () => (
    <input
      onChange={ (event) => setInputText(event.target.value) }
      value={ inputText }
      placeholder="buscar receita"
      data-testid="search-input"
      type="text"
    />
  );

  const renderIngredientRadioInput = () => (
    <label htmlFor="ingredients">
      <input
        type="radio"
        value="ingredients"
        checked={ radioSearchSelection === 'ingredients' }
        id="ingredients"
        name="radio-search-button"
        data-testid="ingredient-search-radio"
        onChange={ (event) => setRadioSearchSelection(event.target.value) }
      />
      ingredientes
    </label>
  );

  const renderNameRadioInput = () => (
    <label htmlFor="name">
      <input
        type="radio"
        value="name"
        checked={ radioSearchSelection === 'name' }
        id="name"
        name="radio-search-button"
        data-testid="name-search-radio"
        onChange={ (event) => setRadioSearchSelection(event.target.value) }
      />
      nome
    </label>
  );

  const renderFirstLetterRadioInput = () => (
    <label htmlFor="first-letter">
      <input
        type="radio"
        value="firstLetter"
        name="radio-search-button"
        checked={ radioSearchSelection === 'firstLetter' }
        id="first-letter"
        data-testid="first-letter-search-radio"
        onChange={ (event) => setRadioSearchSelection(event.target.value) }
      />
      primeira letra

    </label>
  );

  const renderRadioButtons = () => (
    <>
      {renderIngredientRadioInput()}
      {renderNameRadioInput()}
      {renderFirstLetterRadioInput()}
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

  const renderRedirectToSingleResult = () => {
    if (recipes.results.length === 1) {
      const recipe = recipes.results[0];
      const id = findMatchInKeys('id', recipe);
      return <Redirect to={ `${pathname}/${recipe[id]}` } />;
    }
  };

  const renderSearchResults = () => {
    if (showSingleResult) return renderRedirectToSingleResult();
  };

  return (
    <>
      {renderSearchRecipeTextInput()}
      {renderRadioButtons()}
      {renderSubmitButton()}
      {renderSearchResults()}
    </>);
}

const mapDispatchToProps = (dispatch) => ({
  dispatchRecipes: (recipes) => dispatch(addRecipes(recipes)),
});

const mapStateToProps = (state) => ({
  recipes: state.searchRecipes.recipes,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchRecipes);

SearchRecipes.propTypes = {
  pathname: PropTypes.string.isRequired,
  dispatchRecipes: PropTypes.func.isRequired,
  recipes: PropTypes.shape(PropTypes.any),
  setShowMultipleResults: PropTypes.func.isRequired,
};

SearchRecipes.defaultProps = {
  recipes: { type: '', results: [''] },
};
