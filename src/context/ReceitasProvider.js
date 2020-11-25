import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ReceitasContext from './ReceitasContext';

const ReceitasProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [searchBox, setSearchBox] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [filtersData, setFiltersData] = useState(['All']);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [randomDrinkID, setRandomDrink] = useState();
  const [randomMealID, setRandomMeal] = useState();

  const state = {
    meals,
    setMeals,
    drinks,
    setDrinks,
    searchBox,
    setSearchBox,
    fetching,
    setFetching,
    filtersData,
    setFiltersData,
    selectedFilter,
    setSelectedFilter,
    randomDrinkID,
    setRandomDrink,
    randomMealID,
    setRandomMeal,
  };

  return (
    <ReceitasContext.Provider value={ state }>
      {children}
    </ReceitasContext.Provider>
  );
};

ReceitasProvider.propTypes = {
  children: PropTypes.arrayOf(Object).isRequired,
};

export default ReceitasProvider;
