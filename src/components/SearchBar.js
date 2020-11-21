import React, { useState } from 'react';
import { fetchMealAPI, fetchDrinkAPI } from '../services/foodAPI';

function SearchBar({ page }) {
  const [searchInput, setSearchInput] = useState('');
  const [option, setOption] = useState('');

  async function handleButtonClick() {
    if (!searchInput || !option) {
      return alert('Please select an option or input some search parameter');
    } if (option === 'first-letter' && searchInput.length > 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const apiResponse = await pageCheckSwitch(page);
    return null;
  }

  function pageCheckSwitch(page) {
    if (page === 'Bebidas') {
      return fetchDrinkAPI(option, searchInput);
    }
    return fetchMealAPI(option, searchInput);
  }

  return (
    <div>
      <input
        onChange={ (event) => setSearchInput(event.target.value) }
        type="text"
        data-testid="search-input"
        placeholder="Buscar Receita"
      />
      <label htmlFor="search-ingredient">
        <input
          name="search-radio"
          type="radio"
          id="search-ingredient"
          data-testid="ingredient-search-radio"
          onClick={ (event) => setOption(event.nativeEvent.target.id) }
        />
        Ingrediente
      </label>
      <label htmlFor="search-name">
        <input
          name="search-radio"
          type="radio"
          id="search-name"
          data-testid="name-search-radio"
          onClick={ (event) => setOption(event.nativeEvent.target.id) }
        />
        Nome
      </label>
      <label htmlFor="first-letter">
        <input
          name="search-radio"
          type="radio"
          id="first-letter"
          data-testid="first-letter-search-radio"
          onClick={ (event) => setOption(event.nativeEvent.target.id) }
        />
        Primeira letra
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleButtonClick }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
