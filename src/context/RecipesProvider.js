import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

const RecipesProvider = ({ children }) => {
  const [selectedApiEndpoint, setSelectedApiEndpoint] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [fetchedResults, setFetchedResults] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const providerValue = {
    selectedApiEndpoint,
    setSelectedApiEndpoint,
    searchTerm,
    setSearchTerm,
    fetchedResults,
    setFetchedResults,
    isFetching,
    setIsFetching,
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
