import React, { useState } from 'react';
import propTypes from 'prop-types';
import recipesAppContext from './recipesAppContext';
import { searchByName } from '../services/mealAPI';

function RecipesAppProvider({ children }) {
  const [searchBar, setSearchBar] = useState(false);
  const [data, setData] = useState({});

  // Pensar no switch para escolher a requisição

  const fetchMeal = async (meal) => {
    const mealsApi = await searchByName(meal);
    setData(mealsApi);
  };

  const contextValue = {
    searchBar,
    setSearchBar,
    data,
    fetchMeal,
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
