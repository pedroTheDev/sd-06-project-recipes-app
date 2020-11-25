import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipesAppContext from '../hooks/RecipesAppContext';
import { requestApiFoodFilterName } from '../services/requestFood';

function CardsFood() {
  const {
    cards: {
      cardFood,
      setCardFood,
    },
  } = useContext(RecipesAppContext);

  useEffect(() => {
    requestApiFoodFilterName()
      .then((arrayApi) => setCardFood(arrayApi));
  }, []);

  const ofTheFirstParameter = 0;
  const upToParameter12 = 12;

  return (
    <div>
      {(cardFood.length === 0) ? <span>Loading...</span> : cardFood
        .slice(ofTheFirstParameter, upToParameter12).map(({
          idMeal,
          strMeal,
          strMealThumb,
        }, index) => (
          <Link
            key={ idMeal }
            to={ `/comidas/${idMeal}` }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ strMealThumb }
              alt={ strMeal }
              data-testid={ `${index}-card-img` }
            />
            <h4
              data-testid={ `${index}-card-name` }
            >
              { strMeal }
            </h4>
          </Link>
        ))}
    </div>
  );
}

export default CardsFood;
