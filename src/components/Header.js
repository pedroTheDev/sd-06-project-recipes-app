import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchInput from './SearchInput';

function Header() {
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
      data-testId="search-top-btn"
      onClick={ () => setToogleSearch(!toggleSearch) }
    >
      <img src={ searchIcon } alt="search-icon" />
    </button>
  );

  return (
    <div>
      {renderProfileButton()}
      {renderTitle()}
      {renderSearchButton()}
      {toggleSearch ? <SearchInput /> : null }
    </div>);
}

export default Header;
