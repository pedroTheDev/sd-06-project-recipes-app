import React, { useState, useEffect, useContext } from 'react';
import { PropTypes } from 'prop-types';
import RecipesContext from '../context/Context';
import { fetchCategories } from '../helpers/Helper';

function Categories({ id }) {
  const { setFilters } = useContext(RecipesContext);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const results = await fetchCategories(id);
      setCategories(results);
      setLoading(false);
    }

    fetchData();
  }, []);

  return (loading)
    ? ''
    : (
      <div>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => setFilters({
            searchText: '',
            searchType: 'name',
            category: id,
          }) }
        >
          All
        </button>
        { categories.map((category) => (
          <button
            type="button"
            key={ category.strCategory }
            onClick={ () => setFilters({
              searchText: category.strCategory,
              searchType: 'category',
              category: id,
            }) }
            data-testid={ `${category.strCategory}-category-filter` }
          >
            { `${category.strCategory}` }
          </button>
        )) }
      </div>
    );
}

export default Categories;

Categories.propTypes = {
  id: PropTypes.string.isRequired,
};
