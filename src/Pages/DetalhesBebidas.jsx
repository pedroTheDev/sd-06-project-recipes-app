import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { detailsDrinkById, showSugestedDrinks } from '../services/aPI';
import './DetalhesComida.css';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const DetalhesBebidas = () => {
  const [stateLocal, setStatelocal] = useState();
  const [stateSugestions, setSugestions] = useState();

  const idDrink = useParams().id;

  const handleIdDetails = async () => {
    const recipeById = await detailsDrinkById(idDrink);
    // console.log(recipeById);

    setStatelocal({
      ...stateLocal,
      drink: recipeById,
    });
  };

  const getSugestedDrinks = async () => {
    const drinks = await showSugestedDrinks();
    // console.log(foods);

    setSugestions(drinks);
  };

  useEffect(() => {
    handleIdDetails();
    getSugestedDrinks();
  }, []);

  const getIngredients = () => {
    const objectIngredients = stateLocal.drink.drinks[0];

    const keysIngredients = Object.keys(objectIngredients)
      .filter((key) => key.includes('strIngredient')
        && objectIngredients[key] !== null);

    const ingredients = keysIngredients
      .map((key) => objectIngredients[key]);

    return ingredients;
  };

  const number = 5;

  return (
    <div>
      {stateLocal ? (
        <div className="main-details">
          {console.log(stateLocal)}
          <div className="container-img">
            <img
              data-testid="recipe-photo"
              className="img-details"
              src={ stateLocal.drink.drinks[0].strDrinkThumb }
              alt={ stateLocal.drink.drinks[0].strDrink }
            />
            <span data-testid="recipe-title">
              { stateLocal.drink.drinks[0].strDrink }
            </span>
            <div>
              <img
                data-testid="share-btn"
                src={ shareIcon }
                alt="shareIcon"
              />
              <img
                data-testid="favorite-btn"
                src={ whiteHeartIcon }
                alt="whiteHeartIcon"
              />
            </div>
            <div data-testid="recipe-category">
              {stateLocal.drink.drinks[0].strCategory}
            </div>
            <div className="ingredients">
              <span>Ingredients</span>
              <ul>
                {getIngredients().map((ingred, i) => (
                  <li
                    data-testid={ `${i}-ingredient-name-and-measure` }
                    key={ i }
                  >
                    {ingred}
                  </li>
                ))}
              </ul>
            </div>
            <div className="instructions">
              <span>Instructions</span>
              <div data-testid="instructions">
                {stateLocal.drink.drinks[0].strInstructions}
              </div>
            </div>
            <div className="video">
              <span>Video</span>
              <a
                data-testid="video"
                href={ stateLocal.drink.drinks[0].strYoutube }
              >
                <img
                  src={ stateLocal.drink.drinks[0].strDrinkThumb }
                  alt={ stateLocal.drink.drinks[0].strDrink }
                />
              </a>
            </div>
            <div>
              { stateSugestions && stateSugestions.drinks.map((drink, index) => {
                if (index <= number) {
                  return (
                    <div className="card" key={ drink.strDrink } data-testid={ `${index}-recomendation-card` }>
                      <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
                      <button
                        type="button"
                        className="button"
                        onClick={ () => handleIdDetails(drink.idDrink) }
                      >
                        <Link to={ `/bebidas/${drink.idDrink}` }>
                          <img
                            width="200"
                            src={ drink.strDrinkThumb }
                            alt={ drink.strDrink }
                            data-testid={ `${index}-card-img` }
                          />
                        </Link>
                      </button>
                    </div>
                  );
                }
                return '';
              })}
            </div>
            <button
              type="button"
              data-testid="start-recipe-btn"
            >
              Iniciar Receita
            </button>
          </div>
        </div>
      ) : <div>Loading...</div>}
    </div>
  );
};

export default DetalhesBebidas;
