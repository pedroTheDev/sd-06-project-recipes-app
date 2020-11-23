import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import fetchRecipesByUrl from '../helpers/APIRequests';
import findMatchInKeys from '../helpers/assets';
import { addRecipes } from '../redux/actions/searchRecipes';

function SearchRecipes({ pathname, dispatchRecipes, recipes }) {
  const [inputText, setInputText] = useState('');
  const [radioSearchSelection, setRadioSearchSelection] = useState('ingredients');
  const [isFetchin, setIsFetchin] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSucessAPIResponse = (recipesData) => {
    if (recipesData !== null) {
      const type = Object.keys(recipesData).join('');
      const recipesResults = recipesData[type];
      console.log(recipesResults);
      dispatchRecipes({ type, results: recipesResults });
    }
  };

  const handleNullAPIResponse = (recipesData) => {
    if (recipesData === null) {
      dispatchRecipes({ type: 'notFound', results: [] });
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  };

  const handleAPIResponse = (recipesData) => {
    handleSucessAPIResponse(recipesData);
    handleNullAPIResponse(recipesData);
  };

  useEffect(() => {
    async function fetchData() {
      setShowResults(false);
      const recipesAPIData = (await fetchRecipesByUrl(
        pathname,
        inputText,
        radioSearchSelection,
      ));
      handleAPIResponse(recipesAPIData);
      setIsFetchin(false);
      setShowResults(true);
    }
    if (isFetchin) {
      fetchData();
    }
  }, [isFetchin]);

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
    const recipe = recipes[0];

    const id = findMatchInKeys('id', recipe);
    return <Redirect to={ `${pathname}/${recipe[id]}` } />;
  };

  const handleSearchResults = () => {
    if (recipes.results.length === 1) return renderRedirectToSingleResult();
  };

  const renderSearchResults = () => {
    if (showResults) return handleSearchResults();
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
};

SearchRecipes.defaultProps = {
  recipes: { type: '', results: [''] },
};
