import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { detailsDrinkById } from '../services/aPI';

import './ProcessoComida.css';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const ProcessoBebidas = () => {
  const [recipeProgress, setRecipeProgress] = useState();
  const [attributesNames, setAttributesNames] = useState();
  const [scratchIngredients, setScratchIngredients] = useState({
    checkbox: false,
  });

  const idDrink = useParams().id;

  const handleIdInProgress = async () => {
    const recipeById = await detailsDrinkById(idDrink);

    setRecipeProgress({
      ...recipeProgress,
      drink: recipeById,
    });
  };

  useEffect(() => {
    handleIdInProgress();
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

  const handleFavorite = () => {
    if (localStorage.getItem('doneRecipes') === null) {
      const doneRecipes = [];
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    } else if (recipeProgress) {
      const recipeData = {
        id: recipeProgress.drink.drinks[0].idDrink,
        type: 'comida',
        area: recipeProgress.drink.drinks[0].strArea,
        category: recipeProgress.drink.drinks[0].strCategory,
        alcoholicOrNot: '',
        name: recipeProgress.drink.drinks[0].strDrink,
        photoFood: recipeProgress.drink.drinks[0].strDrinkThumb,
        doneDate: '',
        tags: recipeProgress.drink.drinks[0].strTags
          ? recipeProgress.drink.drinks[0].strTags
          : [],
      };
      localStorage.setItem('doneRecipes', JSON.stringify({ recipeData }));
    } else {
      return '';
    }
  };

  useEffect(() => {
    handleFavorite();
  }, [recipeProgress]);

  const scratCheckbox = () => {
    alert('falta implementar receitas risadas');
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
                      value="on"
                      id={ i }
                      onClick={ scratCheckbox }
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
              >
                Finalizar Receita
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default ProcessoBebidas;
