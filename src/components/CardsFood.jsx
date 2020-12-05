import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import {
  requestApiFoodFilterName,
} from '../services/requestFood';
import FavoriteHeart from './FavoriteHeart';
import '../styles/imgBig.css';

function CardsFood() {
  const {
    cards: {
      cardFood,
      setCardFood,
    },
  } = useContext(RecipesAppContext);

  const arrayVoid = 0;
  useEffect(() => {
    if (cardFood.length === arrayVoid) {
      requestApiFoodFilterName()
        .then((arrayApi) => setCardFood(arrayApi));
    }
  }, []);

  const upToParameter12 = 12;
  const [upToParameter, setUpToParameter] = useState(upToParameter12);

  const onClickMoreFood = () => {
    setUpToParameter(upToParameter + upToParameter12);
  };

  const ofTheFirstParameter = 0;
  const disableButtonMoreResults = true;

  if (cardFood.length === arrayVoid) {
    return (<span>Loading...</span>);
  }

  return (
    <div>
      {cardFood.slice(ofTheFirstParameter, upToParameter)
        .map((objFood, index) => {
          const {
            idMeal,
            strMeal,
            strMealThumb,
          } = objFood;
          return (
            <div key={ idMeal } data-testid={ `${index}-recipe-card` }>
              <Link
                to={ `/comidas/${idMeal}` }
              >
                <img
                  className="imgBig"
                  src={ strMealThumb }
                  alt={ strMeal }
                  data-testid={ `${index}-card-img` }
                />
              </Link>
              <Link
                to={ `/comidas/${idMeal}` }
              >
                <h4
                  data-testid={ `${index}-card-name` }
                >
                  { strMeal }
                </h4>
              </Link>
              <FavoriteHeart id={ idMeal } detailsFood={ objFood } />
            </div>
          );
        })}
      <button
        type="button"
        onClick={ onClickMoreFood }
        disabled={ upToParameter > cardFood.length ? disableButtonMoreResults : false }
      >
        Mostrar mais resultados
      </button>
    </div>
  );
}

export default CardsFood;
