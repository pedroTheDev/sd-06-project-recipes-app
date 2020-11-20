import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import fetchRecipes from '../services/index';

function AppProvider({ children }) {
  const [header, setHeader] = useState({ page: '', search: true });
  const [filter, setFilter] = useState({ text: '', option: '' });
  const [apiResponse, setApiResponse] = useState([]);

  useEffect(() => {
    let URL = '';
    let type = '';
    if (header.page === 'Comidas' && filter.option === 'Ingrediente') {
      URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${filter.text}`;
      type = 'meals';
    }
    if (header.page === 'Comidas' && filter.option === 'Nome') {
      URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${filter.text}`;
      type = 'meals';
    }
    if (header.page === 'Comidas' && filter.option === 'Primeira letra') {
      URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${filter.text}`;
      type = 'meals';
    }
    if (header.page === 'Bebidas' && filter.option === 'Ingrediente') {
      URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filter.text}`;
      type = 'drinks';
    }
    if (header.page === 'Bebidas' && filter.option === 'Nome') {
      URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${filter.text}`;
      type = 'drinks';
    }
    if (header.page === 'Bebidas' && filter.option === 'Primeira letra') {
      URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${filter.text}`;
      type = 'drinks';
    }
    const requestAPI = async () => {
      const response = await fetchRecipes(URL);
      setApiResponse(response[type]);
    };
    requestAPI();
  }, [filter]);

  const contextValue = {
    header,
    setHeader,
    filter,
    setFilter,
    apiResponse,
  };
  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
