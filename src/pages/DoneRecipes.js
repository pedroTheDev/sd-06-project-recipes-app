import React from 'react';
import DoneRecipesCard from '../components/DoneRecipeCard';

const DoneRecipes = (props) => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  console.log(doneRecipes)
  return (
    <div>
      <button data-testid="filter-by-all-btn">
        All
      </button>
      <button data-testid="filter-by-food-btn">
        Food
      </button>
      <button data-testid="filter-by-drink-btn">
        Drinks
      </button>
      {
        
        doneRecipes.map((recipe, index) => {
          return (
            <DoneRecipesCard
              recipe={ recipe }
              index={ index }
            />
          )
        })
      }
    </div>
  )
}

export default DoneRecipes;
