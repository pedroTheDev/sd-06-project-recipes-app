import { useState, useEffect, useContext } from 'react';
import fetchRecipes from '../services/index';
import AppContext from '../context/AppContext';

const useRequest = () => {
  const { header, filter } = useContext(AppContext);
  const [apiResponse, setApiResponse] = useState([]);
  const requestAPI = async () => {
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
    if (filter.option !== '') {
      const response = await fetchRecipes(URL);
      if (response[type] === null) {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else {
        setApiResponse(response[type]);
      }
    }
  };

  useEffect(() => {
    requestAPI();
  }, [filter]);

  return apiResponse;
};

export default useRequest;
