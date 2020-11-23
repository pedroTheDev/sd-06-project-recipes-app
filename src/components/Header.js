import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, setSearch, isSearching }) {
  return (
    <header>
      <button
        type="button"
        data-testid="search-top-btn"
        onClick={ () => setSearch(!isSearching) }
      >
        <img src={ searchIcon } alt="Search" />
      </button>
      <h2 data-testid="page-title">{ title }</h2>
      <Link
        to="/perfil"
        data-testid="profile-top-btn"
        type="button"
      >
        <img
          src={ profileIcon }
          alt="Profile"
        />
      </Link>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  isSearching: PropTypes.bool.isRequired,
  setSearch: PropTypes.func.isRequired,
};

export default Header;
