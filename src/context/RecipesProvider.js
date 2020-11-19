import React from 'react';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const contextState = {
    loading: false,
  }

  return (
    <RecipesContext.Provider value={ contextState }>
      { children }
    </RecipesContext.Provider>
  )
}

export default RecipesProvider;
