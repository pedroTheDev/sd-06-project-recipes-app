import React, {
  useEffect, useMemo, useState, useCallback,
} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useSearch } from '../../hooks/search';
import { useRecipes } from '../../hooks/recipes';

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

function Foods({ pageType }) {
  const [filterSelected, setFilterSelected] = useState('all');

  const { infoSearched, appSearch } = useSearch();
  const {
    currentRecipes, currentFilters, currentFilteredRecipes, updateFilteredRecipes,
  } = useRecipes();

  useEffect(() => {
    const foodsToSearch = infoSearched[pageType];

    appSearch(pageType, foodsToSearch);
  }, []);

  const handleFilterChange = useCallback(({ target }) => {
    const { value: category } = target;

    if (category === filterSelected) {
      const categoryToLoad = 'all';
      const foodsToSearch = infoSearched[pageType];

      appSearch(pageType, foodsToSearch);

      setFilterSelected(categoryToLoad);
      return;
    }

    updateFilteredRecipes(pageType, category);
    setFilterSelected(category);
  }, [updateFilteredRecipes, pageType, infoSearched, appSearch, filterSelected]);

  const currentFoodRecipes = useMemo(() => {
    if (filterSelected === 'all') {
      return currentRecipes[pageType];
    }

    return currentFilteredRecipes[pageType];
  }, [currentRecipes, currentFilteredRecipes, filterSelected, pageType]);

  const currentFoodFilters = useMemo(
    () => currentFilters[pageType],
    [currentFilters, pageType],
  );

  return (
    <div className="foods-page">
      <Header pageName={ pageType } showSearch />

      <div className="filters-container">
        <label htmlFor="all">
          <input
            type="checkbox"
            name="filter"
            id="all"
            checked={ filterSelected === 'all' }
            onChange={ handleFilterChange }
            data-testid="All-category-filter"
          />
          Todos
        </label>

        {currentFoodFilters.map((filter) => (
          <React.Fragment key={ filter }>
            <label
              data-testid={ `${filter}-category-filter` }
              htmlFor={ filter }
              key={ filter }
            >
              {filter}

            </label>
            <input
              type="checkbox"
              name="filter"
              id={ filter }
              value={ filter }
              checked={ filterSelected === filter }
              onChange={ handleFilterChange }
            />
          </React.Fragment>
        ))}
      </div>

      <div className="foods-container">
        {currentFoodRecipes.map((meal, index) => (
          <Link
            to={ `/${pageType}/${meal.idMeal}` }
            className="recipe-card"
            data-testid={ `${index}-recipe-card` }
            key={ meal.idMeal }
          >
            <img
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              data-testid={ `${index}-card-img` }

            />
            <strong data-testid={ `${index}-card-name` }>{meal.strMeal}</strong>
          </Link>
        ))}
      </div>

      <Navbar />
    </div>
  );
}

Foods.propTypes = {
  pageType: PropTypes.string.isRequired,
};

export default Foods;
