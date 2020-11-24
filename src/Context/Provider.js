import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ContextAPI from './ContextAPI';

const RecipesProvider = ({ children }) => {
  const [email, setEmail] = useState([]);
  const [searchComponent, setSearchComponent] = useState(false);
  const [pageName, setPageName] = useState(false);
  const [apiValueSearch, setApiValueSearch] = useState({
    foods: '',
    drinks: '',
  });

  const contextState = {
    email,
    setEmail,
    searchComponent,
    setSearchComponent,
    apiValueSearch,
    setApiValueSearch,
    pageName,
    setPageName,
  };
  return (
    <ContextAPI.Provider value={ contextState }>
      { children }
    </ContextAPI.Provider>
  );
};

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
