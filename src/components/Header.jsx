import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipesAppContext from '../hooks/RecipesAppContext';

function Header({ name }) {
  const { contextValue: { searchBar, setSearchBar } } = useContext(RecipesAppContext);

  const showAndHideSearchBar = () => setSearchBar(!searchBar);

  return (
    <div>
      <Link to="/perfil">
        <button
          type="button"
          className="logo-profile"
          data-testid="profile-top-btn"
        >
          profile-icon
        </button>
      </Link>
      <h1 data-testid="page-title">{name}</h1>
      <div>
        <button
          type="button"
          className="logo-search"
          data-testid="search-top-btn"
          onClick={ () => showAndHideSearchBar() }
        >
          search-icon
        </button>
        {searchBar && <input type="text" data-testid="search-input" />}
      </div>
    </div>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Header;
