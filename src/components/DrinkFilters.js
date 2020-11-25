import React, { useContext } from 'react';
import ReceitasContext from '../context/ReceitasContext';
import { drinkByCategoryApi, drinkAPI } from '../services/drinkAPI';

function DrinkFilters() {
  const {
    filtersData, setMeals, selectedFilter, setSelectedFilter,
  } = useContext(ReceitasContext);

  async function fetchDrink() {
    const responseDrinksAPI = await drinkAPI();
    setMeals(responseDrinksAPI);
  }

  const filters = (category) => {
    if (category === 'All') {
      fetchDrink();
    } else {
      drinkByCategoryApi(category).then((response) => {
        setMeals(response.drinks);
      });
    }
  };

  const filterByCategory = (category) => {
    if (category !== selectedFilter) {
      filters(category);
      setSelectedFilter(category);
    } else {
      fetchDrink();
    }
  };

  return (
    <div>
      {filtersData.map((filter) => (
        <button
          key={ filter }
          type="button"
          data-testid={ `${filter}-category-filter` }
          onClick={ (event) => filterByCategory(event.target.innerHTML) }
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default DrinkFilters;
