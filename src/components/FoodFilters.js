import React, { useEffect, useContext } from 'react';
import ReceitasContext from '../context/ReceitasContext';
import { foodCategoryApi, foodByCategoryApi, foodApi } from '../services/foodAPI';

function FoodFilters() {
  const {
    filtersData, setFiltersData, setMeals, selectedFilter, setSelectedFilter,
  } = useContext(ReceitasContext);

  useEffect(() => {
    foodCategoryApi().then((response) => {
      const data = ['All'];
      const cinco = 5;
      const zero = 0;

      for (let i = zero; i < cinco; i += 1) {
        data.push(response.meals[i].strCategory);
      }
      setFiltersData(data);
    });
  }, []);

  const filterByCategory = (category) => {
    if (category === selectedFilter || category === 'All') {
      setSelectedFilter('All');
      foodApi().then((response) => {
        setMeals(response.meals);
      });
    } else {
      setSelectedFilter(category);
      foodByCategoryApi(category).then((response) => {
        setMeals(response.meals);
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

export default FoodFilters;
