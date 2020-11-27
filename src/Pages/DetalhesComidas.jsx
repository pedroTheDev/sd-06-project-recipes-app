import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import { detailsFoodById, showSugestedDrinks } from '../services/aPI';
import './DetalhesComida.css';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const DetalhesComida = () => {
  const [stateLocal, setStatelocal] = useState();
  const [stateSugestions, setSugestions] = useState();
  const [stateButton, setStateButton] = useState({
    initialRecipe: false,
  });
  const location = useLocation().pathname;

  const idFood = useParams().id;

  const handleIdDetails = async () => {
    const recipeById = await detailsFoodById(idFood);

    setStatelocal({
      ...stateLocal,
      food: recipeById,
    });
  };

  const getSugestedFoods = async () => {
    const drinks = await showSugestedDrinks();

    setSugestions(drinks);
  };

  useEffect(() => {
    handleIdDetails();
    getSugestedFoods();
  }, []);

  const getIngredientsOrMeasure = (param) => {
    const dataObject = stateLocal.food.meals[0];

    const dataKeys = Object.keys(dataObject)
      .filter((key) => key.includes(param)
        && dataObject[key] !== '' && dataObject[key] !== ' ');

    const ingredients = dataKeys
      .map((key) => dataObject[key]);

    return ingredients;
  };

  const progressButton = () => {
    setStateButton({
      initialRecipe: !stateButton.initialRecipe,
    });
  };

  const handleShareIcon = () => {
    const zero = 0;
    const menosUm = -1;
    let fullPath = '';
    if (location.substr(location.length - 1) === '/') {
      fullPath = `http://localhost:3000${location.slice(zero, menosUm)}`;
    } else {
      fullPath = `http://localhost:3000${location}`;
    }
    const tempElement = document.createElement('textarea');
    tempElement.value = fullPath;
    tempElement.setAttribute('readonly', '');
    tempElement.style.position = 'absolute';
    tempElement.style.left = '-9999px';
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand('copy');
    document.body.removeChild(tempElement);
    const linkCopy = document.createElement('p');
    linkCopy.innerHTML = 'Link copiado!';
    // document.querySelector('.container-cards').appendChild(linkCopy);
  };

  const number = 5;

  return (
    <div className="main-principal">
      {stateLocal ? (
        <div className="container-main">
          {console.log(window.location.href)}
          <div className="container-initial">
            <img
              data-testid="recipe-photo"
              className="img-initial"
              src={ stateLocal.food.meals[0].strMealThumb }
              alt={ stateLocal.food.meals[0].strMeal }
            />
            <div className="title-e-icons">
              <div
                className="category"
                data-testid="recipe-category"
              >
                {stateLocal.food.meals[0].strCategory}
              </div>
              <span data-testid="recipe-title">
                { stateLocal.food.meals[0].strMeal }
              </span>
              <div>
                <button
                  type="button"
                  onClick={ handleShareIcon }
                >
                  <img
                    data-testid="share-btn"
                    src={ shareIcon }
                    alt="shareIcon"
                  />
                </button>
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
                        <Link to={ `/comidas/${drink.idDrink}` }>
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
            <div className="button-initial-recipe">
              <button
                type="button"
                data-testid="start-recipe-btn"
                onClick={ progressButton }
              >
                <Link
                  className="link-button"
                  to={ `/comidas/${stateLocal.food.meals[0].idMeal}/in-progress` }
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

export default DetalhesComida;
