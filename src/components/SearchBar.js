import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { foodAPI } from '../services/foodAPI';
import { drinkAPI } from '../services/drinkAPI';
import ReceitasContext from '../context/ReceitasContext';
import '../style/Search.css';

function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const [url, setUrl] = useState('');

  const { setMeals } = useContext(ReceitasContext);

  const path = window.location.pathname;

  const handleUrl = (response, id) => {
    if (response.length === 1) setUrl(`${path}/${response[0][id]}`);
  };

  const handleFormSubmit = async () => {
    if (radioValue === 'first-letter' && searchValue.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }

    if (path.includes('comidas')) {
      const responseFoodsAPI = await foodAPI(radioValue, searchValue);
      if (responseFoodsAPI === null || responseFoodsAPI === undefined) {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else {
        setMeals(responseFoodsAPI);
        handleUrl(responseFoodsAPI, 'idMeal');
      }
    } else {
      const responseDrinksAPI = await drinkAPI(radioValue, searchValue);
      if (responseDrinksAPI === null || responseDrinksAPI === undefined) {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else {
        setMeals(responseDrinksAPI);
        handleUrl(responseDrinksAPI, 'idDrink');
      }
    }
  };

  return (
    url.length ? <Redirect to={ url } /> : (
      <form onSubmit={ (e) => e.preventDefault() }>
        <div className="container">
          <input
            type="text"
            data-testid="search-input"
            placeholder="Buscar Receita"
            className="search-input"
            value={ searchValue }
            onChange={ ({ target }) => setSearchValue(target.value) }
          />
          <div>
            <label htmlFor="ingredient">
              <input
                type="radio"
                id="ingredient"
                name="searchInputRadio"
                className="search-radio"
                value={ radioValue }
                onChange={ ({ target }) => setRadioValue(target.id) }
                data-testid="ingredient-search-radio"
              />
              Ingrediente
            </label>
            <label htmlFor="name">
              <input
                type="radio"
                id="name"
                name="searchInputRadio"
                className="search-radio"
                value={ radioValue }
                onChange={ ({ target }) => setRadioValue(target.id) }
                data-testid="name-search-radio"
              />
              Nome
            </label>
            <label htmlFor="first-letter">
              <input
                type="radio"
                id="first-letter"
                name="searchInputRadio"
                className="search-radio"
                value={ radioValue }
                onChange={ ({ target }) => setRadioValue(target.id) }
                data-testid="first-letter-search-radio"
              />
              Primeira Letra
            </label>
          </div>
          <div>
            <button
              type="submit"
              onClick={ handleFormSubmit }
              data-testid="exec-search-btn"
            >
              Buscar
            </button>
          </div>
        </div>
      </form>
    )
  );
}

export default SearchBar;
