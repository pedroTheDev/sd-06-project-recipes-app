import React, { useState, useContext } from 'react';
// import { useLocation } from 'react-router-dom';
import recipesAppContext from '../context/recipesAppContext';

export default function SearchBar() {
  const [filterName, setFilterName] = useState('');
  const [filterIngredient, setFilterIngredient] = useState('');
  const [filterFirstLetter, setFilterFirstLetter] = useState('');
  const { fetchMeal } = useContext(recipesAppContext);

  // const { pathname } = useLocation();
  const fetchApi = () => {
    fetchMeal('garlic');
  };
  
  return (
    <div className="form-group searchBar">
      <div className="col-sm-8">
        <input className="form-control" data-testid="search-input" type="text" />
      </div>
      <div className="form-check radioBtns">
        <label className="form-check-label" htmlFor="ingredient">
          <input
            data-testid="ingredient-search-radio"
            className="form-check-input"
            type="radio"
            id="ingredient"
            name="filter-info"
            value={ filterName }
            onChange={ (e) => setFilterName(e.target.value) }
          />
          Ingrediente
        </label>
        <label className="form-check-label" htmlFor="name">
          <input
            data-testid="name-search-radio"
            className="form-check-input"
            type="radio"
            id="name"
            name="filter-info"
            value={ filterIngredient }
            onChange={ (e) => setFilterIngredient(e.target.value) }
          />
          Nome
        </label>
        <label className="form-check-label" htmlFor="firstLetter">
          <input
            data-testid="first-letter-search-radio"
            className="form-check-input"
            type="radio"
            id="firstLetter"
            name="filter-info"
            value={ filterFirstLetter }
            onChange={ (e) => setFilterFirstLetter(e.target.value) }
          />
          Primeira Letra
        </label>
      </div>
      <div>
        <button
          data-testid="exec-search-btn"
          className="btn btn-primary"
          type="button"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
