import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { getRecipesMealsApi } from '../services/mealsAPI';
import { getRecipeDrinksMealsApi } from '../services/drinksAPI';

import MealsContext from '../context/MealsContext';
import RecipeCard from './RecipeCard';
import './RecipeList.css';

function RecipeList() {
  const { categories } = useContext(MealsContext);
  const { drinkCategories } = useContext(MealsContext);

  const [cardsRecipe, setCardsRecipe] = useState([]);
  const [cardCategories, setCardCategories] = useState([]);

  const location = useLocation();

  // Atualizando estado da categoria local dependendo se for bebidas ou comidas
  if (location.pathname === '/comidas') {
    if (categories[0] !== undefined && cardCategories[0] === undefined) {
      setCardCategories(categories);
    }
  } else if (location.pathname === '/bebidas') {
    if (drinkCategories[0] !== undefined && cardCategories[0] === undefined) {
      setCardCategories(drinkCategories);
    }
  }

  useEffect(() => {
    async function fetchRecipes() {
      let myCards = [];
      let results = [];
      if (location.pathname === '/comidas') {
        results = await getRecipesMealsApi();
        myCards = results.map((item) => {
          const myCategoriesMeal = {
            id: item.idMeal, strName: item.strMeal, strThumb: item.strMealThumb,
          };
          return myCategoriesMeal;
        });
      } else if (location.pathname === '/bebidas') {
        results = await getRecipeDrinksMealsApi();
        myCards = results.map((item) => {
          const myCategoriesDrink = {
            id: item.idDrink, strName: item.strDrink, strThumb: item.strDrinkThumb,
          };
          return myCategoriesDrink;
        });
      }
      setCardsRecipe(myCards);
    }
    fetchRecipes();
  }, []);

  return (
    <div>
      <div>
        <div className="container-button">
          <button
            type="button"
            data-testid="All-category-filter"
            className="button-recipe"
          >
            All
          </button>
          {cardCategories.slice(0, 2).map((item) => (
            <button
              type="button"
              data-testid={`${item.strCategory}-category-filter`}
              key={item.strCategory}
              className="button-recipe"
            >
              {item.strCategory}
            </button>
          ))}
        </div>
        <div className="container-button">
          {cardCategories.slice(2, 5).map((item) => (
            <button
              type="button"
              data-testid={`${item.strCategory}-category-filter`}
              key={item.strCategory}
              className="button-recipe"
            >
              {item.strCategory}
            </button>
          ))}
        </div>
      </div>
      <div className="cards-container">
        <RecipeCard cards={cardsRecipe} />
      </div>
    </div>
  );
}

export default RecipeList;
