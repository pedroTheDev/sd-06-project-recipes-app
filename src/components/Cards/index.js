import React, { useContext } from 'react';
import ContextAPI from '../../Context/ContextAPI';

const Cards = () => {
  const { apiValueSearch } = useContext(ContextAPI);

  return window.location.pathname === '/comidas' ? (
    <div>
      {apiValueSearch.foods.meals ? (
        apiValueSearch.foods.meals && apiValueSearch.foods.meals.map((res) => (
          <div key={ res.strMeal }>
            <p>{res.strMeal}</p>
            <img width="200" src={ res.strMealThumb } alt={ res.strMeal } />
          </div>
        ))
      ) : (apiValueSearch.foods.categories && apiValueSearch.foods.categories.map((res) => (
        <div key={ res.idCategory }>
          <p>{res.strCategory}</p>
          <img width="200" src={ res.strCategoryThumb } alt={ res.strCategory } />
        </div>
      ))) }
    </div>
  ) : (
    <div>
      {apiValueSearch.drinks && (
        apiValueSearch.drinks.drinks.map((res) => (
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
