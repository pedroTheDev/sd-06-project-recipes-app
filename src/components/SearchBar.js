import React, { useState } from 'react';
import fetchMealAPI from '../services/foodAPI';

function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const [option, setOption] = useState('');

  async function handleButtonClick() {
    const apiResponse = await fetchMealAPI(option, searchInput);
    console.log(apiResponse);
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
