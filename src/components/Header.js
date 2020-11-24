import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import './Header.css';

function Header() {
  const location = useLocation();
  return (
    <div className="header-container">
      <Link to="/perfil">
        <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
      </Link>
      <h2 data-testid="page-title">
        {location.pathname === '/comidas' ? 'Comidas' : 'Bebidas'}
      </h2>
      <SearchBar />
    </div>
  );
}

export default Header;
