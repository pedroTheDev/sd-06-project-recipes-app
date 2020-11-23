import React, { useState } from 'react';
import fetchMeal from '../services/fetchMeal';
import './Components.css';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState();
  const [filterType, setFilterType] = useState();

  return (
    <div>
      <div className="search">
        <input
          data-testid="search-input"
          placeholder="Buscar Receita"
          className="searchInput"
          onChange={ (e) => setSearchTerm(e.target.value) }
        />
      </div>
      <form className="searchForm" onChange={ (e) => setFilterType(e.target.value) }>
        <label htmlFor="ingredient">
          <input
            type="radio"
            name="search"
            id="ingredient"
            value="ingredient"
            data-testid="ingredient-search-radio"
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            name="search"
            id="name"
            value="name"
            data-testid="name-search-radio"
          />
          Nome
        </label>
        <label htmlFor="firstLetter">
          <input
            type="radio"
            name="search"
            id="firstLetter"
            value="firstLetter"
            data-testid="first-letter-search-radio"
          />
          Primeira letra
        </label>
        <button
          type="submit"
          data-testid="exec-search-btn"
          onClick={ (e) => {
            e.preventDefault();
            fetchMeal(filterType, searchTerm)} }
        >
          Buscar
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
