import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { detailsDrinkById } from '../services/aPI';
import { FavoriteDrinkButton } from '../components/FavoriteBtn';
import ShareButton from '../components/ShareBtn';
import ContextAPI from '../Context/ContextAPI';

import './ProcessoComida.css';
import Instructions from '../components/Instructions';
import BasicInfo from '../components/BasicInfo';

const ProcessoBebidas = () => {
  const [drinkDetails, setDrinkDetails] = useState();
  const [checkedId, setCheckedId] = useState([]);

  const idDrink = useParams().id;

  const { detailsInfo, setDetailsInfo } = useContext(ContextAPI);

  const handleIdInProgress = async () => {
    const drink = await detailsDrinkById(idDrink);
    console.log(drink.drinks[0]);

    setDrinkDetails({
      ...drinkDetails,
      drink: drink.drinks[0],
    });
    setDetailsInfo({ ...detailsInfo, drinks: drink.drinks[0] });
  };

  const loadCheckedIngredientsLocalStorage = () => {
    if (localStorage.getItem('checkedIngredients') === null) {
      const checkedIngredients = {
        cocktails: {},
        meals: {},
      };
      localStorage.setItem('checkedIngredients', JSON.stringify(checkedIngredients));
    }

    const checkedIngredients = JSON.parse(localStorage.getItem('checkedIngredients'));
    setCheckedId(checkedIngredients.cocktails[idDrink] || []);
  };

  const loadDoneRecipesFromStorage = () => {
    if (localStorage.getItem('doneRecipes') === null) {
      const doneRecipes = [];
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    }
  };

  useEffect(() => {
    handleIdInProgress();
    loadCheckedIngredientsLocalStorage();
    loadDoneRecipesFromStorage();
  }, []);

  const getIngredientsOrMeasure = (param) => {
    const dataObject = drinkDetails.drink;

    const dataKeys = Object.keys(dataObject)
      .filter((key) => key.includes(param)
        && dataObject[key] !== '' && dataObject[key] !== ' ' && dataObject[key] !== null);

    const ingredients = dataKeys
      .map((key) => dataObject[key]);

    return ingredients;
  };

  const setDoneRecipes = () => {
    if (drinkDetails) {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, {
        id: drinkDetails.drink.idDrink,
        type: 'bebida',
        area: drinkDetails.drink.strArea,
        category: drinkDetails.drink.strCategory,
        alcoholicOrNot: '',
        name: drinkDetails.drink.strDrink,
        photoFood: drinkDetails.drink.strDrinkThumb,
        doneDate: '',
        tags: drinkDetails.drink.strTags
          ? drinkDetails.drink.strTags
          : [],
      }]));
    } else {
      return '';
    }
  };

  const scratCheckbox = (target) => {
    const checkedIngredients = JSON.parse(localStorage.getItem('checkedIngredients'));

    if (target.checked === true) {
      const ingredientsToSave = {
        ...checkedIngredients,
        cocktails: {
          ...checkedIngredients.cocktails,
          [idDrink]: checkedIngredients.cocktails[idDrink] ? [
            ...checkedIngredients.cocktails[idDrink],
            target.id,
          ] : [target.id],
        },
      };
      localStorage.setItem('checkedIngredients', JSON.stringify(ingredientsToSave));
      setCheckedId(ingredientsToSave.cocktails[idDrink]);
    } else {
      const ingredientsToSave = {
        ...checkedIngredients,
        cocktails: {
          ...checkedIngredients.cocktails,
          [idDrink]: [
            ...checkedIngredients.cocktails[idDrink].filter((id) => id !== target.id),
          ],
        },
      };
      localStorage.setItem('checkedIngredients', JSON.stringify(ingredientsToSave));
      setCheckedId(ingredientsToSave.cocktails[idDrink]);
    }
  };

  return (
    <div>
      {!drinkDetails
        ? <div className="loading">Loading...</div>
        : (
          <div className="body-progress">
            <BasicInfo />
            <div className="span-ingredients">
              <span>Ingredients</span>
            </div>
            <div className="container-checkbox">
              {getIngredientsOrMeasure('strIngredient').map((ingred, i) => (
                <label
                  key={ i }
                  htmlFor={ i }
                  className="input-checkbox"
                  data-testid={ `${i}-ingredient-step` }
                >
                  <input
                    type="checkbox"
                    checked={ checkedId.includes(i.toString()) }
                    id={ i }
                    onChange={ (({ target }) => scratCheckbox(target)) }
                  />
                  {`${ingred} - ${getIngredientsOrMeasure('strMeasure')[i]}`}
                </label>
              ))}
            </div>
            <Instructions />
            <div className="container-button">
              <button
                type="button"
                data-testid="finish-recipe-btn"
                onClick={ setDoneRecipes }
              >
                <Link
                  className="link-button"
                  to="/receitas-feitas"
                >
                  Finalizar Receita
                </Link>
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default ProcessoBebidas;
