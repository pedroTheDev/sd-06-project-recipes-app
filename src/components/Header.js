import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MealsContext from '../context/MealsContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const { showSearchBar, setSearchBar } = useContext(MealsContext);
  const showOrHideSearchBar = () => {
    if (showSearchBar) {
      setSearchBar(false);
    } else {
      setSearchBar(true);
    }
  };

  return (
    <div>
      <Link to="/perfil">
        <img src={profileIcon} alt="Profile" data-testid="profile-top-btn" />
      </Link>
      <h2 data-testid="page-title">Comidas</h2>
      <div>
        <img src={searchIcon} alt="Search" data-testid="search-top-btn" onClick={showOrHideSearchBar} aria-hidden="true" />
        {showSearchBar ? <input type="text" data-testid="search-input" id="search-input" /> : null}
      </div>
    </div>
  );
}

export default Header;
