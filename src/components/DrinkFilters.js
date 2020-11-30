import React, { useContext } from 'react';
import ReceitasContext from '../context/ReceitasContext';
import { drinkByCategoryApi, drinkAPI } from '../services/drinkAPI';

function DrinkFilters() {
  const {
    filtersData, setDrinks, selectedFilter, setSelectedFilter,
  } = useContext(ReceitasContext);

  async function fetchDrink() {
    const responseDrinksAPI = await drinkAPI();
    setDrinks(responseDrinksAPI);
  }

  const filters = (category) => {
    if (category === 'All') {
      fetchDrink();
    } else {
      drinkByCategoryApi(category).then((response) => {
        setDrinks(response.drinks);
      });
    }
  };

  const filterByCategory = (category) => {
    if (category !== selectedFilter) {
      filters(category);
      setSelectedFilter(category);
    } else {
      fetchDrink();
      setSelectedFilter('All');
    }
  };

  return (
    <div className="row justify-content-center mb-2">
      {filtersData.map((filter) => (
        <button
          key={ filter }
          type="button"
          data-testid={ `${filter}-category-filter` }
          className="btn btn-secondary btn-sm m-1 w-25"
          style={ { background: '#6CDC3E' } }
          onClick={ (event) => filterByCategory(event.target.innerHTML) }
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default DrinkFilters;
