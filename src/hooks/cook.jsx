import React, {
  createContext, useCallback, useContext, useState,
} from 'react';
import PropTypes from 'prop-types';

const cookRecipesStructure = {
  Comidas: [],
  Bebidas: [],
};

const cookContext = createContext();

function CookProvider({ children }) {
  const [cookedRecipes, setCookedRecipes] = useState(cookRecipesStructure);

  const startCooking = useCallback((type, recipe) => {
    setCookedRecipes((oldCooks) => {
      const oldRecipesStarted = oldCooks[type];

      const newRecipeStarted = {
        recipe,
        finished: false,
      };

      return {
        ...oldCooks,
        [type]: [...oldRecipesStarted, newRecipeStarted],
      };
    });
  }, []);

  return (
    <cookContext.Provider value={{
      cookedRecipes,
      startCooking,
    }}
    >
      {children}
    </cookContext.Provider>
  );
}

function useCook() {
  const context = useContext(cookContext);

  if (!context) {
    throw new Error('You must use this hook within its provider');
  }

  return context;
}

export { CookProvider, useCook };

CookProvider.propTypes = {
  children: PropTypes.oneOf([
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
};
