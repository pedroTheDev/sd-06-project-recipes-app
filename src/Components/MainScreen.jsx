import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../hooks/RecipeContext';

export default function MainScreen() {
  const history = useHistory();
  const { foodRecipes, drinkRecipes, isLoading } = useContext(RecipeContext);
  const doze = 12;
  const { pathname } = history.location;
  const renderCards = () => {
    console.log('texto', drinkRecipes);
    if (pathname === '/comidas') {
      return (foodRecipes.map((food, index) => {
        if (index < doze) {
          return (
            <div data-testid={ `${index}-recipe-card` }>
              <img
                src={ food.strMealThumb }
                data-testid={ `${index}-card-img` }
                alt={ food.strMeal }
              />
              <p data-testid={ `${index}-card-name` }>{ food.strMeal }</p>
            </div>
          );
        }
      }));
    }
    if (pathname === '/bebidas') {
      return (drinkRecipes && drinkRecipes.length && drinkRecipes.map((drinks, index) => {
        if (index < doze) {
          return (
            <div data-testid={ `${index}-recipe-card` }>
              <img
                src={drinks.strDrinkThumb}
                data-testid={ `${ index }-card-img` }
                alt={ drinks.strDrink }
              />
              <p data-testid={ `${index}-card-name` }>{ drinks.strDrink }</p>
            </div>
          );
        }
      }));
    }
  };

  return <div>{ isLoading ? <p>Loading...</p> : renderCards() }</div>;
}
