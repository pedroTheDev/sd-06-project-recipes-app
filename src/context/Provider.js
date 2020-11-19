import React, { useState } from 'react';
import RecipesContext from './Context';

function Provider({ children }) {
  const [stateA, setStateA] = useState('estado-inicial');

  const contextValue = {
    stateA,
    setStateA,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      { children }
    </RecipesContext.Provider>
  );
}

export default Provider;
