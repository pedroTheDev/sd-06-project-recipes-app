import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchRecipes from '../services/index';

function NavigationMenu(props) {
  const { page } = props;
  const [categories, setCategories] = useState([]);
  const maxCategories = 5;

  const getCategories = async () => {
    let list;
    if (page === 'Comidas') {
      list = await fetchRecipes('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      setCategories(list.meals);
    }
    if (page === 'Bebidas') {
      list = await fetchRecipes('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      setCategories(list.drinks);
    }
  };

  useEffect(() => {
    getCategories();
  }, [page]);

  return (
    <div className="categories">
      {categories
        .filter((e, index) => e && index < maxCategories)
        .map((meal, index) => (
          <button
            data-testid={ `${meal.strCategory}-category-filter` }
            className="categ-buttons"
            type="button"
            key={ index }
          >
            { meal.strCategory }
          </button>))}
    </div>
  );
}

NavigationMenu.propTypes = {
  page: PropTypes.string.isRequired,
};

export default NavigationMenu;
