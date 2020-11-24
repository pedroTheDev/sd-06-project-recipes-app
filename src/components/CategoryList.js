import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { fetchMealCategoryList, fetchDrinkCategoryList } from '../services';
import RecipesContext from '../context/RecipesAppContext';

function CategoryList({ title }) {
  const ZERO = 0;
  const CINCO = 5;
  const { categoryList, setCategoryList, setFilter } = useContext(RecipesContext);

  const renderCategoryList = async (callback) => {
    const response = await callback();
    return response;
  };

  const setBase = async () => {
    if (title === 'Comidas') {
      const list = await renderCategoryList(fetchMealCategoryList);
      setCategoryList(list);
    } else {
      const list = await renderCategoryList(fetchDrinkCategoryList);
      setCategoryList(list);
    }
  };

  useEffect(() => {
    setBase();
  }, []);

  return (
    <>
      {categoryList.slice(ZERO, CINCO).map((cat) => (
        <button
          type="button"
          key={ cat.strCategory }
          data-testid={ `${cat.strCategory}-category-filter` }
          onClick={ () => setFilter(cat.strCategory) }
        >
          {' '}
          { cat.strCategory }
        </button>))}

    </>
  );
}

CategoryList.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CategoryList;
