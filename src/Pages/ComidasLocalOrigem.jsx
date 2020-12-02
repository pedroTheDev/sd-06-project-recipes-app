import React, { useEffect, useState } from 'react';
import { ApiExploreByPlaceOfOrigin, showSugestedFoods } from '../services/aPI';

import Header from '../components/Header';
import Footer from '../components/Footer';

import './ComidasLocalOrigem.css';

const ComidasLocalOrigem = () => {
  const [stateNamesOrigins, setNamesOrigins] = useState();
  const [stateSugestionsFoods, setSugestionsFoods] = useState();
  const [stateAllFoods, setAllFoods] = useState();

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

  const searchAllRecipesFoods = () => {
    console.log('fvgdfgfd');
    if (!stateAllFoods) {
      return (
        <div>Loading...</div>
      );
    }
    return (
      <div className="main-cards">
        {stateSugestionsFoods.foods.meals.map((meal, index) => (
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
        )) }
      </div>
    );
  };

  const searchAll = async (target) => {
    if (target.value === 'All') {
      const allFoods = await showSugestedFoods();

      // console.log(allFoods);

      setAllFoods({
        ...stateAllFoods,
        allFoods,
      });

      searchAllRecipesFoods();
    } else {
      return 'false';
    }
  };

  const number = 11;

  return (
    <div>
      <Header />
      <div className="container-select">
        <select
          name="select"
          className="select"
          data-testid="explore-by-area-dropdown"
          onChange={ ({ target }) => searchAll(target) }
        >
          <option>Escolha um local de origem</option>
          <option
            value="All"
            data-testid="All-option"
          >
            All
          </option>
          {stateNamesOrigins
          && stateNamesOrigins.meals.map((origin, i) => (
            <option
              key={ i }
              value={ origin.strArea }
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
