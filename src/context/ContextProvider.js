import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';

function ContextProvider({ children }) {
  const [foodAPI, setFoodAPI] = useState([]);
  const [drinkAPI, setDrinkAPI] = useState([]);
  const [mealCategories, setMealCategories] = useState('');
  const [drinkCategories, setDrinkCategories] = useState('');

  const ContextValue = {
    foodAPI,
    setFoodAPI,
    drinkAPI,
    setDrinkAPI,
    mealCategories,
    setMealCategories,
    drinkCategories,
    setDrinkCategories,
  };

  return (
    <RecipeContext.Provider value={ ContextValue }>
      {children}
    </RecipeContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ContextProvider;
