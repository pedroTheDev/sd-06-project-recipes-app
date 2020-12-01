import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { detailsDrinkById } from '../services/aPI';

import './ProcessoComida.css';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const ProcessoBebidas = () => {
  const [recipeProgress, setRecipeProgress] = useState();
  const [attributesNames, setAttributesNames] = useState();
  const [checkedId, setCheckedId] = useState([]);

  const idDrink = useParams().id;

  const handleIdInProgress = async () => {
    const recipeById = await detailsDrinkById(idDrink);

    setRecipeProgress({
      ...recipeProgress,
      drink: recipeById,
    });
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

  const handleAttributesNames = () => {
    if (recipeProgress) {
      setAttributesNames({
        idDrink: recipeProgress.drink.drinks[0].idDrink,
        photoDrink: recipeProgress.drink.drinks[0].strDrinkThumb,
        area: recipeProgress.drink.drinks[0].strArea,
        nameDrink: recipeProgress.drink.drinks[0].strDrink,
        categoryDrink: recipeProgress.drink.drinks[0].strCategory,
        instructionsDrink: recipeProgress.drink.drinks[0].strInstructions,
        doneDate: '',
        tags: recipeProgress.drink.drinks[0].strTags
          ? recipeProgress.drink.drinks.strTags
          : [],
      });
    } else {
      return '';
    }
  };

  useEffect(() => {
    handleAttributesNames();
  }, [recipeProgress]);

  const getIngredientsOrMeasure = (param) => {
    const dataObject = recipeProgress.drink.drinks[0];

    const dataKeys = Object.keys(dataObject)
      .filter((key) => key.includes(param)
        && dataObject[key] !== '' && dataObject[key] !== ' ' && dataObject[key] !== null);

    const ingredients = dataKeys
      .map((key) => dataObject[key]);

    return ingredients;
  };

  const setDoneRecipes = () => {
    if (recipeProgress) {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, {
        id: recipeProgress.drink.drinks[0].idDrink,
        type: 'bebida',
        area: recipeProgress.drink.drinks[0].strArea,
        category: recipeProgress.drink.drinks[0].strCategory,
        alcoholicOrNot: '',
        name: recipeProgress.drink.drinks[0].strDrink,
        photoFood: recipeProgress.drink.drinks[0].strDrinkThumb,
        doneDate: '',
        tags: recipeProgress.drink.drinks[0].strTags
          ? recipeProgress.drink.drinks[0].strTags
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
      {!attributesNames
        ? <div className="loading">Loading...</div>
        : (
          <div className="body-progress">
            <div className="container-photo">
              <img
                data-testid="recipe-photo"
                src={ attributesNames.photoDrink }
                alt={ attributesNames.nameDrink }
              />
            </div>
            <div className="container-title">
              <div
                className="title"
                data-testid="recipe-title"
              >
                {attributesNames.nameDrink}
              </div>
              <div className="container-icons">
                <button
                  type="button"
                >
                  <img
                    className="button-share"
                    data-testid="share-btn"
                    src={ shareIcon }
                    alt="shareIcon"
                  />
                </button>
                <button
                  type="button"
                >
                  <img
                    data-testid="favorite-btn"
                    src={ whiteHeartIcon }
                    alt="whiteHeartIcon"
                  />
                </button>
              </div>
            </div>
            <div
              className="container-cotegory"
              data-testid="recipe-category"
            >
              {attributesNames.categoryDrink}
            </div>
            <div className="container-ingredients">
              <span>Ingredients</span>
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
            </div>
            <div
              className="container-instructions"
              data-testid="instructions"
            >
              <span>Instructions</span>
              <div className="text-instructions">
                {attributesNames.instructionsDrink}
              </div>
            </div>
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
