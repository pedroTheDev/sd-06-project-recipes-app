import React from 'react';

export default function SearchBar() {
  return (
    <div className="SearchBar">
      <form>
        <label>Barra de Busca: </label>
        <input type="text" data-testid="search-input" />
        <br />
        <input type="radio" value="ingrediente" data-testid="ingredient-search-radio" />
        <label htmlFor="ingrediente">Ingrediente</label>
        <input type="radio" value="nome" />
        <label htmlFor="nome">Nome</label>
        <input type="radio" value="primeira letra" data-testid="first-letter-search-radio" />
        <label htmlFor="primeira letra">Primeira Letra</label>
      </form>
    </div>
  );
}
