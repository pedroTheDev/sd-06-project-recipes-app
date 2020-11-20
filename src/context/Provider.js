import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './Context';

function Provider({ children }) {
  const [stateA, setStateA] = useState('estado-inicial');
  const [login, setLogin] = useState({ email: '', password: '', redirect: false });
  const [disabled, setDisabled] = useState(true);

  const contextValue = {
    stateA,
    setStateA,
    login,
    setLogin,
    disabled,
    setDisabled,
  };

  return (
    <RecipesContext.Provider value={contextValue}>
      { children }
    </RecipesContext.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
};
