import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import RecipeContext from './RecipeContext';
import recipeRequest from '../services/recipeRequest';

const Provider = ({ children }) => {
  const [foodRecipes, setFoodRecipes] = useState([]);
  const [drinkRecipes, setDrinkRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [foodFilter, setFoodFilter] = useState([]);
  const [drinkFilter, setDrinkFilter] = useState([]);

  const getAPI = async () => {
    const foodRequest = await recipeRequest('https://www.themealdb.com/api/json/v1/1/search.php?s=A');
    const drinkRequest = await recipeRequest('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=A');
    const foodFilterRequest = await recipeRequest('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const drinkFilterRequest = await recipeRequest('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    setIsLoading(true);
    await setDrinkRecipes(drinkRequest.drinks);
    await setFoodRecipes(foodRequest.meals);
    await setFoodFilter(foodFilterRequest.meals);
    await setDrinkFilter(drinkFilterRequest.drinks);
    console.log('texto bebidas', drinkRecipes);
    setIsLoading(false);
  };

  useEffect(() => {
    getAPI();
  }, []);

  const contextValue = {
    foodRecipes,
    drinkRecipes,
    isLoading,
    setIsLoading,
    foodFilter,
    drinkFilter,
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
