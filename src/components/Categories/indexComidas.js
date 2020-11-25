import React, { useContext, useState, useEffect } from 'react';
import ContextAPI from '../../Context/ContextAPI';

import { showAllFoodsCategories, showAllDrinksCategories, selectFoodItensCategories, selectDrinksItensCategories } from '../../services/aPI';

const CategoriesComidas = () => {
  const { apiValueSearch, setApiValueSearch } = useContext(ContextAPI);

  const [categories, setCategories] = useState([]);

  const categoriesDefined = async () => {
    if (window.location.pathname === '/comidas') {
      const result = await showAllFoodsCategories();
      setCategories(result);
    }
    if (window.location.pathname === '/bebidas') {
      const result = await showAllDrinksCategories();
      setCategories(result);
    }
  };

  useEffect(() => {
    categoriesDefined();
  }, []);

  const filterApiValueSearch = async (value) => {
    if (window.location.pathname === '/comidas') {
      const foods = await selectFoodItensCategories(value);
      setApiValueSearch({
        ...apiValueSearch,
        foods,
      });
    }

    if (window.location.pathname === '/bebidas') {
      const result = await selectDrinksItensCategories(value);
      // apiValueSearch(result.meals);
      console.log(result);
    }
  };

  return (
    <div>
      {categories.categories && categories.categories.map((element, index) => {
        const number = 4;
        if (index <= number) {
          return (
            <button
              key={ element.idCategory }
              data-testid={ `${element.categoryName}-category-filter` }
              onClick={ (e) => filterApiValueSearch(e.target.name) }
              type="button"
            >
              <img
                name={ element.strCategory }
                width="100"
                src={ element.strCategoryThumb }
                alt={ element.strCategory }
              />
            </button>
          );
        }
      })}
    </div>);
};

export default CategoriesComidas;
