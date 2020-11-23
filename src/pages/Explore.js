import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

function Explore() {
  return (
    <div>
      <Link to="/perfil">
        <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
      </Link>
      <h2 data-testid="page-title">Explorar</h2>
      <button
        data-testid="explore-food"
      >
        Explorar Comidas
      </button>
      <button
        data-testid="explore-drinks"
      >
        Explorar Bebidas
      </button>
    </div>
  );
}

export default Explore;
