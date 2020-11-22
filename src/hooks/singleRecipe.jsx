import React, {
  createContext, useCallback, useContext, useState,
} from 'react';
import PropTypes from 'prop-types';

import { fetchDrinkDetails, fetchDrinksSearch, fetchRandomDrink } from '../services/drinksApi';
import { fetchMealDetails, fetchMealsSearch, fetchRandomMeal } from '../services/foodApi';
import { useAuth } from './auth';

const singleRecipeStructure = {
  comidas: {
    recipe: {},
    recommendations: [],
  },
  bebidas: {
    recipe: {},
    recommendations: [],
  },
};

const fetchSinglesOptions = {
  comidas: fetchMealDetails,
  bebidas: fetchDrinkDetails,
};

const fetchRecommendationsOptions = {
  comidas: fetchMealsSearch,
  bebidas: fetchDrinksSearch,
};

const fetchRandomOptions = {
  comidas: fetchRandomMeal,
  bebidas: fetchRandomDrink,
};

function invertType(type) {
  const comidas = 'comidas';
  const bebidas = 'bebidas';

  return (type === comidas) ? bebidas : comidas;
}

const recommendationsDefault = {
  comidas: {
    value: 'Chicken',
    token: '1',
    option: 'name',
  },
  bebidas: {
    value: 'Martini',
    token: '1',
    option: 'name',
  },
};

const singleRecipeContext = createContext();

function SingleRecipeProvider({ children }) {
  const [currentFocusedRecipes, setCurrentFocusedRecipes] = useState(singleRecipeStructure);
  const [loadingSingleRecipe, setLoadingSingleRecipe] = useState(true);
  const [randomRedirect, setRandomRedirect] = useState(false);

  const { userToken } = useAuth();

  const loadSingleRecipe = useCallback(async (type, recipeID) => {
    if (randomRedirect) return;

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
  }, [userToken, randomRedirect]);

  const loadRandomRecipe = useCallback(async (type) => {
    setLoadingSingleRecipe(true);

    const leadRandomRecipe = fetchRandomOptions[type];
    const invertedType = invertType(type);
    const loadRecommendations = fetchRecommendationsOptions[invertedType];

    let randomID;
    let recipe;

    try {
      [randomID, recipe] = await leadRandomRecipe(userToken);

      let recommendations = await loadRecommendations(recommendationsDefault[invertedType]);

      const REC_LIMIT = 6;
      recommendations = recommendations.filter((_, index) => index < REC_LIMIT);

      setRandomRedirect(true);

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

    return randomID;
  }, [userToken]);

  const unloadRandom = useCallback(() => {
    setRandomRedirect(false);
  }, []);

  return (
    <singleRecipeContext.Provider value={{
      currentFocusedRecipes,
      loadingSingleRecipe,
      loadSingleRecipe,
      loadRandomRecipe,
      unloadRandom,
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
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
};
