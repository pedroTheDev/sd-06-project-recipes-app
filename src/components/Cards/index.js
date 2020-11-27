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
              <div data-testid={ `${index}-recipe-card` } key={ meal.strMeal }>
                <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
                <img data-testid={ `${index}-card-img` } width="200" src={ meal.strMealThumb } alt={ meal.strMeal } />
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
              <div>
                <div data-testid={ `${index}-recipe-card` } key={ res.idDrink }>
                  <p data-testid={ `${index}-card-name` }>{res.strDrink}</p>
                  <img data-testid={ `${index}-card-img` } width="200" src={ res.strDrinkThumb } alt={ res.strDrink } />
                </div>
              </div>

            );
          }
        })
      );
    }
  };

  const showFoodCategories = () => {
    const number = 11;
    console.log(number);
    return (
      apiValueSearch.categoriesResult && apiValueSearch.categoriesResult.map((res, index) => {
        if (index <= number) {
          return (
            <div data-testid={ `${index}-recipe-card` } key={ res.idCategory }>
              <p data-testid={ `${index}-card-name` }>{res.strCategory}</p>
              <img data-testid={ `${index}-card-img` } width="200" src={ res.strCategoryThumb } alt={ res.strCategory } />
            </div>
          );
        }
      })
    );
  };

  // {apiValueSearch.foods.meals ? (showFoodResearch()) : (showFoodCategories()) }
  return window.location.pathname === '/comidas' ? (
    <div>
      { apiValueSearch.value === 'All' ? (showFoodCategories()) : (showFoodResearch()) }
    </div>
  ) : (
    <ul>
      {showDrinkResearch()}
    </ul>
  );
};

export default Cards;
