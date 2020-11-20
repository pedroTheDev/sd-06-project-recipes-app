import React, { useState } from 'react';

function SearchBar() {
  const [ searchInput, setSearchInput ] = useState('');
  const [ option, setOption ] = useState('');
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
        />
          Ingrediente
      </label>
      <label htmlFor="search-name">
        <input
          name="search-radio" 
          type="radio"
          id="search-name"
          data-testid="name-search-radio"
        />
          Nome
      </label>
      <label htmlFor="first-letter">
        <input
          name="search-radio" 
          type="radio"
          id="first-letter"
          data-testid="first-letter-search-radio"
        />
          Primeira letra
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
