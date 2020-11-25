import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import recipesAppContext from '../context/recipesAppContext';

export default function SearchBar() {
  const [filterType, setFilterType] = useState('');
  const [product, setProduct] = useState('');
  const { setFetchMeal, setFetchDrink } = useContext(recipesAppContext);

  const searchMeal = async (filterType, product) => {
    setFetchMeal(filterType, product);
  };

  const searchDrink = async (filterType, product) => {
    setFetchDrink(filterType, product);
  };

  const { pathname } = useLocation();

  const handleSearch = (filterType, product) => {
    if (pathname === '/comidas') {
      searchMeal(filterType, product);
    } else if (pathname === '/bebidas') {
      searchDrink(filterType, product);
    }
  };

  return (
    <div className="form-group searchBar">
      <div className="col-sm-8">
        <input
          className="form-control"
          data-testid="search-input"
          type="text"
          onChange={ (e) => setProduct(e.target.value) }
        />
      </div>
      <div className="form-check radioBtns">
        <label className="form-check-label" htmlFor="ingredient">
          <input
            data-testid="ingredient-search-radio"
            className="form-check-input"
            type="radio"
            id="ingredient"
            name="filter-info"
            value="ingredient"
            onChange={ (e) => setFilterType(e.target.value) }
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
            value="name"
            onChange={ (e) => setFilterType(e.target.value) }
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
            value="firstLetter"
            onChange={ (e) => setFilterType(e.target.value) }
          />
          Primeira Letra
        </label>
      </div>
      <div>
        <button
          data-testid="exec-search-btn"
          className="btn btn-primary"
          type="button"
          onClick={ () => handleSearch(filterType, product) }
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
