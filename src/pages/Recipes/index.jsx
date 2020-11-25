import React, {
  useEffect, useMemo, useState, useCallback,
} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useSearch } from '../../hooks/search';
import { useRecipes } from '../../hooks/recipes';

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

function Recipes({ pageType }) {
  const [filterSelected, setFilterSelected] = useState('all');

  const { infoSearched, appSearch } = useSearch();
  const {
    currentRecipes, currentFilters, currentFilteredRecipes, updateFilteredRecipes,
  } = useRecipes();

  useEffect(() => {
    const recipesToSearch = infoSearched[pageType];

    appSearch(pageType, recipesToSearch);
  }, [pageType]);

  const handleFilterChange = useCallback(({ target }) => {
    const { value: category } = target;

    if (category === filterSelected || category === 'all') {
      const categoryToLoad = 'all';
      const recipesToSearch = infoSearched[pageType];

      appSearch(pageType, recipesToSearch);

      setFilterSelected(categoryToLoad);
      return;
    }

    updateFilteredRecipes(pageType, category);
    setFilterSelected(category);
  }, [updateFilteredRecipes, pageType, infoSearched, appSearch, filterSelected]);

  const loadedRecipes = useMemo(() => {
    if (filterSelected === 'all') {
      return currentRecipes[pageType];
    }

    return currentFilteredRecipes[pageType];
  }, [currentRecipes, currentFilteredRecipes, filterSelected, pageType]);

  const currentRecipeFilters = useMemo(
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
            value="all"
            checked={ filterSelected === 'all' }
            onChange={ handleFilterChange }
            data-testid="All-category-filter"
          />
          Todos
        </label>

        {currentRecipeFilters.map((filter) => (
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
        {loadedRecipes.map((recipe, index) => (
          <Link
            to={ `/${pageType}/${recipe.idMeal || recipe.idDrink}` }
            className="recipe-card"
            data-testid={ `${index}-recipe-card` }
            key={ recipe.idMeal || recipe.idDrink }
          >
            <img
              src={ recipe.strMealThumb || recipe.strDrinkThumb }
              alt={ recipe.strMeal || recipe.strDrink }
              data-testid={ `${index}-card-img` }
            />

            <strong data-testid={ `${index}-card-name` }>
              {recipe.strMeal || recipe.strDrink }
            </strong>
          </Link>
        ))}
      </div>

      <Navbar />
    </div>
  );
}

Recipes.propTypes = {
  pageType: PropTypes.string.isRequired,
};

export default Recipes;
