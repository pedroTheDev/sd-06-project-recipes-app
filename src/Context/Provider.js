import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ContextAPI from './ContextAPI';

const RecipesProvider = ({ children }) => {
  const [stateRecipes, setRecipes] = useState(ContextAPI);
  const contextState = {
    stateRecipes,
    setRecipes,
  };
  return (
    <ContextAPI.Provider value={contextState}>
      { children }
    </ContextAPI.Provider>
  );
};

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
