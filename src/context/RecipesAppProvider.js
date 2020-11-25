import React, { useState } from 'react';
import propTypes from 'prop-types';
import recipesAppContext from './recipesAppContext';
import { fetchMeal } from '../services/mealAPI';
import { fetchDrink } from '../services/cocktailAPI';

function RecipesAppProvider({ children }) {
  const [searchBar, setSearchBar] = useState(false);
  const [data, setData] = useState({});

  const setFetchMeal = async (type, key) => {
    const result = await fetchMeal(type, key);
    setData(result);
    return result;
  };

  const setFetchDrink = async (type, key) => {
    const result = await fetchDrink(type, key);
    setData(result);
    return result;
  };

  const contextValue = {
    searchBar,
    setSearchBar,
    data,
    setFetchMeal,
    setFetchDrink,
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
