import React from 'react';

import './styles.css';
import { Link } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

const Header = () => (
  <header className="header">
    <Link to="/profile">
      <img
        date-testid="profile-top-btn"
        src={profileIcon}
        alt="huhu"
      />
    </Link>
    <div>
      {window.location.pathname === '/comidas'
        ? <h2 date-testid="page-title">Comidas</h2> : <h2>Bebidas</h2>}
    </div>
    <Link to="/profile">
      <img
        date-testid="search-top-btn"
        src={searchIcon}
        alt="huhu"
      />
    </Link>
  </header>
);

export default Header;
