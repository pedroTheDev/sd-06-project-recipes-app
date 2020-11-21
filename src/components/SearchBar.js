import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import useSearch from '../hooks/useSearch';
import Context from '../context/Context';

export default function SearchBar(props) {
  const { id } = props;
  const [searchOptions, setSearchOptions] = useState({
    searchText: '',
    searchType: '',
    category: id,
  });

  const { setItems } = useContext(Context);

  const [redirect, setRedirect] = useState(false);
  const [itemId, setItemId] = useState('');

  const [results, setFilters] = useSearch();

  function handleSearch({ target }) {
    setSearchOptions({ ...searchOptions, [target.name]: target.value });
  }

  function submitSearch() {
    const { searchText, searchType } = searchOptions;
    const singleChar = 1;
    if (searchType === 'first-letter' && searchText.length > singleChar) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else if (searchText !== '' && searchType !== '') {
      setFilters({ ...searchOptions });
    } else {
      console.log('digite algo e escolha um tipo de pesquisa!');
    }
  }

  function handleRedirect() {
    if (!redirect) {
      if (results) {
        setItems(results);
        if (results.meals) {
          if (results.meals.length === 1) {
            setItemId(results.meals[0].idMeal);
            setRedirect(true);
          }
        }
        if (results.drinks) {
          if (results.drinks.length === 1) {
            setItemId(results.drinks[0].idDrink);
            setRedirect(true);
          }
        }
      }
    }
  }

  return (
    <form>
      {handleRedirect()}
      {redirect ? <Redirect to={ `/${id}/${itemId}` } /> : null}
      <label htmlFor="search-input">
        <input
          type="text"
          id="search-input"
          name="searchText"
          onChange={ handleSearch }
          data-testid="search-input"
        />
      </label>
      <label htmlFor="ingredient-search-radio">
        <input
          type="radio"
          id="ingredient-search-radio"
          onChange={ handleSearch }
          name="searchType"
          value="ingredient"
          data-testid="ingredient-search-radio"
        />
        Ingrediente
      </label>
      <label htmlFor="name-search-radio">
        <input
          type="radio"
          name="searchType"
          onChange={ handleSearch }
          id="name-search-radio"
          value="name"
          data-testid="name-search-radio"
        />
        Nome
      </label>
      <label htmlFor="first-letter-search-radio">
        <input
          type="radio"
          name="searchType"
          onChange={ handleSearch }
          value="first-letter"
          id="first-letter-search-radio"
          data-testid="first-letter-search-radio"
        />
        Primeira letra
      </label>
      <button
        type="button"
        onClick={ submitSearch }
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  id: PropTypes.string.isRequired,
};
