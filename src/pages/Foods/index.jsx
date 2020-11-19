import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useSearch } from '../../hooks/search';
import { useRecipes } from '../../hooks/recipes';

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

function Foods() {
  const pageType = 'Comidas';

  const { infoSearched, appSearch } = useSearch();
  const { currentRecipes } = useRecipes();

  useEffect(() => {
    const foodsToSearch = infoSearched[pageType];

    appSearch(pageType, foodsToSearch);
  }, []);

  const currentFoodRecipes = useMemo(() => currentRecipes[pageType], [currentRecipes]);

  return (
    <div className="foods-page">
      <Header pageName={pageType} showSearch />
      <Navbar />

      <div className="foods-container">
        {currentFoodRecipes.map((meal) => (
          <Link to={`/${pageType}/${meal.idMeal}`} className="recipe-card" key={meal.idMeal}>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <strong>{meal.strMeal}</strong>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Foods;
