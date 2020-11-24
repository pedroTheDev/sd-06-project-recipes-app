import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../hooks/RecipeContext';
import recipeRequest from '../services/recipeRequest';

export default function MainScreen() {
  const history = useHistory();
  const { foodRecipes, drinkRecipes, isLoading, foodFilter, drinkFilter } = useContext(RecipeContext);
  const doze = 12;
  const { pathname } = history.location;
  console.log(foodFilter, drinkFilter);
  // const renderFilters = () => {
  // if (pathname === '/comidas') {
  // }
  // };

  const renderCards = () => {
    if (pathname === '/comidas') {
      return foodRecipes.filter((food, index) => index < doze)
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
        .filter((drinks, index) => index < doze)
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
  return <div>{ isLoading ? <p>Loading...</p> : renderCards() }</div>;
}
