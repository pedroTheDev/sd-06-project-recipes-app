import React, { useContext } from 'react';
import ContextAPI from '../../Context/ContextAPI';

const Cards = () => {
  const { apiValueSearch } = useContext(ContextAPI);

  const showFoodResearch = () => (
    apiValueSearch.foods.meals && apiValueSearch.foods.meals.map((meal) => (
      <div key={ meal.strMeal }>
        <p>{meal.strMeal}</p>
        <img width="200" src={ meal.strMealThumb } alt={ meal.strMeal } />
      </div>
    ))
  );

  const showFoodCategories = () => (
    apiValueSearch.foods.categories && apiValueSearch.foods.categories
      .map((category) => (
        <div key={ category.idCategory }>
          <p>{category.strCategory}</p>
          <img
            width="200"
            src={ category.strCategoryThumb }
            alt={ category.strCategory }
          />
        </div>
      ))
  );

  const showDrinkResearch = () => (
    apiValueSearch.drinks && (
      apiValueSearch.drinks.drinks.map((res) => (
        <div key={ res.idDrink }>
          <p>{res.strDrink}</p>
          <img width="200" src={ res.strDrinkThumb } alt={ res.strMeal } />
        </div>
      ))
    )
  );

  return window.location.pathname === '/comidas' ? (
    <div>
      {apiValueSearch.foods.meals ? (showFoodResearch()) : (showFoodCategories()) }
    </div>
  ) : (
    <div>
      {showDrinkResearch()}
    </div>
  );
};

export default Cards;
