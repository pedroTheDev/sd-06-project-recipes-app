import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

RecipesAppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RecipesAppProvider;
