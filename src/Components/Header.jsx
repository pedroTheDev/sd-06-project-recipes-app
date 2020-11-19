import React from 'react';
import { Link } from 'react-router-dom';
import profilePicture from '../images/profileIcon.svg';
import searchImage from '../images/searchIcon.svg';

export default function Header() {

  return (
    <header className="header">
      <div>
        <Link to="/perfil"><img data-testid="profile-top-btn" src={profilePicture} alt="profile" /></Link>
			   <h1 data-testid="page-title">Comidas</h1>
        <Link to="/explorar"><img data-testid="search-top-btn" src={searchImage} alt="search" /></Link>
      </div>
    </header>
  )
}
