import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

function FavRecipe() {
  const FALSE = false;
  return (
    <div>
      <Header title="Receitas Favoritas" search={ FALSE } />
      <Link to="/receitas-feitas">
        <button type="button" data-testid="profile-done-btn">
          Receitas Feitas
        </button>
      </Link>
    </div>
  );
}

export default FavRecipe;
