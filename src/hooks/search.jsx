import React, {
  createContext, useCallback, useContext, useState,
} from 'react';
import PropTypes from 'prop-types';

import { useRecipes } from './recipes';

import { fetchMealsSearch } from '../services/foodApi';
import { fetchDrinksSearch } from '../services/drinksApi';

const getID = {
  Comidas: 'idMeal',
  Bebidas: 'idDrink',
};

const initialSearchValues = {
  Comidas: {
    option: 'name',
    value: 'Chicken',
    token: '1',
  },
  Bebidas: {
    option: 'name',
    value: 'Martini',
    token: '1',
  },
};

const searchContext = createContext();

function SearchProvider({ children }) {
  const [infoSearched, setInfoSearched] = useState(initialSearchValues);

  const { updateRecipes } = useRecipes();

  const appSearch = useCallback(async (type, { option, value, token }) => {
    let recipesSearched;

    const userSearch = { option, value, token };

    setInfoSearched((oldInfo) => ({
      ...oldInfo,
      [type]: userSearch,
    }));

    try {
      if (type === 'Comidas') {
        recipesSearched = await fetchMealsSearch(userSearch);
      } else {
        recipesSearched = await fetchDrinksSearch(userSearch);
      }

      const firstItem = recipesSearched[0];

      if (!firstItem) {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');

        return null;
      }

      const correctIDAccess = getID[type];
      const firstItemID = firstItem[correctIDAccess];

      console.log(recipesSearched);

      updateRecipes(type, recipesSearched);

      return (recipesSearched.length === 1) ? firstItemID : null;
    } catch (err) {
      console.log(err);

      return null;
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
  children: PropTypes.oneOf([
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
};
