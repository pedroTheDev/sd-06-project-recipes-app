import React, { useContext } from 'react';
import ContextAPI from '../../../Context/ContextAPI';

const Cards = () => {
  const { apiValueSearch } = useContext(ContextAPI);

  const showFoodResearch = () => (
    apiValueSearch.foods.meals && apiValueSearch.foods.meals.map((meal, index) => (
      <li data-testid={ `${index}-recipe-card` } key={ meal.strMeal }>
        <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
        <img data-testid={ `${index}-card-img` } width="200" src={ meal.strMealThumb } alt={ meal.strMeal } />
      </li>
    ))
  );

  const showFoodCategories = () => (
    apiValueSearch.foods.categories && apiValueSearch.foods.categories
      .map((category) => (
        <li key={ category.idCategory }>
          <p>{category.strCategory}</p>
          <img
            width="200"
            src={ category.strCategoryThumb }
            alt={ category.strCategory }
          />
        </li>
      ))
  );

  const showDrinkResearch = () => (
    apiValueSearch.drinks && (
      apiValueSearch.drinks.drinks.map((res, index) => (
        <li data-testid={ `${index}-recipe-card` } key={ res.idDrink }>
          <p data-testid={ `${index}-card-name` }>{res.strDrink}</p>
          <img data-testid={ `${index}-card-img` } width="200" src={ res.strDrinkThumb } alt={ res.strMeal } />
        </li>
      ))
    )
  );

  return window.location.pathname === '/comidas' ? (
    <ul>
      {apiValueSearch.foods.meals ? (showFoodResearch()) : (showFoodCategories()) }
    </ul>
  ) : (
    <ul>
      {showDrinkResearch()}
    </ul>
  );
};

export default Cards;
