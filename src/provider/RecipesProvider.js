import React, { useState, useEffect } from 'react';

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

  const [radioValue, setRadioValue] = useState('');
  const [searchBar, setSearchBar] = useState('');
  const [returnFoodApi, setReturnFoodAPi] = useState([]);
  const [returnDrinkApi, setReturnDrinkAPi] = useState([]);

  useEffect(() => {
    if (returnFoodApi && returnFoodApi.length === 1) {
      const { idMeal } = returnFoodApi[0];
      window.location.pathname = `/comidas/${idMeal}`;
    }
    if (!returnFoodApi) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [returnFoodApi]);

  useEffect(() => {
    if (returnDrinkApi && returnDrinkApi.length === 1) {
      const { idDrink } = returnDrinkApi[0];
      window.location.pathname = `/bebidas/${idDrink}`;
    }
    if (!returnDrinkApi) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [returnDrinkApi]);

  const context = {
    login,
    setLogin,
    isValid,
    setValid,
    fetchFood,
    setFetchFood,
    fetchDrink,
    DrinkBtn,
    setDrinkBtn,
    FoodBtn,
    setFoodBtn,
    filterFood,
    filterDrink,
    setFilterFood,
    setFilterDrink,
    radioValue,
    setRadioValue,
    searchBar,
    setSearchBar,
    returnFoodApi,
    setReturnFoodAPi,
    returnDrinkApi,
    setFetchDrink,
    setReturnDrinkAPi,
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
