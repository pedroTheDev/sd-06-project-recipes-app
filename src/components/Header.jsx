import React, { useContext } from 'react';
import RecipesAppContext from '../hooks/RecipesAppContext';
import profileIcon from '../styles/images/profileIcon.svg';
import searchIcon from '../styles/images/searchIcon.svg';
import HeaderSearch from './HeaderSearch';

function Header({name}) {
  const { contextValue: { searchHeader, setSearchHeader } } = useContext(RecipesAppContext);

  const isClick = () => {
    if (searchHeader) {
      setSearchHeader(false);
    } else {
      setSearchHeader(true);
    }
  }

  return (
    <div>
      <header>
        <button className="logo-profile" data-testid="profile-top-btn" >
          <img src={profileIcon} alt="profile icon" />
        </button>
        <h1 data-testid="page-title">{name}</h1>
        <button className="logo-search" data-testid="search-top-btn" onClick={isClick}>
        <img src={searchIcon} alt="search icon" />
        </button>
      </header>
      <HeaderSearch enable={searchHeader} />
    </div>
  );
}

export default Header;
