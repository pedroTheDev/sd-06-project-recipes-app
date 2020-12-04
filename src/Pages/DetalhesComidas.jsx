import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { detailsFoodById, showSugestedDrinks } from '../services/aPI';
import './DetalhesComida.css';

import ContextAPI from '../Context/ContextAPI';
import Instructions from '../components/Instructions';
import Ingredients from '../components/Ingredients';
import BasicInfo from '../components/BasicInfo';

const DetalhesComida = () => {
  const [stateLocal, setStatelocal] = useState();
  const [stateSugestions, setSugestions] = useState();
  const [foodsInProgress, setFoodsInProgress] = useState({ meals: {} });

  const currentFoodID = useParams().id;

  const { detailsInfo, setDetailsInfo } = useContext(ContextAPI);

  const handleIdDetails = async () => {
    const food = await detailsFoodById(currentFoodID);
    console.log(food);
    setStatelocal({ ...stateLocal, food });
    setDetailsInfo({ ...detailsInfo, foods: food.meals[0] });
  };

  const getSugestedDrinks = async () => {
    const drinks = await showSugestedDrinks();
    setSugestions(drinks);
  };

  const loadRecipesInProgressFromLocalStorage = () => {
    if (localStorage.getItem('inProgressRecipes') === null) {
      const inProgressRecipes = {
        cocktails: {},
        meals: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }

    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setFoodsInProgress({ meals: progressRecipes.meals });
  };

  useEffect(() => {
    handleIdDetails();
    getSugestedDrinks();
    loadRecipesInProgressFromLocalStorage();
  }, []);

  const getIngredientsOrMeasure = (param) => {
    const dataObject = stateLocal.food.meals[0];

    const dataKeys = Object.keys(dataObject)
      .filter((key) => key.includes(param)
        && dataObject[key] !== '' && dataObject[key] !== ' ' && dataObject[key] !== null);

    const ingredients = dataKeys
      .map((key) => dataObject[key]);

    return ingredients;
  };

  const progressButton = () => {
    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const mealProgressID = stateLocal.food.meals[0].idMeal;
    const inProgressRecipes = {
      ...progressRecipes,
      meals: {
        ...progressRecipes.meals,
        [mealProgressID]: getIngredientsOrMeasure('strIngredient'),
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  };

  const number = 5;

  return (
    <div className="body-details">
      {stateLocal ? (
        <div className="container-main">
          <BasicInfo />
          <Ingredients />
          <Instructions />
          <div className="container-span-video">
            <span>Video</span>
          </div>
          <div className="container-video">
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
          <span
            className="recomendation-span"
          >
            Recomendadas
          </span>
          <div className="container-recomendations">
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
          <div className="container-button">
            <button
              type="button"
              data-testid="start-recipe-btn"
              onClick={ progressButton }
            >
              <Link
                className="link-button"
                to={ `/comidas/${stateLocal.food.meals[0].idMeal}/in-progress` }
              >
                {foodsInProgress.meals[stateLocal.food.meals[0].idMeal]
                  ? 'Continuar Receita' : 'Iniciar Receita'}
              </Link>
            </button>
          </div>
        </div>
      ) : <div>Loading...</div>}
    </div>
  );
};

export default DetalhesComida;
