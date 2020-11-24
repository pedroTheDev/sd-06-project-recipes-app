import React, { useContext } from 'react';
import ContextAPI from '../../Context/ContextAPI';

const Cards = () => {
  const { apiValueSearch } = useContext(ContextAPI);

  return apiValueSearch.meals ? (
    <div>
      {apiValueSearch.results && (
        apiValueSearch.results.meals.map((res) => (
          <div key={ res.strMeal }>
            <p>{res.strMeal}</p>
            <img width="200" src={ res.strMealThumb } alt={ res.strMeal } />
          </div>
        ))
      )}
    </div>
  ) : (
    <div>
      {apiValueSearch.results && (
        apiValueSearch.results.drinks.map((res) => (
          <div key={ res.idDrink }>
            <p>{res.strDrink}</p>
            <img width="200" src={ res.strDrinkThumb } alt={ res.strMeal } />
          </div>
        ))
      )}
    </div>
  );
};

export default Cards;
