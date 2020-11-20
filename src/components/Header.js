import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function HeaderFood() {
  console.log(window.location.pathname);
  return (
    <div>
      <Link to="/perfil"><img data-testid="profile-top-btn" src={profileIcon} alt="profile" /></Link>
      <h1 data-testid="page-title">Comidas</h1>
      <img data-testid="search-top-btn" src={searchIcon} alt="search" />
    </div>
  );
}

export default HeaderFood;
