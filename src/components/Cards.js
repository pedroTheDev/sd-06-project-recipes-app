import React from 'react';
import { Link } from 'react-router-dom';

export default function Cards(type, recipes) {
  const twelve = 12;
  return (
    <div className="recipes-section">
      {recipes.map((recipe, index) => {
        if (index < twelve) {
          const dataTestID = `${index}-recipe-card`;
          const dataTestIDImg = `${index}-card-img`;
          const dataTestIDCard = `${index}-card-name`;
          if (type === 'cocktails') {
            return (
              <Link key={ index } to={ `/bebidas/${recipe.idDrink}` }>
                <div className="recipe-card" data-testid={ dataTestID } key={ index }>
                  <img
                    alt="Drink Thumb"
                    data-testid={ dataTestIDImg }
                    src={ recipe.strDrinkThumb }
                    className="recipe-thumb"
                    height="250"
                  />
                  <h2
                    className="recipe-name"
                    data-testid={ dataTestIDCard }
                  >
                    {recipe.strDrink}
                  </h2>
                </div>
              </Link>
            );
          }
          if (type === 'meals') {
            return (
              <Link key={ index } to={ `/comidas/${recipe.idMeal}` }>
                <div className="recipe-card" data-testid={ dataTestID } key={ index }>
                  <img
                    alt="Meal Thumb"
                    data-testid={ dataTestIDImg }
                    src={ recipe.strMealThumb }
                    className="recipe-thumb"
                    height="250"
                  />
                  <h2
                    className="recipe-name"
                    data-testid={ dataTestIDCard }
                  >
                    {recipe.strMeal}
                  </h2>
                </div>
              </Link>
            );
          }
        }
        return (null);
      })}
    </div>
  );
}
