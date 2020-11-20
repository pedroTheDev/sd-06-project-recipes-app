import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title }) {
  return (
    <header>
      <button
        data-testid="profile-top-btn"
        type="button"
      >
        <img src={ searchIcon } alt="Search" />
      </button>
      <h2 data-testid="page-title">{ title }</h2>
      <Link
        to="/perfil"
        data-testid="search-top-btn"
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
};

export default Header;
