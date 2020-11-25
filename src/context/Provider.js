import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import fetchMeal from '../services/fetchMeal';
import fetchDrink from '../services/fetchDrink';

function RecipesAppProvider({ children }) {
  const [details, setDetails] = useState('');
  const [random, setRandom] = useState('');

  const getMealDetail = async(id) => {
    const api = await fetchMeal('details', id);
    setDetails(api);
  };

  const getDrinkDetail = async(id) => {
    const api = await fetchDrink('details', id);
    setDetails(api);
  }

  const getRandomDrink = async() => {
    const api = await fetchDrink();
    setRandom(api);
  }

  const getRandomMeal = async() => {
    const api = await fetchMeal();
    setRandom(api);
  }

  const contextValue = {
    getMealDetail,
    getDrinkDetail,
    getRandomDrink,
    getRandomMeal,
    details,
    random,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

RecipesAppProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipesAppProvider;
