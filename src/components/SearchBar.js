import React from 'react';

export default function SearchBar() {
  return (
    <div className="SearchBar">
      <form>
        <label htmlFor="Busca">
          Barra de Busca:
          <input id="Busca" type="text" data-testid="search-input" />
        </label>
        <br />
        <label htmlFor="ingrediente">
          Ingrediente
          <input
            type="radio"
            value="ingrediente"
            id="ingrediente"
            data-testid="ingredient-search-radio"
          />
        </label>
        <label htmlFor="nome">
          Nome
          <input type="radio" value="nome" data-testid="name-search-radio" />
        </label>
        <label htmlFor="primeira letra">
          Primeira Letra
          <input
            id="nome"
            type="radio"
            value="primeira letra"
            data-testid="first-letter-search-radio"
          />
        </label>
      </form>
      <button type="button" data-testid="exec-search-btn">Executa Busca</button>
    </div>
  );
}
