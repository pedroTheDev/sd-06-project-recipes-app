import React, { useState } from 'react';
import DoneRecipesCard from '../components/DoneRecipeCard';

const DoneRecipes = () => {
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [doneRecipes, setDoneRecipes] = useState(recipes);

  return (
    <div>
      <div className="sub-header">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setDoneRecipes(recipes) }
          className="done-buttons"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setDoneRecipes(doneRecipes
            .filter((recipe) => recipe.type === 'comida')) }
          className="done-buttons"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setDoneRecipes(doneRecipes
            .filter((recipe) => recipe.type === 'bebida')) }
          className="done-buttons"
        >
          Drinks
        </button>
      </div>
      <div className="done-recipes-display">
        {
          doneRecipes.map((recipe, index) => (
            <DoneRecipesCard
              key={ `${recipe.id}${recipe.name}` }
              recipe={ recipe }
              index={ index }
            />
          ))
        }
      </div>
    </div>
  );
};

export default DoneRecipes;
