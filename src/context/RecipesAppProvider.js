import React, { useState } from 'react';
import RecipesContext from './RecipesContext';

function RecipesAppProvider({ children }) {
  const [valueInput, setValueInput] = useState('');
  const context = {
    valueInput,
    setValueInput,
  };
  return (
    <RecipesContext.Provider value={context}>
      {children}
    </RecipesContext.Provider>
  );
}

export default RecipesAppProvider;
