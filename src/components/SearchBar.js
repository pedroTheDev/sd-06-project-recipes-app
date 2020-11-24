import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import recipesAppContext from '../context/recipesAppContext';

export default function SearchBar() {
  const [filterName, setFilterName] = useState('');
  const [filterIngredient, setFilterIngredient] = useState('');
  const [filterFirstLetter, setFilterFirstLetter] = useState('');
  const { fetchMeal } = useContext(recipesAppContext);
  const { pathname } = useLocation();
  const fetchApi = () => {
    // Checar as rotas do pathname
    fetchMeal('garlic');
  };

  return (
    <div className="searchBar">
      <input data-testid="search-input" type="text" />
      <label htmlFor="ingredient">
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          id="ingredient"
          name="filter-info"
          value={ filterIngredient }
          onChange={ (e) => setFilterIngredient(e.target.value) }
        />
        Ingrediente
      </label>
      <label htmlFor="name">
        <input
          data-testid="name-search-radio"
          type="radio"
          id="name"
          name="filter-info"
          value={ filterName }
          onChange={ (e) => setFilterName(e.target.value) }
        />
        Nome
      </label>
      <label htmlFor="firstLetter">
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          id="firstLetter"
          name="filter-info"
          value={ filterFirstLetter }
          onChange={ (e) => setFilterFirstLetter(e.target.value) }
        />
        Primeira Letra
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ () => fetchApi }
      >
        Buscar
      </button>
    </div>
  );
}
