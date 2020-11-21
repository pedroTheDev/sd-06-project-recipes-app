import React from 'react';
import propTypes from 'prop-types';
import recipesAppContext from './recipesAppContext';

function RecipesAppProvider({ children }) {
  const contextValue = {};
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
