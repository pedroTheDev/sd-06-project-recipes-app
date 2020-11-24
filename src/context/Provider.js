import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import fetchMeal from '../services/fetchMeal';
import fetchDrink from '../services/fetchDrink';

function RecipesAppProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);

  const recipesToRender = async (type) => {
    let fetchedRecipes = await (type === 'meal'
      ? fetchMeal('name')
      : fetchDrink('name')
    );
    const first = 0;
    const twelfth = 12;

    fetchedRecipes = fetchedRecipes.slice(first, twelfth);
    setRecipes(fetchedRecipes);
  };

  const categoriesToRender = async (type) => {
    let categoriesList = await (type === 'meal'
      ? fetchMeal('allCategories')
      : fetchDrink('allCategories')
    );
    const first = 0;
    const sixth = 6;

    categoriesList = categoriesList.slice(first, sixth);
    console.log(categoriesList);
    setCategories(categoriesList);
  };

  const contextValue = {
    recipes,
    recipesToRender,
    categories,
    categoriesToRender,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

RecipesAppProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipesAppProvider;
