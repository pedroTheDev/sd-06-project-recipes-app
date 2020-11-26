import React, {
  useEffect, useMemo, useState, useCallback,
} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useSearch } from '../../hooks/search';
import { useRecipes } from '../../hooks/recipes';

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import LoadingBook from '../../components/LoadingBook';

import './styles.css';

function Recipes({ pageType }) {
  const [filterSelected, setFilterSelected] = useState('all');

  const { infoSearched, appSearch, loadingRecipes } = useSearch();

  const {
    currentRecipes,
    currentFilters,
    currentFilteredRecipes,
    updateFilteredRecipes,
    loadingFilters,
    loadingByCategory,
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

  if (loadingFilters && loadingRecipes) {
    return (
      <LoadingBook />
    );
  }

  return (
    <div className="recipes-page">
      <Header pageName={ pageType } showSearch />

      <section className="recipe-filters">
        <div className="filters-container">

          <div className="label-container">
            <input
              type="checkbox"
              name="filter"
              id="all"
              value="all"
              checked={ filterSelected === 'all' }
              onChange={ handleFilterChange }
            />
            {/* eslint-disable-next-line */}
            <label
              data-testid="All-category-filter"
              htmlFor="all"
            >
              All
            </label>

          </div>

          {currentRecipeFilters.map((filter) => (
            <div className="label-container" key={ filter }>
              <input
                type="checkbox"
                name="filter"
                id={ filter }
                value={ filter }
                checked={ filterSelected === filter }
                onChange={ handleFilterChange }
              />

              <label
                data-testid={ `${filter}-category-filter` }
                htmlFor={ filter }
                key={ filter }
              >
                {filter}
              </label>

            </div>
          ))}
        </div>

      </section>

      {(loadingRecipes || loadingByCategory)
        ? (
          <div className="spinner-container">
            <div className="loading-spinner" />
          </div>
        ) : (
          <div className="recipes-container">
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
        )}

      <Navbar />
    </div>
  );
}

Recipes.propTypes = {
  pageType: PropTypes.string.isRequired,
};

export default Recipes;
