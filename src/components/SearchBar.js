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
        <div>
          <input
            type="radio"
            value="Nome"
            name="tipo"
            data-testid="name-search-radio"
          />
          Nome
        </div>

        <div>
          <input
            type="radio"
            value="Ingrediente"
            name="tipo"
            data-testid="ingredient-search-radio"
          />
          Ingrediente
        </div>

        <div>
          <input
            type="radio"
            value="PrimeiraLetra"
            name="tipo"
            data-testid="first-letter-search-radio"
          />
          Primeira Letra
        </div>

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
