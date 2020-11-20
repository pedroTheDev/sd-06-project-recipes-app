import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from './ContextRecipes';

function Provider({ children }) {
  const [btnDisable, setBtnDisable] = useState(true);
  const [showSearchBar, setSearchBar] = useState(false);
  const [user, setUser] = useState({ email: '' });
  const [searchText, setSearchText] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [drinks, setDrinks] = useState('');
  const [idRecipe, setIdRecipe] = useState('');

  const contextValue = {
    btnDisable,
    setBtnDisable,
    user,
    setUser,
    showSearchBar,
    setSearchBar,
    searchText,
    setSearchText,
    selectedRadio,
    setSelectedRadio,
    recipes,
    setRecipes,
    drinks,
    setDrinks,
    idRecipe,
    setIdRecipe,
  };

  return (
    <ContextRecipes.Provider value={contextValue}>
      {children}
    </ContextRecipes.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
