import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import RecipeContext from './RecipeContext';
import recipeRequest from '../services/recipeRequest';

const Provider = ({ children }) => {
  const [foodRecipes, setFoodRecipes] = useState([]);
  const [drinkRecipes, setDrinkRecipes] = useState([]);

  const getAPI = async () => {
    const foodRequest = await recipeRequest('https://www.themealdb.com/api/json/v1/1/search.php?s=A');
    const drinkRequest = await recipeRequest('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=A');
    await setFoodRecipes(foodRequest.meals);
    await setDrinkRecipes(drinkRequest.drinks);
  };

  useEffect(() => {
    getAPI();
  }, []);

  const contextValue = {
    foodRecipes,
    drinkRecipes,
  };

  return (
    <RecipeContext.Provider value={ contextValue }>
      { children }
    </RecipeContext.Provider>
  );
};

Provider.propTypes = {
  children: propTypes.func.isRequired,
};

export default Provider;
