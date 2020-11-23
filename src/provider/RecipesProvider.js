import React, { useState } from 'react';

// Proptypes
import PropTypes from 'prop-types';

// Context
import RecipesContext from '../context/RecipesContext';

export default function RecipesProvider({ children }) {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [isValid, setValid] = useState(true);
  const [fetchFood, setFetchFood] = useState([]);
  const [fetchDrink, setFetchDrink] = useState([]);
  const [DrinkBtn, setDrinkBtn] = useState([]);
  const [FoodBtn, setFoodBtn] = useState([]);
  const [filterFood, setFilterFood] = useState([]);
  const [filterDrink, setFilterDrink] = useState([]);

  const FoodApi = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const FoodData = await response.json();
    console.log(FoodData.meals);
    setFetchFood(FoodData.meals);
    return FoodData.meals;
  };
  const DrinkApi = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const Drinkdata = await response.json();
    setFetchDrink(Drinkdata.drinks);
    return Drinkdata.drinks;
  };
  const DrinkButton = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const BtnDrinkData = await response.json();
    setDrinkBtn(BtnDrinkData.drinks);
    return BtnDrinkData.drinks;
  };
  const FoodButton = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const BtnFoodData = await response.json();
    console.log(BtnFoodData.meals);
    setFoodBtn(BtnFoodData.meals);
    return BtnFoodData.meals;
  };
  const FoodCategory = async (category) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const filterDataFood = await response.json();
    setFilterFood(filterDataFood.meals);
  };
  const DrinkCategory = async (category) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const filterDataDrink = await response.json();
    // console.log(filterDataDrink.drinks);
    setFilterDrink(filterDataDrink.drinks);
  };

  const context = {
    login,
    setLogin,
    isValid,
    setValid,
    FoodApi,
    fetchFood,
    DrinkApi,
    fetchDrink,
    DrinkButton,
    DrinkBtn,
    FoodButton,
    FoodBtn,
    filterFood,
    FoodCategory,
    filterDrink,
    DrinkCategory,
    setFilterFood,
    setFilterDrink,
  };

  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
