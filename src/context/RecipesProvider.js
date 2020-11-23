import React from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const contextState = {
    loading: false,
    foodIngredients: ['1', '2', '3', '4', '5', '6', '7', '8'],
    drinkIngredients: ['1', '2', '3'],
  };

  return (
    <RecipesContext.Provider value={ contextState }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
