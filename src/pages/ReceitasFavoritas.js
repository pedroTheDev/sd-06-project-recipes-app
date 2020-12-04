import React, { useState } from 'react';
import Header from '../components/Header';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';

function ReceitasFavoritas() {
  const allFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [recipes, setRecipes] = useState(allFavorites);
  const zero = 0;
  return (
    <main>
      <Header pageName="Receitas Favoritas" renderSearch={ false } />
      <div style={ { marginTop: '10%' } }>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setRecipes(allFavorites) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setRecipes(allFavorites
            .filter(({ type }) => type === 'comida')) }
        >
          Foods
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setRecipes(allFavorites
            .filter(({ type }) => type === 'bebida')) }
        >
          Drinks
        </button>
      </div>
      {
        recipes.length > zero ? recipes.map((recipe, index) => (
          <FavoriteRecipeCard
            onClick={ () => setRecipes(JSON.parse(localStorage.getItem('favoriteRecipes'))
            || []) }
            key={ recipe.id }
            recipe={ recipe }
            index={ index }
          />
        )) : <div>Nenhuma receita encontrada</div>
      }
    </main>
  );
}

export default ReceitasFavoritas;
