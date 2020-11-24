import React from 'react';

export default function SearchBar() {
  return (
    <div className="searchBar">
      <input data-testid="search-input" type="text" />
      <label htmlFor="ingredient">
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          id="ingredient"
          name="ingredient"
          value="ingredient"
        />
        Ingrediente
      </label>
      <label htmlFor="name">
        <input
          data-testid="name-search-radio"
          type="radio"
          id="name"
          name="name"
          value="name"
        />
        Nome
      </label>
      <label htmlFor="firstLetter">
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          id="firstLetter"
          name="firstLetter"
          value="firstLetter"
        />
        Primeira Letra
      </label>
      <button data-testid="exec-search-btn" type="button">Buscar</button>
    </div>
  );
}
