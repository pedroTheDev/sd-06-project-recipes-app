import React, { useContext, useState, useEffect } from 'react';
import ContextAPI from '../../Context/ContextAPI';

import { showAllFoodsCategories, showAllDrinksCategories } from '../../services/aPI';

const Categories = () => {
  const { apiValueSearch } = useContext(ContextAPI);

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

  const filterApiValueSearch = (value) => {
    console.log(value);
  };

  return (
    <div>
      {categories.categories && categories.categories.map((element, index) => {
        if (index <= 4) {
          return (
            <button key={ element.idCategory } data-testid={ `${element.categoryName}-category-filter` } onClick={ (e) => filterApiValueSearch(e.target.name) } type="button">
              <img name={ element.idCategory } width="100" src={ element.strCategoryThumb } alt={ element.strCategory } />
            </button>
          );
        }
      })}
    </div>);
};

export default Categories;
