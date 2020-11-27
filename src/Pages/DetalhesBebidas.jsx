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
    const drink = await detailsDrinkById(idDrink);

    setStatelocal({
      ...stateLocal,
      drink,
    });
  };

  const getSugestedDrinks = async () => {
    const drinks = await showSugestedDrinks();

    setSugestions(drinks);
  };

  useEffect(() => {
    handleIdDetails();
    getSugestedDrinks();
  }, []);

  const getIngredientsOrMeasure = (param) => {
    const dataObject = stateLocal.drink.drinks[0];

    const dataKeys = Object.keys(dataObject)
      .filter((key) => key.includes(param)
        && dataObject[key] !== null);

    const ingredients = dataKeys
      .map((key) => dataObject[key]);

    return ingredients;
  };

  const number = 5;

  return (
    <div className="main-principal">
      {stateLocal ? (
        <div className="container-main">
          {console.log(stateLocal)}
          <div className="container-initial">
            <img
              data-testid="recipe-photo"
              className="img-initial"
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
              {stateLocal.drink.drinks[0].strAlcoholic}
            </div>
            <div className="ingredients">
              <span>Ingredients</span>
              <ul>
                {getIngredientsOrMeasure('strIngredient').map((ingred, i) => (
                  <li
                    data-testid={ `${i}-ingredient-name-and-measure` }
                    key={ i }
                  >
                    {`${ingred} - ${getIngredientsOrMeasure('strMeasure')[i]}`}
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
            <span>Recomendadas</span>
            <div className="main-recomendations">
              { stateSugestions && stateSugestions.drinks.map((drink, index) => {
                if (index <= number) {
                  return (
                    <div
                      className="main-scroll"
                      key={ drink.strDrink }
                      data-testid={ `${index}-recomendation-card` }
                    >
                      <p data-testid={ `${index}-recomendation-title` }>
                        {drink.strDrink}
                      </p>
                      <button
                        type="button"
                        className="button"
                        onClick={ () => handleIdDetails(drink.idDrink) }
                      >
                        <Link to={ `/bebidas/${drink.idDrink}` }>
                          <img
                            className="img-recomendations"
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
