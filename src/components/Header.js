import React, { useContext } from 'react';
import HeaderContext from '../context/HeaderContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const { header } = useContext(HeaderContext);
  return (
    <div className="header">
      <div data-testid="profile-top-btn">{header[0] ? <img alt="profile" src={profileIcon} /> : ''}</div>
      <div data-testid="page-title">{header[1]}</div>
      <div data-testid="search-top-btn">{header[2] ? <img alt="profile" src={searchIcon} /> : ''}</div>
    </div>
  );
}

export default Header;
