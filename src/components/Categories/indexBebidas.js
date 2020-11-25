import React, { useContext, useState, useEffect } from 'react';
import ContextAPI from '../../Context/ContextAPI';

import { showAllDrinksCategories, selectDrinksItensCategories } from '../../services/aPI';

const CategoriesBebidas = () => {
    const { apiValueSearch, setApiValueSearch } = useContext(ContextAPI);

  const [categories, setCategories] = useState([]);

  const categoriesDefined = async () => {
    if (window.location.pathname === '/bebidas') {
      const result = await showAllDrinksCategories();
      setCategories(result);
    }
  };

  useEffect(() => {
    categoriesDefined();
  }, []);

  const filterApiValueSearch = async (value) => {
    if (window.location.pathname === '/bebidas') {
      const result = await selectDrinksItensCategories(value);
    //   setApiValueSearch({
    //     ...apiValueSearch,
    //     drinks.drinks,
    //   });
    console.log(result);
    }
  };

  return (
    <div>
      {categories.drinks && categories.drinks.map((element, index) => {
        const number = 4;
        if (index <= number) {
          return (
            <button
              key={ element.idCategory }
              data-testid={ `${element.categoryName}-category-filter` }
              onClick={ (e) => filterApiValueSearch(e.target.name) }
              type="button"
            >
              <p
                width="100"
                alt={ element.strCategory }
              >{ element.strCategory }</p>
            </button>
          );
        }
      })}
    </div>);
};

export default CategoriesBebidas;
