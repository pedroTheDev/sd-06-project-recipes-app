import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../hooks/RecipeContext';

export default function MainScreen() {
  const history = useHistory();
  const { foodRecipes, drinkRecipes, isLoading, foodFilter, drinkFilter } = useContext(RecipeContext);
  const twelve = 12;
  const five = 5;
  const { pathname } = history.location;
  
  const renderFilters = () => {
    if (pathname === '/comidas') {
      console.log('entrei no filtro comidas');
      return foodFilter.filter((_, index) => index < five)
          .map((filter, index) => (
            <button
              type="button"
              data-testid={ `${filter.strCategory}-category-filter` }
              key={index}
              // onClick={ }
            >
              {filter.strCategory}
            </button>
          ));
    }
    if (pathname === '/bebidas') {
      console.log('entrei no filtro bebidas');
      return drinkFilter.filter((_, index) => index < five)
          .map((filter, index) => (
            <button
              type="button"
              data-testid={ `${filter.strCategory}-category-filter` }
              key={index}
            >
              {filter.strCategory}
            </button>
          ));
    }
  };

  const renderCards = () => {
    if (pathname === '/comidas') {
      return foodRecipes.filter((food, index) => index < twelve)
        .map((food, index) => (
          <div data-testid={ `${index}-recipe-card` } key="index">
            <img
              src={ food.strMealThumb }
              data-testid={ `${index}-card-img` }
              alt={ food.strMeal }
            />
            <p data-testid={ `${index}-card-name` }>{food.strMeal}</p>
          </div>
        ));
    }

    if (pathname === '/bebidas') {
      return (drinkRecipes && drinkRecipes.length && drinkRecipes
        .filter((drink, index) => index < twelve)
        .map((drinks, index) => (
          <div data-testid={ `${index}-recipe-card` } key="index">
            <img
              src={ drinks.strDrinkThumb }
              data-testid={ `${index}-card-img` }
              alt={ drinks.strDrink }
            />
            <p data-testid={ `${index}-card-name` }>{ drinks.strDrink}</p>
          </div>
        )));
    }
  };

  return (
    <div>
      <div className="filter-container">
        <button type="button">All</button>
        {renderFilters()}
      </div>
      <div className="recipes-container">
        { isLoading ? <p>Loading...</p> : renderCards() }
      </div>
    </div>);
}
