import React, { useContext, useState, useEffect } from 'react';
import ContextAPI from '../../Context/ContextAPI';

import { showAllDrinksCategories, selectDrinksItensCategories } from '../../services/aPI';

const CategoriesBebidas = () => {
  const { apiValueSearch, setApiValueSearch, categories, setCategories } = useContext(ContextAPI);

  const categoriesDefined = async () => {
    if (window.location.pathname === '/bebidas') {
      const result = await showAllDrinksCategories();
      setCategories(result);
    }
  };

  useEffect(() => {
    categoriesDefined();
  }, []);

  const filterApiValueSearch = async (value) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value.target.name}`)
    .then((drinks) => drinks.json())
    .then((drinks) => setApiValueSearch({ ...apiValueSearch, drinks }));

  return !categories.drinks ? (
    <p>loading</p>
  ) : (
    <div>
      {categories.drinks && categories.drinks.map((element, index) => {
        const number = 4;
        if (index <= number) {
          return (
            <button
              data-testid={ `${element.strCategory}-category-filter` }
              onClick={ (e) => filterApiValueSearch(e) }
              name={ element.strCategory }
              type="button"
            >
              { element.strCategory }
            </button>
          );
        }
        return '';
      })}
    </div>);
};

export default CategoriesBebidas;
