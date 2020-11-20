import React from 'react';
import profileImage from '../images/profileIcon.svg';
import searchButton from '../images/searchIcon.svg';

function Header() {
  return (
    <header>
      <button type="button" data-testid="profile-top-btn">
        <img src={ profileImage } alt="profile-img" />
      </button>
      <h1 data-testid="page-title">Comidas</h1>
      <button type="button" data-testid="search-top-btn">
        <img src={ searchButton } alt="search-btn" />
      </button>
    </header>
  );
}

export default Header;
