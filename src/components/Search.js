import React from 'react';

export default function SearchBar() {
  return (

    <form>
      <label htmlFor="search-input">
        <input
          data-testid="search-input"
          type="text"
          id="search-input"
          name="searh-input"
          placeholder="Buscar Receita"
        />
      </label>
      <div>
        <label htmlFor="ingredient">
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            id="ingredient"
            name="ingredient"
          />
          Ingedientes
        </label>
        <label htmlFor="name">
          <input
            data-testid="name-search-radio"
            type="radio"
            id="name"
            name="name"
          />
          Nome
        </label>
        <label htmlFor="first-letter">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            id="first-letter"
            name="first-letter"
          />
          Primeira Letra
        </label>
        <button data-testid="exec-search-btn" type="button">Buscar</button>
      </div>
    </form>
  );
}
