import React from 'react';

export default function SearchBar() {
  return (
    <div className="search-container">
      <form>
        <input
          type="text"
          placeholder="Buscar receita"
          data-testid="search-input"
        />
        <input
          type="radio"
          value="Nome"
          name="tipo"
          data-testid="name-search-radio"
        />
        Nome
        <input
          type="radio"
          value="Ingrediente"
          name="tipo"
          data-testid="ingredient-search-radio"
        />
        Ingrediente
        <input
          type="radio"
          value="PrimeiraLetra"
          name="tipo"
          data-testid="first-letter-search-radio"
        />
        Primeira Letra
        <div>
          <button
            type="submit"
            data-testid="exec-search-btn"
          >
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
}
