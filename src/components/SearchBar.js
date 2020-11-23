import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from '../context/RecipesAppContext';

function SearchBar({ verification, onClick }) {
  const { setSearchTerm } = useContext(RecipesAppContext);

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        placeholder="Buscar Receita"
        onChange={ (e) => setSearchTerm(e.target.value) }
      />
      <div
        onChange={ (e) => verification(e) }
      >
        <label htmlFor="ingredient-search-radio">
          <input
            type="radio"
            name="inputRadio"
            data-testid="ingredient-search-radio"
            id="ingredient-search-radio"
          />
          Ingredientes
        </label>
        <label htmlFor="first-letter-search-radio">
          <input
            type="radio"
            name="inputRadio"
            data-testid="first-letter-search-radio"
            id="first-letter-search-radio"
          />
          Primeira letra
        </label>
        <label htmlFor="name-search-radio">
          <input
            type="radio"
            name="inputRadio"
            data-testid="name-search-radio"
            id="name-search-radio"
          />
          Nome
        </label>
      </div>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ onClick }
      >
        Buscar
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  verification: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SearchBar;
