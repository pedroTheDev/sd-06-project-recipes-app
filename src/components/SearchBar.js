import React from 'react';

function SearchBar() {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <input
          type="text"
          data-testid="search-input"
          placeholder="Buscar Receita"
        />
        <div>
          <label htmlFor="ingredient">
            <input
              type="radio"
              id="ingredient"
              name="searchInputRadio"
              data-testid="ingredient-search-radio"
            />
            Ingrediente
          </label>
          <label htmlFor="name">
            <input
              type="radio"
              id="name"
              name="searchInputRadio"
              data-testid="name-search-radio"
            />
            Nome
          </label>
          <label htmlFor="first-letter">
            <input
              type="radio"
              id="first-letter"
              name="searchInputRadio"
              data-testid="first-letter-search-radio"
            />
            Primeira Letra
          </label>
        </div>
        <div>
          <button
            type="submit"
            data-testid="first-letter-search-radio"
          >
            Buscar
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
