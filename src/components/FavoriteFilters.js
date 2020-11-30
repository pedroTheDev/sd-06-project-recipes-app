import React, { useContext } from 'react';
import RecipesAppContext from '../context/RecipesAppContext';

function FavoriteFilters() {
  const { setRenderFavoriteRecipes } = useContext(RecipesAppContext);

  const handleClick = (type) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (type === 'all') setRenderFavoriteRecipes(favoriteRecipes);
    else {
      const filteredRecipes = favoriteRecipes.filter((recipe) => recipe.type === type);
      setRenderFavoriteRecipes(filteredRecipes);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={ () => handleClick('all') }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        onClick={ () => handleClick('comida') }
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        onClick={ () => handleClick('bebida') }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
    </div>
  );
}

export default FavoriteFilters;
