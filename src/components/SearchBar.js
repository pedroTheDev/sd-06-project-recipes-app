import React, { useState, useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import HeaderContext from '../context/HeaderContext';

function SearchBar() {
  const [searchRadioOption, setSearchRadioOption] = useState('');
  const { setSelectedApiEndpoint } = useContext(RecipesContext);
  const { title } = useContext(HeaderContext);

  const handleSearchRadioOption = ({ target: { value } }) => {
    switch (value) {
    case 'first-letter':
      if (value.length > 1) {
        alert('Sua busca deve conter somente 1 (um) character');
        break;
      }
      if (title === 'Comidas') {
        setSearchRadioOption(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`,
        );
        break;
      }
      setSearchRadioOption(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${value}`,
      );
      break;
    case 'ingredient':
      if (title === 'Comidas') {
        setSearchRadioOption(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`,
        );
        break;
      }
      setSearchRadioOption(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`,
      );
      break;
    default:
      if (title === 'Comidas') {
        setSearchRadioOption(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`,
        );
        break;
      }
      setSearchRadioOption(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`,
      );
      break;
    }
  };

  const handleSearchSubmitOption = () => {
    setSelectedApiEndpoint(searchRadioOption);
  };

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        placeholder="Buscar Receita"
      />
      <label htmlFor="ingredient-search-radio">
        Ingredientes
        <input type="radio" />
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
      <label htmlFor="first-letter-search-radio">
        Primeira letra
        <input type="radio" data-testid="first-letter-search-radio" />
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
        onClick={ handleSearchSubmitOption }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
