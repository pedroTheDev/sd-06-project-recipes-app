import React, { useContext } from 'react';
import ContextAPI from '../../Context/ContextAPI';

const Cards = () => {
  const { apiValueSearch } = useContext(ContextAPI);

  const showFoodResearch = () => {
    const number = 11;
    if (apiValueSearch.foods.meals && apiValueSearch.foods.meals.length === 1) {
      const foodID = apiValueSearch.foods.meals[0].idMeal;
      window.location.href = `http://localhost:3000/comidas/${foodID}`;
    } else {
      return (
        apiValueSearch.foods.meals && apiValueSearch.foods.meals.map((meal, index) => {
          if (index <= number) {
            if (apiValueSearch.foods.meals === null) { console.log('null'); }
            return (
              <div key={ meal.strMeal }>
                <p>{meal.strMeal}</p>
                <img width="200" src={ meal.strMealThumb } alt={ meal.strMeal } />
              </div>
            );
          }
          return '';
        })
      );
    }
  };

  const showDrinkResearch = () => {
    if (apiValueSearch.drinks.drinks && apiValueSearch.drinks.drinks.length === 1) {
      const drinkID = apiValueSearch.drinks.drinks[0].idDrink;
      window.location.href = `http://localhost:3000/bebidas/${drinkID}`;
    } else {
      return (
        apiValueSearch.drinks.drinks && apiValueSearch.drinks.drinks.map((res) => (
          <div key={ res.idDrink }>
            <p>{res.strDrink}</p>
            <img width="200" src={ res.strDrinkThumb } alt={ res.strDrink } />
          </div>
        ))
      );
    }
  };

  return window.location.pathname === '/comidas' ? (
    <div>
      {showFoodResearch() }
    </div>
  ) : (
    <ul>
      {showDrinkResearch()}
    </ul>
  );
};

export default Cards;
