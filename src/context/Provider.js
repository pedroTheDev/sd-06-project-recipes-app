import React from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from './ContextRecipes';

function Provider({ children }) {
  const contextValue = {};

  return (
    <ContextRecipes.Provider value={contextValue}>
      {children}
    </ContextRecipes.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
