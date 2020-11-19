import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ContextAPI from './ContextAPI';

const RecipesProvider = ({ children }) => {
  const [email, setEmail] = useState([]);
  const contextState = {
    email,
    setEmail,
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
