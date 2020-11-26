import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import fetchFoodData from '../services/fetchFoodData';
import fetchDrinkData from '../services/fetchDrinkData';
import fetchFoodCategories from '../services/fetchFoodCategories';
import fetchDrinkCategories from '../services/fetchDrinkCategories';

function Provider({ children }) {
  const [foodData, setFoodData] = useState([]);
  const [drinkData, setDrinkData] = useState([]);
  const [searchInput, setSearchInput] = useState({
    filterType: '',
    query: '',
    readyToSearch: false,
  });
  const [filteredCategories, setFilteredCategories] = useState(null);
  const [activeFilter, setActiveFilter] = useState('');

  const sliceStart = 0;
  const sliceEnd = 5;

  const getFoodAPI = async (filterType, query) => {
    if (filterType !== 'first-letter-filter' || query.length === 1) {
      const result = await fetchFoodData(filterType, query);
      if (result === null) {
        return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
      setFoodData(result);
    } else {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  const getDrinkAPI = async (filterType, query) => {
    if (filterType !== 'first-letter-filter' || query.length === 1) {
      const result = await fetchDrinkData(filterType, query);
      if (result === null) {
        return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
      setDrinkData(result);
    } else {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  const getFoodCategories = async () => {
    const response = await fetchFoodCategories();
    const filtersArray = response.map((item) => item.strCategory);
    setFilteredCategories(filtersArray.slice(sliceStart, sliceEnd));
  };

  const getDrinkCategories = async () => {
    const response = await fetchDrinkCategories();
    const filtersArray = response.map((item) => item.strCategory);
    setFilteredCategories(filtersArray.slice(sliceStart, sliceEnd));
  };

  const value = {
    getFoodAPI,
    getDrinkAPI,
    drinkData,
    foodData,
    searchInput,
    setSearchInput,
    getFoodCategories,
    getDrinkCategories,
    filteredCategories,
    activeFilter,
    setActiveFilter,
  };

  return (
    <RecipesContext.Provider value={ value }>
      { children }
    </RecipesContext.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
