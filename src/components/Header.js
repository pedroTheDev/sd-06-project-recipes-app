import React, { useState } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';

export default function Header({ pageName, renderSearch }) {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const renderSearchIcon = () => (
    <button 
      data-testid="search-top-btn"
      onClick={ () => setShowSearchBar(!showSearchBar) }
    >
      <img
        className="header-icon"
        src={ searchIcon }
        alt="searchIcon"
      />
    </button>
  );

  return (
    <header>
      <Link to="/perfil">
        <img
          className="header-icon"
          src={ profileIcon }
          alt="profileIcon"
          data-testid="profile-top-btn"
        />
      </Link>
      
      <h2 data-testid="page-title">{ pageName }</h2>
      { renderSearch ? renderSearchIcon() : null }
      { showSearchBar && <SearchBar /> }
    </header>
  );
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
  renderSearch: PropTypes.bool.isRequired,
};
