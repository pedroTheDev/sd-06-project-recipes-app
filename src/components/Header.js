import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileImage from '../images/profileIcon.svg';
import searchButton from '../images/searchIcon.svg';
import FetchApiBebidas from '../services/FetchApiBebidas';
import FetchApiComidas from '../services/FetchApiComidas';
import RecipeContext from '../context/RecipeContext';

function Header({ title }) {
  const [enableSearch, setEnableSearch] = useState(false);
  const {
    setValueRadioButton,
    setRetornoApiComidas,
    setRetornoApiBebidas,
    valueRadioButton,
    searchBar,
  } = useContext(RecipeContext);
  const history = useHistory();
  function redirectProfile() {
    history.push('/perfil');
  }
  const handleRadioClick = ({ target }) => {
    setValueRadioButton(target.value);
  };
  const searchRadioButton = async () => {
    if (valueRadioButton === 'primeira-letra' && searchBar.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const urlPath = window.location.pathname;
    if (urlPath.includes('comidas')) {
      await FetchApiComidas(valueRadioButton, searchBar, setRetornoApiComidas);
    } else {
      await FetchApiBebidas(valueRadioButton, searchBar, setRetornoApiBebidas);
    }
  };

  function renderSearch() {
    setEnableSearch(!enableSearch);
  }

  return (
    <header>
      <button
        type="button"
        data-testid="profile-top-btn"
        src={ profileImage }
        onClick={ redirectProfile }
      >
        <img src={ profileImage } alt="profile-img" />
      </button>
      <h1 data-testid="page-title">{title}</h1>
      { (enableSearch) ? <input type="text" data-testid="search-input" /> : undefined }
      <button
        type="button"
        data-testid="search-top-btn"
        src={ searchButton }
        onClick={ renderSearch }
      >
        <img src={ searchButton } alt="search-btn" />
      </button>
      <br />
      <label htmlFor="ingrediente">
        <input
          onClick={ handleRadioClick }
          data-testid="ingredient-search-radio"
          type="radio"
          id="ingrediente"
          value="1"
          name="busca"
        />
        Ingrediente
      </label>
      <label htmlFor="nome">
        <input
          onClick={ handleRadioClick }
          data-testid="name-search-radio"
          type="radio"
          id="nome"
          value="2"
          name="busca"
        />
        Nome
      </label>
      <label htmlFor="primeira-letra">
        <input
          onClick={ handleRadioClick }
          data-testid="first-letter-search-radio"
          type="radio"
          id="primeira-letra"
          value="3"
          name="busca"
        />
        Primeira Letra
      </label>
      <br />
      <button
        onClick={ searchRadioButton }
        data-testid="exec-search-btn"
        type="button"
      >
        Buscar
      </button>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
