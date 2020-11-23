import React, { useState } from 'react';
import PropTypes from 'prop-types';
import fetchDrink from '../services/fetchDrink';
import fetchMeal from '../services/fetchMeal';
import './Components.css';

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState();
  const [filterType, setFilterType] = useState();

  const { title } = props;

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

            return title === 'Bebidas'
              ? fetchDrink(filterType, searchTerm)
              : fetchMeal(filterType, searchTerm);
          } }
        >
          Buscar
        </button>
      </form>
    </div>
  );
}

SearchBar.propTypes = { title: PropTypes.string.isRequired };

export default SearchBar;
