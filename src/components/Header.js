import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchRecipes from './SearchRecipes';

function Header({ pathname }) {
  const [toggleSearch, setToogleSearch] = useState(false);

  const renderProfileButton = () => (
    <Link to="/profile">
      <button
        type="button"
        data-testid="profile-top-btn"
      >
        <img src={ profileIcon } alt="profile-icon" />
      </button>
    </Link>
  );

  const renderTitle = () => (
    <h1 data-testid="page-title">
      title
    </h1>
  );

  const renderSearchButton = () => (
    <button
      type="button"
      data-testid="search-top-btn"
      onClick={ () => setToogleSearch(!toggleSearch) }
    >
      <img src={ searchIcon } alt="search-icon" />
    </button>
  );

  const renderSearchRecipeComponent = () => (
    toggleSearch ? <SearchRecipes pathname={ pathname } /> : null
  );

  return (
    <div>
      {renderProfileButton()}
      {renderTitle()}
      {renderSearchButton()}
      {renderSearchRecipeComponent()}
    </div>);
}

export default Header;

Header.propTypes = {
  pathname: PropTypes.string.isRequired,

};
