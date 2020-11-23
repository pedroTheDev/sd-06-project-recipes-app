import React, { useState } from 'react';
import propTypes from 'prop-types';
import recipesAppContext from './recipesAppContext';

function RecipesAppProvider({ children }) {
  const INITIAL_SEARCHBAR = {
    searchBar: false,
  }

  const [searchBar, setsearchBar] = useState({ ...INITIAL_SEARCHBAR });

  const contextValue = {
    searchBar,
    setsearchBar,
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
