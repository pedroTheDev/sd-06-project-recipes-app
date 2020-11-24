import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { fetchMealCategoryList, fetchDrinkCategoryList } from '../services';
import RecipesContext from '../context/RecipesAppContext';

function CategoryList({ title }) {
  const ZERO = 0;
  const CINCO = 5;
  const { categoryList, setCategoryList } = useContext(RecipesContext);

  const renderCategoryList = async (callback) => {
    const response = await callback();
    return response;
  };

  const setBase = async () => {
    const list = (title === 'Comidas')
      ? await renderCategoryList(fetchMealCategoryList)
      : await renderCategoryList(fetchDrinkCategoryList);
    setCategoryList(list);
  };

  useEffect(() => {
    setBase();
  }, []);

  const divStyle = {
    width: '10rem',
  };

  return (
    <>
      {categoryList.slice(ZERO, CINCO).map((cat) => (
        <div
          key={ cat.strCategory }
          className="card"
          style={ divStyle }
        >
          <p
            data-testid={ `${cat.strCategory}-category-filter` }
            className="card-text"
          >
            { cat.strCategory }
          </p>
        </div>))}
      {' '}
    </>
  );
}

CategoryList.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CategoryList;
