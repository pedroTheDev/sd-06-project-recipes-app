import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from './RecipesAppContext';
import { loadState } from '../services/localStorage';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchHeader, setSearchHeader] = useState(false);

  const [cardFood, setCardFood] = useState([]);
  const [cardDrink, setCardDrink] = useState([]);

  const [categoriesButtonFood, setCategoriesButtonFood] = useState([]);
  const [categoriesButtonDrink, setCategoriesButtonDrink] = useState([]);

  const [
    localStorageFavoriteRecipes,
    setLocalStorageFavoriteRecipes,
  ] = useState(loadState('favoriteRecipes', []));

  const contextValue = {
    email,
    setEmail,
    password,
    setPassword,
    searchHeader,
    setSearchHeader,
    localStorageChange: {
      localStorageFavoriteRecipes,
      setLocalStorageFavoriteRecipes,
    },
    categories: {
      categoriesButtonFood,
      setCategoriesButtonFood,
      categoriesButtonDrink,
      setCategoriesButtonDrink,
    },
    cards: {
      cardFood,
      setCardFood,
      cardDrink,
      setCardDrink,
    },
  };

  return (
    <RecipesAppContext.Provider value={ contextValue }>
      {children}
    </RecipesAppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
