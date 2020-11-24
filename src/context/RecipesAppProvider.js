import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from './RecipesAppContext';

function RecipesAppProvider({ children }) {
  const [ingredient, setIngredient] = useState(false);
  const [firstLetter, setFirstLetter] = useState(false);
  const [name, setName] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [errorFromApi, setErrorFromApi] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const value = {
    ingredient,
    setIngredient,
    firstLetter,
    setFirstLetter,
    name,
    setName,
    searchTerm,
    setSearchTerm,
    recipes,
    setRecipes,
    errorFromApi,
    setErrorFromApi,
    isFetching,
    setIsFetching,
  };

  return (
    <RecipesAppContext.Provider value={ value }>
      {children}
    </RecipesAppContext.Provider>
  );
}

RecipesAppProvider.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
};

export default RecipesAppProvider;
