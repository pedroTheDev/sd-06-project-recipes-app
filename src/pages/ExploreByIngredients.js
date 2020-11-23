import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import profileIcon from '../images/profileIcon.svg';
import ExploreFoodsIngredients from '../components/ExploreFoodsIngredients';
import ExploreDrinksIngredients from '../components/ExploreDrinksIngredients';

function ExploreByIngredients() {
  const location = useLocation().pathname;
  return (
    <div>
      <Link to="/perfil">
        <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
      </Link>
      <h2 data-testid="page-title">Explorar Ingredientes</h2>
      <div>
        { location === '/explorar/comidas/ingredientes' ? <ExploreFoodsIngredients />
          : <ExploreDrinksIngredients /> }
      </div>
      <Footer />
    </div>
  );
}

export default ExploreByIngredients;
