import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from './RecipesAppContext';

function Provider({ children }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchHeader, setSearchHeader] = useState(false);
  
  const contextValue = {
    email, setEmail,
    password, setPassword,
    searchHeader, setSearchHeader,
  };

  return (
    <RecipesAppContext.Provider value={ { contextValue, } }>
      {children}
    </RecipesAppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
