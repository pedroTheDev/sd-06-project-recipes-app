import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

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
