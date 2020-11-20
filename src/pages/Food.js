import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';

function Food() {
  const { setHeader, apiResponse } = useContext(AppContext);
  useEffect(() => {
    setHeader({ page: 'Comidas', search: true });
  }, []);

  return (
    <div>
      <Header />
      {apiResponse.map((food) => (
        <div key={ food.idMeal }>
          <h4>{food.strMeal}</h4>
          <img src={ food.strMealThumb } alt={ food.strMeal } />
        </div>
      ))}
    </div>
  );
}

// strMeal
// :
// "Brown Stew Chicken"
// strMealThumb
// :
// "https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg"
// idMeal
// :
// "52940"

export default Food;
