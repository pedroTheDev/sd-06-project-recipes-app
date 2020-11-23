import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

const RecipesProvider = ({ children }) => {
  const [selectedApiEndpoint, setSelectedApiEndpoint] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const providerValue = {
    selectedApiEndpoint,
    setSelectedApiEndpoint,
    searchTerm,
    setSearchTerm,
  };
  return (
    <RecipesContext.Provider value={ providerValue }>
      { children }
    </RecipesContext.Provider>
  );
};

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
