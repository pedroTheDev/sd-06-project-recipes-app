import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from './RecipesAppContext';

function Provider({ children }) {
  const INITIAL_STATE = {
    user: {
      email: '',
    },
    doneRecipes: [{
      id: '',
      type: '',
      area: '',
      category: '',
      alcoholicOrNot: '',
      name: '',
      image: '',
      doneDate: '',
      tags: '',
    }],
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const contextValue = {
    email,
    setEmail,
    password,
    setPassword,
  };

  return (
    <RecipesAppContext.Provider
      value={{
        contextValue,
      }}
    >
      {children}
    </RecipesAppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
