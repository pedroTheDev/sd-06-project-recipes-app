import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { fetchCategories } from '../helpers/Helper';

function Categories({ id }) {
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
        { categories.map((category) => (
          <button
            type="button"
            key={ category.strCategory }
            // onClick={ console.log(category.strCategory) }
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
