import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { detailsFoodById, showSugestedFoods } from '../services/aPI';
import './DetalhesComida.css';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const DetalhesComida = () => {
  const [stateLocal, setStatelocal] = useState();
  const [stateSugestions, setSugestions] = useState();

  const idFood = useParams().id;

  const handleIdDetails = async () => {
    const recipeById = await detailsFoodById(idFood);

    setStatelocal({
      ...stateLocal,
      food: recipeById,
    });
  };

  const getSugestedFoods = async () => {
    const foods = await showSugestedFoods();

    setSugestions(foods);
  };

  useEffect(() => {
    handleIdDetails();
    getSugestedFoods();
  }, []);

  const getIngredients = () => {
    const objectIngredients = stateLocal.food.meals[0];

    const keysIngredients = Object.keys(objectIngredients)
      .filter((key) => key.includes('strIngredient')
        && objectIngredients[key] !== '');

    const ingredients = keysIngredients
      .map((key) => objectIngredients[key]);

    return ingredients;
  };

  const amountIngredients = () => {
    const objectIngredients = stateLocal.food.meals[0];

    const keysIngredients = Object.keys(objectIngredients)
      .filter((key) => key.includes('strMeasure1')
        && objectIngredients[key] !== '');

    const ingredients = keysIngredients
      .map((key) => objectIngredients[key]);

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
              src={ stateLocal.food.meals[0].strMealThumb }
              alt={ stateLocal.food.meals[0].strMeal }
            />
            <span data-testid="recipe-title">
              { stateLocal.food.meals[0].strMeal }
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
              {stateLocal.food.meals[0].strCategory}
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
                {stateLocal.food.meals[0].strInstructions}
              </div>
            </div>
            <div className="video">
              <span>Video</span>
              <a
                data-testid="video"
                href={ stateLocal.food.meals[0].strYoutube }
              >
                <img
                  src={ stateLocal.food.meals[0].strMealThumb }
                  alt={ stateLocal.food.meals[0].strMeal }
                />
              </a>
            </div>
            <div className="main-scroll">
              <span>Recomendadas</span>
              { stateSugestions && stateSugestions.meals.map((meal, index) => {
                if (index <= number) {
                  return (
                    <div
                      className="card-details"
                      key={ meal.strMeal }
                      data-testid={ `${index}-recomendation-card` }
                    >
                      <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
                      <button
                        type="button"
                        className="button"
                        onClick={ () => handleIdDetails(meal.idMeal) }
                      >
                        <Link to={ `/comidas/${meal.idMeal}` }>
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

export default DetalhesComida;
