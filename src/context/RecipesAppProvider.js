import React, { useState } from 'react';
import propTypes from 'prop-types';
import recipesAppContext from './recipesAppContext';
import { fetchMeal } from '../services/mealAPI';
import { fetchDrink } from '../services/cocktailAPI';

function RecipesAppProvider({ children }) {
  const [searchBar, setSearchBar] = useState(false);
  const [data, setData] = useState({});
  const [control, setControl] = useState(false);

  const setFetchMeal = async (type, key) => {
    const result = await fetchMeal(type, key);
    setData(result);
    const resultReturn = {
      result,
      redirect: false,
    };
    if (result.meals == null) {
      return alert('Sinto muito, não encontramos nenhuma receita para esses filtros');
    }
    if (result.meals.length === 1) {
      resultReturn.redirect = true;
      return resultReturn;
    }
    setControl(true);
    return resultReturn;
  };

  const setFetchDrink = async (type, key) => {
    const result = await fetchDrink(type, key);
    setData(result);
    const resultReturn = {
      result,
      redirect: false,
    };
    if (result === null) {
      return null;
    }
    if (result.drinks.length === 1) {
      resultReturn.redirect = true;
      return resultReturn;
    }
    setControl(true);
    return resultReturn;
  };

  const contextValue = {
    searchBar,
    setSearchBar,
    data,
    setFetchMeal,
    setFetchDrink,
    control,
    setControl,
  };
  return (
    <recipesAppContext.Provider value={ contextValue }>
      {children}
    </recipesAppContext.Provider>
  );
}

RecipesAppProvider.propTypes = {
  children: propTypes.func.isRequired,
};

export default RecipesAppProvider;
