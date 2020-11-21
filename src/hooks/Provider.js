import React from 'react';
import propTypes from 'prop-types';
import RecipeContext from './RecipeContext';

const Provider = ({ children }) => {
  const contextValue = {
  };

  return (
    <RecipeContext.Provider value={ contextValue }>
      { children }
    </RecipeContext.Provider>
  );
};

Provider.propTypes = {
  children: propTypes.func.isRequired,
};

export default Provider;
