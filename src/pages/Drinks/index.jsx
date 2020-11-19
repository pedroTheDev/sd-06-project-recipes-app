import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useSearch } from '../../hooks/search';
import { useRecipes } from '../../hooks/recipes';

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

function Drinks() {
  const pageType = 'Bebidas';

  const { infoSearched, appSearch } = useSearch();
  const { currentRecipes, currentFilters } = useRecipes();

  useEffect(() => {
    const drinksToSearch = infoSearched[pageType];

    appSearch(pageType, drinksToSearch);
  }, []);

  const currentDrinkRecipes = useMemo(() => currentRecipes[pageType], [currentRecipes]);
  const currentDrinkFilters = useMemo(() => currentFilters[pageType], [currentFilters]);

  return (
    <div className="drinks-page">
      <Header pageName={pageType} showSearch />
      <Navbar />

      <div className="filters-container">
        <label htmlFor="all">Todos</label>
        <input type="radio" name="filter" id="all" />

        {currentDrinkFilters.map((filter) => (
          <>
            <label
              data-testid={`${filter}-category-filter`}
              htmlFor={filter}
              key={filter}
            >
              {filter}

            </label>
            <input type="radio" name="filter" id={filter} />
          </>
        ))}
      </div>

      <div className="drinks-container">
        {currentDrinkRecipes.map((drink) => (
          <Link to={`/${pageType}/${drink.idDrink}`} className="recipe-card" key={drink.idDrink}>
            <img src={drink.strDrinkThumb} alt={drink.strDrink} />
            <strong>{drink.strDrink}</strong>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Drinks;
