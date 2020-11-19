import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function HeaderFood() {
  return (
    <div>
      <img data-testid="profile-top-btn" src={profileIcon} alt="profile" />
      <h1 data-testid="page-title">Bebidas</h1>
      <img data-testid="search-top-btn" src={searchIcon} alt="search" />
    </div>
  );
}

export default HeaderFood;
