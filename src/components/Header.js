import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MealsContext from '../context/MealsContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './Header.css';

function Header() {
  const { showSearchBar, setSearchBar } = useContext(MealsContext);
  const showOrHideSearchBar = () => {
    if (showSearchBar) {
      setSearchBar(false);
    } else {
      setSearchBar(true);
    }// oi
  };

  const location = useLocation();

  return (
    <div className="header-container">
      <Link to="/perfil">
        <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
      </Link>
      <h2 data-testid="page-title">
        {location.pathname === '/comidas' ? 'Comidas' : 'Bebidas'}
      </h2>
      <div>
        <img
          src={ searchIcon }
          alt="Search"
          data-testid="search-top-btn"
          onClick={ showOrHideSearchBar }
          aria-hidden="true"
        />
        {showSearchBar
          ? <input type="text" data-testid="search-input" id="search-input" />
          : null}
      </div>
    </div>
  );
}

export default Header;
