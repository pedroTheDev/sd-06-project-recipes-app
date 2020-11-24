import React, { useContext } from 'react';
import propTypes from 'prop-types';
import RecipesAppContext from '../hooks/RecipesAppContext';
import profileIcon from '../styles/images/profileIcon.svg';
import searchIcon from '../styles/images/searchIcon.svg';
import HeaderSearch from './HeaderSearch';

function Header({ name }) {
  const {
    searchHeader,
    setSearchHeader,
  } = useContext(RecipesAppContext);

  const isClick = () => {
    if (searchHeader) {
      setSearchHeader(false);
    } else {
      setSearchHeader(true);
    }
  };

  return (
    <div>
      <header>
        <button type="button" className="logo-profile" data-testid="profile-top-btn">
          <img src={ profileIcon } alt="profile icon" />
        </button>
        <h1 data-testid="page-title">{name}</h1>
        <button
          type="button"
          className="logo-search"
          data-testid="search-top-btn"
          onClick={ isClick }
        >
          <img src={ searchIcon } alt="search icon" />
        </button>
      </header>
      <HeaderSearch enable={ searchHeader } name={ name } />

    </div>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Header;
