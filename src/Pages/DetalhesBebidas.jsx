import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { detailsDrinkById, showSugestedFoods } from '../services/aPI';
import ContextAPI from '../Context/ContextAPI';
import Instructions from '../components/Instructions';
import BasicInfo from '../components/BasicInfo';
import Ingredients from '../components/Ingredients';

import './DetalhesBebidas.css';

const DetalhesBebidas = () => {
  const [stateLocal, setStatelocal] = useState();
  const [stateSugestions, setSugestions] = useState();
  const [drinksInProgress, setDrinksInProgress] = useState({ cocktails: {} });

  const currentDrinkID = useParams().id;

  const { detailsInfo, setDetailsInfo } = useContext(ContextAPI);

  const handleIdDetails = async () => {
    const drink = await detailsDrinkById(currentDrinkID);

    setStatelocal({ ...stateLocal, drink });
    setDetailsInfo({ ...detailsInfo, drinks: drink.drinks[0] });
  };

  const getSugestedFoods = async () => {
    const foods = await showSugestedFoods();

    setSugestions(foods);
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
    setDrinksInProgress({ cocktails: progressRecipes.cocktails });
  };

  useEffect(() => {
    handleIdDetails();
    getSugestedFoods();
    loadRecipesInProgressFromLocalStorage();
  }, []);

  const getIngredientsOrMeasure = (param) => {
    const dataObject = stateLocal.drink.drinks[0];

    const dataKeys = Object.keys(dataObject)
      .filter((key) => key.includes(param)
        && dataObject[key] !== null && dataObject[key] !== '');

    const ingredients = dataKeys
      .map((key) => dataObject[key]);

    return ingredients;
  };

  const progressButton = () => {
    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const drinkProgressID = stateLocal.drink.drinks[0].idDrink;
    const inProgressRecipes = {
      ...progressRecipes,
      cocktails: {
        ...progressRecipes.cocktails,
        [drinkProgressID]: getIngredientsOrMeasure('strIngredient'),
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
          <div className="recomendation-span">
            <span>
              Recomendadas
            </span>
          </div>
          <div className="container-recomendations">
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
          <div className="container-button">
            <button
              type="button"
              data-testid="start-recipe-btn"
              onClick={ progressButton }
            >
              <Link
                className="link-button"
                to={ `/bebidas/${stateLocal.drink.drinks[0].idDrink}/in-progress` }
              >
                {drinksInProgress.cocktails[stateLocal.drink.drinks[0].idDrink]
                  ? 'Continuar Receita' : 'Iniciar Receita'}
              </Link>
            </button>
          </div>
        </div>
      ) : <div>Loading...</div>}
    </div>
  );
};

export default DetalhesBebidas;
