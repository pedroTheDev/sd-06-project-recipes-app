import React, {
  createContext, useCallback, useContext, useState,
} from 'react';
import PropTypes from 'prop-types';

import { fetchDrinkDetails, fetchDrinksSearch } from '../services/drinksApi';
import { fetchMealDetails, fetchMealsSearch } from '../services/foodApi';
import { useAuth } from './auth';

const singleRecipeStructure = {
  Comidas: {
    recipe: {},
    recommendations: [],
  },
  Bebidas: {
    recipe: {},
    recommendations: [],
  },
};

const fetchSinglesOptions = {
  Comidas: fetchMealDetails,
  Bebidas: fetchDrinkDetails,
};

const fetchRecommendationsOptions = {
  Comidas: fetchMealsSearch,
  Bebidas: fetchDrinksSearch,
};

function invertType(type) {
  const comidas = 'Comidas';
  const bebidas = 'Bebidas';

  return (type === comidas) ? bebidas : comidas;
}

const recommendationsDefault = {
  Comidas: {
    value: 'Chicken',
    token: '1',
    option: 'name',
  },
  Bebidas: {
    value: 'Martini',
    token: '1',
    option: 'name',
  },
};

const singleRecipeContext = createContext();

function SingleRecipeProvider({ children }) {
  const [currentFocusedRecipes, setCurrentFocusedRecipes] = useState(singleRecipeStructure);
  const [loadingSingleRecipe, setLoadingSingleRecipe] = useState(true);

  const { userToken } = useAuth();

  const loadSingleRecipe = useCallback(async (type, recipeID) => {
    const loadRecipe = fetchSinglesOptions[type];
    const invertedType = invertType(type);
    const loadRecommendations = fetchRecommendationsOptions[invertedType];

    try {
      const recipe = await loadRecipe(recipeID, userToken);

      let recommendations = await loadRecommendations(recommendationsDefault[invertedType]);

      const REC_LIMIT = 6;
      recommendations = recommendations.filter((_, index) => index < REC_LIMIT);

      setCurrentFocusedRecipes((oldFocused) => ({
        ...oldFocused,
        [type]: {
          recipe,
          recommendations,
        },
      }));
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingSingleRecipe(false);
    }
  }, [userToken]);

  return (
    <singleRecipeContext.Provider value={{
      currentFocusedRecipes,
      loadingSingleRecipe,
      loadSingleRecipe,
    }}
    >
      {children}
    </singleRecipeContext.Provider>
  );
}

function useSingleRecipe() {
  const context = useContext(singleRecipeContext);

  if (!context) {
    throw new Error('You must use this hook within its provider');
  }

  return context;
}

export { SingleRecipeProvider, useSingleRecipe };

SingleRecipeProvider.propTypes = {
  children: PropTypes.oneOf([
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
};
