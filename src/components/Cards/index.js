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
            return (
              <div key={ meal.strMeal } data-testid={ `${index}-recipe-card` }>
                <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
                <img
                  width="200"
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                  data-testid={ `${index}-card-img` }
                />
              </div>
            );
          }
          return '';
        })
      );
    }
  };

  const showDrinkResearch = () => {
    const number = 11;
    if (apiValueSearch.drinks.drinks && apiValueSearch.drinks.drinks.length === 1) {
      const drinkID = apiValueSearch.drinks.drinks[0].idDrink;
      window.location.href = `http://localhost:3000/bebidas/${drinkID}`;
    } else {
      return (
        apiValueSearch.drinks.drinks && apiValueSearch.drinks.drinks.map((res, index) => {
          if (index <= number) {
            return (
              <div key={ res.idDrink } data-testid={ `${index}-recipe-card` }>
                <p data-testid={ `${index}-card-name` }>{res.strDrink}</p>
                <img
                  width="200"
                  src={ res.strDrinkThumb }
                  alt={ res.strDrink }
                  data-testid={ `${index}-card-img` }
                />
              </div>
            );
          }
          return '';
        })
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
