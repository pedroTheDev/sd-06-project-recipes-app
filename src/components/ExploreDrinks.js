import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import Footer from './Footer';
import profileIcon from '../images/profileIcon.svg';

function ExploreDrinks() {
  const history = useHistory();
  return (
    <div>
      <Link to="/perfil">
        <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
      </Link>
      <h2 data-testid="page-title">Explorar Bebidas</h2>
      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => history.push('/explorar/bebidas/ingredientes') }
      >
        Por Ingredientes
      </button>
      <button
        data-testid="explore-surprise"
        type="button"
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
