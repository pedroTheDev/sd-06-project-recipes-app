import React from 'react';

export default function SearchBar() {
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
            value="ingredient"
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
