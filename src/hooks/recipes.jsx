import React, {
  createContext, useCallback, useContext, useState,
} from 'react';
import PropTypes from 'prop-types';

const recipesContext = createContext();

function RecipeProvider({ children }) {
  const [currentRecipes, setCurrentRecipes] = useState([]);

  const updateRecipes = useCallback((newRecipes) => {
    const RECIPES_LIMIT = 12;

    const recipesToShow = newRecipes.filter((_, index) => index < RECIPES_LIMIT);

    setCurrentRecipes(recipesToShow);
  }, []);

  return (
    <recipesContext.Provider value={{
      currentRecipes,
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
