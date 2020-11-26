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
  const [ids, setIds] = useState('');
  const [foodRecommendation, setFoodRecommendation] = useState([]);
  const [DrinkRecommendation, setDrinkRecommendation] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState({});

  const getAPI = async () => {
    setIsLoading(true);
    const foodFilterRequest = await recipeRequest('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const drinkFilterRequest = await recipeRequest('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const foodRequest = await recipeRequest('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const drinkRequest = await recipeRequest('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    await setDrinkRecipes(drinkRequest.drinks);
    await setFoodRecipes(foodRequest.meals);
    await setFoodFilter(foodFilterRequest.meals);
    await setDrinkFilter(drinkFilterRequest.drinks);
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
    setFoodRecipes,
    setDrinkRecipes,
    ids,
    setIds,
    foodRecommendation,
    setFoodRecommendation,
    DrinkRecommendation,
    setDrinkRecommendation,
    inProgressRecipes,
    setInProgressRecipes,
  };

  return (
    <RecipeContext.Provider value={ contextValue }>
      { children }
    </RecipeContext.Provider>
  );
};

Provider.propTypes = {
  children: propTypes.node.isRequired,
};

export default Provider;
