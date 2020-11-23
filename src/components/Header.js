import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import searchicon from '../images/searchIcon.svg';
import profileicon from '../images/profileIcon.svg';
import './Header.css';
import HeaderContext from '../context/HeaderContext';

const Header = () => {
  const {
    title,
  } = useContext(HeaderContext);

  const handleSearchImage = () => {
    if (
      title === 'Comidas'
      || title === 'Bebidas'
      || title === 'Explorar Origem'
    ) {
      return false;
    }
    return true;
  };
  return (
    <div>
      <div className="main-header">
        <Link to="/perfil">
          <img src={profileicon} alt="Profile" data-testid="profile-top-btn" />
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        <img
          id="search-image"
          data-testid="search-top-btn"
          src={searchicon}
          hidden={handleSearchImage()}
          alt="Search"
        />
      </div>
    </div>
  );
};

export default Header;
