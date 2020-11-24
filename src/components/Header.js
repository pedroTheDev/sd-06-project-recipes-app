import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchRecipes from './SearchRecipes';

function Header({ pathname, setShowMultipleResults }) {
  const [toggleSearch, setToogleSearch] = useState(false);

  const renderProfileButton = () => (
    <Link to="/perfil">
      <button
        type="button"
      >
        <img
          src={ profileIcon }
          alt="profile-icon"
          data-testid="profile-top-btn"
        />
      </button>
    </Link>
  );
  const getTitleName = (path) => {
    if (path === '/comidas') return 'Comidas';
    if (path === '/bebidas') return 'Bebidas';
    if (path === '/explorar') return 'Explorar';
    if (path === '/explorar/comidas') return 'Explorar Comidas';
    if (path === '/explorar/bebidas') return 'Explorar Bebidas';
    if (path === '/explorar/comidas/ingredientes') return 'Explorar Ingredientes';
    if (path === '/explorar/bebidas/ingredientes') return 'Explorar Ingredientes';
    if (path === '/explorar/bebidas/area') return 'Explorar Origem';
    if (path === '/explorar/comidas/area') return 'Explorar Origem';
    if (path === '/perfil') return 'Perfil';
    if (path === '/receitas-feitas') return 'Receitas Feitas';
    if (path === '/receitas-favoritas') return 'Receitas Favoritas';
  };

  const renderTitle = () => (
    <h1 data-testid="page-title">
      {getTitleName(pathname)}
    </h1>
  );

  const renderSearchButton = () => {
    const explorePath = pathname.match(/explorar/);
    const LoginPath = pathname.match(/perfil/);
    const recipePath = pathname.match(/receitas/);
    console.log('loginPath', LoginPath, explorePath);
    const controlPath = explorePath || LoginPath || recipePath;
    console.log(controlPath);
    const pathException = pathname.match(/area/);

    if (!controlPath || pathException) {
      return (
        <button
          type="button"
          className="header__search__bar"
          onClick={ () => setToogleSearch(!toggleSearch) }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search-icon"
          />
        </button>
      );
    }
  };

  const renderSearchRecipeComponent = () => (
    toggleSearch ? (
      <SearchRecipes
        pathname={ pathname }
        setShowMultipleResults={ setShowMultipleResults }
      />) : null
  );

  return (
    <div className="header__container">
      {renderProfileButton()}
      {renderTitle()}
      {renderSearchButton()}
      {renderSearchRecipeComponent()}
    </div>);
}

export default Header;

Header.propTypes = {
  pathname: PropTypes.string.isRequired,
  setShowMultipleResults: PropTypes.func.isRequired,
};
