import React, { useState } from 'react';

import foodAPI from '../services/foodAPI';

function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const [meals, setMeals] = useState([]);

  const handleFormSubmit = async () => {
    if (radioValue === 'first-letter' && searchValue.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }

    const response = await foodAPI(radioValue, searchValue);
    setMeals(response);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <input
          type="text"
          data-testid="search-input"
          placeholder="Buscar Receita"
          value={searchValue}
          onChange={({ target }) => setSearchValue(target.value)}
        />
        <div>
          <label htmlFor="ingredient">
            <input
              type="radio"
              id="ingredient"
              name="searchInputRadio"
              value={radioValue}
              onChange={({ target }) => setRadioValue(target.id)}
              data-testid="ingredient-search-radio"
            />
            Ingrediente
          </label>
          <label htmlFor="name">
            <input
              type="radio"
              id="name"
              name="searchInputRadio"
              value={radioValue}
              onChange={({ target }) => setRadioValue(target.id)}
              data-testid="name-search-radio"
            />
            Nome
          </label>
          <label htmlFor="first-letter">
            <input
              type="radio"
              id="first-letter"
              name="searchInputRadio"
              value={radioValue}
              onChange={({ target }) => setRadioValue(target.id)}
              data-testid="first-letter-search-radio"
            />
            Primeira Letra
          </label>
        </div>
        <div>
          <button
            type="submit"
            onClick={handleFormSubmit}
            data-testid="first-letter-search-radio"
          >
            Buscar
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
