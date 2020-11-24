import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchButton from './SearchButton';
import profileIcon from '../../images/profileIcon.svg';

function Header({ title , setSearch, isSearching, enableSearchBar = false }) {
  return (
    <header>
      {
        enableSearchBar
        && <SearchButton setSearch={ setSearch } isSearching={ isSearching } />
      }
      <h2 data-testid="page-title">{ title }</h2>
      <Link
        to="/perfil"
        type="button"
      >
        <img
          data-testid="profile-top-btn"
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
