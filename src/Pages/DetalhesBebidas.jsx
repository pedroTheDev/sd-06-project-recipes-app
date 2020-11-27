import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { detailsDrinkById, showSugestedFoods } from '../services/aPI';
import './DetalhesComida.css';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const DetalhesBebidas = () => {
  const [stateLocal, setStatelocal] = useState();
  const [stateSugestions, setSugestions] = useState();
  const [stateButton, setStateButton] = useState({
    initialRecipe: false,
  });

  const idDrink = useParams().id;

  const handleIdDetails = async () => {
    const drink = await detailsDrinkById(idDrink);

    setStatelocal({
      ...stateLocal,
      drink,
    });
  };

  const getSugestedDrinks = async () => {
    const foods = await showSugestedFoods();

    setSugestions(foods);
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

  const progressButton = () => {
    setStateButton({
      initialRecipe: !stateButton.initialRecipe,
    });
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
            <div className="title-e-icons">
              <div
                className="category"
                data-testid="recipe-category"
              >
                {stateLocal.drink.drinks[0].strCategory}
                {stateLocal.drink.drinks[0].strAlcoholic}
              </div>
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
              { stateSugestions && stateSugestions.meals.map((meal, index) => {
                if (index <= number) {
                  return (
                    <div
                      className="main-scroll"
                      key={ meal.strMeal }
                      data-testid={ `${index}-recomendation-card` }
                    >
                      <p data-testid={ `${index}-recomendation-title` }>
                        {meal.strMeal}
                      </p>
                      <button
                        type="button"
                        className="button"
                        onClick={ () => handleIdDetails(meal.idMeal) }
                      >
                        <Link to={ `/bebidas/${meal.idMeal}` }>
                          <img
                            className="img-recomendations"
                            width="200"
                            src={ meal.strMealThumb }
                            alt={ meal.strMeal }
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
            <div className="button-initial-recipe">
              <button
                type="button"
                data-testid="start-recipe-btn"
                onClick={ progressButton }
              >
                <Link
                  className="link-button"
                  to={ `/bebidas/${stateLocal.drink.drinks[0].idDrink}/in-progress` }
                >
                  {!stateButton.initialRecipe ? 'Iniciar Receita' : 'Continuar Receita'}
                </Link>
              </button>
            </div>
          </div>
        </div>
      ) : <div>Loading...</div>}
    </div>
  );
};

export default DetalhesBebidas;
