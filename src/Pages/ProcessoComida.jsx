import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { detailsFoodById } from '../services/aPI';

import './ProcessoComida.css';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const ReceitaProcessoComida = () => {
  const [recipeProgress, setRecipeProgress] = useState();
  const [attributesNames, setAttributesNames] = useState();
  const [checkedId, setCheckedId] = useState([]);

  const idFood = useParams().id;

  const handleIdInProgress = async () => {
    const recipeById = await detailsFoodById(idFood);

    setRecipeProgress({
      ...recipeProgress,
      food: recipeById,
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
    setCheckedId(checkedIngredients.meals[idFood] || []);
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
        idFood: recipeProgress.food.meals[0].idMeal,
        photoFood: recipeProgress.food.meals[0].strMealThumb,
        area: recipeProgress.food.meals[0].strArea,
        nameFood: recipeProgress.food.meals[0].strMeal,
        categoryFood: recipeProgress.food.meals[0].strCategory,
        instructionsFood: recipeProgress.food.meals[0].strInstructions,
        doneDate: '',
        tags: recipeProgress.food.meals[0].strTags
          ? recipeProgress.food.meals[0].strTags
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
    const dataObject = recipeProgress.food.meals[0];

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
        id: recipeProgress.food.meals[0].idMeal,
        type: 'comida',
        area: recipeProgress.food.meals[0].strArea,
        category: recipeProgress.food.meals[0].strCategory,
        alcoholicOrNot: '',
        name: recipeProgress.food.meals[0].strMeal,
        photoFood: recipeProgress.food.meals[0].strMealThumb,
        doneDate: '',
        tags: recipeProgress.food.meals[0].strTags
          ? recipeProgress.food.meals[0].strTags
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
        meals: {
          ...checkedIngredients.meals,
          [idFood]: checkedIngredients.meals[idFood] ? [
            ...checkedIngredients.meals[idFood],
            target.id,
          ] : [target.id],
        },
      };
      localStorage.setItem('checkedIngredients', JSON.stringify(ingredientsToSave));
      setCheckedId(ingredientsToSave.meals[idFood]);
    } else {
      const ingredientsToSave = {
        ...checkedIngredients,
        meals: {
          ...checkedIngredients.meals,
          [idFood]: [
            ...checkedIngredients.meals[idFood].filter((id) => id !== target.id),
          ],
        },
      };
      localStorage.setItem('checkedIngredients', JSON.stringify(ingredientsToSave));
      setCheckedId(ingredientsToSave.meals[idFood]);
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
                src={ attributesNames.photoFood }
                alt={ attributesNames.nameFood }
              />
            </div>
            <div className="container-title">
              <div
                className="title"
                data-testid="recipe-title"
              >
                {attributesNames.nameFood}
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
              {attributesNames.categoryFood}
            </div>
            <div className="container-ingredients">
              <span>Ingredients</span>
              <div className="container-checkbox">
                {console.log(checkedId) || getIngredientsOrMeasure('strIngredient').map((ingred, i) => (
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
                {attributesNames.instructionsFood}
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

export default ReceitaProcessoComida;
