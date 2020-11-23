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
  const [radioValue, setRadioValue] = useState('');
  const [searchBar, setSearchBar] = useState('');
  const [returnFoodApi, setReturnFoodAPi] = useState([]);
  const [returnDrinkApi, setReturnDrinkAPi] = useState([]);

  useEffect(() => {
    if (returnFoodApi.length === 1) {
      const { idMeal } = returnFoodApi[0];
      window.location.pathname = `/comidas/${idMeal}`;
    }
  }, [returnFoodApi]);

  useEffect(() => {
    if (returnDrinkApi.length === 1) {
      const { idDrink } = returnDrinkApi[0];
      window.location.pathname = `/bebidas/${idDrink}`;
    }
  }, [returnDrinkApi]);

  const context = {
    login,
    setLogin,
    isValid,
    setValid,
    radioValue,
    setRadioValue,
    searchBar,
    setSearchBar,
    returnFoodApi,
    setReturnFoodAPi,
    returnDrinkApi,
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
