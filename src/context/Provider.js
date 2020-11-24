import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RevenueContext from './RevenueContext';
// import ApiPageFoods from '../services/ApiPageFoods';
// import ApiPageDrinks from '../services/ApiPageDrinks';

const Provider = ({ children }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [search, setSearch] = useState(false);
  const [searchButton, setSearchButton] = useState(true);
  const [searchParam, setSearchParam] = useState('Meal');
  const [foods, setFoods] = useState([]);

  const fetchApi = async (URL) => {
    const response = await fetch(URL);
    const json = await response.json();
    // if (json.categories) setFoods(json.categories);
    if (json.drinks) setFoods(json.drinks);
    if (json.meals) setFoods(json.meals);
  };
  // const [drinks, setDrinks] = useState([]);
  // //
  // const fetchFoods = async () => {
  //   const foodsFromApi = await ApiPageFoods();
  //   setFoods(foodsFromApi.categories);
  // };
  // //
  // const fetchDrinks = async () => {
  //   const drinksFromApi = await ApiPageDrinks();
  //   setDrinks(drinksFromApi.categories);
  // };
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
    //
    foods,
    setFoods,
    fetchApi,
    // fetchFoods,
    // //
    // drinks,
    // setDrinks,
    // fetchDrinks,
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
