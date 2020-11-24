import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useSearch } from '../../hooks/search';
import { useRecipes } from '../../hooks/recipes';

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

function Drinks({ pageType }) {
  const [filterSelected, setFilterSelected] = useState('all');

  const { infoSearched, appSearch } = useSearch();
  const {
    currentRecipes, currentFilters, currentFilteredRecipes, updateFilteredRecipes,
  } = useRecipes();

  useEffect(() => {
    const drinksToSearch = infoSearched[pageType];

    appSearch(pageType, drinksToSearch);
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
  }, [updateFilteredRecipes, infoSearched, pageType, filterSelected, appSearch]);

  const currentDrinkRecipes = useMemo(() => {
    if (filterSelected === 'all') {
      return currentRecipes[pageType];
    }

    return currentFilteredRecipes[pageType];
  }, [currentRecipes, currentFilteredRecipes, filterSelected, pageType]);

  const currentDrinkFilters = useMemo(
    () => currentFilters[pageType],
    [currentFilters, pageType],
  );

  return (
    <div className="drinks-page">
      <Header pageName={ pageType } showSearch />
      <Navbar />

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

        {currentDrinkFilters.map((filter) => (
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

      <div className="drinks-container">
        {currentDrinkRecipes.map((drink, index) => (
          <Link
            to={ `/${pageType}/${drink.idDrink}` }
            className="recipe-card"
            data-testid={ `${index}-recipe-card` }
            key={ drink.idDrink }
          >
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              data-testid={ `${index}-card-img` }
            />
            <strong data-testid={ `${index}-card-name` }>{drink.strDrink}</strong>
          </Link>
        ))}
      </div>
    </div>
  );
}

Drinks.propTypes = {
  pageType: PropTypes.string.isRequired,
};

export default Drinks;
