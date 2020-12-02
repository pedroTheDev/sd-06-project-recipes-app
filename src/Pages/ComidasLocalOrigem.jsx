import React, { useEffect, useState } from 'react';
import { ApiExploreByPlaceOfOrigin, showSugestedFoods } from '../services/aPI';

import Header from '../components/Header';
import Footer from '../components/Footer';

import './ComidasLocalOrigem.css';

const ComidasLocalOrigem = () => {
  const [stateNamesOrigins, setNamesOrigins] = useState();
  const [stateSugestionsFoods, setSugestionsFoods] = useState();

  const handleSearchExploreOrigin = async () => {
    const originsLocal = await ApiExploreByPlaceOfOrigin();

    setNamesOrigins(originsLocal);
  };

  const handleSugestedFoods = async () => {
    const foods = await showSugestedFoods();

    setSugestionsFoods({
      ...stateSugestionsFoods,
      foods,
    });
  };

  useEffect(() => {
    handleSearchExploreOrigin();
    handleSugestedFoods();
  }, []);

  const number = 11;

  return (
    <div>
      {console.log(stateSugestionsFoods)}
      <Header />
      <div className="container-select">
        <select
          className="select"
          data-testid="explore-by-area-dropdown"
        >
          <option>Escolha um local de origem</option>
          <option
            data-testid="All-option"
          >
            All
          </option>
          {stateNamesOrigins
          && stateNamesOrigins.meals.map((origin, i) => (
            <option
              key={ i }
              data-testid={ `${origin.strArea}-option` }
            >
              {origin.strArea}
            </option>
          ))}
        </select>
      </div>
      <div className="main-cards">
        {!stateSugestionsFoods ? <div>Loading...</div> : (
          stateSugestionsFoods.foods.meals.map((meal, index) => (
            index <= number && (
              <div
                className="card"
                data-testid={ `${index}-recipe-card` }
                key={ meal.strMeal }
              >
                <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
                <button
                  type="button"
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ meal.strMealThumb }
                    alt={ meal.strMeal }
                  />
                </button>
              </div>
            )
          ))) }
      </div>
      <Footer />
    </div>
  );
};

export default ComidasLocalOrigem;
