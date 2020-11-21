import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RevenueContext from './RevenueContext';
import ApiPageFoods from '../services/ApiPageFoods';

const Provider = ({ children }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [search, setSearch] = useState(false);
  const [searchButton, setSearchButton] = useState(true);

  //
  const [foods, setFoods] = useState([]);
  //

  //
  const fetchFoods = async () => {
    const foodsFromApi = await ApiPageFoods();
    setFoods(foodsFromApi.categories);
  };
  //

  const context = {
    email,
    password,
    setEmail,
    setPassword,
    search,
    setSearch,
    searchButton,
    setSearchButton,
    //
    foods,
    setFoods,
    fetchFoods,
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
