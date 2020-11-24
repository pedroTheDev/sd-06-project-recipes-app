import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import '../style/RecipeCards.css';

function RecipesCards({ title }) {
  const { data, isLoading } = useContext(RecipesContext);
  const DOZE = 12;
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (title === 'Comidas') {
    return (
      <div>
        {
          data[0].meals.filter((_, index) => index < DOZE)
            .map(({ idMeal, strMeal, strMealThumb }, index) => (
              <div
                key={ idMeal }
                data-testid={ `${index}-recipe-card` }
                className="card-recipe"
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ strMealThumb }
                  alt={ strMeal }
                />
                <h1 data-testid={ `${index}-card-name` }>{ strMeal }</h1>
              </div>
            ))
        }
      </div>
    );
  }
  return (
    <div>
      {
        data[1].drinks.filter((_, index) => index < DOZE)
          .map(({ idDrink, strDrink, strDrinkThumb }, index) => (
            <div
              key={ idDrink }
              data-testid={ `${index}-recipe-card` }
              className="card-recipe"
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ strDrinkThumb }
                alt={ strDrink }
              />
              <h1 data-testid={ `${index}-card-name` }>{ strDrink }</h1>
            </div>
          ))
      }
    </div>
  );
}

RecipesCards.propTypes = {
  title: PropTypes.string.isRequired,
};

export default RecipesCards;
