import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import profileIcon from '../images/profileIcon.svg';
import Footer from '../components/Footer';

function Bebidas() {
  return (
    <div>
      <Link to="/perfil">
        <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
      </Link>
      <h2 data-testid="page-title">Bebidas</h2>
      <SearchBar />
      <h1>Bebidas</h1>
      <Footer />
    </div>
  );
}

export default Bebidas;
