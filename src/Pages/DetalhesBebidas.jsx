import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { detailsDrinkById } from '../services/aPI';
import ContextAPI from '../Context/ContextAPI';
import Instructions from '../components/Instructions';
import BasicInfo from '../components/BasicInfo';
import Ingredients from '../components/Ingredients';
import Recomendations from '../components/Recomendations';
import './DetalhesBebidas.css';

const DetalhesBebidas = () => {
  const [drinksInProgress, setDrinksInProgress] = useState({ cocktails: {} });

  const currentDrinkID = useParams().id;

  const { detailsInfo, setDetailsInfo } = useContext(ContextAPI);

  const handleIdDetails = async () => {
    const drink = await detailsDrinkById(currentDrinkID);

    setDetailsInfo({ ...detailsInfo, drinks: drink.drinks[0] });
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
    loadRecipesInProgressFromLocalStorage();
  }, []);

  const getIngredientsOrMeasure = (param) => {
    const dataObject = detailsInfo.drinks;

    const dataKeys = Object.keys(dataObject)
      .filter((key) => key.includes(param)
        && dataObject[key] !== null && dataObject[key] !== '');

    const ingredients = dataKeys
      .map((key) => dataObject[key]);

    return ingredients;
  };

  const progressButton = () => {
    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const drinkProgressID = detailsInfo.drinks.idDrink;
    const inProgressRecipes = {
      ...progressRecipes,
      cocktails: {
        ...progressRecipes.cocktails,
        [drinkProgressID]: getIngredientsOrMeasure('strIngredient'),
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  };

  return (
    <div className="body-details">
      {detailsInfo ? (
        <div className="container-main">
          <BasicInfo />
          <Ingredients />
          <Instructions />
          <Recomendations />
          <div className="container-button">
            <button
              type="button"
              data-testid="start-recipe-btn"
              onClick={ progressButton }
            >
              <Link
                className="link-button"
                to={ `/bebidas/${detailsInfo.drinks.idDrink}/in-progress` }
              >
                {drinksInProgress.cocktails[detailsInfo.drinks.idDrink]
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
