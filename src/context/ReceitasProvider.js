import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ReceitasContext from './ReceitasContext';

const ReceitasProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);
  const [searchBox, setSearchBox] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [filtersData, setFiltersData] = useState(['All']);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [stopApi, setStopApi] = useState(false);

  const state = {
    meals,
    setMeals,
    foods,
    setFoods,
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
    stopApi,
    setStopApi,
    ingredientList,
    setIngredientList,
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
