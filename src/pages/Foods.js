import React, { useContext, useEffect } from 'react';
import RevenueContext from '../context/RevenueContext';
// import fetchApi from '../services/FetchApi';

export default function Foods() {
  const { foods, fetchApi, searchParam, isLoading } = useContext(RevenueContext);
  const DOZE = 12;

  useEffect(() => {
    if (searchParam === 'Meal') {
      fetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    } else if (searchParam === 'Drink') {
      fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    }
  }, []);

  const renderFoodOrDrink = () => (
    <>
      {foods.map((food, index) => {
        if (index < DOZE) {
          return (
            <div key={ food[`id${searchParam}`] }>
              <img
                src={ food[`str${searchParam}Thumb`] }
                alt={ food[`str${searchParam}`] }
                width="360px"
              />
              {food[`str${searchParam}`]}
            </div>
          );
        }
        return '';
      })}
    </>
  );

  const renderIngredients = () => (
    <>
      {foods.map((food, index) => {
        if (index < DOZE) {
          return (
            <div key={ food.idIngredient }>
              <h3>{ food.strIngredient }</h3>
              <p>{food.strDescription}</p>
            </div>
          );
        }
        return '';
      })}
    </>
  );

  if (!isLoading) {
    return (
      <div>
        {(searchParam === 'Ingredients') ? renderIngredients() : renderFoodOrDrink()}
      </div>
    );
  }
  return <div>Loading...</div>;
}
