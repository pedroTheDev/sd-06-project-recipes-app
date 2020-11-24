import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ContextAPI from './ContextAPI';

const RecipesProvider = ({ children }) => {
  const [email, setEmail] = useState([]);
  const [searchComponent, setSearchComponent] = useState(false);
  const [apiValueSearch, setApiValueSearch] = useState({
    resultsApi: '',
  });

  const contextState = {
    email,
    setEmail,
    searchComponent,
    setSearchComponent,
    apiValueSearch,
    setApiValueSearch,
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
