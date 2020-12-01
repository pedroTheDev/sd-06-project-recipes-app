import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DoneCard from '../components/DoneCard';
import './DoneRecipes.css';

export default function DoneRecipes() {
  const [onlyFood, setOnlyFood] = useState(false);
  const [onlyDrink, setOnlyDrink] = useState(false);
  const [recipesArray, setRecipesArray] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));

  useEffect(() => {
    if (isFiltered) {
      if (onlyFood) {
        setRecipesArray(recipes.filter((recipe) => recipe.type === 'comida'));
      } else {
        setRecipesArray(recipes.filter((recipe) => recipe.type === 'bebida'));
      }
    } else {
      setRecipesArray(recipes);
    }
  }, [isFiltered]);

  function handleAllClick() {
    setIsFiltered(false);
    setOnlyDrink(false);
    setOnlyFood(false);
  }

  function handleDrinkClick() {
    setIsFiltered(true);
    setOnlyDrink(true);
    setOnlyFood(false);
  }

  function handleFoodClick() {
    setIsFiltered(true);
    setOnlyDrink(false);
    setOnlyFood(true);
  }

  return (
    <div>
      <Header title="Receitas Feitas" />
      <button
        onClick={ handleAllClick }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        onClick={ handleDrinkClick }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <button
        onClick={ handleFoodClick }
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <div className="cards-container">
        {(onlyFood) && recipesArray.filter((rec) => rec.type === 'comida')
          .map((recipe, index) => (
          <div className="recipe-card">
            <DoneCard recipe={ recipe } index={ index } />
          </div>
        ))}
        {(onlyDrink) && recipes.filter((rec) => rec.type === 'bebida')
          .map((recipe, index) => (
          <div className="recipe-card">
            <DoneCard recipe={ recipe } index={ index } />
          </div>
        ))}
        {(!onlyFood && !onlyDrink) && recipes.map((recipe, index) => (
          <div className="recipe-card">
            <DoneCard recipe={ recipe } index={ index } />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
