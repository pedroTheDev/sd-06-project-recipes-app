import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import fetchMeal from '../services/fetchMeal';

function RecipesAppProvider({ children }) {
  const [meals, setMeals] = useState([]);

  const mealsToRender = async () => {
    let fetchedMeals = await fetchMeal('name');
    const first = 0;
    const twelfth = 12;

    fetchedMeals = fetchedMeals.slice(first, twelfth);
    setMeals(fetchedMeals);
  };

  const contextValue = {
    meals,
    mealsToRender,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

RecipesAppProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipesAppProvider;
