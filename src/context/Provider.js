import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import fetchMeal from '../services/fetchMeal';
import fetchDrink from '../services/fetchDrink';

function RecipesAppProvider({ children }) {
  const [details, setDetails] = useState('');


  const getMealDetail = async() => {
    const api = await fetchMeal('details', '52771');
    setDetails(api);
  };

  const getDrinkDetail = async() => {
    const api = await fetchDrink('details', '178319');
    setDetails(api);
  }

  const contextValue = {
    getMealDetail,
    getDrinkDetail,
    details,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

RecipesAppProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipesAppProvider;
