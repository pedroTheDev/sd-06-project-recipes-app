import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import DoneCard from '../components/DoneCard';

export default function DoneRecipes() {
  const [recipesArray, setRecipesArray] = useState([]);
  const [filter, setFilter] = useState('All');
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));

  useEffect(() => {
    if (filter === 'Food') {
      setRecipesArray(recipes.filter((recipe) => recipe.type === 'comida'));
    }
    if (filter === 'Drinks') {
      setRecipesArray(recipes.filter((recipe) => recipe.type === 'bebida'));
    }
    if (filter === 'All') setRecipesArray(recipes);
  }, [filter]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('doneRecipes')) === null) {
      setRecipesArray([]);
    }
  }, []);

  function handleFilterClick({ target }) {
    setFilter(target.innerHTML);
  }

  return (
    <div className="food-container">
      <Header title="Receitas Feitas" />
      <div className="mobile-container">
        <div>
          <button
            className="btn-sub-header"
            type="button"
            onClick={ handleFilterClick }
            data-testid="filter-by-all-btn"
          >
            All
          </button>
          <button
            className="btn-sub-header"
            type="button"
            onClick={ handleFilterClick }
            data-testid="filter-by-drink-btn"
          >
            Drinks
          </button>
          <button
            className="btn-sub-header"
            type="button"
            onClick={ handleFilterClick }
            data-testid="filter-by-food-btn"
          >
            Food
          </button>
        </div>
        <div className="done-cards-container">
          {recipesArray.map((recipe, index) => (
            <DoneCard recipe={ recipe } key={ index } index={ index } />
          ))}
        </div>
      </div>
    </div>
  );
}
