import React, {
  createContext, useCallback, useContext, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';

import { fetchDrinksCategories } from '../services/drinksApi';
import { fetchFoodsCategories } from '../services/foodApi';
import { useAuth } from './auth';

const recipesStructure = {
  Comidas: [],
  Bebidas: [],
};

const recipesContext = createContext();

function RecipeProvider({ children }) {
  const [currentRecipes, setCurrentRecipes] = useState(recipesStructure);
  const [currentFilters, setCurrentFilters] = useState(recipesStructure);

  const { userToken } = useAuth();

  useEffect(() => {
    async function getCategories() {
      const foodCategories = await fetchFoodsCategories(userToken);
      const drinkCategories = await fetchDrinksCategories(userToken);

      const categories = {
        Comidas: foodCategories,
        Bebidas: drinkCategories,
      };

      setCurrentFilters(categories);
    }

    getCategories();
  }, []);

  const updateRecipes = useCallback((type, newRecipes) => {
    const RECIPES_LIMIT = 12;

    const recipesToShow = newRecipes.filter((_, index) => index < RECIPES_LIMIT);

    setCurrentRecipes((oldRecipes) => ({
      ...oldRecipes,
      [type]: recipesToShow,
    }));
  }, []);

  return (
    <recipesContext.Provider value={{
      currentRecipes,
      currentFilters,
      updateRecipes,
    }}
    >
      {children}
    </recipesContext.Provider>
  );
}

function useRecipes() {
  const context = useContext(recipesContext);

  if (!context) {
    throw new Error('You must use this hook within its provider');
  }

  return context;
}

export { RecipeProvider, useRecipes };

RecipeProvider.propTypes = {
  children: PropTypes.oneOf([
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
};
