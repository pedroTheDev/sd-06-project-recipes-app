import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './Header.css';

const Header = () => {
  return (
    <section className="header">
      <Link to="/perfil" >
        <button data-testid="profile-top-btn" className="image">
          <img src={profileIcon} alt="Profile button" />
        </button>
      </Link>
      <h1 data-testids="page-title">{window.location.pathname.replace(/[^a-zA-Z0-9]/g, "")}</h1>
      <button data-testids="search-top-btn" className="image">
        <img src={searchIcon} alt="show-hide-sbr" />
      </button>
    </section>
  )
};

export default Header;
