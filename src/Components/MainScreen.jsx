import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../hooks/RecipeContext';
import recipeRequest from '../services/recipeRequest';

export default function MainScreen() {
  const history = useHistory();
  const {
    foodRecipes,
    drinkRecipes,
    isLoading,
    foodFilter,
    drinkFilter,
    setDrinkRecipes,
    setFoodRecipes } = useContext(RecipeContext);
  const twelve = 12;
  const five = 5;
  const { pathname } = history.location;

  const handleFilters = async ({ target }) => {
    if (target.id === 'all' && pathname === '/comidas') {
      const data = await recipeRequest('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      await setFoodRecipes(data.meals);
    } else if (target.id === 'all' && pathname === '/bebidas') {
      const data = await recipeRequest('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      await setDrinkRecipes(data.drinks);
    } else if (pathname === '/comidas') {
      const data = await recipeRequest(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${target.id}`);
      await setFoodRecipes(data.meals);
    } else if (pathname === '/bebidas') {
      const data = await recipeRequest(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${target.id}`);
      await setDrinkRecipes(data.drinks);
    }
  };

  const renderFilters = () => {
    if (pathname === '/comidas') {
      return foodFilter.filter((_, index) => index < five)
        .map((filter, index) => (
          <button
            type="button"
            data-testid={ `${filter.strCategory}-category-filter` }
            key={ index }
            id={ filter.strCategory }
            onClick={ handleFilters }
          >
            {filter.strCategory}
          </button>
        ));
    }
    if (pathname === '/bebidas') {
      return drinkFilter.filter((_, index) => index < five)
        .map((filter, index) => (
          <button
            type="button"
            data-testid={ `${filter.strCategory}-category-filter` }
            key={ index }
            id={ filter.strCategory }
            onClick={ handleFilters }
          >
            {filter.strCategory}
          </button>
        ));
    }
  };

  const renderCards = () => {
    if (pathname === '/comidas' && foodRecipes) {
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
        <button onClick={ handleFilters } id="all" type="button">All</button>
        {renderFilters()}
      </div>
      <div className="recipes-container">
        { isLoading ? <p>Loading...</p> : renderCards() }
      </div>
    </div>);
}
