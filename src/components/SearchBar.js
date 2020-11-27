import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './Components.css';
import Context from '../context/Context';

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState();
  const [filterType, setFilterType] = useState();
  const { recipesToRender, recipesToRenderByIngredient } = useContext(Context);
  const { title } = props;
  const type = title === 'Comidas' ? 'meal' : 'drink';

  const handleClick = (e) => {
    e.preventDefault();

    switch (filterType) {
    case 'ingredient': {
      recipesToRenderByIngredient(type, searchTerm);
      break;
    }

    case 'firstLetter': {
      console.log(filterType);
      break;
    }

    default: {
      return recipesToRender(type, searchTerm);
    }
    }
  };

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
          onClick={ (e) => handleClick(e) }
        >
          Buscar
        </button>
      </form>
    </div>
  );
}

SearchBar.propTypes = { title: PropTypes.string.isRequired };

export default SearchBar;
