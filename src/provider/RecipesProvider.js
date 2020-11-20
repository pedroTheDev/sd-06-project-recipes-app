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
  const [radioValue, setRadioValue] = useState('');
  const [searchBar, setSearchBar] = useState('');
  const [returnFoodApi, setReturnFoodAPi] = useState([]);
  const [returnDrinkApi, setReturnDrinkAPi] = useState([]);

  const context = {
    login,
    setLogin,
    isValid,
    setValid,
    radioValue,
    setRadioValue,
    searchBar,
    setSearchBar,
    returnFoodApi,
    setReturnFoodAPi,
    returnDrinkApi,
    setReturnDrinkAPi,
  };

  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
