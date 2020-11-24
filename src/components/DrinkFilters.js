import React, { useEffect, useContext } from 'react';
import ReceitasContext from '../context/ReceitasContext';
import { drinkCategoryApi, drinkByCategoryApi, drinkApi } from '../services/drinkAPI';

function DrinkFilters() {
  const { filtersData, setFiltersData, setDrinks } = useContext(ReceitasContext);
  const { selectedFilter, setSelectedFilter } = useContext(ReceitasContext);

  useEffect(() => {
    drinkCategoryApi().then((response) => {
      const data = ['All'];
      const cinco = 5;
      const zero = 0;

      for (let i = zero; i < cinco; i += 1) {
        data.push(response.drinks[i].strCategory);
      }
      setFiltersData(data);
    });
  }, []);

  const filterByCategory = (category) => {
    if (category === selectedFilter || category === 'All') {
      setSelectedFilter('All');
      drinkApi().then((response) => {
        setDrinks(response);
      });
    } else {
      setSelectedFilter(category);
      drinkByCategoryApi(category).then((response) => {
        setDrinks(response);
      });
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
