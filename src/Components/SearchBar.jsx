import React from 'react';

export default function SearchBar() {
  return (
    <div>
      <input type="text" name="search" data-testid="search-input" />
      <input
        type="radio"
        name="ingrediente"
        data-testid="ingredient-search-radio"
      />
      Ingrediente
      <input
        type="radio"
        name="nome"
        data-testid="name-search-radio"
      />
      Nome
      <input
        type="radio"
        name="primeira-letra"
        data-testid="first-letter-search-radio"
      />
      Primeira letra
      <button type="button" data-testid="exec-search-btn">Busca</button>
    </div>
  );
}
