import React, { useState, useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import HeaderContext from '../context/HeaderContext';
import getRecipesInformation from '../services/recipesAPI';

function SearchBar() {
  const [searchRadioOption, setSearchRadioOption] = useState('');
  const {
    selectedApiEndpoint,
    setSelectedApiEndpoint,
    searchTerm,
    setSearchTerm,
    setIsFetching,
    setFetchedResults,
  } = useContext(RecipesContext);

  const { title } = useContext(HeaderContext);

  const handleSearchRadioOption = ({ target: { value } }) => {
    setSearchRadioOption(value);
    switch (value) {
    case 'first-letter':
      if (title === 'Comidas') {
        setSelectedApiEndpoint(
          'https://www.themealdb.com/api/json/v1/1/search.php?f=',
        );
        break;
      }
      setSelectedApiEndpoint(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=',
      );
      break;
    case 'ingredient':
      if (title === 'Comidas') {
        setSelectedApiEndpoint(
          'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
        );
        break;
      }
      setSelectedApiEndpoint(
        'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=',
      );
      break;
    default:
      if (title === 'Comidas') {
        setSelectedApiEndpoint(
          'https://www.themealdb.com/api/json/v1/1/search.php?s=',
        );
        break;
      }
      setSelectedApiEndpoint(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      );
      break;
    }
  };

  const handleSearchSubmitOption = async () => {
    if (searchTerm.length !== 1 && searchRadioOption === 'first-letter') {
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      if (!selectedApiEndpoint && title === 'Comidas') {
        setSelectedApiEndpoint(
          'https://www.themealdb.com/api/json/v1/1/search.php?s=',
        );
      } else if (!selectedApiEndpoint && title === 'Bebidas') {
        setSelectedApiEndpoint(
          'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
        );
      }

      setIsFetching(true);

      const expectedRecipes = await getRecipesInformation(
        selectedApiEndpoint + searchTerm,
      );
      setFetchedResults(expectedRecipes);

      if (!expectedRecipes.recipes.length) {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else {
        setIsFetching(false);
      }
    }
  };

  return (
    <div className="main">
      <input
        type="text"
        data-testid="search-input"
        className="search-input"
        placeholder="Buscar Receita"
        value={ searchTerm }
        onChange={ ({ target: { value } }) => setSearchTerm(value) }
      />
      <label htmlFor="ingredient-search-radio">
        Ingredientes
        <input
          type="radio"
          name="search-radio"
          data-testid="ingredient-search-radio"
          id="ingredient-search-radio"
          value="ingredient"
          onClick={ handleSearchRadioOption }
        />
      </label>
      <label htmlFor="name-search-radio">
        Nome
        <input
          type="radio"
          name="search-radio"
          data-testid="name-search-radio"
          id="name-search-radio"
          value="name"
          onClick={ handleSearchRadioOption }
        />
      </label>
      <label
        htmlFor="first-letter-search-radio"
      >
        Primeira letra
        <input
          type="radio"
          name="search-radio"
          data-testid="first-letter-search-radio"
          id="first-letter-search-radio"
          value="first-letter"
          onClick={ handleSearchRadioOption }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        className="exec-search-btn"
        onClick={ handleSearchSubmitOption }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
