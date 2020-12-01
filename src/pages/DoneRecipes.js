import React from 'react';
import Header from '../components/Header';
import DoneCards from '../components/DoneCards';

function DoneRecipes() {
  const localSt = JSON.parse(localStorage.getItem('doneRecipes'));

  return (
    <div>
      <Header />
      <span>Receitas feitas</span>
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      <div>
        {localSt.map(element => <DoneCards recipe={element} />)}
      </div>
    </div>
  );
}

export default DoneRecipes;
