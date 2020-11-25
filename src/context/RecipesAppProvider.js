import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesAppProvider({ children }) {
  const [valueInput, setValueInput] = useState('');
  const [resultsFoodsAndDrinks, setResultsFoodsAndDrinks] = useState([]);
  const [hiddenInput, setHiddenInput] = useState(false);
  const context = {
    valueInput,
    setValueInput,
    resultsFoodsAndDrinks,
    setResultsFoodsAndDrinks,
    hiddenInput,
    setHiddenInput,
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
