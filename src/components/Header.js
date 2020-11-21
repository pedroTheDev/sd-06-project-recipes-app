import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title }) {
  return (
    <header>
      <button
        type="button"
      >
        <img
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="Search"
        />
      </button>
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
};

export default Header;
