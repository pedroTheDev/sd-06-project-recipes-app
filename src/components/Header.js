import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
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
      return true;
    }
    return false;
  };

  return (
    <div>
      <div className="main-header">
        <Link to="/perfil">
          <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
        </Link>
        <h1 data-testid="page-title">{ title }</h1>
        { handleSearchImage() && <img
          id="search-image"
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="Search"
        /> }
      </div>
    </div>
  );
};

export default Header;
