import React, {
  createContext, useCallback, useContext, useState,
} from 'react';
import PropTypes from 'prop-types';

import { useRecipes } from './recipes';

import { fetchMealsSearch } from '../services/foodApi';
import { fetchDrinksSearch } from '../services/drinksApi';

const getID = {
  comidas: 'idMeal',
  bebidas: 'idDrink',
};

const initialSearchValues = {
  comidas: {
    option: 'name',
    value: 'Chicken',
    token: '1',
  },
  bebidas: {
    option: 'name',
    value: 'Martini',
    token: '1',
  },
};

const fetchSearchOptions = {
  comidas: fetchMealsSearch,
  bebidas: fetchDrinksSearch,
};

const searchContext = createContext();

function SearchProvider({ children }) {
  const [infoSearched, setInfoSearched] = useState(initialSearchValues);

  const { updateRecipes } = useRecipes();

  const appSearch = useCallback(async (type, { option, value, token }) => {
    const userSearch = { option, value, token };

    setInfoSearched((oldInfo) => ({
      ...oldInfo,
      [type]: userSearch,
    }));

    try {
      const fetchRecipes = fetchSearchOptions[type];
      const recipesSearched = await fetchRecipes(userSearch);

      const firstItem = recipesSearched[0];

      if (!firstItem) {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');

        return null;
      }

      const correctIDAccess = getID[type];
      const firstItemID = firstItem[correctIDAccess];

      updateRecipes(type, recipesSearched);

      return firstItemID;
    } catch (err) {
      console.log(err);

      return alert('Sinto muito, houve um erro ao buscar. Tente novamente.');
    }
  }, [updateRecipes]);

  return (
    <searchContext.Provider value={{
      appSearch, infoSearched,
    }}
    >
      {children}
    </searchContext.Provider>
  );
}

function useSearch() {
  const context = useContext(searchContext);

  if (!context) {
    throw new Error('You must use this hook within its provider');
  }

  return context;
}

export { SearchProvider, useSearch };

SearchProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
};
