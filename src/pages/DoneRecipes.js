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
        doneRecipes.map(({ image, name, category, doneDate, tags }, index) => (
          <DoneRecipesCard
            cardImage={ image }
            name={ name }
            category={ category }
            date={ doneDate }
            tags={ tags }
            index={ index }
          />
        ))
      }
    </div>
  )
}

export default DoneRecipes;
