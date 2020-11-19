import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import mealsContext from './MealsContext';

import { getAllRecipeTypesApi } from '../services/mealsAPI';

function MyProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(async () => {
    const myCategories = await getAllRecipeTypesApi('c');
    const myAreas = await getAllRecipeTypesApi('a');
    const myIngredients = await getAllRecipeTypesApi('i');
    setCategories(myCategories);
    setAreas(myAreas);
    setIngredients(myIngredients);
  }, []);

  const contextValue = {
    categories,
    areas,
    ingredients,
  };

  return (
    <mealsContext.Provider value={contextValue}>
      {children}
    </mealsContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;
