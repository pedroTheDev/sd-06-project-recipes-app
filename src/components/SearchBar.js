import React from 'react';

export default function SearchBar() {
  return (
    <form>
      <label htmlFor="search-input">
        <input type="text" id="search-input" data-testid="search-input" />
      </label>
      <label htmlFor="ingredient-search-radio">
        <input
          type="radio"
          id="ingredient-search-radio"
          data-testid="ingredient-search-radio"
          name="search-type"
        />
        Ingrediente
      </label>
      <label htmlFor="name-search-radio">
        <input
          type="radio"
          name="search-type"
          id="name-search-radio"
          data-testid="name-search-radio"
        />
        Nome
      </label>
      <label htmlFor="first-letter-search-radio">
        <input
          type="radio"
          name="search-type"
          id="first-letter-search-radio"
          data-testid="first-letter-search-radio"
        />
        Primeira letra
      </label>
    </form>
  );
}
