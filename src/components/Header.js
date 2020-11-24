import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  return (
    <div>
      <Link to="/perfil">
        <img src={profileIcon} alt="Profile" data-testid="profile-top-btn" />
      </Link>
      <h2 data-testid="page-title">Comidas</h2>
      <SearchBar />
    </div>
  );
}

export default Header;
