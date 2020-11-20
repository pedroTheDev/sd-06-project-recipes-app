import React from 'react';

function SearchBar() {
  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        placeholder="Buscar Receita"
      />
      <label htmlFor="ingredient-search-radio">
        <input
          type="radio"
          name="inputRadio"
          data-testid="ingredient-search-radio"
          id="ingredient-search-radio"
        />
        Ingredientes
      </label>
      <label htmlFor="first-letter-search-radio">
        <input
          type="radio"
          name="inputRadio"
          data-testid="first-letter-search-radio"
          id="first-letter-search-radio"
        />
        Primeira letra
      </label>
      <label htmlFor="name-search-radio">
        <input
          type="radio"
          name="inputRadio"
          data-testid="name-search-radio"
          id="name-search-radio"
        />
        Nome
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ console.log('clicou') }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
