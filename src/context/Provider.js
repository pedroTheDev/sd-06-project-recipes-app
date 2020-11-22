import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';

function Provider({ children }) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [valueRadioButton, setValueRadioButton] = useState('');
  const [searchBar, setSearchBar] = useState('');
  const [retornoApiComidas, setRetornoApiComidas] = useState([]);
  const [retornoApiBebidas, setRetornoApiBebidas] = useState([]);

  const contextValue = {
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    valueRadioButton,
    setValueRadioButton,
    searchBar,
    setSearchBar,
    retornoApiComidas,
    setRetornoApiComidas,
    retornoApiBebidas,
    setRetornoApiBebidas,
  };
  return (
    <RecipeContext.Provider value={ contextValue }>
      {children}
    </RecipeContext.Provider>
  );
}
Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Provider;
