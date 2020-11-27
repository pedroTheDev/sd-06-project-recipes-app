import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RevenueContext from './RevenueContext';

const Provider = ({ children }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [search, setSearch] = useState(false);
  const [searchButton, setSearchButton] = useState(true);
  const [foods, setFoods] = useState([]);
  const [recommendations, setRecommendations] = useState();
  const [categories, setCategories] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [searchParam, setSearchParam] = useState();

  const fetchApi = async (URL) => {
    setisLoading(true);
    const response = await fetch(URL);
    const json = await response.json();
    setisLoading(false);
    if (searchParam === 'Drink') {
      if (json.drinks) {
        setFoods(json.drinks);
      } else if (json.ingredients) {
        setSearchParam('Ingredients');
        setFoods(json.ingredients);
      } else {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
    }
    if (searchParam === 'Meal') {
      if (json.meals) {
        setFoods(json.meals);
      } else if (json.ingredients) {
        setSearchParam('Ingredients');
        setFoods(json.ingredients);
      } else {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
    }
  };

  const fetchRecommendations = async (URL) => {
    const response = await fetch(URL);
    const json = await response.json();
    if (searchParam === 'Meal') setRecommendations(json.drinks);
    if (searchParam === 'Drink') setRecommendations(json.meals);
  };

  const fetchByCategory = async (URL) => {
    const response = await fetch(URL);
    const json = await response.json();
    if (searchParam === 'Drink') setFoods(json.drinks);
    if (searchParam === 'Meal') setFoods(json.meals);
  };

  const fetchCategories = async (URL) => {
    const response = await fetch(URL);
    const json = await response.json();
    setCategories(json);
  };

  const context = {
    email,
    password,
    setEmail,
    setPassword,
    search,
    setSearch,
    searchButton,
    setSearchButton,
    searchParam,
    setSearchParam,
    foods,
    setFoods,
    fetchApi,
    isLoading,
    setisLoading,
    recommendations,
    fetchRecommendations,
    categories,
    fetchCategories,
    fetchByCategory,
  };

  return (
    <RevenueContext.Provider value={ context }>
      {children}
    </RevenueContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Provider;
