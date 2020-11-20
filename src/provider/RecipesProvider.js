import React, { useState } from 'react';

// Proptypes
import PropTypes from 'prop-types';

// Context
import RecipesContext from '../context/RecipesContext';

export default function RecipesProvider({ children }) {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [isValid, setValid] = useState(true);

  const context = {
    login,
    setLogin,
    isValid,
    setValid,
  };

  return (
    <RecipesContext.Provider value={context}>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
