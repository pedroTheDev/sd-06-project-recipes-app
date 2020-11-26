import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import '../css/CategoryFilters.css';

function DrinkFilterCategories({ categories }) {
  const {
    filteredCategories,
    getDrinkCategories,
    getDrinkAPI,
    setActiveFilter,
    activeFilter,
  } = useContext(RecipesContext);

  useEffect(() => {
    getDrinkCategories();
  }, []);

  const onClick = (value) => {
    if (value === 'All' || activeFilter === value) {
      getDrinkAPI('name-filter', '');
      setActiveFilter('All');
    } else {
      getDrinkAPI('category-filter', value);
      setActiveFilter(value);
    }
  };

  return categories !== null && (
    <div className="category-filter-container">
      <button
        className="btn-filter"
        data-testid="All-category-filter"
        type="button"
        value="All"
        onClick={ ({ target: { value } }) => onClick(value) }
      >
        All
      </button>
      {filteredCategories !== null && filteredCategories.map((category, index) => (
        <button
          className="btn-filter"
          data-testid={ `${category}-category-filter` }
          onClick={ ({ target: { value } }) => onClick(value) }
          type="button"
          value={ category }
          key={ `${index}-${category}` }
        >
          { category }
        </button>
      ))}
    </div>
  );
}

export default DrinkFilterCategories;

DrinkFilterCategories.propTypes = {
  categories: PropTypes.arrayOf().isRequired,
};
