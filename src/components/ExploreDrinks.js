import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import profileIcon from '../images/profileIcon.svg';

function ExploreDrinks() {

  return (
    <div>
      <Link to="/perfil">
        <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
      </Link>
      <h2 data-testid="page-title">Explorar Bebidas</h2>
      <Link>
        <button
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link>
        <button
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
