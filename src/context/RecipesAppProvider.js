import React from 'react';
import recipesAppContext from './recipesAppContext';

function RecipesAppProvider({ children }) {
  const contextValue = {};
  return (
    <recipesAppContext.Provider value={contextValue}>
      {children}
    </recipesAppContext.Provider>
  );
}

export default RecipesAppProvider;
